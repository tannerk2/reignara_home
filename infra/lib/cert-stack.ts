import * as cdk from "aws-cdk-lib";
import * as acm from "aws-cdk-lib/aws-certificatemanager";
import { Construct } from "constructs";

export interface CertStackProps extends cdk.StackProps {
  domainName: string;
}

export class CertStack extends cdk.Stack {
  public readonly certificate: acm.ICertificate;

  constructor(scope: Construct, id: string, props: CertStackProps) {
    super(scope, id, props);

    const cert = new acm.Certificate(this, "SiteCertificate", {
      domainName: props.domainName,
      validation: acm.CertificateValidation.fromDns(),
    });

    this.certificate = cert;

    new cdk.CfnOutput(this, "CertificateArn", {
      value: cert.certificateArn,
    });
  }
}
