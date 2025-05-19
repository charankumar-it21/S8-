import React, { useEffect, useState } from "react";
import axios from "axios";

const Profilecard = React.lazy(() =>import("../../components/profile/studentprofilecard"));
const EmailChart = React.lazy(() =>import("../../components/profile/studentsgpachart"));
const PlacementCards = React.lazy(() =>import("../../components/profile/studentplacmentcard"));
const ActiveOffers = React.lazy(() =>import("../../components/profile/studentactiveoffers"));
const PersonalInfo = React.lazy(() =>import("../../components/profile/studentprofiledetails"));

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:8080/protected/get-student-rollno",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setOptions(response.data.roll_no);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching roll numbers:", error);
        setLoading(false);
      }
    };

    fetchRollNumbers();
  }, []);

  return (
    <>
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
        <div className="p-0 sm:p-2 ">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Column 1 */}
            <div className="lg:w-2/5 w-full space-y-6">
              <Profilecard rollno={selectedOption} />
              <ActiveOffers rollno={selectedOption} />
            </div>

            {/* Column 2 */}
            <div className="lg:w-3/5 w-full space-y-6">
              <PlacementCards rollno={selectedOption} />
              <EmailChart rollno={selectedOption} />
            </div>
          </div>
          <div className="w-full max-w-1xl rounded-md bg-white shadow-md">
            <PersonalInfo rollno={selectedOption} />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
