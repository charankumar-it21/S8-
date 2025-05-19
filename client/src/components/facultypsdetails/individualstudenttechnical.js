import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

export default function IndividualStudentSGPA({ student }) {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (student) {
      axios
        .post("http://localhost:8080/protected/get-sgpa-stats",{
          roll_no: student,
        },{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((response) => {
          const sgpaValues = Object.values(response.data);
          setChartData(sgpaValues);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching SGPA data:", error);
          setLoading(false);
        });
    }
  }, [student]);

  const chartOptions = {
    chart: {
      type: "bar",
      height: 450,
    },
    xaxis: {
      categories: [
        "Sem 1",
        "Sem 2",
        "Sem 3",
        "Sem 4",
        "Sem 5",
        "Sem 6",
        "Sem 7",
        "Sem 8",
      ],
      title: {
        text: "Semesters",
      },
    },
    yaxis: {
      min: 0,
      max: 10,
      title: {
        text: "SGPA",
      },
    },
    dataLabels: {
      enabled: true,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `SGPA: ${val}`;
        },
      },
    },
    colors: ["#556ee6"],
  };

  const chartSeries = [
    {
      name: "SGPA",
      data: chartData,
    },
  ];

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <h2 className="text-base md:text-lg font-medium mb-4 text-gray-600">
        SGPA Across Semesters
      </h2>
      <div>
        {loading ? (
          <p>Loading SGPA data...</p>
        ) : (
          <div className="min-w-[250px] md:min-w-[400px]">
            <Chart
              options={chartOptions}
              series={chartSeries}
              type="bar"
              height={350}
            />
          </div>
        )}
      </div>
    </div>
  );
}
