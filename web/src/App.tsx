import * as React from "react";
import "./App.css";

import logo from "./logo.svg";

class App extends React.Component<{}, { apiMessage: string }> {
  constructor(props: object) {
    super(props);

    this.state = {
      apiMessage:
        "Loading... (If this takes too long, the database might be down.)"
    };

    this.handleChange = this.handleChange.bind(this);
  }

  public componentDidMount() {
    fetch("http://localhost:8000/api")
      .then(r =>
        r.status === 500
          ? `(The server reported an error or cannot be reached. Is it compiling...?)`
          : r.text()
      )
      .then(apiMessage =>
        this.setState({
          apiMessage
        })
      );
  }

  public handleChange(event: React.FormEvent<HTMLFormElement>) {
    this.setState({ apiMessage: `${event.timeStamp}` });
  }

  public searchArtist(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <form onSubmit={this.searchArtist} onChange={this.handleChange}>
          <label>
            Artist:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <p>{this.state.apiMessage}</p>
      </div>
    );
  }
}

export default App;
