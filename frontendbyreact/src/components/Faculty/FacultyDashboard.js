import { UserCheck, Bell, Calendar, FileText } from "lucide-react";
import { useNavigate } from "react-router";

export default function FacultyDashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-10">Faculty Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div onClick={() => navigate('attendancefill')} className="border rounded-lg p-7 hover:shadow-lg bg-white cursor-pointer">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-2xl font-bold">Submit Attendance</div>
            <UserCheck className="h-8 w-8  text-gray-500" color="#FF531A"/>
          </div>
          <p className="text-lg  text-gray-500">Record student attendance</p>
        </div>
        <div onClick={() => navigate('addnotice')} className="border rounded-lg p-7 hover:shadow-lg bg-white cursor-pointer">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-2xl font-bold">Notice</div>
            <Bell className="h-8 w-8  text-gray-500" color="#FF531A"/>
          </div>
          <p className="text-lg  text-gray-500">View and post important notices</p>
        </div>
        <div onClick={()=> navigate('subjectresults')} className="border rounded-lg p-7 hover:shadow-lg bg-white cursor-pointer">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-2xl font-bold">View Result</div>
            <FileText className="h-8 w-8  text-gray-500" color="#FF531A"/>
          </div>
          <p className="text-lg  text-gray-500">Manage student results</p>
        </div>
        <div onClick={()=> navigate('fillresult')} className="border rounded-lg p-7 hover:shadow-lg bg-white cursor-pointer">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-2xl font-bold">Fill Result</div>
            <FileText className="h-8 w-8  text-gray-500" color="#FF531A"/>
          </div>
          <p className="text-lg  text-gray-500">submit student results</p>
        </div>
        <div onClick={()=> navigate('viewattendance')} className="border rounded-lg p-7 hover:shadow-lg bg-white cursor-pointer">
          <div className="flex flex-row items-center justify-between pb-2">
            <div className="text-2xl font-bold">View Attendance</div>
            <UserCheck className="h-8 w-8  text-gray-500" color="#FF531A"/>
          </div>
          <p className="text-lg  text-gray-500">view student attendance</p>
        </div>
      </div>
    </div>
  );
}
