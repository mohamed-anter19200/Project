import React, { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import SubjectCard from "../../../components/SubjectCard/SubjectCard";
import useAllSubjects from "../../../hooks/Student/useAllSubjects";
import Spinner from "../../../components/Spinner/Spinner";

export default function Subjects() {
  const { data: subjects, isLoading, isError } = useAllSubjects();
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");

  if (isLoading || isError)
    return (
      <section className="container px-4 py-12 mx-auto space-y-5">
        <SectionTitle text="Choose a Subject" />
        {isLoading ? <Spinner /> : <p className="text-red-500">Error loading subjects...</p>}
      </section>
    );

  const filteredSubjects = subjects?.filter(({ semster, level: lvl }) => {
    const matchSemester = semester ? semster?.toLowerCase() === semester.toLowerCase() : true;
    const matchLevel = level ? lvl?.toString().trim().slice(-1) === level : true;
    return matchSemester && matchLevel;
  });

  const renderSelect = (label, value, setValue, options) => (
    <div className="flex w-1/2 items-center gap-2">
      <label className="block text-sm font-medium text-black">{label}</label>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  return (
    <section className="container px-4 py-12 mx-auto space-y-5">
      <SectionTitle text="Choose a Subject" />

      <div className="flex ms-10 md:w-1/2 md:justify-between flex-wrap md:flex-nowrap w-full  gap-4 mb-6 items-center">
        {renderSelect("Semester", semester, setSemester, ["First", "Second"])}
        {renderSelect("Level", level, setLevel, ["1", "2", "3", "4"])}
      </div>

      {filteredSubjects?.length ? (
        <div className="section-content grid grid-cols-12 gap-4">
          {filteredSubjects.map((subject) => (
            <SubjectCard
              key={subject._id}
              {...subject}
              btnName="Lectures"
              link={`/student/subject/${subject._id}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No subjects match the selected filters.</p>
      )}
    </section>
  );
}
