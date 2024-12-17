import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
