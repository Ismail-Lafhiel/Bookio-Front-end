import { Navigate, Outlet } from "react-router-dom";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useAuth } from "../context/AuthContext";
import BaseLayout from "./BaseLayout";

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

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
    <BaseLayout>
      <Outlet />
    </BaseLayout>
  );
};

export default AuthLayout;
