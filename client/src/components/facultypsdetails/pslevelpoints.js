import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { GrAchievement } from "react-icons/gr";
import { SiSecurityscorecard } from "react-icons/si";

export default function PsLevelPoints({ student }) {
  const [statsData, setStatsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchStudentStats = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-admin-pscard-data/${student}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Replace with your actual token
            },
          }
        );
        setStatsData(response.data);
      } catch (err) {
        setError("Failed to load data");
        console.error("API fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentStats();
  }, [student]);

  if (loading) {
    return <p className="text-gray-600">Loading data...</p>;
  }

  if (error) {
    return <p className="text-red-600">{error}</p>;
  }

  if (!statsData) {
    return (
      <p className="text-gray-600">
        No data available for the selected student.
      </p>
    );
  }

  const stats = [
    {
      label: "Total Points",
      value: statsData.levels_completed * 300,
      icon: <GrAchievement size={24} />,
    },
    {
      label: "Total Levels Completed",
      value: statsData.levels_completed,
      icon: <GrAchievement size={24} />,
    },
    {
      label: "Negative Remarks Count",
      value: statsData.count_negative_marks,
      icon: <SiSecurityscorecard size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
        >
          <div>
            <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
            <h3 className="text-gray-800 text-xl font-bold">{stat.value}</h3>
          </div>
          <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
            {stat.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

PsLevelPoints.propTypes = {
  student: PropTypes.shape({
    rollno: PropTypes.string.isRequired,
  }).isRequired,
};
