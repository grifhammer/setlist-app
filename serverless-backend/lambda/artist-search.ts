import {
  APIGatewayProxyHandlerV2,
  APIGatewayProxyResultV2,
  APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { Artist } from "../types/setlist-fm/Artist";
import fetch, { Headers } from "node-fetch";
import { ArtistSearch } from "../types/setlist-fm";
interface SearchArtistEnv extends NodeJS.ProcessEnv {
  SETLIST_FM_KEY?: string;
}
process.env;

interface SearchArtistRequestBody
  extends APIGatewayProxyEventQueryStringParameters {
  body?: string;
  artist?: string;
}

const { SETLIST_FM_KEY } = process.env as SearchArtistEnv;
export const searchArtistHandler: APIGatewayProxyHandlerV2<[Artist]> = async (
  event,
  context
) => {
  console.info(event);
  const { queryStringParameters } = event;
  const { artist }: SearchArtistRequestBody = queryStringParameters!;
  // make proxy request
  if (!SETLIST_FM_KEY) {
    throw new Error("Missing Setlist FM API Key");
  }
  const headers = new Headers({
    "x-api-key": SETLIST_FM_KEY,
    Accept: "application/json",
  });
  const searchResult = await fetch(
    `https://api.setlist.fm/rest/1.0/search/artists?artistName=${artist!}`,
    {
      method: "GET",
      headers,
    }
  );
  const artists: ArtistSearch = await searchResult.json();
  console.log(artists);
  const response: APIGatewayProxyResultV2 = {
    statusCode: 200,
    body: JSON.stringify(artists.artist),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
  return response;
};
