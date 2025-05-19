import { header } from "framer-motion/client";
import React, { useState, useEffect } from "react";
import { GrAchievement } from "react-icons/gr";
import { SiSecurityscorecard } from "react-icons/si";
import axios from "axios";
export default function PlacementCards({rollno}) {
  const [placementCardData, setPlacementCardData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/protected/get-studentcarddata/${rollno}`,
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
      label: "Placement Status",
      value: placementCardData.placement_status || "Not Placed",
      icon: <GrAchievement size={24} />,
    },
    {
      label: "Full-Stack Points",
      value: placementCardData.full_stack_point,
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "Full-Stack Rank",
      value: placementCardData.full_stack_rank,
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
