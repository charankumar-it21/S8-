import React, { useRef } from 'react';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

export default function PSFileHandler({ onImport, data }) {
  const fileInputRef = useRef(null);
  const API_ENDPOINT = 'http://localhost:8080/protected/add-academic-data'; 

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          const transformedData = result.data.map((item) => ({
            roll_no: item.roll_no || '',
            cgpa: parseFloat(item.cgpa) || 0,
            sem1: parseFloat(item.sem1) || 0,
            sem2: parseFloat(item.sem2) || 0,
            sem3: parseFloat(item.sem3) || 0,
            sem4: parseFloat(item.sem4) || 0,
            sem5: parseFloat(item.sem5) || 0,
            sem6: parseFloat(item.sem6) || 0,
            sem7: parseFloat(item.sem7) || 0,
            sem8: parseFloat(item.sem8) || 0,
            arrears: parseInt(item.arrears) || 0,
          }));

          // Send data to API
          fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(transformedData),
          })
            .then((response) => response.json())
            .then((data) => console.log('Data saved:', data))
            .catch((error) => console.error('Error:', error));

          onImport(transformedData);
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
          { label: 'Roll No', key: 'roll_no' },
          { label: 'CGPA', key: 'cgpa' },
          { label: 'Semester 1', key: 'sem1' },
          { label: 'Semester 2', key: 'sem2' },
          { label: 'Semester 3', key: 'sem3' },
          { label: 'Semester 4', key: 'sem4' },
          { label: 'Semester 5', key: 'sem5' },
          { label: 'Semester 6', key: 'sem6' },
          { label: 'Semester 7', key: 'sem7' },
          { label: 'Semester 8', key: 'sem8' },
          { label: 'Arrears', key: 'arrears' },
        ]}
        filename="Student_Academic_Performance.csv"
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </CSVLink>
    </div>
  );
}
