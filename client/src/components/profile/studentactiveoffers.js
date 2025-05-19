import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Offercard({rollno}) {
  const [activeoffer, setActiveoffers] = useState(null); // Changed to null instead of an empty array

  useEffect(() => {
    const fetchplacementoffers = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/protected/get-placementdetails/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setActiveoffers(response.data);
      } catch (error) {
        console.log("Error fetching placement offers:", error);
      }
    };

    if (rollno) {
      fetchplacementoffers();
    }
  }, [rollno]); // Added rollno as a dependency


  // Ensure activeoffer is not null before accessing its properties
  const activeoffers = activeoffer
    ? [
        {
          date: "22 May",
          description: `${activeoffer.placement_offer_1} - ${activeoffer.offer1_lpa} LPA`,
          isHighlighted: true,
        },
      ]
    : [];

  return (
    <div className="w-full max-w-1xl rounded-md bg-white shadow-md p-6">
      <h2 className="mb-6 text-lg font-semibold text-gray-900">
        Placement Offers
      </h2>

      <div className="relative space-y-6">
        <div className="absolute left-1 top-2 h-[calc(100%-24px)] w-[1px] bg-gray-200" />

        {activeoffers.length > 0 ? (
          activeoffers.map((offer, index) => (
            <div key={index} className="flex items-start gap-3">
              <div
                className={`relative z-10 mt-2 h-2 w-2 rounded-full ${
                  offer.isHighlighted ? "bg-[#6777EF]" : "bg-gray-200"
                }`}
              />
              <div className="flex min-w-0 flex-1 flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-600">
                    {offer.date}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{offer.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-gray-500">No offers available.</p>
        )}
      </div>
    </div>
  );
}
