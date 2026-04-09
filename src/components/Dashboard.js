import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const services = [
    {
      id: "water",
      path: "/service/water",
      icon: "💧",
      title: "Water Supply",
      desc: "Monitor live water availability and report pressure drops.",
      classes: "glass-card card-water"
    },
    {
      id: "transport",
      path: "/service/transport",
      icon: "🚌",
      title: "Transport",
      desc: "Live tracking of public transit and road conditions.",
      classes: "glass-card card-transport"
    },
    {
      id: "power",
      path: "/service/electricity",
      icon: "⚡",
      title: "Electricity",
      desc: "Check localized power grid stability and report outages.",
      classes: "glass-card card-power"
    },
    {
      id: "health",
      path: "/service/hospitals",
      icon: "🏥",
      title: "Hospitals",
      desc: "Locate immediate emergency services & clinic queues.",
      classes: "glass-card card-health"
    }
  ];

  const filteredServices = services.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.desc.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="dashboard-hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Smart City <span>Management</span>
        </h1>
        <p className="hero-subtitle">
          Empowering citizens with seamless access to public services, real-time issue reporting, and interactive community engagement.
        </p>
        
        <div className="hero-search-bar">
          <input 
            type="text" 
            placeholder="Search for city details, services, or infrastructure..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="hero-actions">
          <button className="primary-btn" onClick={() => navigate("/report")}>Report an Issue</button>
          <button className="secondary-btn" onClick={() => navigate("/admin-login")}>Admin Portal</button>
        </div>
      </div>

      <div className="hero-cards-container">
        {filteredServices.length > 0 ? (
          filteredServices.map(service => (
            <div 
              key={service.id}
              className={service.classes} 
              style={{cursor: 'pointer'}} 
              onClick={() => navigate(service.path)}
            >
              <div className="card-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.desc}</p>
            </div>
          ))
        ) : (
          <div className="no-results">No city details found for "{searchQuery}".</div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;