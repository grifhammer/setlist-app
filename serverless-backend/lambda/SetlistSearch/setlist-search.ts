import {
	APIGatewayProxyHandlerV2,
	APIGatewayProxyResultV2,
	APIGatewayProxyEventQueryStringParameters,
} from "aws-lambda";
import {
	Artist,
	SetlistSearch,
	Song,
	Tour,
	Venue,
} from "../../types/setlist-fm";
import { Setlist } from "../../types/setlist-fm";
import fetch, { Headers } from "node-fetch";
import { DynamoDB } from "aws-sdk";
import { DataMapper } from "@aws/dynamodb-data-mapper";
import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { stringify } from "querystring";
import { access } from "node:fs";

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
const docClient = new DocumentClient();
const client = new DataMapper({ client: dynamo });
export const searchSetlistHandler: APIGatewayProxyHandlerV2<[Setlist]> = async (
	event,
	context
) => {
	console.info("eventData: ", event);
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

	console.info("Setlist data: ", setlists);
	let artistName: string;
	const fixedSetlists = setlists.map((setlist) => {
		artistName = setlist.artist.name;
		const fullSet = setlist.sets.set.reduce<Song[]>((prev, { song }) => {
			return [...prev, ...song];
		}, []);
		return { ...setlist, set: fullSet };
	});
	//persist this data and try to get it at the beginning of this lambda
	//get user from db
	const userEmail = "grifhammer@gmail.com";
	console.log(`getting user for email: ${userEmail}`);
	const { access_token, expiration } = await getUser(userEmail);
	if (new Date() > new Date(expiration)) {
		return {
			statusCode: 403,
			data: "expired token",
		};
	}
	// reduce all songs to prevent double requests
	const dedupedSongs = reduceSongs(fixedSetlists);
	//get spotify data
	const spotifySongData = getAllSpotifySongData(
		access_token,
		artistName!,
		dedupedSongs
	);
	const promises = Object.entries(spotifySongData);
	console.info("Promises", promises);
	await Promise.all(promises);
	const resolvedData: { [key: string]: any } = {};
	const data = Object.entries(spotifySongData).map(
		async ([artistName, promise]) => {
			console.info(artistName, await promise);
			resolvedData[artistName] = await promise;
		}
	);
	await Promise.all(data);
	console.info(resolvedData);
	const returnBody = fixedSetlists.map(({ set, ...setlist }) => {
		console.log(set);
		return {
			...setlist,
			set: set.map(({ name }) => {
				const thisSong = resolvedData[name].tracks.items[0];
				if (!thisSong) {
					console.log(resolvedData[name]);
					return { name };
				}
				console.log(thisSong);
				return {
					spotifyUri: thisSong.uri,
					spotifyId: thisSong.id,
					spotifyImages: thisSong.images,
					spotifyHref: thisSong.href,
					name,
				};
			}),
		};
	});
	const response: APIGatewayProxyResultV2 = {
		statusCode: 200,
		body: JSON.stringify(returnBody),
		headers: {
			"Access-Control-Allow-Origin": "*",
		},
	};
	return response;
};
function getAllSpotifySongData(
	accessToken: string,
	artistName: string,
	songList: { [key: string]: Song }
): { [key: string]: Promise<any> } {
	const spotifySongData: { [key: string]: Promise<any> } = {};
	for (const songName in songList) {
		spotifySongData[songName] = getSpotifySong(
			accessToken,
			songName,
			artistName!
		);
	}
	return spotifySongData;
}

async function getSpotifySong(
	accessToken: string,
	songName: string,
	artistName: string
) {
	const queryString = stringify({
		q: `track:${songName} artist:${artistName}`,
		type: "track",
		market: "from_token",
		limit: 1,
	});
	const spotifyResult = await fetch(
		`https://api.spotify.com/v1/search?${queryString}`,
		{
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		}
	);
	return spotifyResult.json();
}

async function getUser(
	email: string
): Promise<
	SpotifyApi.UserObjectPrivate &
		SpotifyApi.UserObjectPublic & { access_token: string; expiration: Date }
> {
	const { Item: user } = await docClient
		.get({
			TableName: "theOneTable",
			Key: {
				pk: `u:${email}`,
				sk: `u:${email}`,
			},
		})
		.promise();
	// const user = await client.get(
	// 	Object.assign(new User(), { pk: `u:${email}`, sk: `u:${email}` })
	// );
	console.log(user);
	return {
		birthdate: "",
		email: "",
		country: "",
		product: "",
		external_urls: {
			spotify: "",
		},
		href: "",
		id: "",
		type: "user",
		uri: "",
		access_token: "",
		expiration: new Date(),
		...user,
	};
}

function reduceSongs(
	setlists: {
		set: Song[];
		artist: Artist;
		venue: Venue;
		tour: Tour;
		info: string;
		url: string;
		id: string;
		versionId: string;
		lastFmEventId: number;
		eventDate: string;
		lastUpdated: string;
	}[]
): { [key: string]: Song } {
	return setlists.reduce<{ [key: string]: Song }>((prev, curr) => {
		const reducedThing = curr.set.reduce<{ [key: string]: Song }>(
			(prev, current) => {
				return {
					...prev,
					[current.name]: current,
				};
			},
			{}
		);
		return { ...prev, ...reducedThing };
	}, {});
}
