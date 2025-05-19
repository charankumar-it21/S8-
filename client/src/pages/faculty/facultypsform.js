import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { body } from "framer-motion/client";

export default function AddSuggestion() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rollNo: "",
    comments: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rollN.trim()) newErrors.rollNo = "Roll Number is required";
    if (!formData.comments.trim()) newErrors.comments = "Comments are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8080/protected/add-suggestion",
          {
            roll_no: formData.rollNo,
            comments: formData.comments,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
  
        console.log("Form submitted successfully:", response.data);
        navigate("/faculty-ps-details");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  

  // Handle cancel button
  const handleCancel = () => {
    navigate("/faculty-ps-details");
  };

  return (
    <div className="w-auto md:w-2/3 mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl text-gray-800 font-semibold mb-2">Suggestion Form</h2>
        <p className="text-gray-600">Fill in the required details completely. Review before submitting the form.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Roll Number */}
        <div>
          <label htmlFor="rollNo" className="block font-medium">Roll Number</label>
          <input
            id="rollNo"
            type="text"
            value={formData.rollNo}
            placeholder="7376211CS239"
            onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
            className={`w-full px-3 py-2 border ${errors.rollNo ? "border-red-500" : "border-gray-300"} rounded-md`}
          />
          {errors.rollNo && <p className="text-red-500 text-sm">{errors.rollNo}</p>}
        </div>

        {/* Comments */}
        <div>
          <label htmlFor="comments" className="block font-medium">Comments</label>
          <textarea
            id="comments"
            value={formData.comments}
            placeholder="Enter your detailed suggestions here..."
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className={`w-full px-3 py-2 border ${errors.comments ? "border-red-500" : "border-gray-300"} rounded-md`}
            rows={4}
          ></textarea>
          {errors.comments && <p className="text-red-500 text-sm">{errors.comments}</p>}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#556ee6] text-white rounded-md hover:bg-[#6777EF]/90"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
