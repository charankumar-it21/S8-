import React, { useState, useEffect } from "react";
import {
  AiOutlineIdcard,
  AiOutlineUser,
  AiOutlineCalendar,
} from "react-icons/ai";
import { MdEmail, MdOutlineContactPhone } from "react-icons/md";
import { RiUserSettingsLine } from "react-icons/ri";
import axios from "axios";

export default function Profile() {
  const [profileData, setProfileData] = useState([]);
  const roll_no = localStorage.getItem("userid");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8080/protected/get-student-profile-datas",
          {
            roll_no,
          },
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
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-5">
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
                <div className="text-sm text-gray-500">Student Roll No</div>
                <div>{profileData.rollno}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Student Name</div>
                <div>{profileData.name}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Email</div>
                <div>{profileData.email}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Year</div>
                <div>{profileData.year}</div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <div className="text-sm text-gray-500">Department</div>
                <div>{profileData.department}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Course and Mentor Information */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="flex items-center p-4 border-b">
            <RiUserSettingsLine className="text-gray-600 mr-2" />
            <h2 className="text-lg text-gray-600 font-semibold">
              Mentor Information
            </h2>
          </div>
          <div className="p-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Mentor ID</div>
                <div>{profileData.faculty_id}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Mentor Name</div>
                <div>{profileData.mentor_name}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Mentor Department</div>
                <div>{profileData.mentor_department}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Mentor Email</div>
                <div>{profileData.mentor_email}</div>
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
              Parent Information
            </h2>
          </div>
          <div className="p-4 grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Parent Name</div>
                <div>{profileData.parent_name}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Parent Email</div>
                <div>{profileData.parent_email}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-gray-500">Parent Contact</div>
                <div>{profileData.parent_phoneno}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
