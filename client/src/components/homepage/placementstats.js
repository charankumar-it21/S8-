import React from "react";
import ReactApexChart from "react-apexcharts";

export default function PlacementStats() {
  const chartOptions = {
    series: [150, 100,50], // Count data for the pie chart
    chart: {
      width: 350,
      type: "pie",
    },
    labels: ["Registered", "Attended","Not Attended"], // Labels for the pie chart
    colors: ["#6777EF", "#cbd5e1","#ef4444"], // Slice colors
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.globals.series[opts.seriesIndex];
      },
    },
    tooltip: {
      enabled: true,
      y: {
        formatter: function (val) {
          return val + " Companies"; // Show data with the "Companies" suffix
        },
      },
    },
    states: {
      hover: {
        filter: {
          type: "lighten", // Apply a lighten effect on hover
          value: 0.05, // Lighten the color by 50%
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-lg  shadow-md flex justify-center items-center" style={{ height: "400px" }}>
      <div>
        <h3 className="font-semibold mb-4 text-center">Placement Statistics</h3>
        <ReactApexChart
          options={chartOptions}
          series={chartOptions.series}
          type="pie"
          width={380}
        />
      </div>
    </div>
  );
}
