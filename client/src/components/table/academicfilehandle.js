import React, { useRef, useState, useEffect } from 'react';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

export default function PSFileHandler({ onImport ,data}) {
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: async (result) => {
          const transformedData = result.data.map((item) => ({
            faculty_id: item.faculty_id || '',
            name: item.name || '',
            department: item.department || '',
            email: item.email || '',
          }));
  
          try {
            const response = await fetch('http://localhost:8080/protected/add-mentors', {
              method: 'POST',
              headers: {
                'Authorization':`Bearer ${token}`,
                'Content-Type': 'application/json',

              },
              body: JSON.stringify(transformedData),
            });
  
            if (!response.ok) {
              throw new Error('Failed to send data to the server');
            }
  
            const responseData = await response.json();
            console.log('Data successfully inserted:', responseData);
  
            // Optionally notify the parent component
            onImport(transformedData);
          } catch (error) {
            console.error('Error uploading data:', error);
          }
  
          event.target.value = ''; // Reset file input
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };
  

  return (
    <div className="flex gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".csv"
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center gap-2 bg-emerald-600 hover:bg-green-600/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiUpload className="w-5 h-5" />
        Import
      </button>
      <CSVLink
        data={data}
        headers={[
          { label: 'Faculty ID', key: 'faculty_id' },
          { label: 'Name', key: 'name' },
          { label: 'Department', key: 'department' },
          { label: 'Email', key: 'email' },
        ]}
        filename="Mentor_Details.csv"
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </CSVLink>
    </div>
  );
}