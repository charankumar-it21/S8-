import React, { useRef } from "react";
import { HiDownload, HiUpload } from "react-icons/hi";
import { CSVLink } from "react-csv";
import Papa from "papaparse";

export default function FileHandler({ onImport, data }) {
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: async (result) => {
          const jsonData = result.data.map((item) => ({
            user_id: item.user_id || "",
            user_name: item.user_name || "",
            email: item.email || "",
            role: item.role || "3", // Default role is "3" (Student)
          }));

          try {
            const response = await fetch("http://localhost:8080/protected/add-users", {
              method: "POST",
              headers: {
                "Authorization": `Bearer ${token}`, // Updated token
                "Content-Type": "application/json",
              },
              body: JSON.stringify(jsonData),
            });

            if (response.ok) {
              console.log("Data successfully uploaded to the database.");
              onImport(jsonData); // Update the UI with the new data
            } else {
              console.error("Error uploading data:", response.statusText);
            }
          } catch (error) {
            console.error("Error:", error);
          }

          event.target.value = ""; // Reset file input
        },
        header: true,
        skipEmptyLines: true,
      });
    }
  };

  // CSV Headers
  const headers = [
    { label: "User ID", key: "user_id" },
    { label: "User Name", key: "user_name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
  ];

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
        headers={headers}
        filename="users-data.csv"
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </CSVLink>
    </div>
  );
}
