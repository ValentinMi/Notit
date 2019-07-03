import React from "react";
import { Line } from "react-chartjs-2";

const LineGraph = ({ graphData }) => {
  return (
    <Line
      data={graphData}
      options={{
        legend: {
          display: false
        },
        backgroundColor: "",
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
                callback: function(value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                }
              }
            }
          ]
        }
      }}
    />
  );
};

export default LineGraph;
