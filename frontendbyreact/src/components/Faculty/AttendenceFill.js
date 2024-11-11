"use client"

import { useEffect, useState } from "react"
import { CalendarIcon, CheckCircle } from "lucide-react"
import {BASE_URL} from "./../../contants/Links"


const subjects = [
  "Mathematics",
  "Physics",
  "Biology",
  "Chemistry",
]

export default function AttendancePage() {
  const [subject, setSubject] = useState(subjects[0])

  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const handleCheckboxChange = (studentId) => {
    setPresentStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch((BASE_URL+"/fillAttendance"),{
      headers:{
        "Content-Type": "application/json",
      },
      method:"POST",
      body:JSON.stringify({
        "presentStudents":presentStudents,
        "subject_name":subject,
      }) 
     
    });
    
  }
  const [students,setstudents] = useState([]);
  const [presentStudents, setPresentStudents] = useState(students.map(student => student.id))
  useEffect(()=>{
    const fetchdata = async ()=>{
      const response = await fetch((BASE_URL+"/allStudents"));
      const data = await response.json();
      setstudents(data);
      setPresentStudents(data.map(d => d.id))
    }
    fetchdata();
  },[])
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Attendance Sheet</h1>
      <form onSubmit={handleSubmit}>
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <h2 className="text-xl font-semibold mb-4">Class Information</h2>
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex-1">
              <label htmlFor="subject" className="block font-medium mb-1">Subject</label>
              <select
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="block w-full border rounded p-2"
              >
                {subjects.map((sub) => (
                  <option key={sub} value={sub}>{sub}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-gray-500">
            <CalendarIcon className="h-4 w-4" />
            <span>{today}</span>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-xl font-semibold mb-4">Student Attendance</h2>
          <div className="overflow-y-auto" style={{ maxHeight: "50vh" }}>
            {students.map((student) => (
              <div key={student.id} className="flex items-center space-x-4 mb-2">
                <input
                  type="checkbox"
                  id={`student-${student.id}`}
                  checked={presentStudents.includes(student.id)}
                  onChange={() => handleCheckboxChange(student.id)}
                  className="form-checkbox h-4 w-4"
                />
                <label htmlFor={`student-${student.id}`} className="flex-1">
                  {student.name}
                </label>
                <span className="text-sm text-gray-500">Roll No: {student.id}</span>
              </div>
            ))}
          </div>
          <button type="submit" className="mt-4 w-full color text-white py-2 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
            <CheckCircle className="mr-2 h-4 w-4" /> Submit Attendance
          </button>
        </div>
      </form>
    </div>
  )
}