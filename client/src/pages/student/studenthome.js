import React from "react";
const Profilecard = React.lazy(() => import("../../components/homepage/profileCard"));
const EmailChart = React.lazy(() => import("../../components/homepage/emailchart"));
const PlacementCards = React.lazy(() => import("../../components/homepage/placementcard"));
const ActiveOffers = React.lazy(() => import("../../components/homepage/offercard"));
const PersonalInfo = React.lazy(()=>import("../../components/homepage/profile"));

const Dashboard = () => {
  return (
    <div className="p-0 sm:p-2 ">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Column 1 */}
        <div className="lg:w-2/5 w-full space-y-6">
          <Profilecard />
        </div>

        {/* Column 2 */}
        <div className="lg:w-3/5 w-full space-y-6">
          <PlacementCards />
        </div>
      </div>
     <div className="w-full max-w-1xl rounded-md bg-white shadow-md">
      <PersonalInfo/>
     </div>
    </div>
  );
};

export default Dashboard;
