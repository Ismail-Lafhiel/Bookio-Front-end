// src/router/index.tsx
import { useRoutes } from 'react-router-dom';
import { publicRoutes, protectedRoutes, guestRoutes } from './routes';
import { useAuth } from '../context/AuthContext';

export const AppRouter = () => {
  const { isAuthenticated } = useAuth();

  const routes = [
    ...publicRoutes,
    // Show guest routes only if not authenticated
    ...(!isAuthenticated ? guestRoutes : []),
    // Show protected routes only if authenticated
    ...(isAuthenticated ? protectedRoutes : [])
  ];

  const element = useRoutes(routes);

  return <>{element}</>;
};
