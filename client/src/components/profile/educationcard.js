import React,{useState,useEffect} from "react";
import { FaGraduationCap, FaSchool, FaCalendarAlt } from "react-icons/fa";
import axios from "axios";

export default function Education({rollno}) {
  const [EducationData,setEducationData] = useState([]);
  
  useEffect(() => {
    const fetchEducationdata = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `http://localhost:8080/protected/get-educationdetails/${rollno}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },  
          }
        );
        setEducationData(response.data);
      } catch (error) {
        console.log("Error fetching profile data:", error);
      }
    };
    fetchEducationdata();
  }, []);

  

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 space-y-6">
        {/* Degree */}
        <div>
          <h3 className="text-lg text-gray-600 font-semibold mb-2 flex items-center pb-2 border-b">
            <FaGraduationCap className="text-gray-400 mr-2" />
            Degree
          </h3>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-sm text-gray-500">
                Degree Name
              </div>
              <div>{EducationData.degree_name} - {EducationData.department}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                College Name
              </div>
              <div>{EducationData.clg_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Year of Graduation
              </div>
              <div>{EducationData.year_graduation}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                CGPA
              </div>
              <div>{EducationData.cgpa} / 10</div>
            </div>
          </div>
        </div>

        {/* HSC */}
        <div>
          <h3 className="text-md text-gray-600 font-semibold mb-2 flex items-center  pb-2 border-b">
            <FaSchool className="text-gray-400 mr-2" />
            Higher Secondary Certificate (HSC)
          </h3>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-sm text-gray-500">
                School Name
              </div>
              <div>{EducationData.hsc_school_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Board
              </div>
              <div>{EducationData.hsc_board}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Year of Completion
              </div>
              <div>{EducationData.hsc_year_completed}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500">
                Percentage
              </div>
              <div>{EducationData.hsc_percentage}</div>
            </div>
          </div>
        </div>

        {/* SSLC */}
        <div>
          <h3 className="text-md text-gray-600 font-semibold mb-2 flex items-center pb-2 border-b">
            <FaSchool className="text-gray-400 mr-2" />
            Secondary School Leaving Certificate (SSLC)
          </h3>
          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-sm text-gray-500 ">
                School Name
              </div>
              <div>{EducationData.sslc_school_name}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 ">
                Board
              </div>
              <div>{EducationData.sslc_board}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 ">
                Year of Completion
              </div>
              <div>{EducationData.sslc_year_completed}</div>
            </div>
            <div>
              <div className="text-sm text-gray-500 ">
                Percentage
              </div>
              <div>{EducationData.sslc_percentage}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
