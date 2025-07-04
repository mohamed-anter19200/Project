import React, { useContext } from 'react'
import useDeleteCourse from '../../hooks/Admin/Course/useDeleteCourse';
import { userContext } from '../../context/User.context';
import { useNavigate } from 'react-router-dom';
import useAllDoctors from '../../hooks/Admin/Lecturer/useAllDoctors';

export default function CourseCard({ semster, level, courseName, courseCode , _id, doctorId}) {
  const { mutate: deleteCourse } = useDeleteCourse();
  const {role} = useContext(userContext)
  const navigate = useNavigate()

  
  const { data } = useAllDoctors();
  const doctor = data?.doctors?.find(doctor => doctor._id === doctorId[0]);
  // const firstName = doctor?.firstName;
  // const lastName = doctor?.lastName;
  const doctorName = `${doctor?.firstName} ${doctor?.lastName}`;
  //console.log(firstName, lastName);

   return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="font-semibold capitalize text-gray-800">{courseName}</h3>
          <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {courseCode}
          </span>
        </div>

        <div className="flex justify-between gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
             <span>Semester : {semster}</span>
          </div>
          <div className="flex items-center gap-1">
            <span>Level : {level.slice(level.length - 1)}</span>
          </div>
        </div>

         <div>
         {role === "admin" && (
          <div className="flex  justify-between gap-2 mt-2">
                   <div>
                    <h2> <span className='font-semibold'>Doctor : </span>  {doctor ? doctorName : ""}</h2>
                  </div>
                  <div>
                  <i className="fas fa-trash text-red-600 cursor-pointer" onClick={() => deleteCourse(_id)}></i>
                 </div>
          </div>
         )}
        {role === "doctor" && (
          <div className="flex gap-2 mt-2">
             <button className='btn' onClick={() => navigate(`/lecturer/course-details/${_id}`)}>View Details</button>
          </div>
        )}
         </div>
      </div>
    </div>
  )
} 