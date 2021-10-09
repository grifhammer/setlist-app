import {
	APIGatewayProxyHandlerV2,
	APIGatewayProxyResultV2,
	APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import { SetlistSearch, Song } from "../../types/setlist-fm";
import { Setlist } from "../../types/setlist-fm";
import fetch, { Headers } from "node-fetch";
import { User } from "../../models/User";
import { DynamoDB } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";
interface SearchSetlistEnv extends NodeJS.ProcessEnv {
	SETLIST_FM_KEY: string;
	TABLE_NAME: string;
}
interface SearchSetlistRequestBody
	extends APIGatewayProxyEventQueryStringParameters {
	artistMbid?: string;
}
const { SETLIST_FM_KEY, TABLE_NAME } = process.env as SearchSetlistEnv;

const dynamo = new DynamoDB();
const client = new DataMapper({ client: dynamo });
export const searchSetlistHandler: APIGatewayProxyHandlerV2<[Setlist]> = async (
	event,
	context
) => {
	console.info(event);
	const { queryStringParameters } = event;
	const { artistMbid }: SearchSetlistRequestBody = queryStringParameters!;
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
	let { setlist: setlists }: SetlistSearch = await searchResult.json();

	console.info(setlists);
	const fixedSetlists = setlists.map((setlist) => {
		const fullSet = setlist.sets.set.reduce<Song[]>((prev, { song }) => {
			return [...prev, ...song];
		}, []);
		return { ...setlist, set: fullSet };
	});
	//persist this data and try to get it at the beginning of this lambda
	//get user from db
	const userEmail = "grifhammer@gmail.com";
	const user = await getUser(userEmail);
	//get spotify data
	console.info(fixedSetlists);
	const response: APIGatewayProxyResultV2 = {
		statusCode: 200,
		body: JSON.stringify(fixedSetlists),
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	};
	return response;
};

async function getUser(
	email: string
): Promise<SpotifyApi.UserObjectPrivate & SpotifyApi.UserObjectPublic> {
	const user = await client.get(
		Object.assign(new User(), { pk: `u:${email}`, sk: `u:${email}` })
	);
	console.log(user);
	return {
		birthdate: "",
		email: " ",
		country: "",
		product: "",
		external_urls: {
			spotify: "",
		},
		href: "",
		id: "",
		type: "user",
		uri: "",
	};
}
