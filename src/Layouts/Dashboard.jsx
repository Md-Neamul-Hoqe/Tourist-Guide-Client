import {
  FaCalendarAlt,
  FaCcPaypal,
  FaEnvelope,
  FaHome,
  FaList,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useDashboardAuth from "../Hooks/useDashboardAuth";

const Dashboard = () => {
  const { userProfile, isPaused, isPendingUserInfo, isLoadingUserInfo } =
    useDashboardAuth();

  return (
    <section className="flex min-h-full">
      {isPaused || isPendingUserInfo || isLoadingUserInfo ? (
        // <Loader/>
        ""
      ) : (
        <div className="drawer lg:drawer-open">
          <input
            id="dashboard-sidebar"
            type="checkbox"
            className="drawer-toggle"
          />
          <div className="drawer-content">
            <aside className="p-8">
              <Outlet />
            </aside>
            <label
              htmlFor="dashboard-sidebar"
              className="btn bg-blue-700 text-white drawer-button lg:hidden fixed top-2 left-2 z-50">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div className="drawer-side min-h-full">
            <label
              htmlFor="dashboard-sidebar"
              aria-label="close sidebar"
              className="drawer-overlay"></label>
            <div className="lg:p-4 max-md:w-full md:w-52 lg:w-80 min-h-full bg-blue-400 text-white max-lg:pt-16 z-40">
              {/* Sidebar content here */}
              <ul className="menu">
                {userProfile?.role === "admin" ? (
                  <>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to={`/dashboard/admin-profile`}>
                        <FaHome />
                        <span>Admin Profile</span>
                        {/* <span className="max-md:hidden">Admin Profile</span> */}
                      </NavLink>
                    </li>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to="/dashboard/add-package">
                        <FaUtensils />
                        <span>Add Package</span>
                        {/* <span className="max-md:hidden">Add Package</span> */}
                      </NavLink>
                    </li>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to="/dashboard/all-users">
                        <FaList />
                        <span>Manage Users</span>
                        {/* <span className="max-md:hidden">Manage Users</span> */}
                      </NavLink>
                    </li>
                  </>
                ) : userProfile?.role === "tourist" ? (
                  <>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to="/dashboard/tourist-profile">
                        <FaHome />
                        <span>User Home</span>
                        {/* <span className="max-md:hidden">User Home</span> */}
                      </NavLink>
                    </li>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to="/dashboard/bookings">
                        <FaCalendarAlt />
                        <span>Bookings</span>
                        {/* <span className="max-md:hidden">Bookings</span> */}
                      </NavLink>
                    </li>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to="/dashboard/wishlist">
                        <FaCcPaypal />
                        <span>wishlist</span>
                        {/* <span className="max-md:hidden">wishlist</span> */}
                      </NavLink>
                    </li>
                  </>
                ) : (
                  <>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink
                        to={`/dashboard/guide-profile/${userProfile?._id}`}>
                        <FaHome />
                        <span>Guide Home</span>
                        {/* <span className="max-md:hidden">Guide Home</span> */}
                      </NavLink>
                    </li>
                    <li style={{ fontVariantCaps: "small-caps" }}>
                      <NavLink to="/dashboard/trips">
                        <FaCalendarAlt />
                        <span>Assigned Trips</span>
                        {/* <span className="max-md:hidden">Assigned Trips</span> */}
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
              <div className="divider divide-solid divide-neutral-100"></div>
              <ul className="menu">
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/">
                    <FaHome />
                    <span>Home</span>
                    {/* <span className="max-md:hidden">Home</span> */}
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/community">
                    <FaEnvelope />
                    <span>Community</span>
                    {/* <span className="max-md:hidden">Community</span> */}
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/blogs">
                    <FaEnvelope />
                    <span>Blogs</span>
                    {/* <span className="max-md:hidden">Blogs</span> */}
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/contact-us">
                    <FaEnvelope />
                    <span>Contact</span>
                    {/* <span className="max-md:hidden">Contact</span> */}
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
