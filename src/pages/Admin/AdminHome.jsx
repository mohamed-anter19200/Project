import React from 'react'
const AdminHome = () => {
  return (
      <div className="flex-1 transition-all duration-300">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Total Courses</h2>
              <p className="text-3xl font-bold text-blue-600">24</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Active Lecturers</h2>
              <p className="text-3xl font-bold text-green-600">12</p>
            </div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Total Students</h2>
              <p className="text-3xl font-bold text-purple-600">156</p>
            </div>
          </div>
       </div>
    
  )
}

export default AdminHome
