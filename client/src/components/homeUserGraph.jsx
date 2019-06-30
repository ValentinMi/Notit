import React, { Component } from "react";
import BarGraph from "./commons/graph/barGraph";
import noteService from "../services/noteService";
import "../styles/homeUserGraph.css";

class HomeUserGraph extends Component {
  state = {
    weekGraph: {},
    monthGraph: {}
  };

  componentDidMount() {
    this.getWeekNotes();
    this.getMonthNotes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dayNoted !== prevProps.dayNoted) {
      this.getWeekNotes();
      this.getMonthNotes();
    }
  }

  // Get notes from current week
  getWeekNotes = async () => {
    const data = await noteService.getCurrentWeekNotes();
    const notes = this.pushNotesInArray(data);
    const weekBarGraphData = {
      labels: ["M", "Th", "W", "T", "F", "S", "Sn"],
      datasets: [
        {
          label: "Day",
          data: notes,
          backgroundColor: this.assignColor(notes)
        }
      ]
    };
    this.setState({ weekGraph: weekBarGraphData });
  };

  // Get notes from current month
  getMonthNotes = async () => {
    const data = await noteService.getCurrentMonthNotes();
    const notes = this.pushNotesInArray(data);
    // Make an average for each week

    const monthBarGraphData = {
      labels: ["1st", "2nd", "3rd", "4th"],
      datasets: [
        {
          label: "",
          data: notes,
          backgroundColor: this.assignColor(notes)
        }
      ]
    };
    this.setState({ monthGraph: monthBarGraphData });
  };

  // Push all notes in an array
  pushNotesInArray = data => {
    data = data.data;
    const notes = [];
    data.forEach(note => {
      notes.push(note.value);
    });
    return notes;
  };

  // Assign color to value
  assignColor = notes => {
    var colors = [];
    notes.forEach(note => {
      switch (note) {
        case 1:
          colors.push("#f44242");
          break;
        case 2:
          colors.push("#f49b41");
          break;
        case 3:
          colors.push("#f4ee41");
          break;
        case 4:
          colors.push("#a0f441");
          break;
        case 5:
          colors.push("#20b419");
          break;
        default:
          colors.push("red");
          break;
      }
    });
    return colors;
  };

  render() {
    const { weekGraph, monthGraph } = this.state;

    // const yearBarGraphData = {
    //   labels: ["J", "F", "M", "A", "M", "J", "Jl", "A", "S", "O", "N", "D"],
    //   datasets: [
    //     {
    //       label: "Month",
    //       data: [1, 2, 3, 4, 5, 4, 3],
    //       backgroundColor: ["white", "red"]
    //     }
    //   ]
    // };

    return (
      <div className="homeUserGraph">
        <BarGraph graphData={weekGraph} />
      </div>
    );
  }
}

export default HomeUserGraph;
