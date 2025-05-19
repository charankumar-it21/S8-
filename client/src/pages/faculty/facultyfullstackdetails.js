import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaBell } from "react-icons/fa";

const AchievementDetails = React.lazy(() =>
  import("../../components/facultypsdetails/individualreviewstats")
);
const AchievementCharts = React.lazy(() => import("./AchievementCharts"));

export default function Facultyfullstackdetails() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [projectDetails, setProjectDetails] = useState(null);

  let role, user_id;

    role = localStorage.getItem("role");
    user_id = localStorage.getItem("userid");

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

  const handleNotificationClick = () => {
    try {
      const token = localStorage.getItem("token");
      axios.get(
        "http://localhost:8080/protected/send-achievements-alerts",
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

      <div className="w-full max-w-full bg-white shadow-md p-5 rounded-lg mb-5">
        <label
          htmlFor="dropdown"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Select Student
        </label>
        {loading ? (
          <p>Loading students...</p>
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

      {selectedOption && (
        <div>
          <AchievementCharts roll_no={selectedOption} />
          <React.Suspense fallback={<div>Loading...</div>}>
            <AchievementDetails student={selectedOption} />
          </React.Suspense>
        </div>
      )}
    </>
  );
}
