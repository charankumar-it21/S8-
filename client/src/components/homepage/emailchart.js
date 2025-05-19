import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";

export default function EmailChart() {
  const [sgpaData, setSgpaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const rollno = localStorage.getItem("rollno");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchSGPAData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-studentsgpascore/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        // Convert API response to array format for chart
        const formattedData = [
          data.sem1,
          data.sem2,
          data.sem3,
          data.sem4,
          data.sem5,
          data.sem6,
          data.sem7,
          data.sem8,
        ];

        setSgpaData(formattedData);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching SGPA data:", err);
        setError("Failed to load SGPA data.");
        setLoading(false);
      }
    };

    fetchSGPAData();
  }, []);

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top",
        },
      },
    },
    colors: ["#6777EF"],
    dataLabels: {
      enabled: true,
      formatter: (val) => val.toFixed(2), // Ensure decimal format
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },
    xaxis: {
      categories: [
        "1 Sem",
        "2 Sem",
        "3 Sem",
        "4 Sem",
        "5 Sem",
        "6 Sem",
        "7 Sem",
        "8 Sem",
      ],
      position: "bottom",
      axisBorder: { show: false },
      axisTicks: { show: false },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 10],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: { enabled: true },
    },
    yaxis: {
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: {
        show: true,
        formatter: (val) => val.toFixed(2),
      },
    },
  };

  const series = [{ name: "SGPA", data: sgpaData }];

  if (loading) return <p className="text-gray-500 text-center">Loading...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="bg-white rounded-md p-6 shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold">Semester Wise SGPA Score</h3>
      </div>
      <div id="chart" className="h-96">
        <ReactApexChart
          options={options}
          series={series}
          type="bar"
          height={350}
        />
      </div>
    </div>
  );
}
