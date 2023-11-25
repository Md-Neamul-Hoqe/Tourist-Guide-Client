import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Credentials/Login";
import Register from "../pages/Credentials/Register";
import Credentials from "../pages/Credentials/Credentials";
import ContactUs from "../pages/ContactUs/ContactUs";
import MainLayout from "../Layouts/MainLayout";
import Home from "../pages/Home/Home";
import ErrorPage from "../pages/ErrorPage";
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import TourGuideProfile from "../pages/TourGuideProfile/TourGuideProfile";
import TouristProfile from "../pages/TouristProfile/TouristProfile";
import PackagesAsType from "../pages/PackagesAsType/PackagesAsType";
import Story from "../pages/Story/Story";
import Dashboard from "../Layouts/Dashboard";
import AdminProfile from "../pages/AdminProfile/AdminProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
      },
      {
        path: "logout",
        element: <Login />,
      },
      {
        path: "details/:id",
        element: <PackageDetails />,
      },
      {
        path: "user/guides/:id",
        element: <TourGuideProfile />,
      },
      {
        path: "user/tourist/:id",
        element: <TouristProfile />,
      },
      {
        path: "packages/:type",
        element: <PackagesAsType />,
      },
      {
        path: "user/story/:id",
        element: <Story />,
      },
    ],
  },
  {
    path: "/credentials",
    element: <Credentials />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "all-users",
      },
      {
        path: "tourist-profile",
        element: <TouristProfile />,
      },
      {
        path: "guide-profile",
        element: <TourGuideProfile />,
      },
    ],
  },
]);
