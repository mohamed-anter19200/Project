import React from 'react'
import useDeleteDoctor from '../../hooks/Admin/Lecturer/useDeleteDoctor';
export default function DoctorCard({ firstName, lastName, _id}) {
 const { mutate: deleteDoctor } = useDeleteDoctor();
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div className="doctor-card-info"> 
          <h3 className="font-semibold text-gray-800">{firstName} {lastName}</h3>
        </div>
        
        <div className='cursor-pointer' onClick={() => deleteDoctor(_id)}>
          <i className="fas fa-trash text-red-600"></i>
        </div>
      </div>
    </div>
  )
} 