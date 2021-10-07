import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
interface BuildPlaylistEnv extends NodeJS.ProcessEnv {}

interface BuildPlaylistRequestBody
  extends APIGatewayProxyEventQueryStringParameters {
  body?: string;
  setlistId?: string;
  token?: string;
}
export const BuildPlaylistHandler: APIGatewayProxyHandlerV2<{}> = async (
  event,
  context,
  callback
) => {
  console.info(event);
  const { queryStringParameters } = event;
  const { setlistId, token, userId }: BuildPlaylistRequestBody =
    queryStringParameters!;
  // get songs out of this setlist
  // search for these songs
  // return these songs
  return {
    statusCode: 200,
  };
};
