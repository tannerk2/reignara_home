import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as fs from "fs";
import * as path from "path";
import { Construct } from "constructs";

export interface SiteStackProps extends cdk.StackProps {
  domainName: string;
  certificate: acm.ICertificate;
  /** API Gateway domain for the webinar dynamic routes (join/resend/submit). */
  apiDomainName?: string;
}

export class SiteStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: SiteStackProps) {
    super(scope, id, props);

    const bucket = new s3.Bucket(this, "SiteBucket", {
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      encryption: s3.BucketEncryption.S3_MANAGED,
      enforceSSL: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const rewriteFunction = new cloudfront.Function(this, "RewriteFunction", {
      code: cloudfront.FunctionCode.fromInline(`
function handler(event) {
  var request = event.request;
  var uri = request.uri;

  // Short-link redirects. These return a temporary (302) redirect so the
  // targets can be repointed later without clients caching them permanently.
  // QR code at reignara.com/card currently routes to the main site.
  if (uri === '/card' || uri === '/card/') {
    return {
      statusCode: 302,
      statusDescription: 'Found',
      headers: {
        'location': { value: 'https://reignara.com/' },
        'cache-control': { value: 'no-cache, no-store, must-revalidate' }
      }
    };
  }

  if (uri.endsWith('/')) {
    request.uri = uri + 'index.html';
  } else if (!uri.includes('.')) {
    request.uri = uri + '/index.html';
  }
  return request;
}
      `),
      runtime: cloudfront.FunctionRuntime.JS_2_0,
    });

    // Dynamic webinar routes proxy to the API Gateway origin. These behaviors
    // deliberately omit the URL-rewrite function so paths pass through as-is,
    // and disable caching (302 redirects / POSTs must not be cached).
    const apiBehaviors: Record<string, cloudfront.BehaviorOptions> = {};
    if (props.apiDomainName) {
      const apiOrigin = new origins.HttpOrigin(props.apiDomainName, {
        protocolPolicy: cloudfront.OriginProtocolPolicy.HTTPS_ONLY,
      });
      const dynamicBehavior: cloudfront.BehaviorOptions = {
        origin: apiOrigin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_ALL,
        cachePolicy: cloudfront.CachePolicy.CACHING_DISABLED,
        originRequestPolicy: cloudfront.OriginRequestPolicy.ALL_VIEWER_EXCEPT_HOST_HEADER,
      };
      apiBehaviors["/api/webinar/*"] = dynamicBehavior;
      apiBehaviors["/webinar/join"] = dynamicBehavior;
      apiBehaviors["/webinar/resend"] = dynamicBehavior;
    }

    const distribution = new cloudfront.Distribution(this, "Distribution", {
      defaultRootObject: "index.html",
      domainNames: [props.domainName],
      certificate: props.certificate,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      priceClass: cloudfront.PriceClass.PRICE_CLASS_100,
      defaultBehavior: {
        origin: origins.S3BucketOrigin.withOriginAccessControl(bucket),
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: cloudfront.CachePolicy.CACHING_OPTIMIZED,
        functionAssociations: [
          {
            function: rewriteFunction,
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
          },
        ],
      },
      additionalBehaviors: apiBehaviors,
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(5),
        },
      ],
    });

    // Ensure out/ exists for synth
    const outDir = path.join(__dirname, "..", "..", "out");
    if (!fs.existsSync(outDir)) {
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, ".placeholder"), "Run pnpm build first\n");
    }

    new s3deploy.BucketDeployment(this, "DeploySite", {
      sources: [s3deploy.Source.asset(outDir)],
      destinationBucket: bucket,
      distribution,
      distributionPaths: ["/*"],
      prune: true,
    });

    new cdk.CfnOutput(this, "BucketName", { value: bucket.bucketName });
    new cdk.CfnOutput(this, "DistributionId", { value: distribution.distributionId });
    new cdk.CfnOutput(this, "DistributionDomainName", {
      value: distribution.distributionDomainName,
      description: "Point Namecheap ALIAS record at this hostname",
    });
  }
}
