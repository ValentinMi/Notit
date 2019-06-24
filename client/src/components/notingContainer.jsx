import React, { Component } from "react";
import { Button } from "react-bootstrap";
import NoteCell from "./commons/noteCell";
import { saveNote } from "../services/noteService";
import { toast } from "react-toastify";
import { updateThisDayNoted } from "../services/userService";
import "../styles/notingContainer.css";

class NotingContainer extends Component {
  state = {
    note: {
      value: "",
      color: ""
    },
    hoursLeft: ""
  };

  componentDidMount() {
    this.calculHoursLeft();
  }

  calculHoursLeft = () => {
    // Get current time to calculte how many hours left to midnight
    const currentDate = new Date();
    let currentHour = currentDate.getHours();
    let timeLeftToMidnight = 24 - currentHour;
    this.setState({ hoursLeft: timeLeftToMidnight });
  };

  handleNoteSelect = (value, color) => {
    // Update state when user click on note
    const note = { ...this.state.note };
    note.value = value;
    note.color = color;
    this.setState({ note: note });
  };

  doSubmit = async () => {
    try {
      await saveNote(this.state.note);
      await updateThisDayNoted();
      window.location = "/";
      toast.info("Note saved !");
    } catch (ex) {
      toast.error("An error occured !");
    }
  };

  render() {
    const noteList = [
      { value: 1, color: "vbad-day" },
      { value: 2, color: "bad-day" },
      { value: 3, color: "med-day" },
      { value: 4, color: "gd-day" },
      { value: 5, color: "vgd-day" }
    ];

    // const { user } = this.props;

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
              <Button
                variant="primary"
                className="validate-btn"
                onClick={() => this.doSubmit()}
              >
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
