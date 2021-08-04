import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { SetlistSearch } from "../../types/setlist-fm";
import { Setlist } from "../../types/setlist-fm";
import fetch, { Headers } from "node-fetch";
interface SearchSetlistEnv extends NodeJS.ProcessEnv {
  SETLIST_FM_KEY?: string;
}
interface SearchSetlistRequestBody
  extends APIGatewayProxyEventQueryStringParameters {
  artistMbid?: string;
}
const { SETLIST_FM_KEY } = process.env as SearchSetlistEnv;

export const searchSetlistHandler: APIGatewayProxyHandlerV2<[Setlist]> = async (
  event,
  context
) => {
  console.info(event);
  const { queryStringParameters } = event;
  const { artistMbid }: SearchSetlistRequestBody = queryStringParameters!;
  let setlists: Setlist[] = [];
  if (!SETLIST_FM_KEY) {
    throw new Error("Missing Setlist FM API Key");
  }

  const headers = new Headers({
    "x-api-key": SETLIST_FM_KEY,
    Accept: "application/json",
  });

  const searchResult = await fetch(
    `https://api.setlist.fm/rest/1.0/artist/${artistMbid}/setlists`,
    {
      method: "GET",
      headers,
    }
  );
  let thing: SetlistSearch = await searchResult.json();

  console.info(thing);
  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify(thing.setlist),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return response;
};
