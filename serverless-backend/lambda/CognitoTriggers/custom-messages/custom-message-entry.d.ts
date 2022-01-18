import { Callback, Context } from 'aws-lambda';
declare type Event = {
    triggerSource: string;
    request: {
        codeParameter: string;
        userAttributes: {
            'cognito:user_status': string;
            given_name: string;
            family_name: string;
            email: string;
        };
        usernameParameter: string;
    };
    response: {
        emailSubject: string;
        emailMessage: string;
    };
};
export declare function main(event: Event, _context: Context, callback: Callback): void;
export {};
