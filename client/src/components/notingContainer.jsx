import React, { Component } from "react";
import NoteCell from "./communs/noteCell";
import { Button } from "react-bootstrap";
import "../styles/notingContainer.css";

class NotingContainer extends Component {
  state = {
    note: {
      value: "",
      color: ""
    },
    hoursLeft: 5
  };

  handleNoteSelect = (value, color) => {
    const note = { ...this.state.note };
    note.value = value;
    note.color = color;
    this.setState({ note: note });
  };

  render() {
    const noteList = [
      { value: 1, color: "vbad-day" },
      { value: 2, color: "bad-day" },
      { value: 3, color: "med-day" },
      { value: 4, color: "gd-day" },
      { value: 5, color: "vgd-day" }
    ];
    return (
      <div className="row ">
        <div className="col-md-12">
          <div className="container noting-container">
            <span className="note-ur-day">Note your day</span>
            <div className="container circle-container">
              {noteList.map(note => (
                <div
                  key={note.value}
                  onClick={() => this.handleNoteSelect(note.value, note.color)}
                >
                  <NoteCell color={note.color} />
                </div>
              ))}
            </div>
            {this.state.note.value && (
              <Button variant="primary" className="validate-btn">
                Validate <NoteCell color={this.state.note.color} />
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
