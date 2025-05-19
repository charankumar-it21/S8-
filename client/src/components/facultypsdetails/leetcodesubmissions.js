import React, { useState, useEffect } from "react";
import {
  FaUserGraduate,
  FaEnvelope,
  FaBuilding,
  FaUserTie,
  FaPhoneAlt,
  FaCalendarAlt,
  FaExclamationTriangle,
} from "react-icons/fa";
import axios from "axios";

export default function StudentProfile({ rollno }) {
  const [studentData, setStudentData] = useState(null);
  console.log(rollno);
  useEffect(() => {
    if (!rollno) {
      console.error("Roll number is missing!");
      return;
    }

    const fetchStudentData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post(
          "http://localhost:8080/protected/get-student-profile-data",
          { roll_no: rollno }, // Ensure roll_no is sent
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchStudentData();
  }, [rollno]);

  if (!studentData) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg text-gray-600 font-semibold mb-2 flex items-center pb-2 border-b">
        <FaUserGraduate className="text-gray-400 mr-2" /> Student Profile
      </h3>

      {/* Student Details */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
        <div className="text-sm text-gray-500">Roll Number</div>
          <div >{studentData.rollno}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Name</div>
          <div >{studentData.student_name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">
           Email
          </div>
          <div >{studentData.email}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">
          Department
          </div>
          <div >{studentData.department}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">
           Year
          </div>
          <div >{studentData.year}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Current Semester</div>
          <div className="font-medium">{studentData.current_sem}</div>
        </div>
      </div>
      {/* Parent Details */}
      <h3 className="text-md text-gray-600 font-semibold mb-2 mt-5 flex items-center  pb-2 border-b">
        <FaUserTie className="text-gray-500 mr-2" /> Parent Information
      </h3>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <div className="text-sm text-gray-500">Parent Name</div>
          <div>{studentData.parent_name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">
           Parent Email
          </div>
          <div>{studentData.parent_email}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 ">
            Parent Phone
          </div>
          <div >{studentData.parent_phoneno}</div>
        </div>
      </div>

      {/* Mentor Details */}
      <h3 className="text-md text-gray-600 font-semibold mb-2 mt-5 flex items-center  pb-2 border-b">
        <FaUserTie className="text-gray-500 mr-2" /> Mentor Information
      </h3>
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div>
          <div className="text-sm text-gray-500">Mentor Name</div>
          <div >{studentData.mentor_name}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500">Faculty ID</div>
          <div >{studentData.faculty_id}</div>
        </div>
      </div>

      {/* Arrears */}
      <h3 className="text-lg font-semibold text-gray-700 mt-6 flex items-center">
         Arrears
      </h3>
      <div >
        {studentData.arrears === 0
          ? "No Arrears "
          : `${studentData.arrears} Arrears`}
      </div>
    </div>
  );
}
