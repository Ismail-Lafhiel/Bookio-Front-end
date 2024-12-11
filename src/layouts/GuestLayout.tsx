// src/layouts/GuestLayout.tsx
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuestLayout = () => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default GuestLayout;
