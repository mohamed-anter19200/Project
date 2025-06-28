import React, { useState } from "react";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import SubjectCard from "../../../components/SubjectCard/SubjectCard";
import useAllSections from "../../../hooks/Student/useAllSections";
import Spinner from "../../../components/Spinner/Spinner";

export default function Sections() {
  const { data: sections, isLoading, isError } = useAllSections();
  const [semester, setSemester] = useState("");
  const [level, setLevel] = useState("");

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

  if (isLoading) {
    return (
      <section className="container px-4 py-12 mx-auto space-y-5">
        <SectionTitle text="Choose a Section" />
        <Spinner />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="container px-4 py-12 mx-auto space-y-5">
        <SectionTitle text="Choose a Section" />
        <p className="mt-4 text-red-500">Error loading Sections...</p>
      </section>
    );
  }

  const filteredSections = sections?.filter(({ semster, level: lvl }) => {
    const matchSemester = semester ? semster?.toLowerCase() === semester.toLowerCase() : true;
    const matchLevel = level ? lvl?.toString().trim().slice(-1) === level : true;
    return matchSemester && matchLevel;
  });

  return (
    <section className="container px-4 py-12 mx-auto space-y-5">
      <SectionTitle text="Choose a Section" />

       <div className="flex md:w-1/2 md:justify-between flex-wrap md:flex-nowrap w-full gap-4  md:gap-8  items-center">
        {renderSelect("Semester", semester, setSemester, ["First", "Second"])}
        {renderSelect("Level", level, setLevel, ["1", "2", "3", "4"])}
      </div>

      {filteredSections?.length ? (
        <div className="section-content grid grid-cols-12 gap-4">
          {filteredSections.map((subject) => (
            <SubjectCard
              key={subject._id}
              {...subject}
              btnName="Sections"
              link={`/student/section/${subject._id}`}
            />
          ))}
        </div>
      ) : (
        <p className="mt-4 text-gray-500">No subjects match the selected filters.</p>
      )}
    </section>
  );
}
