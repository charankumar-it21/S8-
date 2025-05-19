import React, { useEffect, useState } from "react";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiSecurityscorecard } from "react-icons/si";
import { PiRankingDuotone } from "react-icons/pi";
import { FaStackOverflow } from "react-icons/fa";
import axios from "axios";

import Studentsachievements from "./Achievements"

export default function FullStack() {
  const [statsData, setStatsData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const rollno = localStorage.getItem("userid");
      const token = localStorage.getItem("token");
      try {
        const response = await axios.post(
          "http://localhost:8080/protected/get-achievements-charts-data",
          {
            roll_no: rollno,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching stats data:", error);
      }
    };
    fetchStats();
  }, []);

  const stats = [
    {
      label: "Total Projects",
      value: statsData.project_count,
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "Competitions Participated",
      value: statsData.competition_count,
      icon: <PiRankingDuotone size={24} />,
    },
    {
      label: "Technical Competitions",
      value: statsData.technical_count,
      icon: <SiLevelsdotfyi size={24} />,
    },
    {
      label: "Academic Activities",
      value: statsData.academic_count,
      icon: <FaStackOverflow size={24} />,
    },
    {
      label: "Other Events",
      value: statsData.other_count,
      icon: <FaStackOverflow size={24} />,
    },
  ];
  return (
    <>
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
              <h3 className="text-gray-700 text-xl font-bold">{stat.value}</h3>
            </div>
            <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
              {stat.icon}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div>
      <Studentsachievements />
    </div>
    </>
  );
}
