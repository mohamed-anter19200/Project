import { useEffect, useState } from "react";
import { getSectionsOfSubject } from "../../../API/Student/Student";
import { useParams } from "react-router-dom";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import LectureCard from "../../../components/LectureCard/LectureCard";
import useSectionsOfSubject from "../../../hooks/Student/useSectionsOfSubjects";

export default function SectionsOfSubjects() {
  const { SubjectId } = useParams();
  const { data, isLoading, isError } = useSectionsOfSubject(SubjectId)
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
                <LectureCard key={lecture._id} {...lecture} videoType={"sec"} btnName = {"Section"}/>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No lectures available.</p>
          )}
   </section>
  );
}
