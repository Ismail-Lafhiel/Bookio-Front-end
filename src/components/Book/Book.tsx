import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowLeft,
  FaStar,
  FaBookOpen,
  FaCalendar,
  FaLayerGroup,
} from "react-icons/fa";
import BooksData from "../../data/books";
import { useState } from "react";

const Book = () => {
  const { title } = useParams<{ title: string }>();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Find the book data
  const book = BooksData.find(
    (book) =>
      book.title.toLowerCase() === decodeURIComponent(title!).toLowerCase()
  );

  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadError(null);

    try {
      const response = await fetch(book?.pdfUrl || "");
      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${book?.title}.pdf`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      setDownloadError("Failed to download the book. Please try again.");
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Book not found
          </h2>
          <Link
            to="/books"
            className="text-primary hover:text-primary-dark transition-colors"
          >
            Return to books page
          </Link>
        </div>
      </div>
    );
  }

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
          <div
            className="absolute inset-0 bg-cover bg-center blur-sm"
            style={{ backgroundImage: `url(${book.cover})` }}
          />
          <div className="absolute inset-0 bg-black/40" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-center container mx-auto px-4">
          <Link
            to="/books"
            className="text-white/80 hover:text-white transition-colors inline-flex items-center space-x-2 mb-6"
          >
            <FaArrowLeft />
            <span>Back to Books</span>
          </Link>
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold mb-3 text-white"
          >
            {book.title}
          </motion.h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex items-center space-x-4 text-white/90"
          >
            <span className="text-yellow-400">By {book.author}</span>
            <div className="flex items-center space-x-1">
              <FaStar className="text-yellow-400" />
              <span>{book.rating}</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Book Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Book Cover and Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-1"
          >
            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-lg">
              <img
                src={book.cover}
                alt={`${book.title} cover`}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col space-y-3 mt-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-primary text-white font-medium py-3 rounded-lg hover:bg-primary-dark transition-colors duration-200 flex items-center justify-center"
              >
                <FaBookOpen className="mr-2" />
                Read Now
              </motion.button>

              <motion.button
                onClick={handleDownload}
                disabled={isDownloading}
                whileHover={{ scale: isDownloading ? 1 : 1.02 }}
                whileTap={{ scale: isDownloading ? 1 : 0.98 }}
                className={`w-full font-medium py-3 rounded-lg flex items-center justify-center transition-colors duration-200 ${
                  isDownloading
                    ? "bg-gray-300 dark:bg-gray-600 cursor-not-allowed"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {isDownloading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Downloading...
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    Download PDF
                  </>
                )}
              </motion.button>

              {downloadError && (
                <p className="text-red-500 text-sm mt-2 text-center">
                  {downloadError}
                </p>
              )}
            </div>
          </motion.div>

          {/* Book Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                About the Book
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                {book.description}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaBookOpen className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Pages
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {book.pages}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaCalendar className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Published
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {book.publishDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <FaLayerGroup className="text-primary w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                      Category
                    </h3>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {book.category}
                    </p>
                  </div>
                </div>
              </div>

              {/* Rating Section */}
              <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Rating
                  </h3>
                  <div className="flex items-center space-x-1">
                    <FaStar className="text-yellow-400 w-5 h-5" />
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      {book.rating}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">/5</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <div
                    className="bg-yellow-400 h-2.5 rounded-full"
                    style={{ width: `${(book.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Book;
