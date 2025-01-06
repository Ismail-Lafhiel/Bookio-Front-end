import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome, FaLock } from "react-icons/fa";

const Forbidden = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 403 Animation */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-9xl font-bold bg-gradient-to-r from-primary to-primary bg-clip-text text-transparent">
            403
          </h1>
        </motion.div>

        {/* Error Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Access Forbidden
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg mb-8">
            Sorry! You don't have permission to access this page.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto bg-primary hover:bg-primary text-white font-medium px-8 py-3 rounded-full inline-flex items-center justify-center transition-colors duration-200"
            >
              <FaHome className="mr-2" />
              Back to Home
            </motion.button>
          </Link>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-medium px-8 py-3 rounded-full inline-flex items-center justify-center"
          >
            <FaLock className="mr-2" />
            Restricted Area
          </motion.div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="absolute inset-0 overflow-hidden pointer-events-none"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary rounded-full blur-3xl opacity-10" />
        </motion.div>
      </div>
    </div>
  );
};

export default Forbidden;
