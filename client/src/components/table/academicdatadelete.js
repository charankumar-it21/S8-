import React from 'react';

export default function DeleteConfirmation({ isOpen, onClose, onConfirm, itemName, rollNo }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Confirm Deletion</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">
              Are you sure you want to delete academic data for <strong>{itemName}</strong>.
              This action cannot be undone.
            </p>
          </div>
          <div className="flex items-center justify-center mt-4">
            <button
              onClick={onConfirm}
              className="bg-red-500 hover:bg-red-500/90 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:shadow-outline"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
