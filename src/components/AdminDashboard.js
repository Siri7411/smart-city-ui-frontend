import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";
import {
  createService,
  deleteIssue,
  deleteService,
  getIssues,
  getServices,
  updateIssueStatus,
  updateService
} from "../services/cityApi";

function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [services, setServices] = useState([]);
  const [serviceForm, setServiceForm] = useState({
    name: "",
    type: "",
    status: "Online",
    description: ""
  });
  const [editingServiceId, setEditingServiceId] = useState(null);

  React.useEffect(() => {
    if (activeTab === "services" || activeTab === "overview") {
      fetchServices();
    }
    if (activeTab === "complaints" || activeTab === "overview") {
      fetchIssues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchServices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getServices();
      setServices(response.data || []);
    } catch {
      setError("Could not load services.");
    } finally {
      setLoading(false);
    }
  };

  const fetchIssues = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getIssues();
      setComplaints(response.data || []);
    } catch {
      setError("Could not load complaints.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmitService = async (event) => {
    event.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.type.trim()) {
      setError("Service name and type are required.");
      return;
    }
    setError("");
    try {
      if (editingServiceId) {
        await updateService(editingServiceId, serviceForm);
      } else {
        await createService(serviceForm);
      }
      setServiceForm({ name: "", type: "", status: "Online", description: "" });
      setEditingServiceId(null);
      await fetchServices();
    } catch (apiError) {
      setError(apiError?.response?.data?.message || "Failed to save service.");
    }
  };

  const onDeleteService = async (id) => {
    try {
      await deleteService(id);
      await fetchServices();
    } catch {
      setError("Failed to delete service.");
    }
  };

  const updateComplaintStatus = async (id, newStatus) => {
    try {
      await updateIssueStatus(id, { status: newStatus });
      await fetchIssues();
    } catch {
      setError("Failed to update complaint status.");
    }
  };

  const removeComplaint = async (id) => {
    try {
      await deleteIssue(id);
      await fetchIssues();
    } catch {
      setError("Failed to delete complaint.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/admin-login");
  };

  const renderOverview = () => (
    <div className="overview-tab">
      <div className="stats-grid">
        <div className="stat-card blue">
          <h3>Total Services</h3>
          <p>{services.length}</p>
        </div>
        <div className="stat-card green">
          <h3>Active Services</h3>
          <p>{services.filter(s => s.status === "Online").length}</p>
        </div>
        <div className="stat-card orange">
          <h3>Pending Complaints</h3>
          <p>{complaints.filter(c => c.status === "PENDING").length}</p>
        </div>
        <div className="stat-card red">
          <h3>System Status</h3>
          <p>Online</p>
        </div>
      </div>
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <ul>
          <li>Use the tabs to manage services and complaints in real-time.</li>
          <li>All updates sync with backend APIs.</li>
          <li>Only admin JWT users can perform modifications.</li>
        </ul>
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="services-tab">
      <h3>Manage Services</h3>
      <form onSubmit={onSubmitService} style={{ marginBottom: "16px" }}>
        <input
          type="text"
          placeholder="Service name"
          value={serviceForm.name}
          onChange={(e) => setServiceForm({ ...serviceForm, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Type"
          value={serviceForm.type}
          onChange={(e) => setServiceForm({ ...serviceForm, type: e.target.value })}
        />
        <select
          value={serviceForm.status}
          onChange={(e) => setServiceForm({ ...serviceForm, status: e.target.value })}
        >
          <option>Online</option>
          <option>Maintenance</option>
          <option>Offline</option>
        </select>
        <input
          type="text"
          placeholder="Description"
          value={serviceForm.description}
          onChange={(e) => setServiceForm({ ...serviceForm, description: e.target.value })}
        />
        <button type="submit">{editingServiceId ? "Update Service" : "Add Service"}</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>Service Name</th>
            <th>Type</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {services.map(s => (
            <tr key={s.id}>
              <td>{s.name}</td>
              <td>{s.type}</td>
              <td>
                <span className={`badge ${s.status === 'Online' ? 'badge-active' : 'badge-maintenance'}`}>
                  {s.status}
                </span>
              </td>
              <td>
                <button 
                  className={s.status === "Online" ? "btn-suspend" : "btn-activate"}
                  onClick={() => {
                    setEditingServiceId(s.id);
                    setServiceForm({
                      name: s.name,
                      type: s.type,
                      status: s.status,
                      description: s.description || ""
                    });
                  }}
                >
                  Edit
                </button>
                <button className="btn-suspend" onClick={() => onDeleteService(s.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderComplaints = () => (
    <div className="complaints-tab">
      <h3>Manage Complaints</h3>
      <table>
        <thead>
          <tr>
            <th>Issue</th>
            <th>Description</th>
            <th>Location</th>
            <th>Status</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map((c) => (
            <tr key={c.id}>
              <td>{c.issueType}</td>
              <td>{c.description}</td>
              <td>{c.location}</td>
              <td>
                <span className={`badge badge-${String(c.status).toLowerCase().replace("_", "-")}`}>
                  {c.status}
                </span>
              </td>
              <td>
                <select
                  value={c.status}
                  onChange={(e) => updateComplaintStatus(c.id, e.target.value)}
                  className="status-dropdown"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN_PROGRESS</option>
                  <option value="RESOLVED">RESOLVED</option>
                </select>
                <button className="btn-suspend" onClick={() => removeComplaint(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <div className="sidebar-header">
          <h2>Admin Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <button 
            className={activeTab === "overview" ? "active" : ""} 
            onClick={() => setActiveTab("overview")}
          >
            Overview
          </button>
          <button 
            className={activeTab === "services" ? "active" : ""} 
            onClick={() => setActiveTab("services")}
          >
            Services
          </button>
          <button 
            className={activeTab === "complaints" ? "active" : ""} 
            onClick={() => setActiveTab("complaints")}
          >
            Complaints
          </button>
        </nav>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="content-header">
          <h2>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Dashboard</h2>
        </header>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="tab-content">
          {activeTab === "overview" && renderOverview()}
          {activeTab === "services" && renderServices()}
          {activeTab === "complaints" && renderComplaints()}
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;