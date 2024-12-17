import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import {
  FaSearch,
  FaBook,
  FaBookReader,
  FaGlobe,
  FaMobileAlt,
  FaStar,
  FaArrowRight,
  FaQuoteLeft,
  FaAward,
} from "react-icons/fa";
import { BiBookHeart } from "react-icons/bi";
import { MdAutoStories } from "react-icons/md";

const Home = () => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const staggerContainer = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <BiBookHeart className="text-5xl text-primary" />,
      title: "Vast Library",
      description: "Access over 1 million books across all genres",
      color: "bg-blue-50 dark:bg-blue-900/20",
    },
    {
      icon: <MdAutoStories className="text-5xl text-primary" />,
      title: "Smart Reading",
      description: "Personalized recommendations based on your interests",
      color: "bg-green-50 dark:bg-green-900/20",
    },
    {
      icon: <FaMobileAlt className="text-5xl text-primary" />,
      title: "Read Anywhere",
      description: "Sync your progress across all your devices",
      color: "bg-purple-50 dark:bg-purple-900/20",
    },
  ];

  const popularCategories = [
    { name: "Fiction", count: "25,430", color: "from-blue-500 to-blue-600" },
    { name: "Science", count: "12,750", color: "from-green-500 to-green-600" },
    {
      name: "Business",
      count: "8,340",
      color: "from-purple-500 to-purple-600",
    },
    { name: "History", count: "15,890", color: "from-red-500 to-red-600" },
    {
      name: "Technology",
      count: "10,230",
      color: "from-yellow-500 to-yellow-600",
    },
    { name: "Arts", count: "7,890", color: "from-pink-500 to-pink-600" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section with Parallax */}
      <div ref={scrollRef} className="relative h-screen overflow-hidden">
        <motion.div style={{ y, opacity }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary-dark/95 mix-blend-multiply" />
          <div className="absolute inset-0 bg-[url('/library-bg.jpg')] bg-cover bg-center" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-primary/40"></div>
        </motion.div>
        <div className="relative h-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl"
            >
              <motion.h1
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Welcome to <span className="text-yellow-400">Bookio</span>
              </motion.h1>
              <motion.p
                className="text-xl md:text-2xl text-gray-100 mb-12"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Your Digital Library, Available Anytime, Anywhere
              </motion.p>

              <motion.div
                animate={{
                  scale: isSearchFocused ? 1.02 : 1,
                }}
                className="max-w-2xl mx-auto relative"
              >
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search by title, author, or ISBN..."
                    className="w-full px-8 py-6 rounded-full bg-white/95 backdrop-blur-sm focus:bg-white text-gray-800 focus:outline-none focus:ring-4 focus:ring-yellow-400/30 transition-all duration-300 shadow-xl text-lg pr-16"
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-primary text-white p-3 rounded-full cursor-pointer"
                    >
                      <FaSearch className="text-xl" />
                    </motion.div>
                  </div>
                </div>

                {/* Trending Searches */}
                <div className="mt-4 flex items-center justify-center gap-2 text-white">
                  <span className="text-sm text-white font-bold drop-shadow-xl">
                    Trending:
                  </span>
                  {["Fantasy", "Self-Help", "Mystery"].map((term, index) => (
                    <motion.span
                      key={term}
                      whileHover={{ scale: 1.05 }}
                      className="text-sm bg-primary px-3 py-1 rounded-full cursor-pointer hover:bg-primary-dark transition-colors"
                    >
                      {term}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <motion.div
                className="w-1 h-3 bg-white/50 rounded-full mt-2"
                animate={{ y: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="relative -mt-20 z-10 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
          >
            {[
              { number: "1M+", label: "Books", icon: <FaBook /> },
              { number: "500K+", label: "Readers", icon: <FaBookReader /> },
              { number: "50K+", label: "Authors", icon: <FaGlobe /> },
              { number: "4.9", label: "Rating", icon: <FaStar /> },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl"
              >
                <div className="text-primary mb-2">{stat.icon}</div>
                <motion.div
                  className="text-3xl font-bold text-gray-900 dark:text-white"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      {/* Popular Categories */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              Explore Categories
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Find Your Next Great Read
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
          >
            {popularCategories.map((category, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 text-white cursor-pointer transform transition-transform duration-300`}
              >
                <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                <p className="text-white/80 text-sm">{category.count} books</p>
                <FaArrowRight className="mt-4 text-white/60" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              The Ultimate Reading Experience
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`${feature.color} rounded-2xl p-8 text-center hover:shadow-2xl transition-all duration-300`}
              >
                <motion.div
                  className="flex justify-center mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Books Carousel */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <span className="text-primary font-semibold text-sm tracking-wider uppercase">
              Featured Books
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-2">
              Trending This Week
            </h2>
            <div className="w-24 h-1 bg-primary mx-auto mt-4 rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group relative rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="aspect-w-3 aspect-h-4">
                  <img
                    src={`/book-${index + 1}.jpg`}
                    alt="Book cover"
                    className="object-cover w-full h-full transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-bold">Book Title</h3>
                  <p className="text-white/80 text-sm">Author Name</p>
                  <div className="flex items-center mt-2">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="w-4 h-4 text-yellow-400" />
                    ))}
                    <span className="ml-2 text-white/80 text-sm">4.5</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Section */}
      <div className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl"
          >
            <FaQuoteLeft className="text-6xl text-primary/20 absolute top-4 left-4" />
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto"
              >
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 italic mb-8">
                  "Bookio has transformed how I read. The personalized
                  recommendations and seamless reading experience across all my
                  devices make it the perfect digital library."
                </p>
                <div className="flex items-center justify-center">
                  <img
                    src="/avatar.jpg"
                    alt="User"
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="ml-4 text-left">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      Sarah Johnson
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      Book Enthusiast
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-12 text-center relative overflow-hidden"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-3xl mx-auto"
            >
              <FaAward className="text-6xl text-white/20 mx-auto mb-6" />
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Start Your Reading Journey Today
              </h2>
              <p className="text-xl text-white/90 mb-8">
                Get unlimited access to our entire collection with a Bookio
                membership. First month free!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary font-bold px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-white transition-all duration-300 shadow-xl"
              >
                Join Now
              </motion.button>
            </motion.div>
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10" />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Home;
