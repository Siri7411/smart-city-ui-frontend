import React, { useState } from "react";
import "./NearbyServices.css";

function NearbyServices() {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState("");
  const [amenity, setAmenity] = useState("Hospital");
  
  const [reviews, setReviews] = useState([
    { id: 1, amenity: "Central Park", rating: 5, feedback: "Beautifully maintained, great for morning runs." },
    { id: 2, amenity: "City General Hospital", rating: 4, feedback: "Wait times were a bit long but doctors were excellent." }
  ]);

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    if (!feedback) {
      alert("Please enter a review description.");
      return;
    }

    const newReview = {
      id: Date.now(),
      amenity,
      rating,
      feedback
    };

    setReviews([newReview, ...reviews]);
    setFeedback("");
    alert("Feedback successfully submitted!");
  };

  return (
    <div className="map-container">

      <h2>Nearby Amenities & Services</h2>

      <iframe
        src="https://maps.google.com/maps?q=amenities&t=&z=13&ie=UTF8&iwloc=&output=embed"
        title="Google Map"
        loading="lazy"
        className="amenities-map"
      ></iframe>

      <div className="feedback-section">
        <div className="feedback-form-box">
          <h3>Provide Feedback on Amenities</h3>
          <p>Help us improve your city's public parks, hospitals, and facilities. Your feedback is actively monitored.</p>
          
          <form className="amenity-feedback-form" onSubmit={handleFeedbackSubmit}>
            <div className="form-group">
              <label>Select Amenity</label>
              <select value={amenity} onChange={(e) => setAmenity(e.target.value)}>
                <option>Central Park</option>
                <option>City General Hospital</option>
                <option>Downtown Transit Hub</option>
                <option>Public Library</option>
                <option>Community Pool</option>
              </select>
            </div>

            <div className="form-group">
              <label>Rating (1-5 Stars)</label>
              <input 
                type="number" 
                min="1" max="5" 
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
              />
            </div>

            <div className="form-group">
              <label>Your Feedback</label>
              <textarea 
                placeholder="What was your experience like?"
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows="3"
              ></textarea>
            </div>

            <button type="submit" className="feedback-btn">Submit Feedback</button>
          </form>
        </div>

        <div className="feedback-list-box">
          <h3>Recent Amenity Reviews</h3>
          <div className="reviews-list">
            {reviews.map((r) => (
              <div className="review-card" key={r.id}>
                <div className="review-header">
                  <strong>{r.amenity}</strong>
                  <span className="review-stars">{"⭐".repeat(r.rating)}</span>
                </div>
                <p>"{r.feedback}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}

export default NearbyServices;