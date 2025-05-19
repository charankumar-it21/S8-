import React, { useState, useEffect } from "react";
import { HiPencil, HiEye } from "react-icons/hi";
import SearchBar from "../components/table/search";
import AddEditModal from "../components/achievements/editmodal";
import ViewModal from "../components/achievements/viewmodal";
import Pagination from "../components/achievements/pagination";
import axios from "axios";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";
const ROWS_PER_PAGE = 8;

export default function ApproveAchievements() {
    const navigate = useNavigate();
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
          "http://localhost:8080/protected/get-achievents-details",
          {
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
      Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(lowercasedFilter)
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

  const handleAddnew = () => { 
    navigate("/add-new-achievements")
  }

  return (
    <div className="container mx-auto bg-white shadow-md p-5 rounded-lg">
      <div className="text-xl text-gray-600 font-semibold mb-3">
        <p>Manage Achievements</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <button onClick={handleAddnew} className="flex items-center space-x-2 bg-[#6777EF] text-white py-2 px-4 rounded hover:bg-[#6777EF]/90 transition duration-200">
          <IoIosAddCircleOutline />
          <span>Add New</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase whitespace-nowrap text-sm leading-normal">
              <th className="py-3 px-6 text-left">S No</th>
              <th className="py-3 px-6 text-left">Achievement ID</th>
              <th className="py-3 px-6 text-left">Roll No</th>
              <th className="py-3 px-6 text-left">Student Name</th>
              <th className="py-3 px-6 text-left">Event Name</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">From Date</th>
              <th className="py-3 px-6 text-left">To Date</th>
              <th className="py-3 px-6 text-left">Participation Level</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Geo Tag</th>
              <th className="py-3 px-6 text-left">Certificate</th>
              <th className="py-3 px-6 text-left">Document</th>
              <th className="py-3 px-6 text-left">Approval Status</th>
              <th className="py-3 px-6 text-left">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={item.roll_no}
                className="border-b whitespace-nowrap border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6 text-left">{item.achievement_id}</td>
                <td className="py-3 px-6 text-left">{item.roll_no}</td>
                <td className="py-3 px-6 text-left">{item.student_name}</td>
                <td className="py-3 px-6 text-left">{item.event_name}</td>
                <td className="py-3 px-6 text-left">{item.event_category}</td>
                <td className="py-3 px-6 text-left">
                  {item.event_description}
                </td>
                <td className="py-3 px-6 text-left">{item.from_date}</td>
                <td className="py-3 px-6 text-left">{item.to_date}</td>
                <td className="py-3 px-6 text-left">
                  {item.level_of_participation}
                </td>
                <td className="py-3 px-6 text-left">
                  {item.participation_status}
                </td>
                <td className="py-3 px-6 text-left">{item.geo_tag}</td>
                <td className="py-3 px-6 text-left">
                  {item.certificate_proof}
                </td>
                <td className="py-3 px-6 text-left">{item.document_proof}</td>
                <td className="py-3 px-6 text-left">
                  {item.approval_status === "1" ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-600">
                      Approved
                    </span>
                  ) : item.approval_status === "2" ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-600">
                      Rejected
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-600">
                      Pending
                    </span>
                  )}
                </td>

                <td className="py-3 px-6 text-left flex space-x-2">
                  <HiEye
                    onClick={() => {
                      setCurrentItem(item);
                      setIsViewModalOpen(true);
                    }}
                    className="cursor-pointer"
                  />
                  {/* <HiPencil
                    onClick={() => {
                      setCurrentItem(item);
                      setIsEditModalOpen(true);
                    }}
                    className="cursor-pointer"
                  /> */}
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
          onSubmit={() => {}}
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
