import { motion } from "framer-motion";

const Spinner = () => {
  return (
    <div className="absolute top-0 left-0  flex items-center justify-center h-screen w-screen z-50 bg-black/50">
      <motion.div
        className="w-16 h-16 border-8 border-t-blue-500 border-blue-200 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 1,
        }}
      />
    </div>
  );
};

export default Spinner;
