import * as React from "react";
import IArtist from "src/models/Artist";
import ISetlist from "src/models/Setlist";
import ISong from "src/models/Song";
import SetlistDisplay from "./SetlistDisplay";

interface IArtistSelectorProps {
  artists: IArtist[];
}

interface ISetlistResult {
  details: ISetlist;
  songs: ISong[];
}

class ArtistSelector extends React.Component<
  IArtistSelectorProps,
  { selectedArtist: string | null; setlists: ISetlistResult[] }
> {
  constructor(props: IArtistSelectorProps) {
    super(props);

    this.state = {
      selectedArtist: null,
      setlists: []
    };
  }

  public render() {
    if (this.props.artists.length <= 0) {
      return null;
    }
    const artists = this.props.artists.map(artist => {
      return (
        <div
          onClick={this.searchSetlists.bind(this, artist.mbid)}
          key={artist.mbid}
        >
          {artist.name} {artist.mbid}
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
          Accept: "application/json"
        }
      }
    );
    let setlists: ISetlistResult[] = [];
    if (result.ok) {
      setlists = await result.json();
    }
    this.setState({
      selectedArtist: mbid,
      setlists
    });
    return;
  }
}

export default ArtistSelector;
