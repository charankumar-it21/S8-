import React, { useState, useEffect } from "react";
import { HiPencil, HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import AddEditModal from "../../table/addeditmodal";
import ViewModal from "../../table/viewmodal";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/filehandler";
import axios from "axios";

const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/protected/get-users", // Updated API endpoint
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

  const handleImport = async (importedData) => {
    try {
      const response = await fetch(
        "http://localhost:8080/protected/add-users", // Updated API endpoint
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify([
            {
              user_id: importedData.user_id,
              user_name: importedData.user_name,
              email: importedData.email,
              role: importedData.role,
            },
          ]),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to import data");
      }

      const retrievedResponse = await fetch(
        "http://localhost:8080/protected/get-users", // Updated API endpoint
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!retrievedResponse.ok) {
        throw new Error("Failed to retrieve data");
      }

      const retrievedData = await retrievedResponse.json();
      setData(retrievedData);
    } catch (error) {
      console.error("Error importing or retrieving data:", error);
    }
  };

  const handleEdit = (editedItem) => {
    setData(
      data.map((item) =>
        item.user_id === editedItem.user_id ? editedItem : item
      )
    );
    setIsEditModalOpen(false);
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
        <p>Manage Users</p>
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
              <th className="py-3 px-6 text-left">User ID</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Role</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={item.user_id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.user_id}</td>
                <td className="py-3 px-6 text-left">{item.user_name}</td>
                <td className="py-3 px-6 text-left">{item.email}</td>
                <td className="py-3 px-6 text-left">
                  {item.role === "1" && <span>Admin</span>}
                  {item.role === "2" && <span>Faculty</span>}
                  {item.role === "3" && <span>Student</span>}
                  {item.role === "4" && <span>Parent</span>}
                </td>
                <td className="py-3 px-6 text-left flex space-x-2">
                  <HiEye
                    onClick={() => {
                      setCurrentItem(item);
                      setIsViewModalOpen(true);
                    }}
                    className="cursor-pointer"
                  />

                  <HiPencil
                    onClick={() => {
                      setCurrentItem(item);
                      setIsEditModalOpen(true);
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
      {isEditModalOpen && (
        <AddEditModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSubmit={handleEdit}
          item={currentItem}
        />
      )}

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
