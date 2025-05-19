import React from "react";

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen || !item) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">
            Academic Details
          </h3>
          <div className="mt-2 space-y-2">
            <p className="text-md text-gray-500">
              <strong>Roll Number:</strong> {item.roll_no}
            </p>
            <p className="text-md text-gray-500">
              <strong>CGPA:</strong> {item.cgpa}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 1:</strong> {item.sem1}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 2:</strong> {item.sem2}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 3:</strong> {item.sem3}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 4:</strong> {item.sem4}
            </p>

            <p className="text-md text-gray-500">
              <strong>Semester 5:</strong> {item.sem5}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 6:</strong> {item.sem6}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 7:</strong> {item.sem7}
            </p>
            <p className="text-md text-gray-500">
              <strong>Semester 8:</strong> {item.sem8}
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
