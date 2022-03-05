import * as cognito from "aws-cdk-lib/lib/aws-cognito";
import * as cdk from "aws-cdk-lib/lib/core";
declare type IdentityPoolConstructProps = {
    appName: string;
    userPool: cognito.UserPool;
    userPoolClient: cognito.UserPoolClient;
};
export declare class IdentityPoolConstruct extends cdk.Construct {
    readonly identityPool: cognito.CfnIdentityPool;
    constructor(scope: cdk.Construct, id: string, props: IdentityPoolConstructProps);
}
export {};