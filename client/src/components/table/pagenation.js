import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex items-center justify-center mt-4 gap-2">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HiChevronLeft className="w-5 h-5" />
      </button>
      <div className="flex items-center justify-center w-10 h-10 bg-[#6777EF] text-white rounded-lg">
        {currentPage}
      </div>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <HiChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}

