import React from "react";
import {
  NavLink,
  //  useLocation
} from "react-router-dom";

const Navbar = () => {
  // const location = useLocation();
  // const pathName = location.pathname;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          Vidly
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                // className={`nav-link ${pathName === "/" && "active"}`}
                className="nav-link"
                aria-current="page"
                to="/"
              >
                Movies
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                // className={`nav-link ${pathName === "/customers" && "active"}`}
                to="/customers"
              >
                Customers
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                // className={`nav-link ${pathName === "/rentals" && "active"}`}
                to="rentals"
              >
                Rentals
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/register">
                Register
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
