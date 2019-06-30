import React from "react";
import { Bar } from "react-chartjs-2";

const BarGraph = ({ graphData }) => {
  return (
    <Bar
      data={graphData}
      options={{
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true
              }
            }
          ]
        }
      }}
    />
  );
};

export default BarGraph;
