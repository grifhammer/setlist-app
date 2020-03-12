import * as React from "react";
import IArtist from "src/models/Artist";
import ISetlist from "src/models/Setlist";

interface IArtistSelectorProps {
  artists: IArtist[];
}

class ArtistSelector extends React.Component<
  IArtistSelectorProps,
  { selectedArtist: string; setlists: ISetlist[] }
> {
  constructor(props: IArtistSelectorProps) {
    super(props);
  }

  public render() {
    if (this.props.artists.length <= 0) {
      return null;
    }
    const artists = this.props.artists.map(artist => {
      return (
        <p
          onClick={this.searchSetlists.bind(this, artist.mbid)}
          key={artist.mbid}
        >
          {artist.name} {artist.mbid}
        </p>
      );
    });
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
    let setlists: ISetlist[] = [];
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
