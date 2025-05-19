import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AddAchievements() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    achievementId: "",
    rollNo: "",
    studentName: "",
    eventName: "",
    eventCategory: "",
    eventDescription: "",
    fromDate: "",
    toDate: "",
    levelOfParticipation: "",
    participationStatus: "",
    geoTag: null,
    certificateProof: null,
    documentProof: null,
    approvalStatus: "0",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    
    try {
      const response = await axios.post(
        "http://localhost:8080/protected/add-new-achievements-details",
        {
          roll_no: formData.rollNo,
          student_name: formData.studentName,
          event_name: formData.eventName,
          event_category: formData.eventCategory,
          event_description: formData.eventDescription,
          from_date: formData.fromDate,
          to_date: formData.toDate,
          level_of_participation: formData.levelOfParticipation,
          participation_status: formData.participationStatus,
          geo_tag: formData.UploadImg,
          certificate_proof: formData.UploadCertificateFiles,
          document_proof: formData.UploadReportFiles,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200) {
        await handleInsert(); // Wait for handleInsert to complete
        navigate("/approve-achievements"); // Navigate only after both API calls are successful
      }
    } catch (error) {
      console.error("Error adding achievement:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleInsert = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8080/protected/add-achievements",
        [
          {
            roll_no: formData.rollNo,
            achievement_name: formData.eventName,
            category: formData.eventCategory,
            description: formData.eventDescription,
            award_level: formData.levelOfParticipation,
            date_awarded: formData.toDate,
          },
        ],
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  
  
  const handleImgFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const token = localStorage.getItem("token");
    if (file) {
      const formData = new FormData();
      formData.append("UploadImg", file);
      try {
        const uploadResponse = await fetch(
          "http://localhost:8080/protected/upload-geotag-image",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const uploadData = await uploadResponse.json();

        const { filename } = uploadData;
        console.log(filename);
        setFormData((prevData) => ({
          ...prevData,
          [name]: filename,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCertificateFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const token = localStorage.getItem("token");
    if (file) {
      const formData = new FormData();
      formData.append("UploadCertificateFiles", file);
      try {
        const uploadResponse = await fetch(
          "http://localhost:8080/protected/upload-certificate",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const uploadData = await uploadResponse.json();

        const { filename } = uploadData;
        console.log(filename);
        setFormData((prevData) => ({
          ...prevData,
          [name]: filename,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleReportFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    const token = localStorage.getItem("token");
    if (file) {
      const formData = new FormData();
      formData.append("UploadReportFiles", file);
      try {
        const uploadResponse = await fetch(
          "http://localhost:8080/protected/upload-report",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );

        if (!uploadResponse.ok) {
          throw new Error("Failed to upload file");
        }

        const uploadData = await uploadResponse.json();

        const { filename } = uploadData;
        console.log(filename);
        setFormData((prevData) => ({
          ...prevData,
          [name]: filename,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCancel = () => {
    navigate("/approve-achievements");
  };


  return (
    <div className="w-auto md:w-2/3 mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-6">
        <h2 className="text-xl text-gray-800 font-semibold mb-2">
          Add Achievement
        </h2>
        <p className="text-gray-600">
          Fill in the required details and upload necessary proofs.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block font-medium">Roll Number</label>
        <input
          type="text"
          name="rollNo"
          placeholder="7376211CS239"
          value={formData.rollNo}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Student Name</label>
        <input
          type="text"
          name="studentName"
          placeholder="Hardeep"
          value={formData.studentName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Event Name</label>
        <input
          type="text"
          name="eventName"
          placeholder="Hackathon 2021"
          value={formData.eventName}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Event Category</label>
        <input
          type="text"
          name="eventCategory"
          placeholder="Technical"
          value={formData.eventCategory}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Event Description</label>
        <textarea
          name="eventDescription"
          placeholder="Participated in Hackathon 2021"
          value={formData.eventDescription}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        ></textarea>

        <label className="block font-medium">From Date</label>
        <input
          type="date"
          name="fromDate"
          value={formData.fromDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">To Date</label>
        <input
          type="date"
          name="toDate"
          value={formData.toDate}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Level of Participation</label>
        <input
          type="text"
          name="levelOfParticipation"
          placeholder="Natinonal"
          value={formData.levelOfParticipation}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Participation Status</label>
        <input
          type="text"
          name="participationStatus"
          placeholder="Winner"
          value={formData.participationStatus}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Geo Tag (Image)</label>
        <input
          type="file"
          name="UploadImg"
          accept="image/*"
          onChange={handleImgFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Certificate Proof (PDF)</label>
        <input
          type="file"
          name="UploadCertificateFiles"
          accept="application/pdf"
          onChange={handleCertificateFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <label className="block font-medium">Document Proof (PDF)</label>
        <input
          type="file"
          name="UploadReportFiles"
          accept="application/pdf"
          onChange={handleReportFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-4 py-2 bg-[#556ee6] text-white rounded-md hover:bg-[#6777EF]/90"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
