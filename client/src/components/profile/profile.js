import React, { useState, useEffect } from "react";
import {
  AiOutlineIdcard,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdEmail, MdOutlineContactPhone } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import axios from "axios";

export default function Profile({rollno}) {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/protected/get-profiledetails/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfileData(response.data);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
    };
    fetchProfileData();
  }, []);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {/* Left Column */}
      <div className="space-y-4">
        {/* Personal Information Card */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center p-4 border-b">
            <AiOutlineUser className="text-gray-600 mr-2" />
            <h2 className="text-lg text-gray-600 font-semibold">
              Personal Information
            </h2>
          </div>
          <div className="p-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Student ID</div>
                <div>{profileData.rollno}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Full Name</div>
                <div>{profileData.name}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Date of Birth</div>
                <div>{profileData.dob}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Batch</div>
                <div>{profileData.batch}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course and Mentor Information */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center p-4 border-b">
            <RiUserSettingsLine className="text-gray-600 mr-2" />
            <h2 className="text-lg text-gray-600 font-semibold">
              Course and Mentor Information
            </h2>
          </div>
          <div className="p-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Regulation</div>
                <div>{profileData.regulation}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Course</div>
                <div>{profileData.department}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Mentor ID</div>
                <div>{profileData.mentor_id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Mentor Name</div>
                <div>{profileData.mentor_name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column */}
      <div className="space-y-4">
        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center p-4 border-b">
            <MdOutlineContactPhone className="text-gray-600 mr-2" />
            <h2 className="text-lg text-gray-600 font-semibold">
              Contact Information
            </h2>
          </div>
          <div className="p-4 space-y-4">
            <div>
              <div className="text-sm text-gray-500">Personal Contact</div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-3 py-1 border rounded-md hover:bg-gray-50">
                  <MdOutlineContactPhone className="text-[#6777EF] mr-2" />
                  {profileData.phone_no}
                </button>
              </div>
            </div>
            <div>
              <div className="text-sm text-gray-500">College Mail ID</div>
              <button className="flex items-center px-3 py-1 border rounded-md hover:bg-gray-50">
                <MdEmail className="text-[#6777EF] mr-2" />
                {profileData.college_email}
              </button>
            </div>
            <div>
              <div className="text-sm text-gray-500">College Mail ID</div>
              <button className="flex items-center px-3 py-1 border rounded-md hover:bg-gray-50">
                <MdEmail className="text-[#6777EF] mr-2" />
                {profileData.personal_email}
              </button>
            </div>
            <div>
              <div className="text-sm text-gray-500">Parent Contact</div>
              <div className="flex items-center space-x-4">
                <button className="flex items-center px-3 py-1 border rounded-md hover:bg-gray-50">
                  <MdOutlineContactPhone className="text-[#6777EF] mr-2" />
                  {profileData.parent_mobile_no}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Identity Information */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center p-4 border-b">
            <AiOutlineIdcard className="text-gray-600 mr-2" />
            <h2 className="text-lg text-gray-600 font-semibold">
              Identity Information
            </h2>
          </div>
          <div className="p-4 grid grid-cols-2 gap-4">
            <div>
              <div className="text-sm text-gray-500">Aadhaar Number</div>
              <div> {profileData.aadhar_no}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">PAN Number</div>
              <div> {profileData.pan_no}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
