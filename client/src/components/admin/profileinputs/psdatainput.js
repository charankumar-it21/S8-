import React, { useState, useEffect } from "react";
import { HiPencil, HiTrash, HiEye } from "react-icons/hi";
import SearchBar from "../../table/search";
import AddEditModal from "../../table/pseditmodal";
import ViewModal from "../../table/psviewmodal";
import DeleteConfirmation from "../../table/deletemodal";
import Pagination from "../../table/pagenation";
import FileHandler from "../../table/psfilehandler";

const PSLevelsData = [
    {rollno:"7376211CS239",name:"Poovarasan S",totallevels_it:10,curr_level_it:11,totallevels_aptitude:3,curr_level_apt:4,totallevels_verbal:2,curr_level_ver:3,totalattempts:5,slotsmissed:2,overalllevelscount:15},
    {rollno:"7376211CS248",name:"Praveenraja S K",totallevels_it:8,curr_level_it:9,totallevels_aptitude:5,curr_level_apt:6,totallevels_verbal:3,curr_level_ver:4,totalattempts:2,slotsmissed:1,overalllevelscount:16},
    {rollno:"7376211CS245",name:"Prasad N",totallevels_it:10,curr_level_it:11,totallevels_aptitude:3,curr_level_apt:4,totallevels_verbal:2,curr_level_ver:3,totalattempts:5,slotsmissed:2,overalllevelscount:15},
    {rollno:"7376211CS169",name:"Jayaprakash P",totallevels_it:15,curr_level_it:16,totallevels_aptitude:5,curr_level_apt:6,totallevels_verbal:5,curr_level_ver:6,totalattempts:0,slotsmissed:1,overalllevelscount:20},
    {rollno:"7376212IT146",name:"Hariprasad S",totallevels_it:8,curr_level_it:9,totallevels_aptitude:2,curr_level_apt:3,totallevels_verbal:5,curr_level_ver:6,totalattempts:6,slotsmissed:4,overalllevelscount:15},
    {rollno:"7376212IT196",name:"Nivetha M",totallevels_it:10,curr_level_it:11,totallevels_aptitude:4,curr_level_apt:5,totallevels_verbal:1,curr_level_ver:2,totalattempts:10,slotsmissed:2,overalllevelscount:15},

]

const index = 1;

const ROWS_PER_PAGE = 6;

export default function Table() {
  const [data, setData] = useState(PSLevelsData);
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleEdit = (editedItem) => {
    setData(
      data.map((item) => (item.rollno === editedItem.rollno ? editedItem : item))
    );
    setIsEditModalOpen(false);
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
    setIsDeleteModalOpen(false);
  };

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
        <p>PS Levels Data</p>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <FileHandler onImport={handleImport} data={data} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left whitespace-nowrap">S No</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Rollno</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Name</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Total IT Levels
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Current IT Levels
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Total Aptitude Levels</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Current Aptitude Levels
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Total Verbal Levels
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Current Verbal Levels
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Total Re-Attempts</th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Slots Missed
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">
                Total Levels Completed
              </th>
              <th className="py-3 px-6 text-left whitespace-nowrap">Action</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-md font-normal">
            {paginatedData.map((item, index) => (
              <tr
                key={item.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {(currentPage - 1) * ROWS_PER_PAGE + index + 1}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.rollno}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.name}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.totallevels_it}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.curr_level_it}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.totallevels_aptitude}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.curr_level_apt}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.totallevels_verbal}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.curr_level_ver}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.totalattempts}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.slotsmissed}
                </td>
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {item.overalllevelscount}
                </td>
                <td className="py-3 px-6 text-center">
                  <div className="flex item-center justify-center">
                    <button
                      className="transform text-[#6777EF] mr-3"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsViewModalOpen(true);
                      }}
                    >
                      <HiEye className="w-5 h-5" />
                    </button>
                    <button
                      className="transform text-green-600 mr-3"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsEditModalOpen(true);
                      }}
                    >
                      <HiPencil className="w-5 h-5" />
                    </button>
                    <button
                      className="transform text-red-600"
                      onClick={() => {
                        setCurrentItem(item);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      <HiTrash className="w-5 h-5" />
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

      {isDeleteModalOpen && (
        <DeleteConfirmation
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={() => handleDelete(currentItem.id)}
          itemName={currentItem.name}
        />
      )}
    </div>
  );
}
