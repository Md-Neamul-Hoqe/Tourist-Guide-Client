import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "/Vector.svg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import maxWidthStyles from "./SectionMaxWidth";
import useRole from "../../Hooks/useRole";

const Navbar = () => {
  const { user, userSignOut } = useAuth();
  const [whichRole, whichRoleLoading, isPending] = useRole();

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
        return Swal.fire("Sign Out Successfully");
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          {!isPending && !whichRoleLoading && user?.email && whichRole ? (
            <div className="dropdown max-w-[40vw]">
              <button tabIndex={0} className="avatar w-12">
                {user?.photoURL ? (
                  <img
                    className="rounded-full"
                    src={user?.photoURL}
                    alt={user?.displayName}></img>
                ) : (
                  <FaRegUserCircle className="text-3xl text-blue-800" />
                )}
              </button>
              <ul
                tabIndex={0}
                className="menu dropdown-content border right-0 bg-base-100 z-[2]">
                <ul className="border rounded-t-lg">
                  <li className="px-2 py-1">
                    Name: {user?.displayName || user?.email.split("@")[0]}
                  </li>
                  <li className="px-2 py-1">Email: {user?.email}</li>
                </ul>
                <li className="border px-5 py-1">
                  <NavLink
                    to={`/dashboard/${
                      whichRole === "admin"
                        ? "admin-profile"
                        : whichRole === "guide"
                        ? "guide-profile"
                        : "tourist-profile"
                    }`}>
                    Dashboard
                  </NavLink>
                </li>
                <li className="border px-5 py-1 last-of-type:rounded-b-md">
                  <button onClick={handleLogOut}>Log Out</button>
                </li>
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
