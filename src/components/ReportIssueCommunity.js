import React, { useEffect, useState } from "react";
import ComplaintForm from "./ComplaintForm";
import "./ReportIssueCommunity.css";
import { getIssues } from "../services/cityApi";

function ReportIssueCommunity() {
  const [feed, setFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        const response = await getIssues();
        setFeed(response.data || []);
      } catch {
        setFeed([]);
      } finally {
        setLoading(false);
      }
    };
    fetchIssues();
  }, []);

  return (
    <div className="community-report-page">
      <div className="report-header">
        <h2>Community Issue Board</h2>
        <p>Report local issues using the official form and see what others are discussing in your area.</p>
      </div>
      
      <div className="content-wrapper">
        {/* Left Side: Original Complaint Form */}
        <div className="report-form-section">
          <ComplaintForm />
        </div>

        {/* Right Side: Community Feed */}
        <div className="community-feed-section">
          <h3>Recent Citizen Reports</h3>
          <div className="feed-list">
            {loading ? (
              <p className="empty-feed">Loading issues...</p>
            ) : feed.length === 0 ? (
              <p className="empty-feed">No issues reported yet. Be the first!</p>
            ) : (
              feed.map((item) => (
                <div key={item.id} className="feed-card">
                  <div className="feed-card-header">
                    <span className="feed-issue-type">{item.issueType}</span>
                    <span className="feed-date">{new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <h4 className="feed-location">📍 {item.location}</h4>
                  <p className="feed-desc">"{item.description}"</p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportIssueCommunity;
