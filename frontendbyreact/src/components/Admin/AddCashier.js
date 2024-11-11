"use client"

import { useEffect, useState } from "react"
import { UserPlus } from "lucide-react"
import { BASE_URL } from "../../contants/Links";


export default function CashierList() {
  const [cashiers, setCashiers] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newCashier, setNewCashier] = useState({ name: "", email: "", password: "" })
  
  useEffect(()=>{
    const fetchdata = async ()=>{
      const responce = await fetch((BASE_URL+"/viewCashier"));
      const data = await responce.json();
      setCashiers(data);
    }
    
    fetchdata();
  },[])
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setNewCashier(prev => ({ ...prev, [name]: value }))
  }

  const handleAddCashier = async (e) => {
    e.preventDefault()
    try {
      await fetch((BASE_URL+"/addCashier"),{
        method:"POST",
        body:JSON.stringify({ "name": newCashier.name, "email": newCashier.email, "password":newCashier.password}),
        headers:{
          'Content-Type': 'application/json', 
        }
      });

  } catch (e) {
    console.log(e);
  }
    const id = cashiers.length > 0 ? Math.max(...cashiers.map(c => c.id)) + 1 : 1
    setCashiers([...cashiers, { id, ...newCashier }])
    setNewCashier({ name: "", email: "", password: "" })
    setIsDialogOpen(false)
  }
  if(cashiers==null)
  {
    return <div>Loading...</div>
  }
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cashier List</h1>
        <button
          onClick={() => setIsDialogOpen(true)}
          className="color text-white px-4 py-2 rounded flex items-center"
        >
          <UserPlus className="mr-2" />
          Add Cashier
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {cashiers.map((cashier) => (
              <tr key={cashier.id}>
                <td className="px-6 py-4 whitespace-nowrap">{cashier.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{cashier.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Add New Cashier</h2>
            <form onSubmit={handleAddCashier} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={newCashier.name}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={newCashier.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={newCashier.password}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsDialogOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white color hover:bg-orange-900"
                >
                  Add Cashier
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}