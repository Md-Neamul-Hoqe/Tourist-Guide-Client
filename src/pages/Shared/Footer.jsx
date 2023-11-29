import { Link } from "react-router-dom";
import logo from "/Vector.svg";

const Footer = () => {
  return (
    <div>
      <footer className="footer p-10 bg-neutral text-neutral-content">
        <aside>
          <img className="w-20" src={logo} alt="Dream Place" />
          <p>
            Dream Place Industries Ltd.
            <br />
            Your next goto companion for travel
          </p>
        </aside>
        <nav>
          <header className="footer-title">Social</header>
          <ul className="grid md:grid-flow-col gap-4">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/community">Community</Link>
            </li>
            <li>
              <Link to="/blogs">Blogs</Link>
            </li>
            <li>
              <Link to="/about-us">About Us</Link>
            </li>
            <li>
              <Link to="/contact-us">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </footer>
    </div>
  );
};

export default Footer;
