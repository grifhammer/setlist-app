import { APIGatewayProxyHandlerV2 } from "aws-lambda";

interface LoginEnv extends NodeJS.ProcessEnv {
  TABLE_NAME: string;
  SPOTIFY_KEY: string;
}

const { TABLE_NAME, SPOTIFY_KEY } = process.env as NodeJS.ProcessEnv;
export const LoginHandler: APIGatewayProxyHandlerV2<{}> = async (
  event,
  context,
  callback
) => {
  console.log(event);
  return {
    statusCode: 200,
  };
};
