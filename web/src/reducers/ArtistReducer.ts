import { Reducer, Dispatch } from "redux";

import { baseUrl } from "../settings";
import { Artist } from "types";
import ISetlist from "src/models/Setlist";
const SET_ARTISTS = "search/artist/SET_ARTIST";
const SET_SETLISTS = "search/setlist/SET_SETLISTS";
const LOADING_ARTISTS = "search/artist/LOADING";
const LOADING_SETLISTS = "search/setlist/LOADING";
export interface ArtistState {
  loading: boolean;
  artists: Artist[];
  setlists: { [key: string]: ISetlist[] };
  errorMsg: string;
  count: number;
}
const DefaultState: ArtistState = {
  loading: false,
  artists: [],
  setlists: {},
  errorMsg: "",
  count: 0,
};
const emptyList: Artist[] = [];
export function searchArtist(artistName: string) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING_ARTISTS });
    const result = await fetch(
      `${baseUrl}/searchArtist?artist=${encodeURI(artistName)}`,
      {
        mode: "cors",
        headers: {
          Accept: "applicaton/json",
        },
      }
    );
    let artists = emptyList;
    if (result.ok) {
      artists = await result.json();
    }
    dispatch({ type: SET_ARTISTS, artists });
    return artists;
  };
}

export function searchSetlists(mbid: string) {
  return async (dispatch: Dispatch) => {
    dispatch({ type: LOADING_SETLISTS, mbid });
    const result = await fetch(`${baseUrl}/setlists?artistMbid=${mbid}`, {
      mode: "cors",
      headers: {
        Accept: "application/json",
      },
    });

    let setlists: any[] = [];
    if (result.ok) {
      setlists = await result.json();
    }
    dispatch({ type: SET_SETLISTS, setlists, mbid });
    return setlists;
  };
}

export const ArtistReducer: Reducer<
  any,
  { type: string; artists: []; setlists: { [key: string]: [] }; mbid: string }
> = (state = DefaultState, { type, artists, setlists, mbid }) => {
  switch (type) {
    case LOADING_ARTISTS: {
      return { ...state, loading: true, artists: [] };
    }
    case SET_ARTISTS: {
      setlists = artists.reduce((prev, { mbid }) => {
        return { ...prev, [mbid]: [] };
      }, {});
      return { ...state, loading: false, artists, setlists };
    }
    case LOADING_SETLISTS: {
      setlists = { ...state.setlists, [mbid]: [] };
      return { ...state, loading: true, setlists };
    }
    case SET_SETLISTS: {
      return {
        ...state,
        loading: false,
        setlists: { ...state.setlists, [mbid]: setlists },
      };
    }
    default:
      return { ...state };
  }
};
