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
    <section className="flex min-h-screen">
      {isPaused || isPendingUserInfo || isLoadingUserInfo ? (
        "Loading..."
      ) : (
        <aside className="w-64 min-h-full bg-blue-400 text-white capitalize">
          <div className="sticky">
            <ul className="menu p-4 sticky">
              {userProfile?.role === "admin" ? (
                <>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to={`/dashboard/admin-profile`}>
                      <FaHome />
                      Admin Profile
                    </NavLink>
                  </li>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/add-package">
                      <FaUtensils />
                      Add Package
                    </NavLink>
                  </li>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/all-users">
                      <FaList />
                      Manage Users
                    </NavLink>
                  </li>
                </>
              ) : userProfile?.role === "tourist" ? (
                <>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/tourist-profile">
                      <FaHome />
                      User Home
                    </NavLink>
                  </li>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/bookings">
                      <FaCalendarAlt />
                      Bookings
                    </NavLink>
                  </li>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/wishlist">
                      <FaCcPaypal />
                      wishlist
                    </NavLink>
                  </li>
                  {/* <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/cart">
                      <FaShoppingCart />
                      My Cart
                    </NavLink>
                  </li> */}
                </>
              ) : (
                <>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink
                      to={`/dashboard/guide-profile/${userProfile?._id}`}>
                      <FaHome />
                      Guide Home
                    </NavLink>
                  </li>
                  <li style={{ fontVariantCaps: "small-caps" }}>
                    <NavLink to="/dashboard/trips">
                      <FaCalendarAlt />
                      Assigned Trips
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
            <div className="divider divide-solid divide-neutral-50"></div>
            <ul className="menu p-4">
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/">
                  <FaHome />
                  Home
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/community">
                  <FaEnvelope />
                  Community
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/blogs">
                  <FaEnvelope />
                  Blogs
                </NavLink>
              </li>
              <li style={{ fontVariantCaps: "small-caps" }}>
                <NavLink to="/contact-us">
                  <FaEnvelope />
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>
        </aside>
      )}
      <aside className="flex-1 p-8">
        <Outlet />
      </aside>
    </section>
  );
};

export default Dashboard;
