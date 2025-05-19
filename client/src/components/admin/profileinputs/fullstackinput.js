import React, { useState, useEffect } from "react";
import { HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import ViewModal from "../../table/fullstackviewmodal";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/academicfilehanle";
import axios from "axios";

const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredItems = data.filter((item) =>
      Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    );
    setFilteredData(filteredItems);
    setCurrentPage(1); // Reset to first page when searching
  }, [data, searchTerm]);

  const handleImport = (importedData) => {
    setData((prevData) => [...prevData, ...importedData]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/protected/get-academic-data",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  // Calculate pagination
  const totalPages = Math.ceil(filteredData.length / ROWS_PER_PAGE);
  const startIndex = (currentPage - 1) * ROWS_PER_PAGE;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + ROWS_PER_PAGE
  );

  return (
    <div className="container mx-auto ">
      <div className="text-xl text-gray-600 font-semibold mb-3">
        <p>Academic Performance Details</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FileHandler onImport={handleImport} data={data} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">S No</th>
              <th className="py-3 px-6 text-left">Roll No</th>
              <th className="py-3 px-6 text-left">CGPA</th>
              <th className="py-3 px-6 text-left">Sem1</th>
              <th className="py-3 px-6 text-left">Sem2</th>
              <th className="py-3 px-6 text-left">Sem3</th>
              <th className="py-3 px-6 text-left">Sem4</th>
              <th className="py-3 px-6 text-left">Sem5</th>
              <th className="py-3 px-6 text-left">Sem6</th>
              <th className="py-3 px-6 text-left">Sem7</th>
              <th className="py-3 px-6 text-left">Sem8</th>
              <th className="py-3 px-6 text-left">Arrears</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={item.roll_no}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.roll_no}</td>
                <td className="py-3 px-6 text-left">{item.cgpa}</td>
                <td className="py-3 px-6 text-left">{item.sem1}</td>
                <td className="py-3 px-6 text-left">{item.sem2}</td>
                <td className="py-3 px-6 text-left">{item.sem3}</td>
                <td className="py-3 px-6 text-left">{item.sem4}</td>
                <td className="py-3 px-6 text-left">{item.sem5}</td>
                <td className="py-3 px-6 text-left">{item.sem6}</td>
                <td className="py-3 px-6 text-left">{item.sem7}</td>
                <td className="py-3 px-6 text-left">{item.sem8}</td>
                <td className="py-3 px-6 text-left">{item.arrears}</td>
                <td className="py-3 px-6 text-left flex space-x-2">
                  <HiEye
                    onClick={() => {
                      setCurrentItem(item);
                      setIsViewModalOpen(true);
                    }}
                    className="cursor-pointer"
                  />
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
