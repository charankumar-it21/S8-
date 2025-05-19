import React, { useRef } from 'react';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { CSVLink } from 'react-csv';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function PSFileHandler({ onImport, data }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileName = file.name.toLowerCase();
      const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
      const isCSV = fileName.endsWith('.csv');

      if (isExcel) {
        const reader = new FileReader();
        reader.onload = async (e) => {
          try {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);
            await processData(jsonData, event);
          } catch (error) {
            console.error('Error reading Excel file:', error);
            alert('Error processing Excel file.');
          }
        };
        reader.readAsBinaryString(file);
      } else if (isCSV) {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          complete: async (results) => {
            try {
              await processData(results.data, event);
            } catch (error) {
              console.error('Error processing CSV file:', error);
              alert('Error processing CSV file.');
            }
          },
        });
      } else {
        alert('Unsupported file type. Please upload a .csv or .xlsx file.');
      }
    }
  };

  const processData = async (rawData, event) => {
    const transformedData = rawData.map((item) => ({
      rollno: item.rollno || '',
      name: item.name || '',
      email: item.email || '',
      department: item.department || '',
      year: item.year || '',
      current_sem:item.current_sem || '',
      parent_name: item.parent_name || '',
      parent_email: item.parent_email || '',
      parent_phoneno: item.parent_phoneno ? String(item.parent_phoneno) : '',
      mentor_id: item.mentor_id || '',
    }));

    const response = await fetch('http://localhost:8080/protected/add-students', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedData),
    });

    if (!response.ok) {
      throw new Error('Failed to store data in the database');
    }

    onImport(transformedData);
    event.target.value = ''; // Reset file input
  };

  return (
    <div className="flex gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".xlsx,.xls,.csv"
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
        filename="Students_Data.csv"
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </CSVLink>
    </div>
  );
}
