import React, { Component } from "react";
import BarGraph from "./commons/graph/barGraph";
import noteService from "../services/noteService";
import "../styles/homeUserGraph.css";

class HomeUserGraph extends Component {
  state = {
    weekGraph: {}
  };

  componentDidMount() {
    this.getWeekNotes();
  }

  getWeekNotes = async () => {
    let data = await noteService.getCurrentWeekNotes();
    data = data.data;
    const notes = [];
    data.forEach(note => {
      notes.push(note.value);
    });
    const weekBarGraphData = {
      labels: ["M", "Th", "W", "T", "F", "S", "Sn"],
      datasets: [
        {
          label: "Day",
          data: notes,
          backgroundColor: ["red", "blue"]
        }
      ]
    };
    this.setState({ weekGraph: weekBarGraphData });
  };

  render() {
    const { weekGraph } = this.state;

    // const monthBarGraphData = {
    //   labels: ["1st", "2nd", "3rd", "4th"],
    //   datasets: [
    //     {
    //       label: "Week",
    //       data: [1, 2, 3, 4],
    //       backgroundColor: ["white", "red"]
    //     }
    //   ]
    // };

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
