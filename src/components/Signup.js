import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { registerUser } from "../services/authApi";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});
    setLoading(true);
    const nextErrors = {};
    if (!name.trim()) nextErrors.name = "Name is required.";
    if (!email.trim()) nextErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Enter a valid email address.";
    if (!password) nextErrors.password = "Password is required.";
    else if (password.length < 6) nextErrors.password = "Password must be at least 6 characters.";
    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await registerUser({
        name,
        email,
        password
      });

      if (response.status === 201) {
        alert("Account Created Successfully! Please Login.");
        navigate("/");
      }
    } catch (err) {
      console.error(err);
      if (!err.response) {
        setError("Network Error: Cannot reach backend server. Please ensure it is running.");
      } else {
        setError(err.response?.data?.message || err.response?.data || "An error occurred during signup. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <h2>Smart City Signup</h2>

      {error && <p className="error-message" style={{color: 'red', marginBottom: '15px'}}>{error}</p>}

      <form onSubmit={handleSignup}>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        {fieldErrors.name && <p className="error-message" style={{color: "red"}}>{fieldErrors.name}</p>}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {fieldErrors.email && <p className="error-message" style={{color: "red"}}>{fieldErrors.email}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {fieldErrors.password && <p className="error-message" style={{color: "red"}}>{fieldErrors.password}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

      </form>

    </div>
  );
}

export default Signup;