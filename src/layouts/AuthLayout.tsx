// src/layouts/AuthLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthLayout = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen">
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AuthLayout;
