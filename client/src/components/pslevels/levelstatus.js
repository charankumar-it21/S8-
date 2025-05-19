import React, { useEffect, useState } from "react";
import axios from "axios";
import { PiStudentFill } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
import { FaBook } from "react-icons/fa"; // Icon for CGPA
import { MdErrorOutline } from "react-icons/md"; // Icon for Arrears

export default function LevelStats() {
  const [statsData, setStatsData] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [arrears, setArrears] = useState(0);
  const roll_no = localStorage.getItem("userid");

  useEffect(() => {
  
    const fetchAcademicStats = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/protected/get-student-academic-data",{
            roll_no
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setCgpa(response.data.cgpa || 0);
        setArrears(response.data.arrears || 0);
      } catch (error) {
        console.error("Error fetching academic stats:", error);
      }
    };
    fetchAcademicStats();
  }, []);

  const defaultStats = [
    {
      label: "CGPA",
      value: cgpa.toFixed(2), // Display CGPA with 2 decimal places
      icon: <FaBook size={24} />,
    },
    {
      label: "Arrears",
      value: arrears,
      icon: <MdErrorOutline size={24} />,
    },
  ];

  const mappedStats = statsData.map((stat) => ({
    label: `Completed Levels in ${stat.ps_category}`,
    value: stat.levels_completed || 0, // Fallback to 0 if no value is present
    icon: <SiLevelsdotfyi size={24} />,
  }));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {[...defaultStats, ...mappedStats].map((stat, index) => (
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
