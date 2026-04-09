import React from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePages.css";

function Transport() {
  const navigate = useNavigate();

  return (
    <div className="service-page-container">
      <div className="service-header">
        <span className="service-icon">🚌</span>
        <h1>Public Transport Network</h1>
        <p>A seamless, interconnected web of smart buses, autonomous metro lines, and micro-mobility stations to get you where you need to go cleanly and efficiently.</p>
      </div>

      <div className="service-content-grid">
        <div className="service-section" style={{ borderTopColor: "#f59e0b" }}>
          <h2>About the Service</h2>
          <p>
            The city's transport infrastructure is completely electrified and centrally managed by an AI traffic controller. This system synchronizes traffic lights to favor public transit and emergency vehicles, drastically reducing commute times.
          </p>
          
          <h2 style={{marginTop: "30px"}}>Maintenance Strategy</h2>
          <ul>
            <li><strong>Predictive Fleet Maintenance:</strong> Metro cars self-report hardware stress, scheduling their own maintenance.</li>
            <li><strong>Nightly Deep Cleaning:</strong> All buses and train cars undergo automated UV-C internal sanitization nightly.</li>
            <li><strong>Roadway Preservation:</strong> Automated asphalt repair bots deploy to fix potholes flagged by citizen reports.</li>
          </ul>
        </div>

        <div className="service-section" style={{ borderTopColor: "#f59e0b" }}>
          <h2>Live Telemetry Dashboard</h2>
          <p>Real-time traffic and transit tracking metrics.</p>
          
          <div className="telemetry-board">
            <div className="telemetry-card">
              <div className="telemetry-label">Active Buses</div>
              <div className="telemetry-value">142</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Metro Status</div>
              <div className="telemetry-value status-good">On Time</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Avg Traffic Delay</div>
              <div className="telemetry-value status-warning">+4 mins</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Air Quality Index</div>
              <div className="telemetry-value status-good">34 (Good)</div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-cta">
        <h3>Experiencing a Transport Issue?</h3>
        <p>Spotted road damage, schedule delays, or vandalism? Let the transport authority know.</p>
        <button onClick={() => navigate("/report")} className="cta-button">Report Issue to City</button>
      </div>
    </div>
  );
}

export default Transport;
