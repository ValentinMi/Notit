import React from "react";
import Graph from "./commons/graph/Graph";
import BarGraph from "./commons/graph/barGraph";
import "../styles/homeUserGraph.css";

class HomeUserGraph extends Graph {
  state = {
    freq: "week", // week, month or year
    weekGraph: {},
    monthGraph: {},
    yearGraph: {}
  };

  componentDidMount() {
    this.getWeekNotes();
    this.getMonthNotes();
    this.getYearNotes();
  }

  componentDidUpdate(prevProps) {
    if (this.props.dayNoted !== prevProps.dayNoted) {
      this.getWeekNotes();
      this.getMonthNotes();
      this.getYearNotes();
    }
  }

  ///////////////
  // RENDERING //
  ///////////////

  render() {
    const { weekGraph, monthGraph, yearGraph, freq } = this.state;
    return (
      <div className="homeUserGraph">
        <BarGraph graphData={weekGraph} />
      </div>
    );
  }
}

export default HomeUserGraph;
