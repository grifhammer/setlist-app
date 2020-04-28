import * as React from "react";
import "./Home.css";

import ArtistSelector from "./components/ArtistSelector";
import Artist from "./store/artist/types";

const emptyList: Artist[] = [];

class Home extends React.Component<
  {},
  { artistName: string; artists: Artist[] }
> {
  constructor(props: object) {
    super(props);

    this.state = {
      artistName: "",
      artists: emptyList
    };

    this.handleChange = this.handleChange.bind(this);
    this.searchArtist = this.searchArtist.bind(this);
  }

  public handleChange(event: React.FormEvent) {
    const target = event.target as HTMLInputElement;

    this.setState({ artistName: target.value });
    event.preventDefault();
  }

  public async searchArtist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await fetch(
      `http://localhost:8000/artist/${encodeURI(this.state.artistName)}`,
      {
        headers: {
          Accept: "applicaton/json"
        }
      }
    );
    let artists = emptyList;
    if (result.ok) {
      artists = await result.json();
    }
    this.setState({
      artists
    });
  }

  public render() {
    return (
      <div>
        <form onSubmit={this.searchArtist}>
          <label>
            Artist:
            <input
              type="text"
              value={this.state.artistName}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="submit form" />
        </form>
        <ArtistSelector artists={this.state.artists} />
      </div>
    );
  }
}

export default Home;
