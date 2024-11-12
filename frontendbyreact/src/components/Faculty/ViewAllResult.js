'use client'

import { BASE_URL } from "./../../contants/Links"
import React, { useState, useEffect } from 'react'
import { Calendar } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'

export default function SubjectResultViewer() {
  const [dates, setDates] = useState([])
  const [tests, setTests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchParams] = useSearchParams()
  const subject = searchParams.get("subject") || "Unknown Subject"

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const res = await fetch(`${BASE_URL}/testDates`)
        if (!res.ok) throw new Error('Failed to fetch dates')
        const data = await res.json()
        setDates(data)
        if (data.length > 0) {
          fetchTests(data[0].date)
        }
      } catch (err) {
        setError('Failed to load test dates. Please try again later.')
        setLoading(false)
      }
    }
    fetchDates()
  }, [subject])

  const fetchTests = async (date) => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(`${BASE_URL}/result/date`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "subject_name": subject,
          "date": date,
        })
      })
      if (!response.ok) throw new Error('Failed to fetch test results')
      const data = await response.json()
      setTests(data)
    } catch (err) {
      setError('No test was conducted on this date')
    } finally {
      setLoading(false)
    }
  }

  const handleDateChange = (e) => {
    fetchTests(e.target.value)
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">{subject} Results</h1>
      <div className="flex justify-end mb-6">
        <div className="relative w-full sm:w-64">
          <select
            onChange={handleDateChange}
            className="w-full pl-10 pr-4 py-2 border rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Select test date"
          >
            {dates.map((d, index) => (
              <option key={index} value={d.date}>{d.date}</option>
            ))}
          </select>
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marks</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {tests.map(student => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{student.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!loading && !error && tests.length === 0 && (
        <p className="text-center mt-6 text-gray-500">No students found.</p>
      )}
    </div>
  )
}
