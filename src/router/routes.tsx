import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import GuestLayout from "../layouts/GuestLayout";
import AuthLayout from "../layouts/AuthLayout";
import ResetPassword from "../components/auth/ResetPassword";

// Lazy load components for better performance
const Home = lazy(() => import("../components/Home"));
const Books = lazy(() => import("../components/Books/Books"));
const Authors = lazy(() => import("../components/Authors/Authors"));
const NotFound = lazy(() => import("../components/NotFound"));
const Login = lazy(() => import("../components/auth/Login"));
const Register = lazy(() => import("../components/auth/Register"));
const ForgotPassword = lazy(() => import("../components/auth/ForgotPassword"));
const Profile = lazy(() => import("../components/auth/Profile"));
const VerifyEmail = lazy(() => import("../components/auth/VerifyEmail"));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: <Books />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export const guestRoutes: RouteObject[] = [
  {
    path: "/",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "verify-email",
        element: <VerifyEmail />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
    ],
  },
];

export const protectedRoutes: RouteObject[] = [
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
      // {
      //   path: 'settings',
      //   element: <Settings />
      // },
      // {
      //   path: 'dashboard',
      //   element: <Dashboard />
      // }
    ],
  },
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...guestRoutes,
  ...protectedRoutes,
];
