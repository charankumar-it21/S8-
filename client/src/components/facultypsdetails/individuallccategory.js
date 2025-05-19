import React, { useEffect, useState } from "react";
import { FaSort } from "react-icons/fa";

function StudentExamTable({ student }) {
  const [tableData, setTableData] = useState([]);
  const [sortKey, setSortKey] = useState("subject_code");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const toke = localStorage.getItem("token");
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8080/protected/get-result-data", {
          method: "POST", // Change to GET if needed
          headers: {
            Authorization: `Bearer ${toke}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roll_no: student }), // Remove body if GET request
        });
  
        const data = await response.json();
        console.log(data)
        if (Array.isArray(data)) {
          setTableData(data);

        } else {
          setTableData([]);
          console.error("Unexpected API response structure");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    if (student) {
      fetchData();
    }
  }, [student]);
  

  const sortedData = [...tableData].sort((a, b) => {
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
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  return (
    <div className="w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto">
      <h1 className="text-lg font-medium text-gray-600 mb-4">
        Student Exam Results
      </h1>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { label: "S No", key: "sno" },
              { label: "Subject Code", key: "subject_code" },
              { label: "Subject Name", key: "subject_name" },
              { label: "Semester", key: "semester" },
              { label: "Grades", key: "grades" },
              { label: "Result", key: "exam_status" },
            ].map(({ label, key }) => (
              <th
                key={key}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                onClick={() => handleSort(key)}
              >
                <div className="flex items-center">
                  {label}
                  <FaSort className="ml-1" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="px-6 py-4 text-sm text-gray-500">
                {indexOfFirstRow + index + 1}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {row.subject_code}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {row.subject_name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">
                {row.semester}
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">{row.grades}</td>
              <td className="px-6 py-4 text-sm">
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    row.exam_status === "Passed"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {row.exam_status}
                </span>
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

export default StudentExamTable;
