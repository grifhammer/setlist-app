import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from "@aws-cdk/core";
interface UserPoolConstructProps {
    appName: string;
    frontendBaseUrl: string;
}
export declare class UserPoolConstruct extends cdk.Construct {
    readonly userPool: cognito.UserPool;
    constructor(scope: cdk.Construct, id: string, props: UserPoolConstructProps);
}
export {};
