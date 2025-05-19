import React, { useState, useEffect } from 'react';

export default function PSAddEditModal({ isOpen, onClose, onSubmit, item }) {
  const [formData, setFormData] = useState({
    rollno: '',
    name: '',
    cgpa: 0,
    sem1: 0,
    sem2: 0,
    sem3: 0,
    sem4: 0,
    sem5: 0,
    sem6: 0,
    sem7: 0,
    sem8: 0,
    arrears: 0,
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({
        rollno: '',
        name: '',
        cgpa: 0,
        sem1: 0,
        sem2: 0,
        sem3: 0,
        sem4: 0,
        sem5: 0,
        sem6: 0,
        sem7: 0,
        sem8: 0,
        arrears: 0,
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === 'arrears' || name.startsWith('sem') || name === 'cgpa'
        ? parseFloat(value) || 0
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
          <h3 className="text-lg leading-6 font-medium text-gray-900">{item ? 'Edit' : 'Add'} Academic Data</h3>
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
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cgpa">
                CGPA
              </label>
              <input
                type="number"
                step="0.01"
                name="cgpa"
                id="cgpa"
                value={formData.cgpa}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>

            {[...Array(8).keys()].map((i) => {
              const sem = `sem${i + 1}`;
              return (
                <div className="mb-4" key={sem}>
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={sem}>
                    Semester {i + 1} GPA
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    name={sem}
                    id={sem}
                    value={formData[sem]}
                    onChange={handleChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                </div>
              );
            })}

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="arrears">
                Arrears
              </label>
              <input
                type="number"
                name="arrears"
                id="arrears"
                value={formData.arrears}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>

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
