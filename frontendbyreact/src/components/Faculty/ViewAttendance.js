import { useEffect, useState } from "react"
import {BASE_URL} from './../../contants/Links'

// Mock data for demonstration
const students = [
    { rollNo: "001", name: "Alice Johnson", mathematics: 85, physics: 78, biology: 92, chemistry: 88 },
    { rollNo: "002", name: "Bob Smith", mathematics: 92, physics: 95, biology: 88, chemistry: 79 },
    { rollNo: "003", name: "Charlie Brown", mathematics: 78, physics: 82, biology: 90, chemistry: 85 },
    { rollNo: "004", name: "Diana Ross", mathematics: 95, physics: 88, biology: 76, chemistry: 91 },
    { rollNo: "005", name: "Ethan Hunt", mathematics: 89, physics: 93, biology: 87, chemistry: 94 },
  ]
  
  export default function ViewAttendacne() {
    const [students,setstudents] = useState(null);
    useEffect(()=>{
      const varun = async  ()=>{
        const res = await fetch((BASE_URL+"/attendance/allAttendance"));
        const data = await res.json();
        setstudents(data);
      }
      varun();
    },[])
    if(students==null) return <div>Loading...</div>
    return (
      <div className="container mx-auto py-10">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300">
            <caption className="sr-only">Student Attendance Percentage Record</caption>
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 border-b text-left">Roll No</th>
                <th className="px-4 py-2 border-b text-left">Student Name</th>
                <th className="px-4 py-2 border-b text-left">Mathematics</th>
                <th className="px-4 py-2 border-b text-left">Physics</th>
                <th className="px-4 py-2 border-b text-left">Biology</th>
                <th className="px-4 py-2 border-b text-left">Chemistry</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.rollNo} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{student.id}</td>
                  <td className="px-4 py-2 border-b">{student.name}</td>
                  <td className="px-4 py-2 border-b">{formatAttendance(student.Mathematics)}</td>
                  <td className="px-4 py-2 border-b">{formatAttendance(student.Physics)}</td>
                  <td className="px-4 py-2 border-b">{formatAttendance(student.Biology)}</td>
                  <td className="px-4 py-2 border-b">{formatAttendance(student.Chemistry)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  
  function formatAttendance(percentage) {
    return `${percentage}%`
  }