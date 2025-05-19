import React, { useState, useEffect } from "react";
import axios from "axios";
import { SiLevelsdotfyi } from "react-icons/si";
import { SiSecurityscorecard } from "react-icons/si";
import { PiRankingDuotone } from "react-icons/pi";
import { LuBadgePercent } from "react-icons/lu";
import { FaBell } from "react-icons/fa";

const LeetcodeChart = React.lazy(() =>
  import("../../components/facultypsdetails/individualstudenttechnical")
);
const StudentExamTable = React.lazy(() =>
  import("../../components/facultypsdetails/individuallccategory")
);

const StudentProfile = React.lazy(() =>
  import("../../components/facultypsdetails/leetcodesubmissions")
);

export default function Facultytechnical() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    attendace_percentage: 0,
    no_of_days_present: 0,
    no_of_days_absent: 0,
    cgpa: 0,
  });

  let role, user_id;
  try {
    role = localStorage.getItem("role") || "";
    user_id = localStorage.getItem("userid") || "";
  } catch (error) {
    console.error("Error accessing localStorage:", error);
  }

  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response =
          role === "1"
            ? await axios.get("http://localhost:8080/protected/get-allrollno", {
                headers: { Authorization: `Bearer ${token}` },
              })
            : await axios.post(
                "http://localhost:8080/protected/get-mentorwise-rollno",
                { mentor_id: user_id },
                { headers: { Authorization: `Bearer ${token}` } }
              );

        setOptions(response.data.roll_no || []);
      } catch (error) {
        console.error("Error fetching roll numbers:", error);
        alert("Failed to fetch student roll numbers. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchRollNumbers();
  }, [role, user_id]);

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8080/protected/get-academic-card-data",
          {
            roll_no: selectedOption,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setStatsData(response.data);
      } catch (error) {
        console.error("Error fetching project details:", error);
      }
    };
    fetchCardData();
  }, [selectedOption]);

  const stats = [
    {
      label: "CGPA",
      value: statsData.cgpa,
      icon: <SiSecurityscorecard size={24} />,
    },
    {
      label: "Attendance Percentage",
      value: statsData.attendace_percentage,
      icon: <LuBadgePercent size={24} />,
    },
    {
      label: "No Of Days Present",
      value: statsData.no_of_days_present,
      icon: <SiLevelsdotfyi size={24} />,
    },
    {
      label: "No Of Days Absent",
      value: statsData.no_of_days_absent,
      icon: <SiLevelsdotfyi size={24} />,
    },
  ];

  const handleNotificationClick = () => {
    try {
      const token = localStorage.getItem("token");
      axios.get("http://localhost:8080/protected/send-attendance-alerts", {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.log("Error in sending a notification");
    }
  };

  return (
    <>
      <div className="flex justify-end mb-2">
        <button
          onClick={handleNotificationClick}
          className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 focus:outline-none"
        >
          <FaBell className="text-gray-700 text-xl" />
        </button>
      </div>
      <div className="w-full max-w-full bg-white shadow-md p-5 rounded-lg">
        <label
          htmlFor="dropdown"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Select Student
        </label>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <select
            id="dropdown"
            value={selectedOption}
            onChange={(e) => setSelectedOption(e.target.value)}
            className="block w-full p-3 rounded-md border border-gray-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
          >
            <option value="" disabled>
              Choose a Student
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}
      </div>

      {selectedOption ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
            >
              <div>
                <p className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </p>
                <h3 className="text-gray-700 text-xl font-bold">
                  {stat.value}
                </h3>
              </div>
              <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
                {stat.icon}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {selectedOption && (
        <div className="mt-5">
          <StudentProfile rollno={selectedOption} />
        </div>
      )}
      {selectedOption && (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 mt-5 gap-6">
          <LeetcodeChart student={selectedOption} />
        </div>
      )}

      {selectedOption && (
        <div className="mt-5">
          <StudentExamTable student={selectedOption} />
        </div>
      )}
    </>
  );
}
