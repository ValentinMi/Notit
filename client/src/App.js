import React, { Component } from "react";
import NotingContainer from "./components/notingContainer";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <NotingContainer />
      </div>
    );
  }
}

export default App;
