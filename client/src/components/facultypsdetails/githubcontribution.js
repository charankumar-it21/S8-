import React, { useState, useEffect } from "react";
import { FaBell, FaEnvelope, FaSort } from "react-icons/fa";
import axios from "axios";

function StudentProfileTable() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortKey, setSortKey] = useState("rollno");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const role = localStorage.getItem("role");
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role === "1") {
          const response = await fetch(
            "http://localhost:8080/protected/get-all-student-data",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ); // Replace with your API URL
          const data = await response.json();
          setStudents(data);
        } else {
          const response = await axios.post(
            "http://localhost:8080/protected/get-mentor-student-data",
            {
              mentor_id: localStorage.getItem("user_id"),
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Sorting function
  const sortedData = [...students].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="w-full max-w-2xl p-5 rounded-md bg-white shadow-md overflow-x-auto">
      <h1 className="text-lg font-medium text-gray-600 mb-4">
        Student Profiles
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {["Roll No", "Name", "Department", "Action"].map((label, index) => (
              <th
                key={index}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                onClick={() =>
                  index < 3 && handleSort(label.toLowerCase().replace(" ", ""))
                }
              >
                <div className="flex items-center">
                  {label} {index < 3 && <FaSort className="ml-1" />}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm text-gray-500">{row.rollno}</td>
              <td className="px-6 py-4 text-sm text-gray-500">{row.name}</td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {row.department}
              </td>
              <td className="px-6 py-4 text-sm flex gap-2">
                <FaBell
                  className="text-blue-500 cursor-pointer"
                  title="Send Notification"
                />
                <FaBell
                  className="text-green-500 cursor-pointer"
                  title="Send Email"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-4 gap-1">
        <button
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          ←
        </button>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            className={`w-8 h-8 rounded-lg ${
              currentPage === index + 1
                ? "bg-[#6777EF] text-white"
                : "text-gray-600 hover:bg-gray-100"
            }`}
            onClick={() => setCurrentPage(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button
          className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          →
        </button>
      </div>
    </div>
  );
}

export default StudentProfileTable;
