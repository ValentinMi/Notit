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

export default BarGraph;
