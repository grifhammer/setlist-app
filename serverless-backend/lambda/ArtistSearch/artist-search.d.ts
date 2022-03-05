import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Artist } from "../../types/setlist-fm/Artist";
export declare const searchArtistHandler: APIGatewayProxyHandlerV2<[Artist]>;
