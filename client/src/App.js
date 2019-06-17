import React, { Component } from "react";
import TopMenu from "./components/topMenu";
import NotingContainer from "./components/notingContainer";
import "./styles/App.css";

class App extends Component {
  render() {
    return (
      <div className="App container">
        <TopMenu />
        <NotingContainer />
      </div>
    );
  }
}

export default App;
