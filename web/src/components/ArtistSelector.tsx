import * as React from "react";
import { withRouter } from "react-router-dom";

import Artist from "src/store/artist/types";
import ISetlist from "src/models/Setlist";

import SetlistDisplay from "./SetlistDisplay";

import "./ArtistSelector.css";
import { baseUrl } from "../settings";

const emptyList: Artist[] = [];

interface ArtistSelectorProps {
  artists: Artist[];
}

class ArtistSelector extends React.Component<
  ArtistSelectorProps,
  {
    artistName: string;
    artists: Artist[];
    selectedArtist?: string;
    setlists: ISetlist[];
  }
> {
  constructor(props: ArtistSelectorProps) {
    super(props);

    this.state = {
      setlists: [],
      artistName: "",
      artists: emptyList,
    };
  }

  public render() {
    if (this.props.artists.length <= 0) {
      return null;
    }
    const artists = this.props.artists.map((artist) => {
      return (
        <div
          className="artist-selector"
          onClick={this.searchSetlists.bind(this, artist.mbid)}
          key={artist.mbid}
        >
          {artist.name} {artist.disambiguation}
          {this.state.selectedArtist &&
            this.state.selectedArtist === artist.mbid &&
            this.state.setlists.map((result: ISetlist) => {
              return "fart";
              // return withRouter(
              //   <SetlistDisplay key={result.id} setlist={result} />
              // );
            }, this)}
        </div>
      );
    }, this);
    return <form>{artists}</form>;
  }

  private async searchSetlists(mbid: string) {
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
    this.setState({
      selectedArtist: mbid,
      setlists,
    });
    return;
  }
}

export default ArtistSelector;
