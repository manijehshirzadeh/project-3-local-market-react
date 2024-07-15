import { Link, useLocation } from "react-router-dom";
import { AuthedUserContext } from "../App";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  const location = useLocation();

  return (
    <>
      {user ? (
        <nav
          className="navbar bg-primary navbar-expand-sm"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Local Market
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className={
                      "nav-link " +
                      (location.pathname === "/listings" && "active")
                    }
                    // aria-current="page"
                    href="/listings"
                  >
                    All Listings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-link " +
                      (location.pathname === "/my-listings" && "active")
                    }
                    href="/my-listings"
                  >
                    My Listings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-link " +
                      (location.pathname === "/listings/new" && "active")
                    }
                    href="/listings/new"
                  >
                    New Listing
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={handleSignout}>
                    Sign out
                  </a>
                </li>
              </ul>
              {/* <form className="d-flex" role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                ></input>
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form> */}
            </div>
          </div>
        </nav>
      ) : (
        <nav
          className="navbar bg-primary navbar-expand-sm"
          data-bs-theme="dark"
        >
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Local Market
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a
                    className={
                      "nav-link " +
                      (location.pathname === "/signin" && "active")
                    }
                    aria-current="page"
                    href="/signin"
                  >
                    Sign In
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={
                      "nav-link " +
                      (location.pathname === "/signup" && "active")
                    }
                    href="/signup"
                  >
                    Sign Up
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};
export default NavBar;
