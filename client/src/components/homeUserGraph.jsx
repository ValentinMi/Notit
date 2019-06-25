import React, { Component } from "react";
import BarGraph from "./commons/graph/barGraph";
import "../styles/homeUserGraph.css";

class HomeUserGraph extends Component {
  state = {
    day: "",
    week: "",
    month: "",
    year: ""
  };

  render() {
    // Bar Graph Template
    const daysBarGraphData = {
      labels: ["M", "Th", "W", "T", "F", "S", "Sn"],
      datasets: [
        {
          label: "Day",
          data: [1, 2, 3, 4, 5, 4, 3],
          backgroundColor: ["white", "red"]
        }
      ]
    };

    const weeksBarGraphData = {
      labels: ["1st", "2nd", "3rd", "4th"],
      datasets: [
        {
          label: "Week",
          data: [1, 2, 3, 4],
          backgroundColor: ["white", "red"]
        }
      ]
    };

    const monthsBarGraphData = {
      labels: ["J", "F", "M", "A", "M", "J", "Jl", "A", "S", "O", "N", "D"],
      datasets: [
        {
          label: "Month",
          data: [1, 2, 3, 4, 5, 4, 3],
          backgroundColor: ["white", "red"]
        }
      ]
    };

    return (
      <div className="homeUserGraph">
        <BarGraph data={weeksBarGraphData} />
      </div>
    );
  }
}

export default HomeUserGraph;
