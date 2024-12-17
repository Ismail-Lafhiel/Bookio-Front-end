import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import BaseLayout from "./BaseLayout";

const GuestLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default GuestLayout;
