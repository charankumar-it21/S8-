import React, { useState, Suspense, useEffect } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IndividualPSData = React.lazy(() =>import("../../components/facultypsdetails/individualstudentpsstats"));
const Individualstudentprofile = React.lazy(() =>import("../../components/facultypsdetails/individualstudentprofile"));
const PSCard = React.lazy(() =>import("../../components/facultypsdetails/pslevelpoints"));
const Individualstudentpsslots = React.lazy(() =>import("../../components/facultypsdetails/individualstudentpsslots"));

export default function Facultypspage() {
  const [selectedOption, setSelectedOption] = useState("");
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);  
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchRollNumbers = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(
          "http://localhost:8080/protected/get-psdata-rollno",
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
        setError("Failed to load roll numbers. Please try again later.");
        setLoading(false);
      }
    };

    fetchRollNumbers();
  }, []);

  const handleaddsuggestion = () => {
    Navigate("/add-suggestion");
  };

  return (
    <>
      {selectedOption && (
        <div className="flex flex-row justify-end mb-5" onClick={handleaddsuggestion}>
          <button className="flex items-center space-x-2 bg-[#6777EF] text-white py-2 px-4 rounded hover:bg-[#6777EF]/90 transition duration-200">
            <FaPlus />
            <span>Add Suggestion</span>
          </button>
        </div>
      )}

      <div className="w-full max-w-full bg-white shadow-md p-5 rounded-lg">
        <label htmlFor="dropdown" className="block text-lg font-semibold text-gray-700 mb-2">
          Select Student
        </label>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
          className="block w-full p-3 rounded-md border border-gray-300 shadow-xs focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-base"
        >
          <option value="" disabled>
            Choose a Student
          </option>
          {options.length === 0 ? (
            <option disabled>No students available</option>
          ) : (
            options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))
          )}
        </select>
      </div>

      {error && <div className="text-red-500">{error}</div>}

      <div className="mt-5">
        {selectedOption ? (
          <PSCard student={selectedOption} />
        ) : (
          <p className="text-gray-600"></p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row mt-5 gap-6">
        <Suspense fallback={<div>Loading...</div>}>
          {selectedOption ? (
            <div className="lg:basis-2/5 flex-shrink-0">
              <Individualstudentprofile student={selectedOption} />
            </div>
          ) : (
            <div className="text-center col-span-full text-gray-500 lg:basis-2/5">
              
            </div>
          )}

          <div className="lg:basis-3/5">
            {selectedOption ? (
              <IndividualPSData student={selectedOption} />
            ) : (
              <p className="text-gray-600"></p>
            )}
          </div>
        </Suspense>
      </div>

      <div className="mt-5">
        {selectedOption ? (
          <Individualstudentpsslots student={selectedOption} />
        ) : (
          <p className="text-gray-600"></p>
        )}
      </div>
    </>
  );
}

