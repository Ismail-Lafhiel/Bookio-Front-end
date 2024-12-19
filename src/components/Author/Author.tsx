import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaLinkedinIn,
  FaGlobe,
  FaQuoteLeft,
  FaStar,
  FaUsers,
  FaBookOpen,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import AuthorsData from "../../data/authors";

const Author = () => {
  const { name } = useParams<{ name: string }>();

  const author = AuthorsData.find(
    (author) =>
      author.name.toLowerCase() === decodeURIComponent(name!).toLowerCase()
  );

  if (!author) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Author not found
          </h2>
          <Link
            to="/authors"
            className="text-primary hover:text-primary-dark transition-colors"
          >
            Return to Authors
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Enhanced Header Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/95 mix-blend-multiply" />
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm scale-105"
            style={{ backgroundImage: `url(${author.image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        </motion.div>

        <div className="relative z-10 h-full container mx-auto px-4">
          <div className="h-full flex flex-col justify-between py-8">
            <Link
              to="/authors"
              className="text-white/80 hover:text-white transition-colors inline-flex items-center space-x-2 group"
            >
              <motion.div
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="group-hover:-translate-x-1 transition-transform"
              >
                <FaArrowLeft />
              </motion.div>
              <span>Back to Authors</span>
            </Link>

            <div className="flex items-center space-x-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-40 h-40 rounded-full overflow-hidden border-4 border-white shadow-2xl"
              >
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <div className="flex-1">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="flex items-center space-x-4 mb-2"
                >
                  <h1 className="text-4xl md:text-5xl font-bold text-white">
                    {author.name}
                  </h1>
                  <div className="hidden md:flex space-x-3">
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={author.social.twitter}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <FaXTwitter className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={author.social.linkedin}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <FaLinkedinIn className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                      whileHover={{ y: -2 }}
                      href={author.social.website}
                      className="text-white/70 hover:text-white transition-colors"
                    >
                      <FaGlobe className="w-5 h-5" />
                    </motion.a>
                  </div>
                </motion.div>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="text-xl text-white/90 mb-4"
                >
                  {author.role}
                </motion.p>
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <FaBookOpen className="text-yellow-400 w-5 h-5" />
                    <span className="text-white/90">{author.books} Books</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FaUsers className="text-yellow-400 w-5 h-5" />
                    <span className="text-white/90">
                      {author.followers} Followers
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            {/* About Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md">
              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    About the Author
                  </h2>
                  <FaQuoteLeft className="text-primary/20 w-8 h-8" />
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {author.bio}
                </p>
              </div>
              <div className="grid grid-cols-3 border-t border-gray-100 dark:border-gray-700">
                <div className="p-6 text-center border-r border-gray-100 dark:border-gray-700">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {author.books}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Published Books
                  </div>
                </div>
                <div className="p-6 text-center border-r border-gray-100 dark:border-gray-700">
                  <div className="text-2xl font-bold text-primary mb-1">
                    {author.followers}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Followers
                  </div>
                </div>
                <div className="p-6 text-center">
                  <div className="text-2xl font-bold text-primary mb-1">
                    4.8
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    Average Rating
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Books */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Latest Books
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex space-x-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4"
                  >
                    <div className="w-20 h-28 rounded-lg overflow-hidden shadow-lg">
                      <img
                        src="/book-1.jpg"
                        alt="Book cover"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                        Book Title
                      </h3>
                      <div className="flex items-center space-x-1 mb-2">
                        <FaStar className="text-yellow-400 w-4 h-4" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          4.5
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Published 2023
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-1 space-y-8"
          >
            {/* Connect Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Connect with {author.name.split(" ")[0]}
              </h2>
              <div className="grid grid-cols-3 gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  href={author.social.twitter}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-gray-600 hover:text-primary dark:text-gray-400 flex flex-col items-center justify-center space-y-2"
                >
                  <FaXTwitter className="w-6 h-6" />
                  <span className="text-sm">Twitter</span>
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href={author.social.linkedin}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-gray-600 hover:text-primary dark:text-gray-400 flex flex-col items-center justify-center space-y-2"
                >
                  <FaLinkedinIn className="w-6 h-6" />
                  <span className="text-sm">LinkedIn</span>
                </motion.a>
                <motion.a
                  whileHover={{ y: -2 }}
                  href={author.social.website}
                  className="bg-gray-50 dark:bg-gray-700 p-4 rounded-xl text-gray-600 hover:text-primary dark:text-gray-400 flex flex-col items-center justify-center space-y-2"
                >
                  <FaGlobe className="w-6 h-6" />
                  <span className="text-sm">Website</span>
                </motion.a>
              </div>
            </div>

            {/* Featured Reviews */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Featured Reviews
              </h2>
              <div className="space-y-4">
                {[
                  {
                    text: "One of the most captivating authors of our generation. Every book is a masterpiece.",
                    reviewer: "The Book Review",
                    rating: 5,
                  },
                  {
                    text: "Their writing style is unique and engaging. A true literary genius.",
                    reviewer: "Literary Times",
                    rating: 5,
                  },
                  {
                    text: "Creates worlds that feel real and characters that stay with you.",
                    reviewer: "Readers' Choice",
                    rating: 4.8,
                  },
                ].map((review, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                  >
                    <div className="flex items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm italic mb-3">
                      "{review.text}"
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {review.reviewer}
                      </span>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="text-primary text-sm cursor-pointer hover:underline"
                      >
                        Read Full Review
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Author;