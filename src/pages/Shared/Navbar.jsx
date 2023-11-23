import { Link, NavLink } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import logo from "/Vector.svg";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, userSignOut } = useAuth();

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
    <nav className="navbar bg-base-100">
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
          Dream Place
        </a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navLinks}</ul>
      </div>
      <div className="navbar-end">
        {!user ? (
          <div className="dropdown max-w-[40vw]">
            <button tabIndex={0}>
              {user?.photoURL ? (
                <img src={user?.photoURL} alt={user?.displayName}></img>
              ) : (
                <FaRegUserCircle className="text-3xl text-green-800" />
              )}
            </button>
            <ul tabIndex={0} className="menu dropdown-content right-0">
              <ul className="border rounded-t-lg">
                <li className="px-2 py-1">
                  name: {user?.displayName || user?.email.split("@")[0]}
                </li>
                <li className="px-2 py-1">email: {user?.email}</li>
              </ul>
              <li className="border px-5 py-1">
                <NavLink to="/dashboard">Dashboard</NavLink>
              </li>
              <li className="border px-5 py-1 last-of-type:rounded-b-md">
                <button onClick={handleLogOut}>Log Out</button>
              </li>
            </ul>
          </div>
        ) : (
          <div className="flex gap-3">
            <Link
              className={`btn btn-ghost border-green-700 hover:bg-green-700 hover:text-white`}
              to="/register">
              Register
            </Link>
            <Link
              className={`btn btn-ghost border-green-700 hover:bg-green-700 hover:text-white`}
              to="/login">
              Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
