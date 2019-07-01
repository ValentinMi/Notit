import React from "react";
import Graph from "./commons/graph/Graph";
import BarGraph from "./commons/graph/barGraph";
import "../styles/homeUserGraph.css";

class HomeUserGraph extends Graph {
  state = {
    graphType: "bar",
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

  renderBarGraph = () => {
    const { weekGraph, monthGraph, yearGraph, freq, graphType } = this.state;
    return (
      <React.Fragment>
        {graphType === "bar" && freq === "week" && (
          <BarGraph graphData={weekGraph} />
        )}
        {graphType === "bar" && freq === "month" && (
          <BarGraph graphData={monthGraph} />
        )}
        {graphType === "bar" && freq === "year" && (
          <BarGraph graphData={yearGraph} />
        )}
      </React.Fragment>
    );
  };

  render() {
    return <div className="homeUserGraph">{this.renderBarGraph()}</div>;
  }
}

export default HomeUserGraph;
