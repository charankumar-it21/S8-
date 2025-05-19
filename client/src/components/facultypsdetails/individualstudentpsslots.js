import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaSort } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

function Individualstudentpsslots({ student }) {
  const [slotdetails, setSlotDetails] = useState([]);
  const [sortKey, setSortKey] = useState("category");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
 
  useEffect(() => {
    const fetchSlotDetails = async () => {
      try {
        const token = localStorage.getItem("token"); 
        const response = await axios.get(
          `http://localhost:8080/protected/get-individual-psslotdata/${student}`, 
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            },
          }
        );
        console.log(response.data);
        if (Array.isArray(response.data)) {
          // Map the response data to match the table structure
          const formattedData = response.data.map((item, index) => ({
            id: index + 1,
            category: item.category,
            level: item.level,
            slotbooked: item.slot_bookedtime,
            status: item.level_status,
            slotmissed: item.slot_missed,
            negativeMarks: item.negative_marks
          }));
          setSlotDetails(formattedData);
        } else {
          console.error("Data is not in expected array format:", response.data);
          setSlotDetails([]); 
        }
      } catch (error) {
        console.error("Error fetching slot details:", error);
      }
    };

    if (student) {
      fetchSlotDetails(); // Fetch data when student is available
    }
  }, [student]);

  // Sorting logic
  const sortedData = [...slotdetails].sort((a, b) => {
    const aValue = a[sortKey];
    const bValue = b[sortKey];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortOrder === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  // Sorting handler
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  // Pagination logic
  const handlePageChange = (newPage) => setCurrentPage(newPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentData = sortedData.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(slotdetails.length / rowsPerPage);

  return (
    <div className="w-full mt-5 max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto">
      <div className="container mx-auto min-h-52">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-md md:text-xl font-medium text-gray-600">
            PS Levels And Slot Status
          </h1>
        </div>

        {slotdetails.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-gray-600">
            <MdCancel size={48} className="text-red-500" />
            <p className="text-lg font-medium mt-2">No data available</p>
          </div>
        ) : (
          <>
            <div className="bg-white overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {["S No", "Category", "Level", "Slot Booked Date", "Status", "Slot Missed", "Negative Marks"].map((header) => (
                        <th
                          key={header.toLowerCase().replace(" ", "")}
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition duration-300 ease-in-out"
                          onClick={() => handleSort(header.toLowerCase().replace(" ", ""))}
                        >
                          <div className="flex items-center">
                            {header}
                            <FaSort className="ml-1" />
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {currentData.map((details, index) => (
                      <tr key={details.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          {index + 1}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">
                          {details.category}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {details.level}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {details.slotbooked}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {details.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {details.slotmissed}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {details.negativeMarks}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center mt-4 gap-1">
              <button
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                ←
              </button>
              {[...Array(totalPages)].map((_, index) => (
                <button
                  key={index + 1}
                  className={`w-8 h-8 rounded-lg ${currentPage === index + 1 ? "bg-[#6777EF] text-white" : "text-gray-600 hover:bg-gray-100"}`}
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
              <button
                className="p-2 text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                →
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Individualstudentpsslots;
