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
              <strong>Roll No:</strong> {item.student_roll_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester:</strong> {item.semester}
            </p>
            <p className="text-md text-gray-500">
              <strong>Subject Code:</strong> {item.subject_code}
            </p>
            <p className="text-md text-gray-500">
              <strong>Subject Name:</strong> {item.subject_name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Grades:</strong> {item.grades}
            </p>
            <p className="text-md text-gray-500">
              <strong>Exam Type:</strong> {item.exam_type}
            </p>
            <p className="text-md text-gray-500">
              <strong>Exam Status:</strong> {item.exam_status}
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
