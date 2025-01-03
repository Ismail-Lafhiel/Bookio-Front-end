import { RouteObject } from "react-router-dom";
import { lazy } from "react";

import {
  MainLayout,
  GuestLayout,
  AuthLayout,
  DashboardLayout,
} from "../layouts";

// Lazy load components for better performance
const Home = lazy(() => import("../components/Home/Home"));
const Books = lazy(() => import("../components/Books/Books"));
const Book = lazy(() => import("../components/Book/Book"));
const Authors = lazy(() => import("../components/Authors/Authors"));
const Author = lazy(() => import("../components/Author/Author"));
const Login = lazy(() => import("../components/Auth/Login"));
const Register = lazy(() => import("../components/Auth/Register"));
const ForgotPassword = lazy(() => import("../components/Auth/ForgotPassword"));
const ResetPassword = lazy(() => import("../components/Auth/ResetPassword"));
const Profile = lazy(() => import("../components/Auth/Profile"));
const VerifyEmail = lazy(() => import("../components/Auth/VerifyEmail"));

//redirection routes
const NotFound = lazy(() => import("../components/NotFound"));
const Forbidden = lazy(() => import("../components/Forbidden"));

//dashboard components
const Dashboard = lazy(() => import("../components/Dashboard/Dashboard"));
const DashboardBooks = lazy(
  () => import("../components/Dashboard/Books/DashboardBooks")
);
const DashboardCategories = lazy(
  () => import("../components/Dashboard/Categories/DashboardCategories")
);
const DashboardAuthors = lazy(
  () => import("../components/Dashboard/Authors/DashboardAuthors")
);
// const DashboardUsers = lazy(() => import("../components/Dashboard/Users"));
// const DashboardSettings = lazy(
//   () => import("../components/Dashboard/Settings")
// );

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
        path: "/authors/:id",
        element: <Author />,
      },
      {
        path: "/forbidden",
        element: <Forbidden />,
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
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "books",
        children: [
          {
            index: true,
            element: <DashboardBooks />,
          },
        ],
      },
      {
        path: "categories",
        children: [
          {
            index: true,
            element: <DashboardCategories />,
          },
        ],
      },
      {
        path: "authors",
        children: [
          {
            index: true,
            element: <DashboardAuthors />,
          },
        ],
      },
      // {
      //   path: "users",
      //   children: [
      //     {
      //       index: true,
      //       element: <DashboardUsers />,
      //     },
      //     {
      //       path: "create",
      //       element: <DashboardUsers />,
      //     },
      //     {
      //       path: "edit/:id",
      //       element: <DashboardUsers />,
      //     },
      //   ],
      // },
      // {
      //   path: "settings",
      //   element: <DashboardSettings />,
      // },
    ],
  },
];

export const routes: RouteObject[] = [
  ...publicRoutes,
  ...guestRoutes,
  ...protectedRoutes,
];
