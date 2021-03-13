import * as React from "react";
import Artist from "src/store/artist/types";
import SetlistDisplay from "./SetlistDisplay";

import "./ArtistSelector.css";

interface ArtistSelectorProps {
  artists: Artist[];
}

class ArtistSelector extends React.Component<
  ArtistSelectorProps,
  { selectedArtist: string | null; setlists: any[] }
> {
  constructor(props: ArtistSelectorProps) {
    super(props);

    this.state = {
      selectedArtist: null,
      setlists: [],
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
            this.state.setlists.map(({ details, songs }) => {
              return (
                <SetlistDisplay
                  key={details.name}
                  details={details}
                  songs={songs}
                />
              );
            }, this)}
        </div>
      );
    }, this);
    return <form>{artists}</form>;
  }

  private async searchSetlists(mbid: string) {
    const result = await fetch(
      `http://localhost:8000/artist/${mbid}/setlists`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );
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
