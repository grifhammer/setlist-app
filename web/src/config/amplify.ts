import Amplify, { Auth } from "aws-amplify";
Amplify.configure({
	Auth: {
		identityPoolId: "005f21be-4843-49bd-be6b-590c9cc5e996",
		region: "us-west-2",
		userPoolId: "us-west-2_JqH4Sfzkq",
		userPoolWebClientId: "5upi85dmjauevf4d63hj8he5ci",
		mandatorySignIn: false,
	},
});

export default Auth.configure();
