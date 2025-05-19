import React, { useState, useEffect } from "react";
import { HiX } from "react-icons/hi";
import axios from "axios";
export default function AddEditModal({ isOpen, onClose, onSubmit, item }) {
  const [role, setRole] = useState("");

  useEffect(() => {
    if (item) {
      setRole(item.role || "");
    }
  }, [item]);

  const handleChange = (e) => {
    setRole(e.target.value);
  };
  const user_id = item.user_id;
  const token = localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/protected/update-users",
        {
          role: role,
          user_id: user_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
        onSubmit(); 
        onClose();     
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Request Failed:", error);
      }
    }
  };
  

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[400px] relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <HiX size={20} />
        </button>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          {item ? "Edit" : "Add"} User Role
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-1"
              htmlFor="role"
            >
              Role
            </label>
            <select
              name="role"
              id="role"
              value={role} // ✅ Fixed: using "role" instead of "formData.role"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Faculty</option>
              <option value="3">Student</option>
              <option value="4">Parent</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="submit"
              className="bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {item ? "Update" : "Add"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 hover:bg-red-500/90 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
