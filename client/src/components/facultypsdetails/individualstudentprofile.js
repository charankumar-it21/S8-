import React, { useEffect, useState } from "react";
import ProfileImage from "../../assets/profileimage.png";
import axios from "axios";

export default function IndividualPSData({ student }) {
  const [profiledata, setProfiledata] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/protected/get-psprofiledata/${student}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include Bearer token in request headers
            },
          }
        );
        setProfiledata(response.data); // Update state with the fetched data
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (student) {
      fetchProfileData(); // Call function only if rollno is available
    }
  }, [student, token]);

  return (
    <div className="w-full max-w-1xl rounded-md bg-white shadow-md">
      {/* Header Section */}
      <div className="relative h-36 rounded-md bg-[#ccd0ff] p-6">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold text-[#6777EF]">PS Details</h1>
        </div>
        <img
          src={ProfileImage}
          alt="Bg Image"
          className="absolute bottom-0 right-4 h-32 w-auto object-contain"
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        <div className="absolute -top-14 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt={`${student.name}'s profile`}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="pt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div>
            <h2 className="text-2xl font-semibold text-gray-600">
              {profiledata.name || student.name}{" "}
              {/* Fallback to student prop if profiledata is empty */}
            </h2>
            <p className="text-gray-500">
              {profiledata.year || student.year} YEAR |{" "}
              {profiledata.department || student.department}
            </p>
          </div>

          <div className="flex gap-12 sm:gap-16">
            <div className="text-start">
              <p className="text-xl font-bold text-gray-600">
                {profiledata.roll_no || student.rollno}{" "}
                {/* Fallback to student prop if profiledata is empty */}
              </p>
              <p className="text-gray-500">Roll No</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-gray-600">
                {profiledata.cgpa || student.cgpa}{" "}
                {/* Fallback to student prop if profiledata is empty */}
              </p>
              <p className="text-gray-500">CGPA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
