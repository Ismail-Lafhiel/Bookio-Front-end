import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  HiMenuAlt2, 
  HiSearch, 
  HiBell, 
  HiOutlineCog,
  HiOutlineUser,
  HiOutlineLogout
} from 'react-icons/hi';

interface NavbarProps {
  onMenuClick: () => void;
}

const DashboardNavbar: FC<NavbarProps> = ({ onMenuClick }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md fixed w-full top-0 z-50">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {/* Hamburger menu button */}
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 lg:hidden"
            >
              <HiMenuAlt2 className="h-6 w-6" />
            </button>

            {/* Logo */}
            <div className="flex-shrink-0 flex items-center ml-4 lg:ml-0">
              <span className="text-xl font-bold text-gray-800 dark:text-white">BookIO</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl px-4 hidden md:block">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search..."
              />
              <div className="absolute left-3 top-2.5">
                <HiSearch className="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>

          {/* Right side items */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
                <HiBell className="h-6 w-6" />
              </button>
              
              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
                  <div className="px-4 py-2 border-b dark:border-gray-600">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h3>
                  </div>
                  {/* Notification Items */}
                  <div className="max-h-64 overflow-y-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-600">
                        <div className="text-sm text-gray-700 dark:text-gray-200">
                          New notification message {item}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          2 hours ago
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-2 rounded-full text-gray-600 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=XXXXXXXXXXXXXXXXXXXX&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <span className="hidden md:block text-sm font-medium">John Doe</span>
              </button>

              {/* User Dropdown */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-1">
                  <Link
                    to="/dashboard/profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <HiOutlineUser className="mr-3 h-5 w-5" />
                    Your Profile
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  >
                    <HiOutlineCog className="mr-3 h-5 w-5" />
                    Settings
                  </Link>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => {/* Add logout handler */}}
                  >
                    <HiOutlineLogout className="mr-3 h-5 w-5" />
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
