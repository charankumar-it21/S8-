import React from "react";
import Chart from "react-apexcharts";

export default function StudentsPSStats() {
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["I", "II", "III", "IV"],
    },
    yaxis: {
      title: {
        text: "Total Students",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
    colors: ["#556ee6", "#34c38f", "#f46a6a","#0d9488"], // Custom colors for each series
  };

  const chartSeries = [
    {
      name: "IT Levels Completed Students",
      data: [200, 160, 124, 162],
    },
    {
      name: "Core Levels Completed Students",
      data: [250, 200, 143, 256],
    },
    {
      name: "Aptitude Levels Completed Students",
      data: [100, 175, 189, 190],
    },
    {
      name: "Verbal Levels Completed Students",
      data: [130, 300, 250, 200],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className=" text-base md:text-lg font-medium mb-4 text-gray-600">
        Year wise Students PS Assessment Stats
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <Chart
            options={chartOptions}
            series={chartSeries}
            type="bar"
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
