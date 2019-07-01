import React from "react";
import Graph from "./commons/graph/Graph";
import GraphMenu from "./commons/graph/graphMenu";
import BarGraph from "./commons/graph/barGraph";
import "../styles/homeUserGraph.css";

class HomeUserGraph extends Graph {
  state = {
    graphType: "bar",
    freq: "Week", // Week, Month or Year
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

  changeFreq = freq => {
    this.setState({ freq: freq });
  };

  ///////////////
  // RENDERING //
  ///////////////

  renderBarGraph = () => {
    const { weekGraph, monthGraph, yearGraph, freq, graphType } = this.state;
    return (
      <React.Fragment>
        {graphType === "bar" && freq === "Week" && (
          <BarGraph graphData={weekGraph} />
        )}
        {graphType === "bar" && freq === "Month" && (
          <BarGraph graphData={monthGraph} />
        )}
        {graphType === "bar" && freq === "Year" && (
          <BarGraph graphData={yearGraph} />
        )}
      </React.Fragment>
    );
  };

  render() {
    return (
      <div className="homeUserGraph">
        <GraphMenu handleChangeFreq={this.changeFreq} />
        {this.renderBarGraph()}
      </div>
    );
  }
}

export default HomeUserGraph;
