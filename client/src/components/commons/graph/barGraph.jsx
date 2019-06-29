import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ graphData }) => {
  console.log(graphData);
  return (
    <Bar
      data={graphData}
      options={{
        maintainAspectRatio: false
      }}
    />
  );
};

export default BarGraph;
