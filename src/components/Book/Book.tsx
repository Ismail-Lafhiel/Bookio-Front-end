import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const Book = () => {
  // Get the title parameter from the URL
  const { title } = useParams<{ title: string }>();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="relative h-[40vh] overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/book-bg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-3 text-center leading-tight"
          >
            {decodeURIComponent(title)}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center space-x-2"
          >
            <span className="text-yellow-400">By Author Name</span>
          </motion.div>
        </div>
      </div>

      {/* Book Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="aspect-[2/3] rounded-lg overflow-hidden shadow-lg">
              <img
                src="/placeholder-book-cover.jpg"
                alt={`${title} cover`}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About the Book
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Book description goes here...
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Published
                  </h3>
                  <p className="text-gray-900 dark:text-white">2023</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Pages
                  </h3>
                  <p className="text-gray-900 dark:text-white">324</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Genre
                  </h3>
                  <p className="text-gray-900 dark:text-white">Fiction</p>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    Language
                  </h3>
                  <p className="text-gray-900 dark:text-white">English</p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200"
              >
                Read Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Book;
