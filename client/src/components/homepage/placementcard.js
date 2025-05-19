import { header } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { GrAchievement } from "react-icons/gr";
import axios from "axios";
import { LuCalendarDays } from "react-icons/lu";
import { LuBadgePercent } from "react-icons/lu";

export default function PlacementCards() {
  const [placementCardData, setPlacementCardData] = useState([]);
  const roll_no = localStorage.getItem("userid");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8080/protected/get-student-attendance",{
            roll_no: roll_no
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlacementCardData(response.data);
      } catch (error) {
        console.error("Error fetching placement data:", error);
      }
    };
    fetchProfileData();
  }, []);

  console.log(placementCardData);

  const stats = [
    {
      label: "Attendance Percentage",
      value: placementCardData.attendace_percent || 0,
      icon: <LuBadgePercent size={24} />,
    },
    {
      label: "No of Days Present",
      value: placementCardData.no_of_days_present ||0,
      icon: <LuCalendarDays size={24} />,
    },
    {
      label: "No of Days Absent",
      value: placementCardData.no_of_days_absent ||0,
      icon: <LuCalendarDays size={24} />,
    },
    {
      label: "Total Working Days",
      value: placementCardData.total_working_days ||0,
      icon: <LuCalendarDays size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
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
