#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "@aws-cdk/core";
import { ServerlessBackendStack } from "../lib/serverless-backend-stack";

const app = new cdk.App();
new ServerlessBackendStack(app, "ServerlessBackendStack", {
  env: { region: "us-west-2", account: "293729433005" },
});
