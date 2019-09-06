import React from "react";
import Graph from "./commons/graph/graph";
import GraphMenu from "./commons/graph/graphMenu";
import BarGraph from "./commons/graph/barGraph";
import LineGraph from "./commons/graph/lineGraph";

class HomeCommunityGraph extends Graph {
  state = {
    graphType: "bar",
    freq: "Week", // Week, Month or Year
    selectedDate: "",
    weekGraph: {},
    monthGraph: {},
    yearGraph: {}
  };

  componentDidMount() {
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dayNoted !== prevProps.dayNoted) {
    }
    if (this.state.selectedDate !== prevState.selectedDate) {
    }
  }

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

  renderLineGraph = () => {
    const { weekGraph, monthGraph, yearGraph, freq, graphType } = this.state;
    return (
      <React.Fragment>
        {graphType === "line" && freq === "Week" && (
          <LineGraph graphData={weekGraph} />
        )}
        {graphType === "line" && freq === "Month" && (
          <LineGraph graphData={monthGraph} />
        )}
        {graphType === "line" && freq === "Year" && (
          <LineGraph graphData={yearGraph} />
        )}
      </React.Fragment>
    );
  };

  render() {
    const { graphType, selectedDate } = this.state;
    return (
      <div className="homeUserGraph">
        <GraphMenu
          handleChangeFreq={this.changeFreq}
          handleChangeType={this.changeType}
          fetchData={
            selectedDate === "" ? this.fetchCurrentData : this.fetchSpecificData
          }
          getSelectDate={this.getSelectedDateObj}
        />
        {graphType === "bar" ? this.renderBarGraph() : this.renderLineGraph()}
      </div>
    );
  }
}

export default HomeCommunityGraph;
