import React from 'react';

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">Mentor Details</h3>
          <div className="mt-2 space-y-2">
            <p className="text-md text-gray-500">
              <strong>Roll No:</strong> {item.roll_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Attendance Percentage:</strong> {item.attendance_percentage}%
            </p>
            <p className="text-md text-gray-500">
              <strong>No of Days Present:</strong> {item.no_of_days_present}
            </p>
            <p className="text-md text-gray-500">
              <strong>No of Days Absent:</strong> {item.no_of_days_absent}
            </p>
            <p className="text-md text-gray-500">
              <strong>Total Working Days:</strong> {item.total_working_days}
            </p>
          </div>
          <div className="mt-4">
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
