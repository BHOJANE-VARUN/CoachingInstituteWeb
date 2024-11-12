import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { BASE_URL } from '../../contants/Links';

const PayFees = ()=> {
  const navigate = useNavigate();
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Smith", totalFees: 10000, paidFees: 6000 },
    { id: 2, name: "Bob Johnson", totalFees: 12000, paidFees: 4000 },
    { id: 3, name: "Charlie Brown", totalFees: 9000, paidFees: 7500 },
  ])
  useEffect(()=>{
    const fetchdata = async ()=>{
        const response = await fetch(BASE_URL+"/fees/allFees");
        const rawdata = await response.json();
        setStudents(rawdata);
    }
    fetchdata();
  },[]);
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [paymentAmount, setPaymentAmount] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const openPayForm = (student) => {
    setSelectedStudent(student)
    setPaymentAmount('')
    setErrorMessage('')
  }

  const closePayForm = () => {
    setSelectedStudent(null)
    setPaymentAmount('')
    setErrorMessage('')
  }

  const handlePayment = async () => {
    if (selectedStudent && paymentAmount) {
      const amount = parseFloat(paymentAmount)
      const remainingFees = selectedStudent.totalFees - selectedStudent.paidFees

      if (isNaN(amount) || amount <= 0) {
        setErrorMessage('Please enter a valid payment amount.')
      } else if (amount > remainingFees) {
        setErrorMessage(`Payment amount cannot exceed the remaining fees of ${remainingFees.toFixed(2)}.`)
      } else {
        await fetch((BASE_URL+"/fees/payFees"),{
          method:"POST",
          headers: {
            "Content-Type": "application/json",
          },
          body:JSON.stringify({
            "id": selectedStudent.id,
            "feesAmount": amount
        }),
        })
        closePayForm();
        window.location.reload();
      }
    }
  }

  const handlePaymentChange = (e) => {
    setPaymentAmount(e.target.value)
    setErrorMessage('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Fees Management</h1>
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-200">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Paid Fees</th>
            <th className="px-4 py-2 text-left">Remaining Fees</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr
              key={student.id}
              className="hover:bg-gray-100 cursor-pointer"
              onClick={() => openPayForm(student)}
            >
              <td className="px-4 py-2">{student.name}</td>
              <td className="px-4 py-2">₹{student.paidFees.toFixed(2)}</td>
              <td className="px-4 py-2">₹{(student.totalFees - student.paidFees).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Pay Fees for {selectedStudent.name}</h2>
            <p className="mb-2">Remaining Fees: ₹{(selectedStudent.totalFees - selectedStudent.paidFees).toFixed(2)}</p>
            <input
              type="number"
              value={paymentAmount}
              onChange={handlePaymentChange}
              placeholder="Enter amount to pay"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mb-2"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-2">{errorMessage}</p>
            )}
            <div className="flex justify-end space-x-2">
              <button
                onClick={closePayForm}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Confirm Payment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default PayFees;
