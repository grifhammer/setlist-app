import * as React from "react";
import { Cookies } from "react-cookie";
import SpotifyLogin from "react-spotify-login";
import moment from "moment";
import { clientId, redirectUri } from "./settings";
import { AmplifySignIn } from "@aws-amplify/ui-react";

class Login extends React.Component<
	{},
	{
		password: string;
		userName: string;
	}
> {
	constructor(props: object) {
		super(props);

		this.state = {
			password: "",
			userName: "",
		};
	}

	public render() {
		return (
			<div>
				<AmplifySignIn />
				<SpotifyLogin
					clientId={clientId}
					redirectUri={redirectUri}
					onFailure={this.onFailure}
					onSuccess={this.onSuccess}
				/>
			</div>
		);
	}

	private onSuccess({
		access_token: accessToken,
		expires_in: expiresIn,
	}: {
		access_token: string;
		expires_in: number;
	}): void {
		const cookies = new Cookies();
		const now = new Date();
		const expiration = moment().add(expiresIn, "seconds");
		now.setSeconds(now.getSeconds() + expiresIn);
		cookies.set("spotifyToken", accessToken, {
			expires: expiration.toDate(),
		});
	}
	private onFailure(): void {
		// eslint-disable-next-line
		console.log("failure");
	}
}

export default Login;
