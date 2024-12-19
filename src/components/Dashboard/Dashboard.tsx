import {
  HiOutlineUsers,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineClock,
} from "react-icons/hi";
import StatCard from "./Stats/StatCard";
import BookCard from "./Stats/BookCard";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Users",
      value: "2,543",
      icon: <HiOutlineUsers className="w-6 h-6" />,
      change: 12,
      changeText: "vs last month",
      changeType: "increase" as const,
    },
    {
      title: "Active Books",
      value: "1,325",
      icon: <HiOutlineBookOpen className="w-6 h-6" />,
      change: 8,
      changeText: "vs last month",
      changeType: "increase" as const,
    },
    {
      title: "Total Revenue",
      value: "$45,234",
      icon: <HiOutlineChartBar className="w-6 h-6" />,
      change: 5.2,
      changeText: "vs last month",
      changeType: "decrease" as const,
    },
    {
      title: "Avg. Session Duration",
      value: "2.5 hrs",
      icon: <HiOutlineClock className="w-6 h-6" />,
      change: 3,
      changeText: "vs last month",
      changeType: "increase" as const,
    },
  ];

  const popularBooks = [
    {
      title: "The Midnight Library",
      author: "Matt Haig",
      rating: 4.5,
      borrowCount: 234,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/81YzHKeWq7L.jpg",
      category: "Fiction",
    },
    {
      title: "Atomic Habits",
      author: "James Clear",
      rating: 4.8,
      borrowCount: 189,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg",
      category: "Self-Help",
    },
    {
      title: "Project Hail Mary",
      author: "Andy Weir",
      rating: 4.7,
      borrowCount: 156,
      coverImage:
        "https://images-na.ssl-images-amazon.com/images/I/91Bd7P8UwxL.jpg",
      category: "Sci-Fi",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
            An overview of your library system's performance and statistics.
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="bg-primary-light dark:bg-primary-dark inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
            Download Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Popular Books Section */}
      <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg">
        <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">
            Popular Books
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Most borrowed books this month
          </p>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularBooks.map((book, index) => (
              <BookCard key={index} {...book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
