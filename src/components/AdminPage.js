import React from "react";
import "./AdminPage.css";

function AdminPage() {
  return (
    <div className="admin-container">

      <h2>Admin Dashboard</h2>

      <div className="admin-card">

        <h3>Total Complaints</h3>
        <p>25</p>

      </div>

      <div className="admin-card">

        <h3>Pending Issues</h3>
        <p>10</p>

      </div>

      <div className="admin-card">

        <h3>Resolved Issues</h3>
        <p>15</p>

      </div>

    </div>
  );
}

export default AdminPage;