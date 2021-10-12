import { Artist } from "./Artist";

export interface Song {
	name: string;
	with: Artist;
	cover: Artist;
	info: string;
	tape: boolean;
}
