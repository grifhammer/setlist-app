import * as React from "react";
import ISetlist from "src/models/Setlist";
import ISong from "src/models/Song";

interface ISetlistDisplayProps {
  details: ISetlist;
  songs: ISong[];
}
class SetlistDisplay extends React.Component<ISetlistDisplayProps> {
  constructor(props: ISetlistDisplayProps) {
    super(props);
  }

  public render() {
    const songs = this.props.songs.map((song) => {
      return <p key={song.name}>{song.name}</p>;
    });
    return songs;
  }
}

export default SetlistDisplay;
