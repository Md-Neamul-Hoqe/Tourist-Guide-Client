import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "/Vector.svg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import maxWidthStyles from "./SectionMaxWidth";
import useUser from "../../Hooks/useUser";

const Navbar = () => {
  const { userSignOut } = useAuth();
  const [userProfile, isPendingUserInfo, isLoadingUserInfo] = useUser();

  // console.log(userProfile);

  const navLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/community">Community</NavLink>
      </li>
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
      <li>
        <NavLink to="/about-us">About Us</NavLink>
      </li>
      <li>
        <NavLink to="/contact-us">Contact Us</NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    try {
      userSignOut().then(() => {
        return Swal.fire({
          icon: "success",
          text: "Sign Out Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(isPendingUserInfo, isLoadingUserInfo);
  // console.log(userProfile?.contactDetails?.email);

  return (
    <nav className="bg-base-100">
      <div className={`navbar px-0 ${maxWidthStyles}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">
            <img src={logo} alt="Dream Place" />
            <p className="max-sm:sr-only">Dream Place</p>
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navLinks}</ul>
        </div>
        <div className="navbar-end">
          {!isPendingUserInfo &&
          !isLoadingUserInfo &&
          userProfile?.contactDetails?.email ? (
            <div className="dropdown max-w-[40vw]">
              <button tabIndex={0} className="avatar w-12">
                {userProfile?.profilePicture ? (
                  <img
                    className="rounded-full"
                    src={userProfile?.profilePicture}
                    alt={userProfile?.name}></img>
                ) : (
                  <FaRegUserCircle className="text-3xl text-blue-800" />
                )}
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content border right-3 top-[61px] bg-base-100 z-[50] w-60 border-blue-700 rounded-lg">
                <ul className="border rounded-t-lg">
                  <li className="px-2 py-1">
                    Name:{" "}
                    {userProfile?.name ||
                      userProfile?.contactDetails?.email.split("@")[0]}
                  </li>
                  <li className="px-2 py-1">
                    Email: {userProfile?.contactDetails?.email}
                  </li>
                </ul>
                <li className="border px-0 py-1">
                  <NavLink
                    to={`/dashboard/${
                      userProfile?.role === "admin"
                        ? "admin-profile"
                        : userProfile?.role === "guide"
                        ? `guide-profile/${userProfile?._id}`
                        : "tourist-profile"
                    }`}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="border px-0 py-1 text-red-800">
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
                {userProfile?.role === "tourist" && (
                  <Link
                    to="/dashboard/bookings"
                    className="border px-2 py-1 text-blue-700 text-xs font-bold rounded-b-md">
                    Get a 10% discount on your next booking after completing
                    three bookings
                  </Link>
                )}
              </ul>
            </div>
          ) : (
            <div className="flex gap-3">
              <Link
                className={`btn btn-ghost border-blue-700 hover:bg-blue-700 hover:text-white`}
                to="/credentials/register">
                Register
              </Link>
              <Link
                className={`btn btn-ghost border-blue-700 hover:bg-blue-700 hover:text-white`}
                to="/credentials/login">
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
