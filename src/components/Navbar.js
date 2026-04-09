import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove user/admin session and token.
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="navbar">

      <h2 className="logo">
        Smart City Portal
      </h2>

      <div className="nav-links">

        <span onClick={() => navigate("/home")}>
          Home
        </span>

        <span onClick={() => navigate("/service/water")}>Services</span>

        <span onClick={() => navigate("/report")}>
          Report Issue
        </span>

        <span onClick={() => navigate("/admin")}>
          Admin
        </span>

        <button 
          className="theme-toggle" 
          onClick={() => {
            document.body.classList.toggle("light-mode");
          }}
        >
          🌓 Theme
        </button>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>

      </div>

    </nav>
  );
}

export default Navbar;