import React, { useRef } from "react";
import { HiDownload, HiUpload } from "react-icons/hi";
import * as XLSX from "xlsx";

export default function PSFileHandler({ onImport, data }) {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);

          console.log("Parsed Data:", jsonData); // Debugging

          if (jsonData.length === 0)
            throw new Error("Empty or incorrect file format");

          const transformedData = jsonData.map((item) => ({
            roll_no: item.roll_no || "",
            achievement_name: item.achievement_name || "",
            category: item.category || "",
            description: item.description || "",
            award_level: item.award_level || "",
            date_awarded: item.date_awarded
              ? typeof item.date_awarded === "number"
                ? new Date((item.date_awarded - 25569) * 86400000)
                    .toISOString()
                    .split("T")[0] // Convert Excel serial to YYYY-MM-DD
                : String(item.date_awarded) // Ensure string format
              : "",
          }));

          const response = await fetch(
            "http://localhost:8080/protected/add-achievements",
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
              },
              body: JSON.stringify(transformedData),
            }
          );

          if (!response.ok) {
            throw new Error("Failed to import data");
          }

          onImport(transformedData);
          event.target.value = ""; // Reset file input
        } catch (error) {
          console.error("Error parsing file:", error);
          alert(
            "Error parsing file. Please check the file format and column names."
          );
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "AchievementsData");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "AchievementsData.xlsx";
    link.click();
    URL.revokeObjectURL(url);
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
      <button
        onClick={handleExport}
        className="flex items-center gap-2 bg-[#6777EF] hover:bg-[#6777EF]/90 text-white font-bold py-2 px-4 rounded"
      >
        <HiDownload className="w-5 h-5" />
        Export
      </button>
    </div>
  );
}
