import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Setlist } from "../types/setlist-fm";
export declare const searchSetlistHandler: APIGatewayProxyHandlerV2<[Setlist]>;
