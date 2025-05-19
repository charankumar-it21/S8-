import React from 'react';
import { HiX } from 'react-icons/hi';

export default function ViewModal({ isOpen, onClose, item }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3">
          <h3 className="text-lg leading-6 font-medium text-gray-600">User Details</h3>
          <div className="mt-2">
            <p className="text-md text-gray-500">
              <strong>User ID:</strong> {item.user_id}
            </p>
            <p className="text-md text-gray-500">
              <strong>User Name:</strong> {item.user_name}
            </p>
            <p className="text-md text-gray-500">
              <strong>Email:</strong> {item.email}
            </p>
            <p className="text-md text-gray-500">
              <strong>Role:</strong>
              {item.role==="1" && (
                <span className="text-green-500 ml-2">Admin</span>
              )}
              {item.role==="2" && (
                <span className="text-blue-500 ml-2">Faculty</span>
              )}
              {item.role==="3" && (
                <span className="text-blue-500 ml-2">Student</span>
              )}
              {item.role==="4" && (
                <span className="text-blue-500 ml-2">Parent</span>
              )}
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

