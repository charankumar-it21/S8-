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
            student_roll_no: item.student_roll_no || '',
            semester: item.semester || '',
            subject_code: item.subject_code || '',
            subject_name: item.subject_name || '',
            grade: item.grade || '',
            exam_type: item.exam_type || '',
            exam_status: item.exam_status || '',
          }));

          onImport(transformedData);

          try {
            const response = await fetch("http://localhost:8080/protected/add-grades", {
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
          { label: 'Student Roll No', key: 'student_roll_no' },
          { label: 'Semester', key: 'semester' },
          { label: 'Subject Code', key: 'subject_code' },
          { label: 'Subject Name', key: 'subject_name' },
          { label: 'Grades', key: 'grades' },
          { label: 'Exam Type', key: 'exam_type' },
          { label: 'Exam Status', key: 'exam_status' },
        ]}
        filename="Student_Grades_Report.csv"
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </CSVLink>
    </div>
  );
}
