#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { CertStack } from "../lib/cert-stack";
import { SiteStack } from "../lib/site-stack";

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

new SiteStack(app, "ReignaraLandingSiteStack", {
  env: { account, region: siteRegion },
  domainName,
  certificate: certStack.certificate,
  crossRegionReferences: true,
});
