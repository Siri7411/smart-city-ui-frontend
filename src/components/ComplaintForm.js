import React, { useState } from "react";
import "./ComplaintForm.css";
import { createIssue } from "../services/cityApi";

function ComplaintForm() {

  const [issue, setIssue] = useState("Water Problem");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();
    const nextErrors = {};
    if (!issue) nextErrors.issue = "Issue type is required.";
    if (!description.trim()) nextErrors.description = "Description is required.";
    else if (description.trim().length < 10) nextErrors.description = "Description must be at least 10 characters.";
    if (!location.trim()) nextErrors.location = "Location is required.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      await createIssue({
        issueType: issue,
        description: description.trim(),
        location: location.trim()
      });
      alert("Complaint submitted successfully!");
      setDescription("");
      setLocation("");
      setIssue("Water Problem");
      setErrors({});
    } catch (error) {
      const apiMessage = error?.response?.data?.message;
      alert(apiMessage || "Failed to submit complaint. Please login again and retry.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">

      <h2>Report Public Service Issue</h2>

      <form onSubmit={sendEmail}>

        <label>Issue Type</label>

        <select
          value={issue}
          onChange={(e) => setIssue(e.target.value)}
        >
          <option>Water Problem</option>
          <option>Transport Problem</option>
          <option>Electricity Problem</option>
          <option>Hospital Issue</option>
        </select>
        {errors.issue && <p className="error-message" style={{color: "red"}}>{errors.issue}</p>}

        <label>Description</label>

        <textarea
          placeholder="Describe the problem..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {errors.description && <p className="error-message" style={{color: "red"}}>{errors.description}</p>}

        <label>Location</label>

        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        {errors.location && <p className="error-message" style={{color: "red"}}>{errors.location}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit Complaint"}
        </button>

      </form>

    </div>
  );
}

export default ComplaintForm;