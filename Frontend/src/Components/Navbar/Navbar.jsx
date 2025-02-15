// Navbar.jsx
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../Assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const user = localStorage.getItem("user") && JSON.parse(localStorage.getItem("user"));
  const name = user?.name;
  const userName = (
    (name?.split(" ")[0][0] ?? "") + (name?.split(" ")?.[1]?.[0] ?? "")
  ).toUpperCase();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <header className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img src={Logo} alt="Logo" className="logo" />
        </Link>
      </div>

      <nav className="nav-links">
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          Home
        </Link>
        <Link to="/event" className={location.pathname === "/event" ? "active" : ""}>
          Events
        </Link>
        <Link to="/notification" className={location.pathname === "/notification" ? "active" : ""}>
          Notification
        </Link>
        <Link to="/about" className={location.pathname === "/about" ? "active" : ""}>
          About Us
        </Link>
        <Link to="/contact" className={location.pathname === "/contact" ? "active" : ""}>
          Contact Us
        </Link>
      </nav>

      <div className="auth-section">
        {user ? (
          <div className="user-profile" ref={dropdownRef}>
            <button className="avatar-btn" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <span className="user-initials">{userName}</span>
            </button>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <div className="dropdown-header">
                  <span className="user-name">{name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <div className="dropdown-divider"></div>
                <button className="dropdown-item" onClick={handleLogout}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
                  </svg>
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons">
            <Link to="/login">
              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
