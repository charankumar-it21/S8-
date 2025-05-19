import React,{useEffect,useState} from "react";
import ProfileImage from "../../assets/profileimage.png";
import axios from "axios";

export default function ProfileCard() {
  const [profileCardData, setProfileCardData] = useState([]);
  const rollno = localStorage.getItem("userid");

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.post("http://localhost:8080/protected/get-student-card-data",{
          roll_no:rollno
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setProfileCardData(response.data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, []);


  return (
    <div className="w-full max-w-1xl rounded-md bg-white shadow-md">
      {/* Header Section */}
      <div className="relative h-36 rounded-md bg-[#ccd0ff] p-6">
        <div className="space-y-0.5">
          <h1 className="text-2xl font-semibold text-[#6777EF]">
            Welcome Back!
          </h1>
          <p className="text-lg text-[#6777EF]/80">SAT Dashboard</p>
        </div>
        <img
          src={ProfileImage}
          alt="Decorative illustration"
          className="absolute bottom-0 right-4 h-32 w-auto object-contain"
        />
      </div>

      {/* Profile Section */}
      <div className="relative px-6 pb-6">
        {/* Profile Image */}
        <div className="absolute -top-14 h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=2864&auto=format&fit=crop"
            alt="Profile picture"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Name, Points, and Rank Section */}
        <div className="pt-16 flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          {/* Name and Designation */}
          <div>
            <h2 className="text-2xl font-semibold text-gray-600">
              {profileCardData.name}
            </h2>
            <p className="text-gray-500">{profileCardData.rollno}</p>
          </div>

          {/* Points and Rank */}
          <div className="flex gap-12 sm:gap-16">
           
             <div className="text-center">
              <p className="text-3xl font-bold text-gray-600">{profileCardData.current_sem}</p>
              <p className="text-gray-500">Current Semester</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
