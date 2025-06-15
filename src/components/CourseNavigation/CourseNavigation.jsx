import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from '../SectionTitle/SectionTitle';

const courseData = [
  {
    title: "Subjects",
    description: "Browse through our comprehensive digital library of video lectures delivered by expert faculty members.",
    icon: "fa-solid fa-book-open",
    route: "/student/subjects",
  },
  {
    title: "Sections",
    description: "Explore our course sections for organized access to video lectures, readings, and supplementary materials.",
    icon: "fa-solid fa-folder",
    route: "/student/sections",
  },
];

const CourseNavigation = () => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <section id="CourseNavigation" className="course-navigation mx-auto container px-6 py-12">
      <SectionTitle text={"Course Navigation"}/>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 100 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="content md:flex justify-around mt-6"
      >
        {courseData.map((item, idx) => (
          <article
            key={idx}
            onClick={() => navigate(item.route)}
            className="courseNavigationCard text-center mt-6 md:mt-3 md:w-1/3 p-6 space-y-3 bg-white shadow-xl hover:shadow-2xl transition-shadow cursor-pointer"
          >
            <div className="icon text-blue-600 text-3xl">
              <i className={item.icon}></i>
            </div>
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p>{item.description}</p>
          </article>
        ))}
      </motion.div>
    </section>
  );
};

export default memo(CourseNavigation);
