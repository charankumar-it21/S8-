import React, { useState, useEffect } from "react";
import SearchBar from "../../table/search";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/psfilehandler";
import axios from "axios";

const ROWS_PER_PAGE = 6;

export default function PSslotinputs() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredItems = data.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredData(filteredItems);
    setCurrentPage(1);
  }, [data, searchTerm]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/protected/get-students",
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
        <p>Students Profile</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FileHandler onImport={handleImport} data={data} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal whitespace-nowrap">
              <th className="py-3 px-6 text-left whitespace-nowrap">S No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Roll No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Name</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Email</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Department
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Year</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Current Sem</th>

              <th className="py-3 px-6 text-left whitespace-nowrap">
                Parent Name
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Parent Email
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Parent Phone No
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Mentor ID
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.rollno}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.email}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.department}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.year}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.current_sem}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.parent_name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.parent_email}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.parent_phoneno}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.mentor_id}
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
    </div>
  );
}
