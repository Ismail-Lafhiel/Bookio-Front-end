import { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface BaseLayoutProps {
  children: ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar />
      <div className="mx-auto">{children}</div>
      <Footer />
    </div>
  );
};

export default BaseLayout;
