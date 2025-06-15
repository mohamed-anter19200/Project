// import React from 'react';
// import { useParams } from 'react-router-dom';
// import useCourseDetails from '../../../hooks/Lecturer/useCourseDetails';
// import Spinner from '../../../components/Spinner/Spinner';
// import SectionTitle from '../../../components/SectionTitle/SectionTitle';
// import LectureCard from '../../../components/LectureCard/LectureCard';

// const CourseDetails = () => {
//   const { _id } = useParams();
//   const { data, isLoading, isError } = useCourseDetails(_id);

 
//   if (isLoading) return <div><Spinner /></div>;
//   if (isError) return <div>Error</div>;

//   return (
//     <div className="course-details-page container p-6 mx-auto">
//       <SectionTitle text={data.courseTitle} />
//       {data.subjects.length > 0 ? (
//         <div className="grid grid-cols-12 gap-4">
//           {data.subjects.map((item) => (
//             <LectureCard key={item._id} {...item} btnName="Lecture" />
//           ))}
//         </div>
//       ) : (
//         <p className='font-bold text-red-500'>No Available Lectures & Sections</p>
//       )}
//     </div>
//   );
// };

// export default CourseDetails;


import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import useCourseDetails from '../../../hooks/Lecturer/useCourseDetails';
import Spinner from '../../../components/Spinner/Spinner';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LectureCard from '../../../components/LectureCard/LectureCard';

const CourseDetails = () => {
  const { _id } = useParams();
  const { data, isLoading, isError } = useCourseDetails(_id);
  const [filter, setFilter] = useState('all'); // all | lecture | section

  if (isLoading) return <div><Spinner /></div>;
  if (isError) return <div>Error</div>;

  // ✅ فلترة حسب النوع
  const filteredSubjects = data.subjects.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'lecture') return item.videoType === 'lec';
    if (filter === 'section') return item.videoType === 'sec';
    return true;
  });

  return (
    <div className="course-details-page container p-6 mx-auto">
      <SectionTitle text={data.courseTitle} />

      {/* ✅ قائمة الفلترة */}
      {/* ✅ قائمة الفلترة */}
      {/* ✅ قائمة الفلترة */}
<div className="mb-6 flex items-center gap-4">
  <label htmlFor="filter" className="text-lg font-medium text-gray-700">
    Filter by:
  </label>
  <select
    id="filter"
    value={filter}
    onChange={(e) => setFilter(e.target.value)}
    className="border border-gray-300 text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition duration-150 ease-in-out"
  >
    <option value="all">All</option>
    <option value="lecture">Lectures</option>
    <option value="section">Sections</option>
  </select>
</div>




      {filteredSubjects.length > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          {filteredSubjects.map((item) => (
            <LectureCard key={item._id} {...item} btnName="Lecture" />
          ))}
        </div>
      ) : (
        <p className="font-bold text-red-500">No Available Lectures or Sections</p>
      )}
    </div>
  );
};

export default CourseDetails;
