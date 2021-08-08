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

export const ArtistReducer: Reducer = async (state = DefaultState, action) => {
  switch (action.type) {
    default:
      console.log(action.type);
      return { ...state };
  }
};
