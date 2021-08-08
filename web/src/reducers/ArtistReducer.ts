import { Reducer } from "redux";

import { baseUrl } from "../settings";
import { Artist } from "types";

const DefaultState = {
  loading: false,
  data: [],
  errorMsg: "",
  count: 0,
};
const emptyList: Artist[] = [];
export async function searchArtist(artistName: string) {
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
  return artists;
}

async function searchSetlists(mbid: string) {
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
  return setlists;
}

export const ArtistReducer: Reducer = async (
  { artistName, ...rest } = DefaultState,
  action
) => {
  switch (action.type) {
    default:
      const artists = await searchArtist(artistName);
      console.log(action.type);
      return { ...rest, artists };
  }
};
