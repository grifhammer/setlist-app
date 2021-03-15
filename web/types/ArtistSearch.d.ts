import { Artist } from "./Artist";

export interface ArtistSearch {
  artist: [Artist];
  total: number;
  page: number;
  itemsPerPage: number;
}
