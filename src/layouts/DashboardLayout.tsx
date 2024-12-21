import { useState, useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";
import DashboardFooter from "./DashboardFooter";
import { LoadingSpinner } from "../components/UI/LoadingSpinner";
import { useAuth } from "../context/AuthContext";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Dashboard Navbar */}
      <DashboardNavbar onMenuClick={toggleSidebar} />

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-64 bg-white dark:bg-gray-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-[calc(100vh-4rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            <Sidebar />
          </div>
        </aside>

        {/* Main Content Wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Main Content */}
          <main className="flex-1 p-4 md:p-6">
            <div className="mx-auto max-w-7xl space-y-6">
              {/* Page Content */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 md:p-6">
                <Outlet />
              </div>
            </div>
          </main>
          {/* Footer */}
          <DashboardFooter />
        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black bg-opacity-50 transition-opacity lg:hidden backdrop-blur-sm"
          onClick={toggleSidebar}
          aria-hidden="true"
        >
          <div className="absolute inset-0" onClick={toggleSidebar} />
        </div>
      )}
    </div>
  );
};

export default DashboardLayout;
