import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import SectionTitle from "../SectionTitle/SectionTitle";
import LectureCard from '../LectureCard/LectureCard';
import useNewest from '../../hooks/Student/useNewest';

export default function NewestUpload() {
  const { data: videos } = useNewest();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="content md:flex justify-around mt-6"
    >
      <section className="container mx-auto py-12 px-4">
        <SectionTitle text={"Newest Uploaded"} />
        <div className="grid grid-cols-12 gap-4">
          {videos ? (
            videos.map((video) => (
              <LectureCard key={video._id} {...video} />
            ))
          ) : (
            <p className="text-center col-span-4">Please wait...</p>
          )}
        </div>
      </section>
    </motion.div>
  );
}
