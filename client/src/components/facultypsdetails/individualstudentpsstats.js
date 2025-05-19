import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function OverallPSCount({ student }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-psslotdata-completion/${student}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token in request headers
            },
          }
        );
        setChartData(response.data); // Update state with the fetched data
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chart data:", error);
        setLoading(false);
      }
    };

    if (student) {
      fetchChartData(); // Fetch data when student roll number is available
    }
  }, [student, token]);

  // Extract categories, target levels, and completed levels from chartData
  const categories = chartData.map((data) => data.category);
  const targetLevels = chartData.map((data) => parseInt(data.monthly_level));
  const completedLevels = chartData.map((data) => data.completed_levels);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
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
      categories: categories.length
        ? categories
        : ["Category 1", "Category 2", "Category 3"],
    },
    yaxis: {
      title: {
        text: "Category-wise PS Level Completion Stats",
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
    colors: ["#556ee6", "#34c38f"], // Custom colors for each series
  };

  const chartSeries = [
    {
      name: "Target Levels",
      data: targetLevels,
    },
    {
      name: "Completed Levels",
      data: completedLevels,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Individual Student PS Level Completion Details
      </h2>
      <div className="overflow-x-auto">
        {/* Horizontal scrolling container */}
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
