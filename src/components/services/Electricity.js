import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePages.css";

function Electricity() {
  const [load, setLoad] = useState(65);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(prev => Math.min(100, Math.max(0, prev + (Math.random() > 0.5 ? 2 : -2))));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="service-page-container">
      <div className="service-header">
        <span className="service-icon">⚡</span>
        <h1>Smart Power Grid</h1>
        <p>A resilient, decentralized smart grid powered primarily by renewable solar and wind, backed by massive battery storage arrays.</p>
      </div>

      <div className="service-content-grid">
        <div className="service-section" style={{ borderTopColor: "#ef4444" }}>
          <h2>About the Service</h2>
          <p>
            The smart grid intelligently reroutes power during peak hours to avoid blackouts. Homes with solar panels actively contribute excess energy back to the grid, creating a community-driven sustainable power network. Streetlights dim automatically when streets are empty.
          </p>
          
          <h2 style={{marginTop: "30px"}}>Maintenance Strategy</h2>
          <ul>
            <li><strong>Grid Balancing:</strong> AI predicts daily power usage surges and pre-charges battery arrays.</li>
            <li><strong>Instant Failover:</strong> If a substation goes offline, power is micro-routed around the fault in milliseconds.</li>
            <li><strong>Line Inspections:</strong> Drone swarms continuously survey overhead lines for tree interference or damage.</li>
          </ul>
        </div>

        <div className="service-section" style={{ borderTopColor: "#ef4444" }}>
          <h2>Live Telemetry Dashboard</h2>
          <p>Real-time energy production and consumption metrics.</p>
          
          <div className="telemetry-board">
            <div className="telemetry-card">
              <div className="telemetry-label">Current Grid Load</div>
              <div className={`telemetry-value ${load > 85 ? 'status-critical' : 'status-good'}`}>
                {load}%
              </div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Renewable Output</div>
              <div className="telemetry-value status-good">78%</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Battery Reserves</div>
              <div className="telemetry-value">94%</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Active Outages</div>
              <div className="telemetry-value status-good">0</div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-cta">
        <h3>Experiencing a Power Outage?</h3>
        <p>If your neighborhood has lost power or you spot damaged electrical lines, contact the response team.</p>
        <button onClick={() => navigate("/report")} className="cta-button">Report Issue to City</button>
      </div>
    </div>
  );
}

export default Electricity;
