import React, { useState, useEffect } from 'react';

export default function ReviewEditModal({ isOpen, onClose, onSubmit, item }) {
  const [formData, setFormData] = useState({
    reviewer_name: '',
    reviewer_email: '',
    department: '',
    venue: '',
    date: '',
    time: '',
  });

  useEffect(() => {
    if (item) {
      setFormData({
        reviewer_name: item.reviewer_name || '',
        reviewer_email: item.reviewer_email || '',
        department: item.rev_department || '', // Fixed key
        venue: item.rev_venue || '', // Fixed key
        date: item.date || '',
        time: item.time ? item.time.slice(0, 5) : '', // Convert "HH:MM:SS" to "HH:MM"
      });
    } else {
      setFormData({
        reviewer_name: '',
        reviewer_email: '',
        department: '',
        venue: '',
        date: '',
        time: '',
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { ...item, ...formData }; // Merge old & new data
    onSubmit(updatedData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item ? 'Edit' : 'Add'} Review Data</h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            {[
              { label: 'Reviewer Name', name: 'reviewer_name' },
              { label: 'Reviewer Email', name: 'reviewer_email' },
              { label: 'Department', name: 'department' },
              { label: 'Venue', name: 'venue' },
              { label: 'Date', name: 'date', type: 'date' },
              { label: 'Time', name: 'time', type: 'time' },
            ].map(({ label, name, type = 'text' }) => (
              <div className="mb-4" key={name}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={name}>
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  id={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            ))}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {item ? 'Update' : 'Add'}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
