import React from 'react'
import useAllDoctors from '../../../../hooks/Admin/Lecturer/useAllDoctors'
import Spinner from '../../../../components/Spinner/Spinner'
import DoctorCard from '../../../../components/DoctorCard/DoctorCard';
import DashboardTitle from '../../../../components/DashboardTitle/DashboardTitle';

export default function DisplayAllLecturers() {
  const {data, isLoading, isError} = useAllDoctors();

  return (
    <div className="container mx-auto px-4">
      <DashboardTitle title="All Lecturers" />
      {isLoading && <Spinner />}
      {isError && <div>Error loading lecturers</div>}
      {data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.doctors.map((doctor) => (
            <DoctorCard key={doctor._id} {...doctor} />
          ))}
        </div>
      )}
    </div>
  )
} 