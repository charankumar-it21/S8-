import axios from "axios";
import React from "react";
import { HiX } from "react-icons/hi";

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen) return null;
  const handleapprove = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/protected/handle-approval",
        {
          achievement_id: item.achievement_id,
        },
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.log(error);
    }
  };
  const role = localStorage.getItem("role");

  const hanldeReject = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:8080/protected/handle-rejection",
        {
          achievement_id: item.achievement_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        onClose(); // Close modal on success
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-[500px] shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-bold text-gray-600">
            Achievement Details
          </h3>
          <div className="mt-2 space-y-2">
            <p className="text-md text-gray-500">
              <strong>Achievement ID:</strong> {item.achievement_id}
            </p>
            <p className="text-md text-gray-500">
              <strong>Roll No:</strong> {item.roll_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Student Name:</strong> {item.student_name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Event Name:</strong> {item.event_name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Event Category:</strong> {item.event_category}
            </p>
            <p className="text-md text-gray-500">
              <strong>Event Description:</strong> {item.event_description}
            </p>
            <p className="text-md text-gray-500">
              <strong>From Date:</strong> {item.from_date}
            </p>
            <p className="text-md text-gray-500">
              <strong>To Date:</strong> {item.to_date}
            </p>
            <p className="text-md text-gray-500">
              <strong>Level Of Participation:</strong>{" "}
              {item.level_of_participation}
            </p>
            <p className="text-md text-gray-500">
              <strong>Participation Status:</strong> {item.participation_status}
            </p>
            <p className="text-md text-gray-500">
              <strong className="mr-2">Geo Tag:</strong>
              <a
                href={`http://localhost:8080/serve-geotag-image/${item.geo_tag}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Click to view
              </a>
            </p>
            <p className="text-md text-gray-500">
              <strong className="mr-2">Certificate:</strong>
              <a
                href={`http://localhost:8080/serve-certificate/${item.certificate_proof}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Click to view
              </a>
            </p>
            <p className="text-md text-gray-500">
              <strong className="mr-2">Report:</strong>
              <a
                href={`http://localhost:8080/serve-report/${item.document_proof}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Click to view
              </a>
            </p>
            <p className="text-md text-gray-500 flex flex-row items-center">
              <strong>Approval Status:</strong>
              {item.approval_status === "1" && (
                <span className="text-green-600 ml-2">Approved</span>
              )}
              {item.approval_status === "2" && (
                <span className="text-red-600 ml-2">Rejected</span>
              )}
              {item.approval_status === "0" && (
                <span className="text-yellow-600 ml-2">Pending</span>
              )}
            </p>
          </div>
          <div className="mt-4 flex justify-end space-x-4">
            {role === "1" && (
              <>
                <button
                  onClick={handleapprove}
                  className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Approve
                </button>

                <button
                  onClick={hanldeReject}
                  className="bg-red-400 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Reject
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
