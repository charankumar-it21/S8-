import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function AchievementCharts({roll_no}) {
  const [chartData, setChartData] = useState({
    categories: [],
    activityCounts: [],
  });

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8080/protected/get-achievements-charts-data",{
           roll_no
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const activityCategories = [
          "Projects",
          "Competitions",
          "Technical Events",
          "Academics",
          "Other Activities",
        ];

        const activityCounts = [
          response.data.project_count,
          response.data.competition_count,
          response.data.technical_count,
          response.data.academic_count,
          response.data.other_count,
        ];

        setChartData({
          categories: activityCategories,
          activityCounts: activityCounts,
        });
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
      categories: chartData.categories,
    },
    yaxis: {
      title: {
        text: "Activity Count",
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
    colors: ["#34c38f"], // Blue color for bars
  };

  const chartSeries = [
    {
      name: "Activity Count",
      data: chartData.activityCounts,
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Activity-wise Student Participation Stats
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
}
