import * as cognito from "@aws-cdk/aws-cognito";
import * as cdk from "@aws-cdk/core";
declare type UserPoolClientConstructProps = {
    userPool: cognito.UserPool;
};
export declare class UserPoolClientConstruct extends cdk.Construct {
    readonly userPoolClient: cognito.UserPoolClient;
    constructor(scope: cdk.Construct, id: string, props: UserPoolClientConstructProps);
}
export {};
