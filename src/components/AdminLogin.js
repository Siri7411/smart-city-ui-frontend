import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../services/authApi";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    /* Basic admin validation combined with backend auth */
    if (email !== "admin@smartcity.com") {
      setError("This account is not authorized for Admin access.");
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({
        email,
        password
      });

      if (response.data && response.data.accessToken) {
        if (response.data.role !== "ADMIN") {
          setError("This account is not authorized for Admin access.");
          return;
        }
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("role", response.data.role || "ADMIN");
        navigate("/admin");
      }
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError("Cannot reach backend server. Please ensure it is running.");
      } else if (err.response.status === 401) {
        setError("Invalid Admin Credentials. Please try again.");
      } else {
        setError("Admin login failed due to server error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container admin-style">
      <h2>Smart City Admin Login</h2>
      {error && <p className="error-message" style={{color: 'red', marginBottom: '15px'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading} style={{backgroundColor: "#ff4757"}}>
          {loading ? "Authenticating..." : "Login as Admin"}
        </button>
      </form>
      <p>
        Not an admin?
        <span className="link" onClick={() => navigate("/")}>
          User Login
        </span>
      </p>
    </div>
  );
}

export default AdminLogin;
