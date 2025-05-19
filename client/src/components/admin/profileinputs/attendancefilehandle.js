import React, { useRef } from 'react';
import { HiDownload, HiUpload } from 'react-icons/hi';
import { CSVLink } from 'react-csv';
import Papa from 'papaparse';

export default function PSFileHandler({ onImport, data }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: async (result) => {
          const transformedData = result.data.map((item) => ({
            roll_no: item.roll_no || '',
            attendance_percentage: Number(item.attendance_percentage) || 0,
            no_of_days_present: Number(item.no_of_days_present) || 0,
            no_of_days_absent: Number(item.no_of_days_absent) || 0,
            total_working_days: Number(item.total_working_days) || 0,
          }));

          onImport(transformedData);

          try {
            const response = await fetch("http://localhost:8080/protected/add-attendance", {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(transformedData),
            });

            if (response.ok) {
              console.log('Data successfully sent to API');
            } else {
              console.error('Failed to send data to API');
            }
          } catch (error) {
            console.error('Error sending data to API:', error);
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
          { label: 'Roll No', key: 'roll_no' },
          { label: 'Attendance Percentage', key: 'attendance_percentage' },
          { label: 'No. of Days Present', key: 'no_of_days_present' },
          { label: 'No. of Days Absent', key: 'no_of_days_absent' },
          { label: 'Total Working Days', key: 'total_working_days' },
        ]}
        filename="Attendance_Report.csv"
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </CSVLink>
    </div>
  );
}
