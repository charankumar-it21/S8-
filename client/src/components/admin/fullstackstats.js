import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "react-apexcharts";

export default function Fullstackanalysis() {
  const [chartData, setChartData] = useState({
    categories: [],
    studentCounts: [],
  });

  // Mapping full department names to short forms
  const departmentShortNames = {
    "Computer Science And Engineering": "CSE",
    "Information Science And Engineering": "ISE",
    "Information Technology": "IT",
  };

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/protected/admin-department-stats",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const departments = response.data.map((item) =>
          departmentShortNames[item.department] || item.department.split(" ").map(word => word[0]).join("")
        );

        const studentCounts = response.data.map((item) =>
          parseInt(item.total_students, 10)
        );

        setChartData({
          categories: departments,
          studentCounts: studentCounts,
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
    colors: ["#34c38f"], // Single color for all bars
  };

  const chartSeries = [
    {
      name: "Students Count",
      data: chartData.studentCounts,
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        Department-wise Students Stats
      </h2>
      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <Chart options={chartOptions} series={chartSeries} type="bar" height={350} />
        </div>
      </div>
    </div>
  );
}
