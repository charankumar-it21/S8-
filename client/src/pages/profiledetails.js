"use client";

import { FaMapMarkerAlt, FaDollarSign, FaClock } from "react-icons/fa";
import {
  BsCalendar3,
  BsCashStack,
  BsGenderMale,
  BsBook,
  BsGlobe,
} from "react-icons/bs";

export default function ProfilePage() {
  const data = {
    name: "Steven Franklin",
    image:"https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?q=80&w=2864&auto=format&fit=crop",
    profession: "UI/UX Designer",
    skills: ["Freelance", "Active", "Adobe XD", "Figma", "Sketch"],
    location: "California",
    rate: "$87 / hrs",
    workingDays: "5 days working",
    experience: "2+ Years",
    currentSalary: "$ 3451",
    expectedSalary: "$ 4000+",
    gender: "Male",
    qualification: "Master Degree",
    languages: ["English", "French"],
    about: [
      "Very well thought out and articulate communication. Clear milestones, deadlines and fast work. Patience. Infinite patience. No shortcuts. This is a quick example text to build on the card title and bulk the card's content Moltin gives you platform.",
      "As a highly skilled and successful product development and design specialist with more than 4 years of experience, my expertise lies in successfully modifying consumer products specific to interior design and home furnishings.",
    ],
    education: [
      {
        degree: "BCA - Bachelor of Computer Applications",
        institution: "International University",
        years: "2004-2010",
        description:
          "There are many variations of passages of available, but the majority alteration in some form. As a highly skilled and successful specialist with more than 4 years of experience.",
      },
    ],
  };

  return (
    <div className="min-h-screen p-4">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-8 bg-violet-100 p-4">
        <img
          src={data.image}
          alt="Profile"
          className="w-24 h-24 rounded-full mb-4"
        />
        <h1 className="text-2xl font-semibold mb-1">{data.name}</h1>
        <p className="text-gray-600 mb-3">{data.profession}</p>

        {/* Skill Tags */}
        <div className="flex gap-2 flex-wrap justify-center">
          {data.skills.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500 text-white rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Info Bar */}
        <div className="flex gap-6 mt-4 text-gray-600 text-sm">
          <div className="flex items-center gap-1">
            <FaMapMarkerAlt />
            <span>{data.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaDollarSign />
            <span>{data.rate}</span>
          </div>
          <div className="flex items-center gap-1">
            <FaClock />
            <span>{data.workingDays}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Left Sidebar */}
        <div className="bg-white rounded-lg p-6 shadow-sm h-fit">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <BsCalendar3 className="text-blue-500" />
              <div>
                <p className="text-gray-600">Experience:</p>
                <p className="font-medium">{data.experience}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BsCashStack className="text-blue-500" />
              <div>
                <p className="text-gray-600">Current Salary:</p>
                <p className="font-medium">{data.currentSalary}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BsCashStack className="text-blue-500" />
              <div>
                <p className="text-gray-600">Expected Salary:</p>
                <p className="font-medium">{data.expectedSalary}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BsGenderMale className="text-blue-500" />
              <div>
                <p className="text-gray-600">Gender:</p>
                <p className="font-medium">{data.gender}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BsBook className="text-blue-500" />
              <div>
                <p className="text-gray-600">Qualification:</p>
                <p className="font-medium">{data.qualification}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <BsGlobe className="text-blue-500" />
              <div>
                <p className="text-gray-600">Languages:</p>
                <p className="font-medium">{data.languages.join(", ")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="md:col-span-2 space-y-6">
          {/* About Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">About Us</h2>
            {data.about.map((paragraph, index) => (
              <p key={index} className="text-gray-600 mb-4">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Education Section */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Education</h2>
            {data.education.map((edu, index) => (
              <div key={index} className="border-l-2 border-blue-500 pl-4 mb-4">
                <h3 className="font-semibold">{edu.degree}</h3>
                <p className="text-gray-600">
                  {edu.institution} - {edu.years}
                </p>
                <p className="text-gray-600 mt-2">{edu.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
