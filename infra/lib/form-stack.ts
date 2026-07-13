import * as cdk from "aws-cdk-lib";
import * as lambda from "aws-cdk-lib/aws-lambda";
import * as secretsmanager from "aws-cdk-lib/aws-secretsmanager";
import { HttpApi, HttpMethod, CorsHttpMethod } from "aws-cdk-lib/aws-apigatewayv2";
import { HttpLambdaIntegration } from "aws-cdk-lib/aws-apigatewayv2-integrations";
import * as path from "path";
import { Construct } from "constructs";

export interface FormStackProps extends cdk.StackProps {
  /** Name of the Secrets Manager secret holding the Brevo API key (same region as this stack). */
  brevoSecretName: string;
  /** From address shown to recipients — must be at a Brevo-authenticated domain. */
  senderEmail: string;
  senderName: string;
  /** Where inquiry notifications are delivered. */
  toEmail: string;
  /** Origins allowed to POST to the endpoint (CORS). */
  allowedOrigins: string[];
}

export class FormStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: FormStackProps) {
    super(scope, id, props);

    const secret = secretsmanager.Secret.fromSecretNameV2(this, "BrevoKey", props.brevoSecretName);

    const fn = new lambda.Function(this, "InquiryFn", {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: "index.handler",
      code: lambda.Code.fromAsset(path.join(__dirname, "..", "lambda", "inquiry")),
      timeout: cdk.Duration.seconds(10),
      memorySize: 256,
      environment: {
        BREVO_SECRET_NAME: props.brevoSecretName,
        SENDER_EMAIL: props.senderEmail,
        SENDER_NAME: props.senderName,
        TO_EMAIL: props.toEmail,
      },
    });

    secret.grantRead(fn);

    const api = new HttpApi(this, "InquiryApi", {
      corsPreflight: {
        allowOrigins: props.allowedOrigins,
        allowMethods: [CorsHttpMethod.POST],
        allowHeaders: ["content-type"],
        maxAge: cdk.Duration.hours(1),
      },
    });

    api.addRoutes({
      path: "/inquiry",
      methods: [HttpMethod.POST],
      integration: new HttpLambdaIntegration("InquiryIntegration", fn),
    });

    new cdk.CfnOutput(this, "InquiryUrl", {
      value: `${api.apiEndpoint}/inquiry`,
      description: "POST endpoint for the site inquiry form",
    });
  }
}
