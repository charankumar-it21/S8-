import React, { useEffect, useState } from "react";
import { AiOutlineNumber } from "react-icons/ai";
import { GiBrain } from "react-icons/gi";
import { RiCodeBoxLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa";

const Leetcodechart = React.lazy(() => import("../../components/technical/codinganalysis"));
const Categories = React.lazy(() => import("../../components/technical/categories"));
const Submission = React.lazy(() => import("../../components/technical/submissions"));
const ProfileCard = React.lazy(() => import("../../components/technical/profile"));
const Badgedata = React.lazy(() => import("../../components/technical/badge"));

export default function Leetcode() {
  const [statsData, setStatsData] = useState({
    solvedProblem: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0
  });
  const lcusername = localStorage.getItem("leetcode_username");

  useEffect(() => {
    const fetchLeetcodeData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/${lcusername}/solved`);
        const data = await response.json();

        // Extracting required data
        const { solvedProblem, easySolved, mediumSolved, hardSolved } = data;

        setStatsData({ solvedProblem, easySolved, mediumSolved, hardSolved });
      } catch (error) {
        console.error("Error fetching Leetcode data:", error);
      }
    };

    fetchLeetcodeData();
  }, []);

  const stats = [
    {
      label: "Total Problems Solved",
      value: statsData.solvedProblem,
      icon: <AiOutlineNumber size={24} />,
    },
    {
      label: "Easy Problems",
      value: statsData.easySolved,
      icon: <GiBrain size={24} />,
    },
    {
      label: "Medium Problems",
      value: statsData.mediumSolved,
      icon: <RiCodeBoxLine size={24} />,
    },
    {
      label: "Hard Problems",
      value: statsData.hardSolved,
      icon: <FaCode size={24} />,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5">
        <ProfileCard />
        <Badgedata />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 mt-5 gap-6 mb-5">
        <Leetcodechart data={statsData}/>
        <Categories />
      </div>
      <Submission />
    </>
  );
}
