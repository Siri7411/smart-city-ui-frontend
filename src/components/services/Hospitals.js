import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePages.css";

function Hospitals() {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-header">
        <span className="service-icon">🏥</span>
        <h1>Healthcare & Emergency Services</h1>
        <p>A fully integrated network of world-class hospitals, automated dispatch systems, and community health centers built to respond instantly.</p>
      </div>

      <div className="service-content-grid">
        <div className="service-section" style={{ borderTopColor: "#10b981" }}>
          <h2>About the Service</h2>
          <p>
            When an emergency is reported via the Smart City app or 911, an ambulance is dispatched utilizing the city's AI traffic controller. The traffic lights literally turn green along the fastest route to the patient, cutting emergency response times by 40%.
          </p>
          
          <h2 style={{marginTop: "30px"}}>Maintenance Strategy</h2>
          <ul>
            <li><strong>Inventory Tracking:</strong> Key medical supplies (blood, oxygen, medications) are tracked city-wide. Shortages trigger automated intra-hospital drone deliveries.</li>
            <li><strong>Equipment Sterilization:</strong> Facilities use robotic UV cleaners operating 24/7.</li>
            <li><strong>Ambulance Readiness:</strong> Vehicles undergo rapid mechanical diagnostics after every shift.</li>
          </ul>
        </div>

        <div className="service-section" style={{ borderTopColor: "#10b981" }}>
          <h2>Live Telemetry Dashboard</h2>
          <p>Real-time citywide medical network metrics.</p>
          
          <div className="telemetry-board">
            <div className="telemetry-card">
              <div className="telemetry-label">Available ICU Beds</div>
              <div className="telemetry-value status-warning">12</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">ER Wait Time</div>
              <div className="telemetry-value status-good">8 mins</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Active Ambulances</div>
              <div className="telemetry-value">24</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Blood Bank Level</div>
              <div className="telemetry-value status-good">Optimal</div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-cta">
        <h3>Experiencing a Health or Hospital Issue?</h3>
        <p>Report issues regarding hospital queues, emergency response delays, or facility unkeptness.</p>
        <button onClick={() => navigate("/report")} className="cta-button">Report Issue to City</button>
      </div>
    </div>
  );
}

export default Hospitals;
