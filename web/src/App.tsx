import * as React from "react";
import "./App.css";

import ArtistSelector from "./components/ArtistSelector";
import logo from "./logo.svg";
import IArtist from "./models/Artist";

const emptyList: IArtist[] = [];

const setlistHeaders = new Headers({
  Accept: "applicaton/json",
  "x-api-key": "c1491761-accd-4eb2-9b6c-4908848241b6"
});
setlistHeaders.append("x-api-key", "c1491761-accd-4eb2-9b6c-4908848241b6");
setlistHeaders.append("Accept", "applicaton/json");
// tslint:disable-next-line:no-console
console.log(setlistHeaders);
class App extends React.Component<
  {},
  { apiMessage: string; artistName: string; artists: IArtist[] }
> {
  constructor(props: object) {
    super(props);

    this.state = {
      apiMessage:
        "Loading... (If this takes too long, the database might be down.)",
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
      apiMessage: "Done.",
      artists
    });
  }

  public render() {
    return (
      <div className="App">
        -=
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
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
        <p>{this.state.apiMessage}</p>
        <ArtistSelector artists={this.state.artists} />
      </div>
    );
  }
}

export default App;
