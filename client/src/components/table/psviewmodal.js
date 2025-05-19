import React from 'react';

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">Student Performance Details</h3>
          <div className="mt-2 space-y-2">
            <p className="text-md text-gray-500">
              <strong>Roll Number:</strong> {item.rollno}
            </p>
            <p className="text-md text-gray-500">
              <strong>Name:</strong> {item.name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Total Levels (IT):</strong> {item.totallevels_it}
            </p>
            <p className="text-md text-gray-500">
              <strong>Current Level (IT):</strong> {item.curr_level_it}
            </p>
            <p className="text-md text-gray-500">
              <strong>Total Levels (Aptitude):</strong> {item.totallevels_aptitude}
            </p>
            <p className="text-md text-gray-500">
              <strong>Current Level (Aptitude):</strong> {item.curr_level_apt}
            </p>
            <p className="text-md text-gray-500">
              <strong>Total Levels (Verbal):</strong> {item.totallevels_verbal}
            </p>
            <p className="text-md text-gray-500">
              <strong>Current Level (Verbal):</strong> {item.curr_level_ver}
            </p>
            <p className="text-md text-gray-500">
              <strong>Total Attempts:</strong> {item.totalattempts}
            </p>
            <p className="text-md text-gray-500">
              <strong>Slots Missed:</strong> {item.slotsmissed}
            </p>
            <p className="text-md text-gray-500">
              <strong>Overall Levels Count:</strong> {item.overalllevelscount}
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
