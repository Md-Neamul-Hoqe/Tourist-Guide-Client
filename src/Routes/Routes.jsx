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
import Bookings from "../pages/TouristProfile/Sections/Bookings/Bookings";
import Wishlist from "../pages/AdminProfile/Sections/Wishlist/Wishlist";
import ManageUsers from "../pages/AdminProfile/Sections/ManageUsers/ManageUsers";
import DashboardAuth from "../Providers/DashboardAuth";
import AllStories from "../pages/AllStories/AllStories";
import AddPackage from "../pages/AdminProfile/Sections/AddPackage/AddPackage";
import Packages from "../pages/Packages/Packages";

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
        path: "packages",
        element: <Packages />,
      },
      {
        path: "user/stories",
        element: <AllStories />,
      },
      {
        path: "user/story/:id",
        element: <Story />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
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
    element: (
      <DashboardAuth>
        <Dashboard />
      </DashboardAuth>
    ),
    children: [
      {
        path: "admin-profile",
        element: <AdminProfile />,
      },
      {
        path: "all-users",
        element: <ManageUsers />,
      },
      {
        path: "add-package",
        element: <AddPackage />,
      },

      /* User Profile */
      {
        path: "tourist-profile",
        element: <TouristProfile />,
      },
      {
        path: "bookings",
        element: <Bookings />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },

      /* Guide Profile */
      {
        path: "guide-profile/:id",
        element: <TourGuideProfile />,
      },
    ],
  },
]);
