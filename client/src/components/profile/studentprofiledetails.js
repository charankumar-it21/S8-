
import React, { useState } from "react";
const Profile = React.lazy(() => import("../../components/profile/profile"));
const Education = React.lazy(() => import("../../components/profile/educationcard"));

export default function PersonalInfo({rollno}) {
  const [activeTab, setActiveTab] = useState("personal");

  const tabs = [
    { id: "personal", label: "Personal Information" },
    { id: "education", label: "Education Information" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "personal":
        return <Profile rollno={rollno}/>;
      case "education":
        return <Education rollno={rollno}/>;
      default:
        return null;
    }
  };

  return (
    <div className="h-fit bg-white p-5 mt-5">
      {/* Navigation */}
      <nav className="mb-6 border-b pb-4">
        <ul className="flex space-x-6 overflow-x-auto">
          {tabs.map((tab) => (
            <li
              key={tab.id}
              className={`cursor-pointer whitespace-nowrap ${
                activeTab === tab.id
                  ? "font-semibold text-[#6777EF]"
                  : "text-gray-600 hover:text-[#6777EF]"
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
              {tab.badge && (
                <span className="ml-1 rounded-full bg-gray-200 px-2 text-xs">
                  {tab.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Content Area */}
      {renderContent()}
    </div>
  );
}
