import React, { useEffect, useState } from 'react'
import {BASE_URL} from "./../../contants/Links"

const Select = ({ label, value, onChange, options }) => (
  <div className="mb-6">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <select
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
)

const Input = ({ label, type, value, onChange }) => (
  <div className="mb-4">
    <label className="block text-sm font-semibold text-gray-700 mb-2">
      {label} <span className="text-red-500">*</span>
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required
      className="w-full px-3 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
    />
  </div>
)

const StudentRow = ({ student, onMarksChange }) => (
  <div className="flex items-center space-x-4 mb-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition duration-150 ease-in-out">
    <div className="flex-1">
      <p className="text-lg font-semibold text-gray-800">{student.name}</p>
      <p className="text-sm text-gray-600">Roll No: {student.id}</p>
    </div>
    <div className="w-24">
      <Input
        
        label="Marks"
        type="text"
        value={student.marks}
        onChange={(e) => onMarksChange(student.id, e.target.value)}
      />
    </div>
  </div>
)

const sampleStudents = [
  { id: 1, name: 'Alice Johnson', rollNo: '001', marks: "" },
  { id: 2, name: 'Bob Smith', rollNo: '002', marks: "" },
  { id: 3, name: 'Charlie Brown', rollNo: '003', marks: "" },
  { id: 4, name: 'Diana Ross', rollNo: '004', marks: "" },
  { id: 5, name: 'Ethan Hunt', rollNo: '005', marks: "" },
]

const subjects = [
  { value: 'Mathematics', label: 'Mathematics' },
  { value: 'Biology', label: 'Biology' },
  { value: 'Chemistry', label: 'Chemistry' },
  { value: 'Physics', label: 'Physics' },
]

const StudentMarksEntry = () => {
  const [selectedSubject, setSelectedSubject] = useState(subjects[0].value)
  const [students, setStudents] = useState(sampleStudents)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  useEffect(()=>{
    const fetchdata = async ()=>{
      const res = await fetch((BASE_URL+"/allStudents"));
      const data = await res.json();
      setStudents(data);
    }
    fetchdata();
  },[])
  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value)
  }

  const handleMarksChange = (studentId, marks) => {
    setStudents(students.map(student =>
      student.id === studentId ? { ...student, marks: Number(marks) } : student
    ))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    setSubmitMessage('')

    // Check if all marks are filled and valid
    const allMarksValid = students.every(student => student.marks >= 0 && student.marks<=20 )
    if (!allMarksValid) {
      setSubmitError('Please enter valid marks (0 or above and 20 or below) for all students.')
      return
    }

    // Here you would typically send the data to a server
    let ids = [];
    let mar = [];
    for(let x of students){
        ids.push(x.id);
        mar.push(x.marks);
    }
    const response = await fetch((BASE_URL+"/result/insertScores"),{
      method:"POST",
      headers:{
          'Content-Type': 'application/json',
      },
      body:JSON.stringify({
          "id":ids,
          "subject_name":selectedSubject,
          "test_scores":mar,
      })
    })
    setSubmitMessage('Marks submitted successfully!')
    setTimeout(() => setSubmitMessage(''), 3000) // Clear message after 3 seconds
    window.location.reload();
  }

  return (
    <div className="container mx-auto p-6 max-w-3xl bg-gray-100 mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Student Marks Entry</h1>
      <form onSubmit={handleSubmit}>
        <Select
          label="Select Subject"
          value={selectedSubject}
          onChange={handleSubjectChange}
          options={subjects}
        />
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Student List</h2>
          <div className="space-y-4">
            {students.map((student) => (
              <StudentRow
                key={student.id}
                student={student}
                onMarksChange={handleMarksChange}
              />
            ))}
          </div>
        </div>
        <div className="mt-8 text-center p-4  rounded-lg shadow-sm">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Submit Marks
          </button>
          {submitMessage && (
            <p className="mt-4 text-green-600 font-semibold">{submitMessage}</p>
          )}
          {submitError && (
            <p className="mt-4 text-red-600 font-semibold">{submitError}</p>
          )}
        </div>
      </form>
      <p className="mt-4 text-sm text-gray-600 text-center">
        <span className="text-red-500">*</span> All fields are required
      </p>
    </div>
  )
}

export default StudentMarksEntry