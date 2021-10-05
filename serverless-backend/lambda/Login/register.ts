import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import fetch from "node-fetch";
import { stringify } from "querystring";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
interface RegisterEnv extends NodeJS.ProcessEnv {
  TABLE_NAME: string;
  SPOTIFY_KEY: string;
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  REDIRECT_URI: string;
}

const { REDIRECT_URI, SPOTIFY_CLIENT_ID, TABLE_NAME, SPOTIFY_CLIENT_SECRET } =
  process.env as RegisterEnv;

interface SpotifyAuthToken {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

const dynamodb = new DocumentClient();

export const RegisterHandler: APIGatewayProxyHandlerV2<{}> = async ({
  body,
  queryStringParameters,
}) => {
  console.log(queryStringParameters);
  const { code, error, state } = queryStringParameters!;
  if (error) {
    console.error(error);
    return { statusCode: 500 };
  }
  const queryString = stringify({
    grant_type: "authorization_code",
    code,
    redirect_uri: REDIRECT_URI,
  });
  const response = await fetch(`https://accounts.spotify.com/api/token`, {
    headers: {
      Authorization: `Basic ${Buffer.from(
        `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
      "content-type": "application/x-www-form-urlencoded",
    },
    body: queryString,
    method: "POST",
  });
  console.log(response);
  const data: SpotifyAuthToken = await response.json();
  console.log(data);
  const now = new Date();
  const spotifyUserResponse = await fetch(`https://api.spotify.com/v1/me`, {
    headers: {
      Authorization: `Bearer ${data.access_token}`,
    },
  });
  const userData = await spotifyUserResponse.json();
  console.info("remember me", userData);
  const putUserResult = await dynamodb
    .put({
      TableName: TABLE_NAME,
      Item: {
        pk: `u:${userData.email}`,
        sk: `u:${userData.email}`,
        ...data,
        ...userData,
        updatedAt: now.toISOString(),
      },
    })
    .promise();
  console.info("ddb put complete", putUserResult);
  return {
    statusCode: 302,
    headers: {
      location: `http://localhost:3000/sign-in?${stringify({ ...userData })}`,
    },
  };
};
