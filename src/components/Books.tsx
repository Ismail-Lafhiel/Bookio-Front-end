import { motion } from "framer-motion";
import { useState } from "react";
import { FaSearch, FaStar } from "react-icons/fa";

interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  description: string;
  rating: number;
  category: string;
  publishDate: string;
  pages: number;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([
    {
      id: "1",
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      cover: "/book-1.jpg",
      description:
        "A vibrant portrait of the Jazz Age and a searching look at the American Dream. Through the story of Jay Gatsby's desperate pursuit of his lost love...",
      rating: 4.5,
      category: "Classic",
      publishDate: "2023",
      pages: 324,
    },
    {
      id: "2",
      title: "Dune",
      author: "Frank Herbert",
      cover: "/book-2.jpg",
      description:
        "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, heir to a noble family tasked with ruling an inhospitable world where the only thing of value is the 'spice' melange...",
      rating: 5,
      category: "Science",
      publishDate: "2021",
      pages: 688,
    },
    {
      id: "3",
      title: "Pride and Prejudice",
      author: "Jane Austen",
      cover: "/book-3.jpg",
      description:
        "The story follows the main character Elizabeth Bennet as she deals with issues of manners, upbringing, morality, education, and marriage in the society of the landed gentry of early 19th-century England...",
      rating: 4.7,
      category: "Classic",
      publishDate: "2020",
      pages: 432,
    },
    {
      id: "4",
      title: "The Innovators",
      author: "Walter Isaacson",
      cover: "/book-4.jpg",
      description:
        "The Innovators is Walter Isaacson's revealing story of the people who created the computer and the Internet. What were the talents that allowed certain inventors and entrepreneurs to turn their visionary ideas into disruptive realities?",
      rating: 4.3,
      category: "Biography",
      publishDate: "2022",
      pages: 560,
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", "Classic", "Fiction", "Science", "Biography"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
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
            Discover Your Next{" "}
            <span className="text-yellow-400">Adventure</span>
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-lg text-gray-200 max-w-2xl text-center"
          >
            Explore our vast collection of hand-picked books curated just for
            you
          </motion.p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-6 relative z-20">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 transition-colors duration-300"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title, author, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100
                             focus:outline-none focus:ring-2 focus:ring-primary/50 pl-10 text-sm
                             transition-colors duration-300"
                />
                <FaSearch className="w-4 h-4 text-gray-400 dark:text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2" />
              </div>
            </div>
            <button
              className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark 
                               transition-colors duration-300 text-sm font-medium"
            >
              Search
            </button>
          </div>
        </motion.div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((category) => (
            <motion.button
              key={category}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm
                  ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </motion.button>
          ))}
        </div>

        {/* Books Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {books
            .filter(
              (book) =>
                selectedCategory === "All" || book.category === selectedCategory
            )
            .map((book) => (
              <motion.div key={book.id} variants={item} className="relative">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden
                    shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                    hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)]
                    transition-all duration-300"
                >
                  <div className="relative h-[280px] group overflow-hidden rounded-t-lg">
                    <img
                      src={book.cover}
                      alt={book.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-gray-300">{book.author}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <FaStar
                            key={i}
                            className={`w-4 h-4 ${
                              i < book.rating
                                ? "text-yellow-400"
                                : "text-gray-300 dark:text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {book.pages} pages
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-3">
                      {book.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Published {book.publishDate}
                      </span>
                      <button
                        className="px-3 py-1 bg-primary text-white text-sm rounded 
                         hover:bg-primary-dark transition-colors duration-300"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Books;
