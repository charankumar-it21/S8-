import React from 'react';
import { HiSearch } from 'react-icons/hi';

export default function SearchBar({ searchTerm, setSearchTerm }) {
  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search..."
        className="w-64 pl-10 pr-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="absolute left-3 top-2 text-gray-400">
        <HiSearch className="w-5 h-5" />
      </div>
    </div>
  );
}

