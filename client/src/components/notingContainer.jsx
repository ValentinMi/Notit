import React, { Component } from "react";
import NoteCell from "./communs/noteCell";
import { Button } from "react-bootstrap";
import "../styles/notingContainer.css";

class NotingContainer extends Component {
  state = {
    note: "",
    color: "",
    hoursLeft: 5
  };

  render() {
    const colorList = ["vbad-day", "bad-day", "med-day", "gd-day", "vgd-day"];
    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="container noting-container">
            <span className="note-ur-day">Note your day</span>
            <div className="container circle-container">
              {colorList.map(color => (
                <div
                  key={color}
                  onClick={() => this.setState({ color: color })}
                >
                  <NoteCell color={color} />
                </div>
              ))}
            </div>
            {this.state.note && (
              <Button variant="primary" className="validate-btn">
                Validate <NoteCell color={this.state.note} />
              </Button>
            )}
            <span className="hours-left">
              {this.state.hoursLeft} hours left to do it
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default NotingContainer;
