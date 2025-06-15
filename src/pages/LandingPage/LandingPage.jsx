import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const features = [
  {
    icon: "fas fa-video",
    title: "Video Lectures",
    description: "Access high-quality recorded lectures from expert faculty members"
  },
  {
    icon: "fas fa-book",
    title: "Course Materials",
    description: "Download and study from comprehensive course materials and resources"
  },
  {
    icon: "fas fa-users",
    title: "Interactive Sessions",
    description: "Participate in live interactive sessions with professors and peers"
  }
];

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-6 py-20">
        <motion.div 
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-800 mb-6">
            Welcome to <span className="text-blue-600">EduConnect</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Your gateway to digital education at Tanta University. Access lectures, recorded sessions, and academic resources with ease.
          </p>
          <div className="flex  sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn !px-8 !py-3"
               >
                Login
              </motion.button>
            </Link>
            <Link to="/signup">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn !px-8 !py-3">
                Sign Up
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>

      <div className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Why Choose EduConnect?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-blue-50 rounded-xl p-8 text-center hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <i className={`${feature.icon} text-4xl text-blue-600 mb-4`}></i>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">© 2024 EduConnect - Tanta University. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
