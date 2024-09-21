import React from "react";
import { FaCode } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/authAction";
import { FaSignOutAlt, FaUser } from "react-icons/fa";

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles"> Developers</Link>
      </li>
      <li>
        <Link to="/posts"> Posts</Link>
      </li>
      <li>
        <Link to="/dashboard">
          <i className="fas fa-user">
            <FaUser />
          </i>
          <span className="hide-sm">{' '}</span>Dashboard
        </Link>
      </li>
      <li>
        <Link to="/profiles">Developers</Link>
      </li>
      <li>
        <Link to="/login" onClick={() => dispatch(logout())}>
          <i className="fas fa-sign-out-alt">
            <FaSignOutAlt />
          </i>
          <span className="hide-sm">{' '}Logout</span>
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles"> Developers</Link>
      </li>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/Login">Login</Link>
      </li>
    </ul>
  );

  return (
    <div>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-code">
              <FaCode />
            </i>{" "}
            DevConnector
          </Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    </div>
  );
};

export default Navbar;
