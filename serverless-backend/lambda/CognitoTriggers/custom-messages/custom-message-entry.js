"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
const custom_message_1 = require("./custom-message");
if (!process.env.FRONTEND_BASE_URL) {
    throw new Error('Environment variable FRONTEND_BASE_URL is required.');
}
function main(event, _context, callback) {
    const { triggerSource, request: { codeParameter, userAttributes, usernameParameter }, } = event;
    const customMessage = new custom_message_1.default({
        userAttributes,
        codeParameter,
        usernameParameter,
    });
    /* eslint-disable no-param-reassign */
    if (triggerSource === 'CustomMessage_SignUp' &&
        userAttributes['cognito:user_status'] === 'UNCONFIRMED') {
        event.response = customMessage.sendCodePostSignUp();
    }
    else if (triggerSource === 'CustomMessage_ForgotPassword') {
        event.response = customMessage.sendCodeForgotPassword();
    }
    else if (triggerSource === 'CustomMessage_UpdateUserAttribute') {
        event.response = customMessage.sendCodeVerifyNewEmail();
    }
    else if (triggerSource === 'CustomMessage_AdminCreateUser') {
        event.response = customMessage.sendTemporaryPassword();
    }
    else if (triggerSource === 'CustomMessage_ResendCode') {
        event.response = customMessage.resendConfirmationCode();
    }
    // Return to Amazon Cognito
    callback(null, event);
}
exports.main = main;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLW1lc3NhZ2UtZW50cnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjdXN0b20tbWVzc2FnZS1lbnRyeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxREFBNkM7QUFFN0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLEVBQUU7SUFDbEMsTUFBTSxJQUFJLEtBQUssQ0FBQyxxREFBcUQsQ0FBQyxDQUFDO0NBQ3hFO0FBc0JELFNBQWdCLElBQUksQ0FDbEIsS0FBWSxFQUNaLFFBQWlCLEVBQ2pCLFFBQWtCO0lBRWxCLE1BQU0sRUFDSixhQUFhLEVBQ2IsT0FBTyxFQUFFLEVBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBQyxHQUM1RCxHQUFHLEtBQUssQ0FBQztJQUVWLE1BQU0sYUFBYSxHQUFHLElBQUksd0JBQWEsQ0FBQztRQUN0QyxjQUFjO1FBQ2QsYUFBYTtRQUNiLGlCQUFpQjtLQUNsQixDQUFDLENBQUM7SUFFSCxzQ0FBc0M7SUFDdEMsSUFDRSxhQUFhLEtBQUssc0JBQXNCO1FBQ3hDLGNBQWMsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLGFBQWEsRUFDdkQ7UUFDQSxLQUFLLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0tBQ3JEO1NBQU0sSUFBSSxhQUFhLEtBQUssOEJBQThCLEVBQUU7UUFDM0QsS0FBSyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztLQUN6RDtTQUFNLElBQUksYUFBYSxLQUFLLG1DQUFtQyxFQUFFO1FBQ2hFLEtBQUssQ0FBQyxRQUFRLEdBQUcsYUFBYSxDQUFDLHNCQUFzQixFQUFFLENBQUM7S0FDekQ7U0FBTSxJQUFJLGFBQWEsS0FBSywrQkFBK0IsRUFBRTtRQUM1RCxLQUFLLENBQUMsUUFBUSxHQUFHLGFBQWEsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0tBQ3hEO1NBQU0sSUFBSSxhQUFhLEtBQUssMEJBQTBCLEVBQUU7UUFDdkQsS0FBSyxDQUFDLFFBQVEsR0FBRyxhQUFhLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztLQUN6RDtJQUVELDJCQUEyQjtJQUMzQixRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFsQ0Qsb0JBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDYWxsYmFjaywgQ29udGV4dH0gZnJvbSAnYXdzLWxhbWJkYSc7XG5pbXBvcnQgQ3VzdG9tTWVzc2FnZSBmcm9tICcuL2N1c3RvbS1tZXNzYWdlJztcblxuaWYgKCFwcm9jZXNzLmVudi5GUk9OVEVORF9CQVNFX1VSTCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0Vudmlyb25tZW50IHZhcmlhYmxlIEZST05URU5EX0JBU0VfVVJMIGlzIHJlcXVpcmVkLicpO1xufVxuXG50eXBlIEV2ZW50ID0ge1xuICB0cmlnZ2VyU291cmNlOiBzdHJpbmc7XG4gIHJlcXVlc3Q6IHtcbiAgICBjb2RlUGFyYW1ldGVyOiBzdHJpbmc7XG4gICAgdXNlckF0dHJpYnV0ZXM6IHtcbiAgICAgICdjb2duaXRvOnVzZXJfc3RhdHVzJzogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgZ2l2ZW5fbmFtZTogc3RyaW5nO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNhbWVsY2FzZVxuICAgICAgZmFtaWx5X25hbWU6IHN0cmluZztcbiAgICAgIGVtYWlsOiBzdHJpbmc7XG4gICAgfTtcbiAgICB1c2VybmFtZVBhcmFtZXRlcjogc3RyaW5nO1xuICB9O1xuICByZXNwb25zZToge1xuICAgIGVtYWlsU3ViamVjdDogc3RyaW5nO1xuICAgIGVtYWlsTWVzc2FnZTogc3RyaW5nO1xuICB9O1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG1haW4oXG4gIGV2ZW50OiBFdmVudCxcbiAgX2NvbnRleHQ6IENvbnRleHQsXG4gIGNhbGxiYWNrOiBDYWxsYmFjayxcbik6IHZvaWQge1xuICBjb25zdCB7XG4gICAgdHJpZ2dlclNvdXJjZSxcbiAgICByZXF1ZXN0OiB7Y29kZVBhcmFtZXRlciwgdXNlckF0dHJpYnV0ZXMsIHVzZXJuYW1lUGFyYW1ldGVyfSxcbiAgfSA9IGV2ZW50O1xuXG4gIGNvbnN0IGN1c3RvbU1lc3NhZ2UgPSBuZXcgQ3VzdG9tTWVzc2FnZSh7XG4gICAgdXNlckF0dHJpYnV0ZXMsXG4gICAgY29kZVBhcmFtZXRlcixcbiAgICB1c2VybmFtZVBhcmFtZXRlcixcbiAgfSk7XG5cbiAgLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbiAgaWYgKFxuICAgIHRyaWdnZXJTb3VyY2UgPT09ICdDdXN0b21NZXNzYWdlX1NpZ25VcCcgJiZcbiAgICB1c2VyQXR0cmlidXRlc1snY29nbml0bzp1c2VyX3N0YXR1cyddID09PSAnVU5DT05GSVJNRUQnXG4gICkge1xuICAgIGV2ZW50LnJlc3BvbnNlID0gY3VzdG9tTWVzc2FnZS5zZW5kQ29kZVBvc3RTaWduVXAoKTtcbiAgfSBlbHNlIGlmICh0cmlnZ2VyU291cmNlID09PSAnQ3VzdG9tTWVzc2FnZV9Gb3Jnb3RQYXNzd29yZCcpIHtcbiAgICBldmVudC5yZXNwb25zZSA9IGN1c3RvbU1lc3NhZ2Uuc2VuZENvZGVGb3Jnb3RQYXNzd29yZCgpO1xuICB9IGVsc2UgaWYgKHRyaWdnZXJTb3VyY2UgPT09ICdDdXN0b21NZXNzYWdlX1VwZGF0ZVVzZXJBdHRyaWJ1dGUnKSB7XG4gICAgZXZlbnQucmVzcG9uc2UgPSBjdXN0b21NZXNzYWdlLnNlbmRDb2RlVmVyaWZ5TmV3RW1haWwoKTtcbiAgfSBlbHNlIGlmICh0cmlnZ2VyU291cmNlID09PSAnQ3VzdG9tTWVzc2FnZV9BZG1pbkNyZWF0ZVVzZXInKSB7XG4gICAgZXZlbnQucmVzcG9uc2UgPSBjdXN0b21NZXNzYWdlLnNlbmRUZW1wb3JhcnlQYXNzd29yZCgpO1xuICB9IGVsc2UgaWYgKHRyaWdnZXJTb3VyY2UgPT09ICdDdXN0b21NZXNzYWdlX1Jlc2VuZENvZGUnKSB7XG4gICAgZXZlbnQucmVzcG9uc2UgPSBjdXN0b21NZXNzYWdlLnJlc2VuZENvbmZpcm1hdGlvbkNvZGUoKTtcbiAgfVxuXG4gIC8vIFJldHVybiB0byBBbWF6b24gQ29nbml0b1xuICBjYWxsYmFjayhudWxsLCBldmVudCk7XG59XG4iXX0=