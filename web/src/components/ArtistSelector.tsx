import * as React from "react";

interface IArtistSelectorProps {
  artists: IArtist[];
}

class ArtistSelector extends React.Component<IArtistSelectorProps, {}> {
  constructor(props: IArtistSelectorProps) {
    super(props);
  }
  public render() {
    if (this.props.artists.length <= 0) {
      return null;
    }
    const artists = this.props.artists.map(artist => {
      return <p key={artist.name}>{artist.name}</p>;
    });
    return <form>{artists}</form>;
  }
}

export default ArtistSelector;
