import { Link } from "react-router-dom";
import {
  FaHome,
  FaBook,
  FaUsers,
  FaQuestionCircle,
  FaShieldAlt,
  FaFileContract,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaFacebookF,
  FaGithub,
  FaBookOpen,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="flex items-center">
              <FaBookOpen className="h-8 w-8 text-primary" />
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">
                Bookio
              </span>
            </div>
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Your ultimate destination for discovering, reading, and sharing
              books.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary flex items-center gap-2"
                >
                  <FaHome className="h-4 w-4" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/books"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary flex items-center gap-2"
                >
                  <FaBook className="h-4 w-4" />
                  <span>Books</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/authors"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary flex items-center gap-2"
                >
                  <FaUsers className="h-4 w-4" />
                  <span>Authors</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Support
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  to="/help"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary flex items-center gap-2"
                >
                  <FaQuestionCircle className="h-4 w-4" />
                  <span>Help Center</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary flex items-center gap-2"
                >
                  <FaShieldAlt className="h-4 w-4" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/terms"
                  className="text-sm text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary flex items-center gap-2"
                >
                  <FaFileContract className="h-4 w-4" />
                  <span>Terms of Service</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-white">
              Contact Us
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <FaEnvelope className="h-4 w-4" />
                <span>contact@bookio.com</span>
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <FaPhone className="h-4 w-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                <FaMapMarkerAlt className="h-4 w-4" />
                <span>123 Book Street, Reading City, RC 12345</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              © {new Date().getFullYear()} Bookio. All rights reserved.
            </p>
            <div className="flex space-x-6">
              {/* Social Media Links */}
              <a
                href="#"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <span className="sr-only">Facebook</span>
                <FaFacebookF className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <span className="sr-only">Twitter</span>
                <FaXTwitter className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
              >
                <span className="sr-only">GitHub</span>
                <FaGithub className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
