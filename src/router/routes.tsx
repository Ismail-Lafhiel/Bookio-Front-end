import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import GuestLayout from '../layouts/GuestLayout';
import AuthLayout from '../layouts/AuthLayout';
import ForgotPassword from '../components/auth/ForgotPassword';
import Profile from '../components/auth/Profile';
import Register from '../components/auth/Register';
import Login from '../components/auth/Login';
import NotFound from '../components/NotFound';
import About from '../components/About';
import Home from '../components/Home';

export const publicRoutes: RouteObject[] = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '*',
        element: <NotFound />
      }
    ]
  }
];

export const guestRoutes: RouteObject[] = [
  {
    path: '/',
    element: <GuestLayout />,
    children: [
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/forgot-password',
        element: <ForgotPassword />
      }
    ]
  }
];

export const protectedRoutes: RouteObject[] = [
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: '/profile',
        element: <Profile />
      },
    ]
  }
];