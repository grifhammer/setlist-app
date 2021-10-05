import { ScopedAws } from "@aws-cdk/core";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { stringify } from "querystring";
interface LoginEnv extends NodeJS.ProcessEnv {
  SPOTIFY_CLIENT_ID: string;
  REDIRECT_URI: string;
}

const requiredScopes: string[] = [
  "user-read-private",
  "user-read-email",
  "playlist-modify-public",
  "playlist-modify-private",
  "playlist-read-private",
  "playlist-read-collaborative",
];

const { REDIRECT_URI, SPOTIFY_CLIENT_ID } = process.env as LoginEnv;
export const LoginHandler: APIGatewayProxyHandlerV2<{}> = async (event) => {
  console.log(event);
  const queryString = stringify({
    client_id: SPOTIFY_CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: requiredScopes.join(" "),
    state: "",
  });
  return {
    statusCode: 302,
    headers: {
      location: `https://accounts.spotify.com/authorize?${queryString}`,
    },
  };
};
