import React, { FunctionComponent, useReducer } from "react";
import ISetlist from "src/models/Setlist";
import { useParams } from "react-router-dom";

interface ISetlistDisplayProps {
  setlist: ISetlist;
}

const SetlistReducer = () => {
  return {
    setlist: {
      name: "string",
      spotify_id: "string",
      mbid: "string",
    },
  };
};
const SetlistDisplay: FunctionComponent<ISetlistDisplayProps> = () => {
  const setlist = useParams();
  const [state, dispatch] = useReducer(SetlistReducer, {
    setlist: {
      name: "",
      spotify_id: "",
      mbid: "",
    },
  });
  // const songs = this.props.songs.map((song) => {
  //   return <p key={song.name}>{song.name}</p>;
  // });
  // return songs;
  return <p>{state.setlist.eventDate}</p>;
};

export default SetlistDisplay;
