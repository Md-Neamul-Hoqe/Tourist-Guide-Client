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
import AllStories from "../pages/AllStories/AllStories";
import AddPackage from "../pages/AdminProfile/Sections/AddPackage/AddPackage";
import Packages from "../pages/Packages/Packages";
import AssignedTrips from "../pages/TourGuideProfile/Sections/AssignedTrips";
import PrivateRoutes from "./PrivateRoutes";
import AdminRoute from "./AdminRoute";
import GuideRoute from "./GuideRoute";
import Blogs from "../pages/Blogs/Blogs";
import Community from "../pages/Community/Community";
import AboutUs from "../pages/AboutUs/AboutUs";

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
        path: "community",
        element: <Community />,
      },
      {
        path: "blogs",
        element: <Blogs />,
      },
      {
        path: "about-us",
        element: <AboutUs />,
      },
      {
        path: "contact-us",
        element: <ContactUs />,
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
        path: "logout",
        element: <Login />,
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
      <PrivateRoutes>
        <Dashboard />
      </PrivateRoutes>
    ),
    children: [
      {
        path: "admin-profile",
        element: (
          <AdminRoute>
            <AdminProfile />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "add-package",
        element: (
          <AdminRoute>
            <AddPackage />
          </AdminRoute>
        ),
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
        element: (
          <GuideRoute>
            <TourGuideProfile />
          </GuideRoute>
        ),
      },
      {
        path: "trips",
        element: (
          <GuideRoute>
            <AssignedTrips />
          </GuideRoute>
        ),
      },
    ],
  },
]);
