import React, { useState } from 'react';
import useAllCourses from '../../../../hooks/Admin/Course/useAllCourses';
import Spinner from '../../../../components/Spinner/Spinner';
import CourseCard from '../../../../components/CourseCard/CourseCard';
import DashboardTitle from '../../../../components/DashboardTitle/DashboardTitle';

const semesters = ["", "First", "Second"];
const levels = ["", "1", "2", "3", "4"];

export default function DisplayAllCourses() {
  const { data, isLoading, isError } = useAllCourses();
  const [semster, setSemster] = useState("");
  const [level, setLevel] = useState("");

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error loading courses</div>;
  if (!data?.courses?.length) return <div>No courses found</div>;

  const filteredCourses = data.courses.filter(({ semster: s, level: l }) =>
    (!semster || s?.toLowerCase() === semster.toLowerCase()) &&
    (!level || l?.toString().trim().slice(-1) === level)
  );

  const renderSelect = (label, value, setter, options) => (
    <div className='flex w-1/2 items-center gap-2'>
      <label className="block text-sm font-medium text-black">{label}</label>
      <select
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="mt-1 px-5 py-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt || 'All'}</option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container mx-auto px-4">
      <DashboardTitle title="All Courses" />
      <div className="flex  justify-between gap-8 mb-6 items-center">
        {renderSelect("Semester", semster, setSemster, semesters)}
        {renderSelect("Level", level, setLevel, levels)}
      </div>
      {filteredCourses.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map(course => (
            <CourseCard key={course._id} {...course} />
          ))}
        </div>
      ) : (
        <p className="text-red-500 font-semibold">No courses match the selected filters.</p>
      )}
    </div>
  );
}
