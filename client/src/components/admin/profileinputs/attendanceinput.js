import React, { useState, useEffect } from "react";
import axios from "axios";
import { HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import ViewModal from "./attendanceDataview";
import Pagination from "../../table/pagenation";
import PSFileHandler from "./attendancefilehandle";

const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/protected/get-attendance",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleImport = (importedData) => {
    setData((prevData) => [...prevData, ...importedData]);
  };

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredItems = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredData(filteredItems);
    setCurrentPage(1);
  }, [data, searchTerm]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  return (
    <div className="container mx-auto">
      <div className="text-xl text-gray-600 font-semibold mb-3">
        <p>Attendance Details</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <PSFileHandler onImport={handleImport} data={data} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left whitespace-nowrap">S No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Roll No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Attendance %</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Days Present</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Days Absent</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Total Days</th>
              <th className="py-3 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={item.roll_no}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {startIndex + index + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.roll_no}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.attendance_percentage}%
                </td>
                <td className="py-3 px-6 text-left">{item.no_of_days_present}</td>
                <td className="py-3 px-6 text-left">{item.no_of_days_absent}</td>
                <td className="py-3 px-6 text-left">{item.total_working_days}</td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center space-x-3">
                    <button
                      className="transform text-[#6777EF]"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      {isViewModalOpen && (
        <ViewModal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          item={currentItem}
        />
      )}
    </div>
  );
}
