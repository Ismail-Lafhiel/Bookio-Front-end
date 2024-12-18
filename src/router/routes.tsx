import { RouteObject } from "react-router-dom";
import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import GuestLayout from "../layouts/GuestLayout";
import AuthLayout from "../layouts/AuthLayout";
import ResetPassword from "../components/Auth/ResetPassword";

// Lazy load components for better performance
const Home = lazy(() => import("../components/Home/Home"));
const Books = lazy(() => import("../components/Books/Books"));
const Book = lazy(() => import("../components/Book/Book"));
const Authors = lazy(() => import("../components/Authors/Authors"));
const Author = lazy(() => import("../components/Author/Author"));
const NotFound = lazy(() => import("../components/NotFound"));
const Login = lazy(() => import("../components/Auth/Login"));
const Register = lazy(() => import("../components/Auth/Register"));
const ForgotPassword = lazy(() => import("../components/Auth/ForgotPassword"));
const Profile = lazy(() => import("../components/Auth/Profile"));
const VerifyEmail = lazy(() => import("../components/Auth/VerifyEmail"));

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
        path: "/books/:title",
        element: <Book />,
      },
      {
        path: "/authors",
        element: <Authors />,
      },
      {
        path: "/authors/:name",
        element: <Author />,
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
