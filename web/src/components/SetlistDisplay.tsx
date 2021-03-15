import * as React from "react";
import ISetlist from "src/models/Setlist";
import ISong from "src/models/Song";

interface ISetlistDisplayProps {
  setlist: ISetlist;
}
class SetlistDisplay extends React.Component<ISetlistDisplayProps> {
  public render() {
    // const songs = this.props.songs.map((song) => {
    //   return <p key={song.name}>{song.name}</p>;
    // });
    // return songs;
    return <p>{this.props.setlist.eventDate}</p>;
  }
}

export default SetlistDisplay;
