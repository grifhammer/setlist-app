import * as AWS from "aws-sdk";
export declare function adminAddUserToGroup({ userPoolId, username, groupName, }: {
    userPoolId: string;
    username: string;
    groupName: string;
}): Promise<{
    $response: AWS.Response<Record<string, string>, AWS.AWSError>;
}>;
