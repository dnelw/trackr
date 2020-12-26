import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/auth-context";
import "../styles/Navbar.css";

function createNavElements(links, curPath) {
  const navElements = [];
  const navItemClass = "nav-item nav-link";
  const [authState] = useContext(AuthContext);
  Object.keys(links).forEach((link) => {
    const text = links[link];
    navElements.push(
      <Link
        to={link}
        className={link === curPath ? navItemClass + " active" : navItemClass}
      >
        {text}
      </Link>
    );
  });

  const buttonLink = authState.loggedIn ? "/logout" : "/login";
  const buttonText = authState.loggedIn ? "Logout" : "Login";
  const buttonClass = navItemClass;
  const loginButton = (
    <Link
      to={buttonLink}
      className={buttonLink === curPath ? buttonClass + " active" : buttonClass}
    >
      {buttonText}
    </Link>
  );

  return (
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <div className="navbar-nav-left">{navElements}</div>
        <div className="navbar-nav-right">{loginButton}</div>
      </div>
    </div>
  );
}

function Navbar() {
  const location = useLocation();
  const path = location.pathname;
  const links = { "/weight": "Weight Tracker", "/habits": "Habit Tracker" };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      {createNavElements(links, path)}
    </nav>
  );
}
export default Navbar;
