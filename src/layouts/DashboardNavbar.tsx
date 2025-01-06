import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useAuth } from "../context/AuthContext";
import {
  HiSearch,
  HiBell,
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogout,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi";

interface NavbarProps {
  onMenuClick: () => void;
}

const DashboardNavbar: FC<NavbarProps> = ({ onMenuClick }) => {
  const { user, logout, isLoading } = useAuth();
  const navigate = useNavigate();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const getAvatarName = () => {
    if (user?.given_name && user?.family_name) {
      return `${user.given_name} ${user.family_name}`;
    }
    return user?.preferred_username || user?.email || "";
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Menu button and Logo */}
          <div className="flex items-center">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>

            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <Link
                to="/dashboard"
                className="text-xl font-bold text-gray-800 dark:text-white"
              >
                BookIO
              </Link>
            </div>
          </div>

          {/* Center - Search Bar */}
          <div className="flex-1 max-w-xl px-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-light dark:focus:ring-primary-dark"
                placeholder="Search..."
              />
              <div className="absolute left-3 top-2.5">
                <HiSearch className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Right side - Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <HiOutlineSun className="h-6 w-6" />
              ) : (
                <HiOutlineMoon className="h-6 w-6" />
              )}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                <HiBell className="h-6 w-6" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
                  <div className="px-4 py-2 border-b dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                      No new notifications
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-200 dark:bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-800">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={
                    user?.profile_pic ||
                    `https://ui-avatars.com/api/?name=${getAvatarName()}`
                  }
                  alt=""
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = `https://ui-avatars.com/api/?name=${getAvatarName()}`;
                  }}
                />
              </Menu.Button>

              <Menu.Items className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="px-4 py-2 border-b dark:border-gray-600">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {getAvatarName()}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/dashboard/profile"
                      className={`flex items-center px-4 py-2 text-sm ${
                        active
                          ? "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <HiOutlineUser className="mr-3 h-5 w-5" />
                      Profile
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/dashboard/settings"
                      className={`flex items-center px-4 py-2 text-sm ${
                        active
                          ? "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <HiOutlineCog className="mr-3 h-5 w-5" />
                      Settings
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      className={`flex items-center w-full px-4 py-2 text-sm ${
                        active
                          ? "bg-gray-100 dark:bg-gray-600 text-gray-900 dark:text-white"
                          : "text-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <HiOutlineLogout className="mr-3 h-5 w-5" />
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Menu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
