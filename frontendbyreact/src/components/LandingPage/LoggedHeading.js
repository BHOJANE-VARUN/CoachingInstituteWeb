
import React from 'react'
import { COMPANY_LOGO_URL, PLACEHOLDER_AVATAR } from '../../contants/Links'
import { useNavigate } from 'react-router'

const LoggedHeading = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Implement logout logic here
      localStorage.removeItem("id");
      localStorage.removeItem("role");
      navigate("/signin");
  }

  return (
    <header className="sticky top-0 z-50 w-full flex justify-between  bg-white shadow-md h-20 p-2">
      <div className="container ml-32">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src={COMPANY_LOGO_URL}
              alt="Company Logo"
              width={120}
              height={120}
              className="rounded-full"
            />
            <h1 className='text-3xl font-bold'>Bright Path Academy</h1>
          </div>

          {/* Avatar and Logout */}
          <div className="flex items-center justify-between w-44">
              <div 
                className="h-14 w-14 overflow-hidden rounded-full border-2 border-blue-700 cursor-pointer"
              >
                <img
                  src={PLACEHOLDER_AVATAR}
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
            </div>
            <button
                  onClick={handleLogout}
                  className="mt-1 font-bold text-lg p-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
                >
                  Logout
                </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default LoggedHeading