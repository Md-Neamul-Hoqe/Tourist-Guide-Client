import {
  FaBook,
  FaBookmark,
  FaCalendarAlt,
  FaCcPaypal,
  FaCommentDots,
  FaEnvelope,
  FaHome,
  FaList,
  FaShoppingBag,
  FaShoppingCart,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useRole from "../Hooks/useRole";

const Dashboard = () => {
  const [userRole] = useRole();

  return (
    <section className="flex min-h-screen">
      <aside className="w-64 min-h-full bg-orange-400 capitalize">
        <div className="sticky">
          <ul className="menu p-4 sticky">
            {userRole === "admin" ? (
              <>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/admin-profile">
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
                  <NavLink to="/dashboard/manage-packages">
                    <FaList />
                    Manage Packages
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/manage-bookings">
                    <FaBook />
                    Manage Tours
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/all-users">
                    <FaUsers />
                    All Users
                  </NavLink>
                </li>
              </>
            ) : userRole === "tourist" ? (
              <>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/user-home">
                    <FaHome />
                    User Home
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/reservation">
                    <FaCalendarAlt />
                    Reservation
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/payment-history">
                    <FaCcPaypal />
                    Payment history
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/cart">
                    <FaShoppingCart />
                    My Cart
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/add-review">
                    <FaCommentDots />
                    Add Review
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/bookings">
                    <FaBookmark />
                    My Bookings
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/guide-home">
                    <FaHome />
                    Guide Home
                  </NavLink>
                </li>
                <li style={{ fontVariantCaps: "small-caps" }}>
                  <NavLink to="/dashboard/trips">
                    <FaCalendarAlt />
                    Trips
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
              <NavLink to="/our-menu">
                <FaList />
                Menu
              </NavLink>
            </li>
            <li style={{ fontVariantCaps: "small-caps" }}>
              <NavLink to="/our-shop/salad">
                <FaShoppingBag />
                Shop
              </NavLink>
            </li>
            <li style={{ fontVariantCaps: "small-caps" }}>
              <NavLink to="/our-shop/salad">
                <FaEnvelope />
                Contact
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <aside className="flex-1 p-8">
        <Outlet />
      </aside>
    </section>
  );
};

export default Dashboard;
