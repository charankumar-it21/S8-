import React from 'react'

const StudentsDatatable = React.lazy(()=>import("../../components/admin/profileinputs/addprofileinputs"));
const PSSlotData = React.lazy(()=>import("../../components/admin/profileinputs/psslotinputs"));
const AcademicData = React.lazy(()=>import("../../components/admin/profileinputs/academicinput"));
const FullstackData = React.lazy(()=>import("../../components/admin/profileinputs/fullstackinput"));
const FullstackReviewData = React.lazy(()=>import("../../components/admin/profileinputs/fullstackreviewinput"));
const AttendanceData = React.lazy(()=>import("../../components/admin/profileinputs/attendanceinput"));
const GradesData = React.lazy(()=>import("../../components/admin/profileinputs/Grades"));

export default function Adddetails() {
  return (
    <>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto'>
    <StudentsDatatable/>
    </div>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto mt-10'>
    <AcademicData/>
    </div>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto mt-10'>
    <PSSlotData/>
    </div>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto mt-10'>
    <FullstackData/>
    </div>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto mt-10'>
    <AttendanceData/>
    </div>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto mt-10'>
    <FullstackReviewData/>
    </div>
    <div className='w-full max-w-1xl p-5 rounded-md bg-white shadow-md overflow-x-auto mt-10'>
    <GradesData/>
    </div>
    </>
  )
}
