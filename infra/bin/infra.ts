#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CertStack } from "../lib/cert-stack";
import { SiteStack } from "../lib/site-stack";
import { FormStack } from "../lib/form-stack";
import { WebinarStack } from "../lib/webinar-stack";

const app = new cdk.App();

const account = "629430435133";
const siteRegion = "us-west-2";
const certRegion = "us-east-1";
const domainName = "reignara.com";

const certStack = new CertStack(app, "ReignaraLandingCertStack", {
  env: { account, region: certRegion },
  domainName,
  crossRegionReferences: true,
});

// Webinar backend (DynamoDB + Lambdas + HTTP API). Created before the site so
// its API domain can be wired into CloudFront behaviors.
const webinarStack = new WebinarStack(app, "ReignaraWebinarStack", {
  env: { account, region: siteRegion },
  brevoSecretName: "reignara/brevo-api-key",
  joinUrlSecretName: "reignara/webinar/2026-08-05/join-url",
  senderEmail: "no-reply@reignara.com",
  senderName: "Reignara",
});

new SiteStack(app, "ReignaraLandingSiteStack", {
  env: { account, region: siteRegion },
  domainName,
  certificate: certStack.certificate,
  apiDomainName: webinarStack.apiDomainName,
  crossRegionReferences: true,
});

new FormStack(app, "ReignaraLandingFormStack", {
  env: { account, region: siteRegion },
  brevoSecretName: "reignara/brevo-api-key",
  senderEmail: "no-reply@reignara.com",
  senderName: "Reignara",
  toEmail: "benson@reignara.com,keylee@reignara.com",
  allowedOrigins: ["https://reignara.com", "https://www.reignara.com"],
});
