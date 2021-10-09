import {
	attribute,
	hashKey,
	rangeKey,
	table,
} from "@aws/dynamodb-data-mapper-annotations";

@table("theOneTable")
export class User {
	@hashKey()
	pk: string;

	@rangeKey()
	sk: string;

	@attribute()
	email: string;

	@attribute()
	country: string;
	@attribute()
	access_token: string;
	@attribute()
	display_name: string;
	@attribute()
	expires_in: string;
	@attribute()
	explicit_content: string;
	@attribute()
	external_urls: { spotify: string };
	@attribute()
	followers: { href: string; total: number };
	@attribute()
	href: string;
	@attribute()
	id: string;
	@attribute()
	images: { height: number; width: number; url: string };
	@attribute()
	product: string;
	@attribute()
	refresh_token: string;
	@attribute()
	scope: string;
	@attribute()
	token_type: string;
	@attribute()
	type: "user";
	@attribute()
	updatedAt: string;
	@attribute()
	uri: string;
}
