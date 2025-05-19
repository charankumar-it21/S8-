import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function Academicstats() {
  const [chartData, setChartData] = useState({
    first_year_above_8: 0,
    first_year_below_8: 0,
    second_year_above_8: 0,
    second_year_below_8: 0,
    third_year_above_8: 0,
    third_year_below_8: 0,
    fourth_year_above_8: 0,
    fourth_year_below_8: 0,
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:8080/protected/admin-academic-card-data", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "40%",
        borderRadius: 5,
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
      categories: ["I Year", "II Year", "III Year", "IV Year"],
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
    colors: ["#556ee6", "#f46a6a"], 
  };

  const chartSeries = [
    {
      name: "CGPA Above 8.0",
      data: [
        chartData.first_year_above_8,
        chartData.second_year_above_8,
        chartData.third_year_above_8,
        chartData.fourth_year_above_8,
      ],
    },
    {
      name: "CGPA Below 8.0",
      data: [
        chartData.first_year_below_8,
        chartData.second_year_below_8,
        chartData.third_year_below_8,
        chartData.fourth_year_below_8,
      ],
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Year-wise CGPA Statistics
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
