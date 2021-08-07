import * as React from "react";
import Artist from "src/store/artist/types";
import SetlistDisplay from "./SetlistDisplay";

import "./ArtistSelector.css";
import ISetlist from "src/models/Setlist";

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
    this.searchArtist = this.searchArtist.bind(this);
  }

  public async searchArtist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await fetch(
      `${process.env.API_URL}/searchArtist?artist=${encodeURI(
        this.state.artistName
      )}`,
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
    this.setState({
      artists,
    });
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
              return <SetlistDisplay key={result.id} setlist={result} />;
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
