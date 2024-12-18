import { motion } from "framer-motion";
import { useState } from "react";
import { FaTwitter, FaLinkedinIn, FaGlobe, FaBook } from "react-icons/fa";
import AuthorsData from "../../data/authors";

interface Author {
  name: string;
  role: string;
  image: string;
  books: number;
  followers: string;
  bio: string;
  social: {
    twitter: string;
    linkedin: string;
    website: string;
  };
}

const Authors = () => {
  const [authors, setAuthors] = useState<Author[]>(AuthorsData);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

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
          <div className="absolute inset-0 bg-[url('/library-bg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-3 text-center leading-tight"
          >
            Meet Our <span className="text-yellow-400">Authors</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg text-gray-200 max-w-2xl text-center"
          >
            Discover the talented writers behind our extensive collection of
            books
          </motion.p>
        </div>
      </div>

      {/* Authors Grid */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden"
              >
                <motion.div
                  className="relative h-48 overflow-hidden"
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                >
                  <motion.img
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    src={author.image}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                  />
                </motion.div>

                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {author.name}
                      </h3>
                      <p className="text-primary text-sm font-medium">
                        {author.role}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <motion.a
                        whileHover={{ y: -2 }}
                        className="text-gray-600 hover:text-primary dark:text-gray-400"
                        href={author.social.twitter}
                      >
                        <FaTwitter className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2 }}
                        className="text-gray-600 hover:text-primary dark:text-gray-400"
                        href={author.social.linkedin}
                      >
                        <FaLinkedinIn className="w-4 h-4" />
                      </motion.a>
                      <motion.a
                        whileHover={{ y: -2 }}
                        className="text-gray-600 hover:text-primary dark:text-gray-400"
                        href={author.social.website}
                      >
                        <FaGlobe className="w-4 h-4" />
                      </motion.a>
                    </div>
                  </div>

                  <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm">
                    {author.bio}
                  </p>

                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <FaBook className="text-primary w-4 h-4" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {author.books} Books
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {author.followers} Followers
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="mt-6 w-full bg-gray-100 dark:bg-gray-700 hover:bg-primary hover:text-white dark:hover:bg-primary text-gray-900 dark:text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    View Profile
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="bg-primary text-white font-medium px-8 py-3 rounded-full hover:bg-primary-dark transition-colors duration-200 shadow-md"
            >
              Load More Authors
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Authors;
