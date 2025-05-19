import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export default function CandidateProfiles() {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  const Navigate = useNavigate();

  const categories = [
    "All Categories",
    "Technology",
    "Marketing",
    "Design",
    "Management",
  ];

  const candidates = [
    {
      id: 1,
      name: "Poovarasan S",
      title: "Software Developer",
      batch: "2021-2025",
      department: "CSE",
      rollno: "7376211CS239",
      skills: ["React", "Node.js", "JavaScript"],
      profileImage: "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2864&auto=format&fit=crop", // Replace with actual image
    },
    {
      id: 2,
      name: "Jayaprakash P",
      title: "Backend Developer",
      batch:"2021-2025",
      department: "CSE",
      rollno:"7376211CS169",
      skills: ["Figma", "Adobe XD", "Prototyping"],
      profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop", // Replace with actual image
    },
    {
      id: 3,
      name: "Hari Prasad S",
      title: "Frontend Developer",
      batch:"2021-2025",
      department:"IT",
      rollno:"7376212IT146",
      skills: ["SEO", "Google Ads", "Content Marketing"],
      profileImage: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=2864&auto=format&fit=crop", // Replace with actual image
    },
    {
      id: 4,
      name: "Nivetha M",
      title: "UI/UX",
      batch: "2021-2025",
      department: "IT",
      rollno:"7376212IT196",
      skills: ["SEO", "Google Ads", "Content Marketing"],
      profileImage: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?q=80&w=2864&auto=format&fit=crop", // Replace with actual image
    },
  ];

  useEffect(() => {
    const filtered = candidates.filter((candidate) => {
      const matchesSearch =
        candidate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        candidate.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLocation =
        !locationFilter ||
        candidate.location.toLowerCase().includes(locationFilter.toLowerCase());
      const matchesCategory =
        !categoryFilter ||
        categoryFilter === "All Categories" ||
        candidate.category === categoryFilter;

      return matchesSearch && matchesLocation && matchesCategory;
    });
    setFilteredCandidates(filtered);
  }, [searchTerm, locationFilter, categoryFilter]);

  const handleViewProfile = (rollno) => {
    Navigate(`/candidate-profile/${rollno}`);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 md:p-8">
      <p className="text-xl font-medium text-gray-800 mb-6">Student Profiles</p>
      <form className="mb-8 grid gap-4 md:grid-cols-3">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search candidates"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter location"
            className="w-full rounded-md border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <div className="relative">
          <BsBriefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <select
            className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </form>

      {/* Candidate Profiles Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCandidates.map((candidate) => (
          <div
            key={candidate.id}
            className="relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
          >
            {/* Employment Type */}
            <span className="absolute top-3 left-3 bg-green-100 text-green-600 text-xs font-medium px-2 py-1 rounded">
              {candidate.batch}
            </span>
            <div className="flex justify-center mb-4">
              <img
                src={candidate.profileImage}
                alt={candidate.name}
                className="w-16 h-16 rounded-full"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold">{candidate.name}</h3>
              <p className="text-gray-500">{candidate.rollno}</p>
              <p className="text-sm text-gray-500">
                {candidate.department} 
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap justify-center gap-2 mt-3">
              {candidate.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-violet-100 text-[#6777EF] text-xs font-medium px-2 py-1 rounded"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* View Profile Button */}
            <button
              className="mt-4 w-full bg-[#9da7f3] text-white py-2 rounded-md hover:bg-[#556ee6]"
              onClick={() => handleViewProfile(candidate.rollno)}
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
