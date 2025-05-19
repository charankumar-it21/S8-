import React from "react";
import { PiStudentDuotone } from "react-icons/pi";
import { MdWorkOutline } from "react-icons/md";


const OverallPlacement = React.lazy(()=>import("../../components/faculty/overallplacement"));
const OverallFullStackCount = React.lazy(()=>import("../../components/faculty/overallfullstackcount"));
const OverallPSCount = React.lazy(()=>import("../../components/faculty/overallpsdata"));


export default function Facultyhome() {
  const OverallStudents = [
    {
        label: "Total Placed Students",
        value: "500",
        icon: <MdWorkOutline size={24} />,
      },
    {
      label: "NIP Students",
      value: "200",
      icon: <PiStudentDuotone size={24} />,
    },
    {
      label: "Finaly Year Students",
      value: "1900",
      icon: <PiStudentDuotone size={24} />,
    },
   
    {
      label: "Third Year Students",
      value: "2000",
      icon: <PiStudentDuotone size={24} />,
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {OverallStudents.map((data, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 flex items-center justify-between w-full h-28"
          >
            <div>
              <p className="text-gray-600 text-sm font-medium">{data.label}</p>
              <h3 className="text-gray-800 text-xl font-bold">{data.value}</h3>
            </div>
            <div className="bg-[#6777EF] text-white rounded-full p-3 flex items-center justify-center">
              {data.icon}
            </div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 mt-5 gap-6">
      <OverallFullStackCount/>
      </div>
      <div className="mt-5">
      <OverallPSCount/>
      </div>
    </>
  );
}
