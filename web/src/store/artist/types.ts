export default interface Artist {
  id: BigInteger;
  name: string;
  disambiguation?: string;
  spotify_id?: string;
  mbid: string;
}

export enum ArtistActionTypes {
  FETCH_REQUEST = "@@artist/FETCH_REQUEST",
  FETCH_SUCCESS = "@@artist/FETCH_SUCCESS",
  FETCH_ERROR = "@@artist/FETCH_ERROR",
}

export interface ArtistState {
  readonly loading: boolean;
  readonly data: Artist[];
}
