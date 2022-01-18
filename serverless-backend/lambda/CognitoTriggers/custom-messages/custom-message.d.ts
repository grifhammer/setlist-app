declare type CustomMessageProps = {
    codeParameter: string;
    userAttributes: {
        given_name: string;
        family_name: string;
        email: string;
    };
    usernameParameter: string;
};
interface CustomMessage extends CustomMessageProps {
}
declare type CustomMessageReturnValue = {
    emailSubject: string;
    emailMessage: string;
};
declare class CustomMessage {
    FRONTEND_BASE_URL: string | undefined;
    FRONTEND_LINKS: {
        SEND_CODE_POST_SIGN_UP: string;
        SEND_CODE_FORGOT_PASSWORD: string;
        SEND_CODE_VERIFY_NEW_EMAIL: string;
        SEND_TEMPORARY_PASSWORD: string;
        RESEND_CONFIRMATION_CODE: string;
    };
    constructor(kwargs: CustomMessageProps);
    sendCodePostSignUp(): CustomMessageReturnValue;
    sendCodeForgotPassword(): CustomMessageReturnValue;
    sendCodeVerifyNewEmail(): CustomMessageReturnValue;
    sendTemporaryPassword(): CustomMessageReturnValue;
    resendConfirmationCode(): CustomMessageReturnValue;
}
export default CustomMessage;
