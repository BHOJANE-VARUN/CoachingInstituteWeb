
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { BASE_URL } from '../../contants/Links'


export default function Signin() {
  useEffect(()=>{
    const id = localStorage.getItem("id");
    if(id)
    {
      const varun = localStorage.getItem("role");
      navigate("/"+varun);
    }
  },[])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('')
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault()
    const responce = await fetch((BASE_URL +"/login/"+ role), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Specify the content type if sending JSON
        // Add additional headers if needed, such as Authorization
      },
      body: JSON.stringify({
         role,
         password,
         email,
      })
    })
    const data = await responce.json();
    if(!data.token)
    {
      console.log(data);
      alert("invalid inputs");
      return;
    }
    localStorage.setItem("id",data.token);
    localStorage.setItem("role",data.role);
    navigate("/"+role);
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
          Let's get started
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                Email address
              </label>
              <input 
                id="email" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                Password
              </label>
              <input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-lg font-medium text-gray-700">
                Role
              </label>
              <select 
                id="role" 
                value={role} 
                onChange={(e) => setRole(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select your role</option>
                <option value="student">Student</option>
                <option value="faculty">Faculty</option>
                <option value="cashier">Cashier</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div>
              <button 
                type="submit" 
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md"
              >
                Sign Up
              </button>
            </div>
          </form>

    
        </div>
      </div>
    </div>
  )
}
