import React, { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

export default function PSAddEditModal({ isOpen, onClose, onSubmit, item }) {
  const [formData, setFormData] = useState({
    rollno: '',
    name: '',
    totallevels_it: 0,
    curr_level_it: 0,
    totallevels_aptitude: 0,
    curr_level_apt: 0,
    totallevels_verbal: 0,
    curr_level_ver: 0,
    totalattempts: 0,
    slotsmissed: 0,
    overalllevelscount: 0,
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        rollno: '',
        name: '',
        totallevels_it: 0,
        curr_level_it: 0,
        totallevels_aptitude: 0,
        curr_level_apt: 0,
        totallevels_verbal: 0,
        curr_level_ver: 0,
        totalattempts: 0,
        slotsmissed: 0,
        overalllevelscount: 0,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name.includes('level') || name.includes('attempts') || name.includes('missed') || name.includes('count')
        ? parseInt(value, 10) || 0
        : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item ? 'Edit' : 'Add'} Student Data</h3>
          <form onSubmit={handleSubmit} className="mt-2 text-left">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rollno">
                Roll Number
              </label>
              <input
                type="text"
                name="rollno"
                id="rollno"
                value={formData.rollno}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {['totallevels_it', 'curr_level_it', 'totallevels_aptitude', 'curr_level_apt', 'totallevels_verbal', 'curr_level_ver', 'totalattempts', 'slotsmissed', 'overalllevelscount'].map((field) => (
              <div className="mb-4" key={field}>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={field}>
                  {field.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </label>
                <input
                  type="number"
                  name={field}
                  id={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>
            ))}

            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {item ? 'Update' : 'Add'}
              </button>
              <button
                onClick={onClose}
                type="button"
                className="bg-red-500 hover:bg-red-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
