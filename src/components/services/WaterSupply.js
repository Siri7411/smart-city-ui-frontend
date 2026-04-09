import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ServicePages.css";

function WaterSupply() {
  const [reservoirLevel, setReservoirLevel] = useState(82);
  const navigate = useNavigate();

  // Simulate dynamic live telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setReservoirLevel(prev => prev + (Math.random() > 0.5 ? 0.1 : -0.1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="service-page-container">
      <div className="service-header">
        <span className="service-icon">💧</span>
        <h1>City Water Supply System</h1>
        <p>Ensuring clean, safe, and continuous water distribution to all citizens through advanced monitoring and state-of-the-art filtration.</p>
      </div>

      <div className="service-content-grid">
        <div className="service-section" style={{ borderTopColor: "#3b82f6" }}>
          <h2>About the Service</h2>
          <p>
            The smart city water network spans over 1,200 miles of underground piping, connected to three central purification plants. We utilize IoT sensors at every major junction to ensure pressure remains stable and to instantly detect leaks or contamination, dramatically reducing water waste compared to traditional grids.
          </p>
          
          <h2 style={{marginTop: "30px"}}>Maintenance Strategy</h2>
          <ul>
            <li><strong>Automated Leak Detection:</strong> Acoustic sensors flag micro-leaks before they become pipe bursts.</li>
            <li><strong>Weekly Quality Sampling:</strong> Automated drones take reservoir samples every Monday.</li>
            <li><strong>Scheduled Outages:</strong> Maintenance is performed between 2 AM and 4 AM to minimize disruption.</li>
          </ul>
        </div>

        <div className="service-section" style={{ borderTopColor: "#3b82f6" }}>
          <h2>Live Telemetry Dashboard</h2>
          <p>Real-time metrics from the central grid sensors.</p>
          
          <div className="telemetry-board">
            <div className="telemetry-card">
              <div className="telemetry-label">Main Reservoir Level</div>
              <div className="telemetry-value status-good">{reservoirLevel.toFixed(1)}%</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">System Pressure</div>
              <div className="telemetry-value status-good">62 PSI</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Detected Leaks</div>
              <div className="telemetry-value status-warning">2 Active</div>
            </div>
            <div className="telemetry-card">
              <div className="telemetry-label">Water Quality (pH)</div>
              <div className="telemetry-value status-good">7.2</div>
            </div>
          </div>
        </div>
      </div>

      <div className="report-cta">
        <h3>Experiencing a Water Issue?</h3>
        <p>Whether it's a pipe leak, low water pressure, or contamination, please report it immediately.</p>
        <button onClick={() => navigate("/report")} className="cta-button">Report Issue to City</button>
      </div>
    </div>
  );
}

export default WaterSupply;
