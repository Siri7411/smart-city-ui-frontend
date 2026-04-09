import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";

import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import NearbyServices from "./components/NearbyServices";

import AdminLogin from "./components/AdminLogin";
import ReportIssueCommunity from "./components/ReportIssueCommunity";

import WaterSupply from "./components/services/WaterSupply";
import Transport from "./components/services/Transport";
import Electricity from "./components/services/Electricity";
import Hospitals from "./components/services/Hospitals";

/* Home Page */
function Home() {
  return (
    <>
      <Navbar />
      <Dashboard />
      <NearbyServices />
    </>
  );
}

/* Service Pages Wrappers */
function WaterPage() { return <><Navbar /><WaterSupply /></>; }
function TransportPage() { return <><Navbar /><Transport /></>; }
function ElectricityPage() { return <><Navbar /><Electricity /></>; }
function HospitalPage() { return <><Navbar /><Hospitals /></>; }

/* Report Page */
function ReportPage() {
  return (
    <>
      <Navbar />
      <ReportIssueCommunity />
    </>
  );
}

/* Admin Page */
function AdminPage() {
  return (
    <>
      <Navbar />
      <AdminDashboard />
    </>
  );
}

/* Protected Admin Route Wrapper */
function ProtectedAdminRoute() {
  const isAdmin = localStorage.getItem("isAdminLoggedIn") === "true";
  return isAdmin ? <AdminPage /> : <Navigate to="/admin-login" replace />;
}

function ProtectedUserRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* User Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Home */}
        <Route path="/home" element={<ProtectedUserRoute><Home /></ProtectedUserRoute>} />
        
        {/* Services */}
        <Route path="/service/water" element={<ProtectedUserRoute><WaterPage /></ProtectedUserRoute>} />
        <Route path="/service/transport" element={<ProtectedUserRoute><TransportPage /></ProtectedUserRoute>} />
        <Route path="/service/electricity" element={<ProtectedUserRoute><ElectricityPage /></ProtectedUserRoute>} />
        <Route path="/service/hospitals" element={<ProtectedUserRoute><HospitalPage /></ProtectedUserRoute>} />
        
        {/* Report Page */}
        <Route path="/report" element={<ProtectedUserRoute><ReportPage /></ProtectedUserRoute>} />
        
        {/* Admin Login */}
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Protected Admin Dashboard Route */}
        <Route path="/admin" element={<ProtectedAdminRoute />} />
        <Route path="*" element={<Navigate to="/" replace />} />
        
      </Routes>

    </BrowserRouter>
  );
}

export default App;