import React from 'react'
import useLecturerCourses from '../../hooks/Lecturer/useLecturerCourses'
import Spinner from '../../components/Spinner/Spinner'
import CourseCard from '../../components/CourseCard/CourseCard'
import DashboardTitle from '../../components/DashboardTitle/DashboardTitle'

const LecturerHome = () => {
  const { data, isLoading, isError } = useLecturerCourses();

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading courses</div>;
  if (!data || data.length === 0) return <div>No courses found</div>;

  return (
    <div className="container mx-auto p-6">
      <DashboardTitle title="My Courses" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.map((course) => (
          <CourseCard key={course._id} {...course} />
        ))}
      </div>
    </div>
  )
}

export default LecturerHome