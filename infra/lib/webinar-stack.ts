import * as cdk from "aws-cdk-lib"
import * as lambda from "aws-cdk-lib/aws-lambda"
import * as dynamodb from "aws-cdk-lib/aws-dynamodb"
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager"
import { HttpApi, HttpMethod, CorsHttpMethod } from "aws-cdk-lib/aws-apigatewayv2"
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations"
import * as path from "path"
import { Construct } from "constructs"

export interface WebinarStackProps extends cdk.StackProps {
  brevoSecretName: string // existing Brevo transactional key
  joinUrlSecretName: string // reignara/webinar/2026-08-05/join-url
  senderEmail: string
  senderName: string
}

export class WebinarStack extends cdk.Stack {
  /** e.g. abc123.execute-api.us-west-2.amazonaws.com — consumed by SiteStack CloudFront. */
  public readonly apiDomainName: string

  constructor(scope: Construct, id: string, props: WebinarStackProps) {
    super(scope, id, props)

    // ---- DynamoDB single table ----
    const table = new dynamodb.Table(this, "Table", {
      tableName: "reignara-webinar",
      partitionKey: { name: "PK", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "SK", type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST,
      timeToLiveAttribute: "ttl", // rate-limit items expire; registrations have no ttl
      pointInTimeRecoverySpecification: { pointInTimeRecoveryEnabled: true },
      removalPolicy: cdk.RemovalPolicy.RETAIN, // never drop registrant data on stack changes
    })
    // GSI1: org-level dedup / rollups by email domain
    table.addGlobalSecondaryIndex({
      indexName: "GSI1",
      partitionKey: { name: "emailDomain", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.STRING },
    })
    // GSI2: admin review queue by match status
    table.addGlobalSecondaryIndex({
      indexName: "GSI2",
      partitionKey: { name: "matchStatus", type: dynamodb.AttributeType.STRING },
      sortKey: { name: "createdAt", type: dynamodb.AttributeType.STRING },
    })
    // GSI3: token redemption lookup
    table.addGlobalSecondaryIndex({
      indexName: "GSI3",
      partitionKey: { name: "joinToken", type: dynamodb.AttributeType.STRING },
    })

    // ---- Secrets ----
    const brevoSecret = secretsmanager.Secret.fromSecretNameV2(this, "BrevoKey", props.brevoSecretName)
    const joinUrlSecret = new secretsmanager.Secret(this, "JoinUrlSecret", {
      secretName: props.joinUrlSecretName,
      description: "Real webinar join URL. Populated out of band; only the redirect Lambda reads it.",
      secretStringValue: cdk.SecretValue.unsafePlainText("PLACEHOLDER"),
    })

    // ---- Lambdas (pre-bundled by infra/scripts/build-lambdas.mjs) ----
    const distDir = (name: string) => path.join(__dirname, "..", "lambda-dist", name)
    const commonEnv = {
      TABLE_NAME: table.tableName,
      SENDER_EMAIL: props.senderEmail,
      SENDER_NAME: props.senderName,
      BREVO_SECRET_NAME: props.brevoSecretName,
    }
    const fnProps = {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      timeout: cdk.Duration.seconds(15),
      memorySize: 256,
    }

    const submitFn = new lambda.Function(this, "SubmitFn", {
      ...fnProps,
      code: lambda.Code.fromAsset(distDir("submit")),
      environment: commonEnv,
    })
    const resendFn = new lambda.Function(this, "ResendFn", {
      ...fnProps,
      code: lambda.Code.fromAsset(distDir("resend")),
      environment: commonEnv,
    })
    const redirectFn = new lambda.Function(this, "RedirectFn", {
      ...fnProps,
      code: lambda.Code.fromAsset(distDir("redirect")),
      environment: {
        TABLE_NAME: table.tableName,
        JOIN_URL_SECRET_NAME: props.joinUrlSecretName,
      },
    })

    // ---- IAM (least privilege) ----
    table.grantReadWriteData(submitFn) // upsert + rate-limit counter + system query
    brevoSecret.grantRead(submitFn)
    table.grantReadData(resendFn)
    brevoSecret.grantRead(resendFn)
    table.grantReadData(redirectFn) // GSI3 token lookup only
    joinUrlSecret.grantRead(redirectFn) // ONLY the redirect Lambda reads the join URL (A3)

    // ---- HTTP API ----
    const api = new HttpApi(this, "WebinarApi", {
      corsPreflight: {
        allowOrigins: ["https://reignara.com", "https://www.reignara.com"],
        allowMethods: [CorsHttpMethod.POST, CorsHttpMethod.GET],
        allowHeaders: ["content-type"],
        maxAge: cdk.Duration.hours(1),
      },
    })
    api.addRoutes({
      path: "/api/webinar/submit",
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration("SubmitInt", submitFn),
    })
    api.addRoutes({
      path: "/webinar/join",
      methods: [HttpMethod.GET],
      integration: new HttpLambdaIntegration("RedirectInt", redirectFn),
    })
    api.addRoutes({
      path: "/webinar/resend",
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration("ResendInt", resendFn),
    })

    this.apiDomainName = `${api.httpApiId}.execute-api.${this.region}.amazonaws.com`

    new cdk.CfnOutput(this, "WebinarApiEndpoint", { value: api.apiEndpoint })
    new cdk.CfnOutput(this, "WebinarApiDomain", { value: this.apiDomainName })
    new cdk.CfnOutput(this, "WebinarTableName", { value: table.tableName })
    new cdk.CfnOutput(this, "JoinUrlSecretName", { value: joinUrlSecret.secretName })
  }
}
