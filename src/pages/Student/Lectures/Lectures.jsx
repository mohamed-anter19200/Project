import { useParams } from 'react-router-dom';
import useAllLectures from '../../../hooks/Student/useAllLectures';   
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import LectureCard from '../../../components/LectureCard/LectureCard';

export default function Lectures() {
  const { id } = useParams();
  sessionStorage.setItem("Lectures ID", id);
  const { data, isLoading, isError } = useAllLectures(id);
  if (isLoading) {
    return <p className="text-center text-gray-600">Loading lectures...</p>;
  }
  if (isError || !data) {
    return <p className="text-center text-red-600">An error occurred while loading lectures.</p>;
  }

  const { lectures, courseTitle } = data;

  return (
    <section className="container mx-auto px-4 py-12">
      <SectionTitle text={courseTitle} />

      {lectures.length > 0 ? (
        <div className="grid grid-cols-12 gap-4">
          {lectures.map((lecture) => (
            <LectureCard key={lecture._id} {...lecture} videoType={"lec"} btnName = {"Lecture"}/>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No lectures available.</p>
      )}
    </section>
  );
}
