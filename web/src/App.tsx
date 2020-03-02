import * as React from "react";
import "./App.css";

import logo from "./logo.svg";
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
  { apiMessage: string; artistName: string }
> {
  constructor(props: object) {
    super(props);

    this.state = {
      apiMessage:
        "Loading... (If this takes too long, the database might be down.)",
      artistName: ""
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
      `https://api.setlist.fm/rest/1.0/search/artist?artistName=${this.state.artistName}`,
      {
        headers: {
          Accept: "applicaton/json",
          "x-api-key": "c1491761-accd-4eb2-9b6c-4908848241b6"
        },
        mode: "no-cors"
      }
    );
    const textResponse = await result.text();
    this.setState({
      apiMessage: textResponse
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
      </div>
    );
  }
}

export default App;
