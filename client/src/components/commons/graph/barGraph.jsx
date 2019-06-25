import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

class BarGraph extends Component {
  state = {
    graphData: this.props.data
  };
  render() {
    return (
      <Bar
        data={this.state.graphData}
        options={{
          maintainAspectRatio: false
        }}
      />
    );
  }
}

export default BarGraph;
