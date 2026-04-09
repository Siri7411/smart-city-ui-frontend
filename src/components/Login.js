import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { loginUser } from "../services/authApi";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    const nextErrors = {};
    if (!email.trim()) nextErrors.email = "Email is required.";
    if (!password) nextErrors.password = "Password is required.";
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await loginUser({
        email,
        password
      });

      if (response.data && response.data.accessToken) {
        // Save jwt token and session
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("isAdminLoggedIn", response.data.role === "ADMIN" ? "true" : "false");
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("role", response.data.role || "USER");
        
        navigate("/home");
      }
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError("Cannot reach backend server. Please ensure it is running.");
      } else if (err.response.status === 401) {
        setError("Invalid Email or Password. Please try again.");
      } else {
        setError("Login failed due to server error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <h2>Smart City Login</h2>

      {error && <p className="error-message" style={{color: 'red', marginBottom: '15px'}}>{error}</p>}

      <form onSubmit={handleLogin}>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          required
        />
        {fieldErrors.email && <p className="error-message" style={{color: "red"}}>{fieldErrors.email}</p>}

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          required
        />
        {fieldErrors.password && <p className="error-message" style={{color: "red"}}>{fieldErrors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>

      </form>

      <p>
        Don't have an account?
        <span
          className="link"
          onClick={() =>
            navigate("/signup")
          }
        >
          Signup
        </span>
      </p>

    </div>
  );
}

export default Login;