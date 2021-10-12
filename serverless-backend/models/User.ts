import { embed } from "@aws/dynamodb-data-mapper";
import {
	attribute,
	hashKey,
	rangeKey,
	table,
} from "@aws/dynamodb-data-mapper-annotations";
import { stringify } from "querystring";
class Image {
	@attribute()
	height: number;

	@attribute()
	width: number;
}

class Follower {
	@attribute()
	href: string;

	@attribute()
	total: number;

	@attribute()
	url: string;
}

class Urls {
	@attribute()
	spotify: string;
}
@table("theOneTable")
export class User {
	@hashKey()
	pk: string;

	@rangeKey()
	sk: string;

	@attribute()
	email: string;

	// @attribute()
	// country: string;
	// @attribute()
	// access_token: string;
	// @attribute()
	// display_name: string;
	// @attribute()
	// expires_in: string;
	// @attribute()
	// explicit_content: string;
	// @attribute({ memberType: embed(Urls) })
	// external_urls: Urls;
	// @attribute({ memberType: embed(Follower) })
	// followers: Follower;
	// @attribute()
	// href: string;
	// @attribute()
	// id: string;
	// @attribute({ memberType: embed(Image) })
	// images: Image;
	// @attribute()
	// product: string;
	// @attribute()
	// refresh_token: string;
	// @attribute()
	// scope: string;
	// @attribute()
	// token_type: string;
	// @attribute()
	// updatedAt: string;
	// @attribute()
	// uri: string;
}
