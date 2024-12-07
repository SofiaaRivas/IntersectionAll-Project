import React, { useState, useEffect } from 'react';
import '../AdminUI.css';

const AdminUI = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch feedback data from the server
  const fetchFeedback = async () => {
    try {
      const response = await fetch('http://localhost:5000/feedback');
      if (response.ok) {
        const data = await response.json();
        setFeedbacks(data); // Set the feedback data to state
      } else {
        alert('Failed to load feedback');
      }
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  useEffect(() => {
    fetchFeedback();
  }, []);

  return (
    <div className="admin-ui">
      <h3 className="feedback-header">All Feedback</h3>
      {feedbacks.length === 0 ? (
        <p>No feedback available.</p>
      ) : (
        <div className="feedback-list">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="feedback-item">
              <p className="feedback-message">{feedback.message}</p>
              <span className="feedback-date">{new Date(feedback.createdAt).toLocaleDateString()}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminUI;
