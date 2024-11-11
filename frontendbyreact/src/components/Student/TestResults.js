import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../contants/Links'

const Table = ({ children }) => (
  <div className="overflow-x-auto">
    <div className="min-w-full bg-white border border-gray-300 flex flex-col">
      {children}
    </div>
  </div>
)

const TableHead = ({ children }) => (
  <thead className="bg-gray-200">
    <tr className="flex w-full">{children}</tr>
  </thead>
)

const TableBody = ({ children }) => (
  <div className="flex-1 flex flex-col">{children}</div>
)

const TableHeader = ({ children }) => (
  <th className="flex-1 py-3 px-4 border-b text-left font-bold text-gray-800 uppercase tracking-wider">{children}</th>
)

const TableCell = ({ children, className }) => (
  <div className={`py-2 px-4 border-b ${className}`}>{children}</div>
)

const sampleTestResult = [
  { id: 1, subject: 'Mathematics', marks: 85 },
  { id: 2, subject: 'Science', marks: 92 },
  { id: 3, subject: 'English', marks: 78 },
  { id: 4, subject: 'History', marks: 88 },
  { id: 5, subject: 'Geography', marks: 76 },
]

const TestResults = () => {
  const id = parseInt(localStorage.getItem("id"));
  const [sampleTestResults,setsampleTestResults] = useState(sampleTestResult);
  useEffect(()=>{
    const fetchdata = async ()=>{
      const responce = await fetch((BASE_URL + "/result/student"),{
        method:"POST",
        headers:{
          'Content-Type': 'application/json', 
        },
        body:JSON.stringify({
          id,
        })
      })
      const data = await responce.json();
      setsampleTestResults(data);
    }
    fetchdata();
  },[])
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Test Results</h1>
      <Table>
        <TableHead>
          <TableHeader>Subject</TableHeader>
          <TableHeader>Marks</TableHeader>
          <TableHeader>Date</TableHeader>
        </TableHead>
        <TableBody>
          {sampleTestResults.map((result,index) => (
            <div key={index} className="flex w-full">
              <TableCell className="flex-1">{result.subject_name}</TableCell>
              <TableCell className="flex-1">{result.score}</TableCell>
              <TableCell className="flex-1">{result.date}</TableCell>
            </div>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default TestResults