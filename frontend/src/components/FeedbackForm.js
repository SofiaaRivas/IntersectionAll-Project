import React, { useState } from 'react';

const FeedbackForm = () => {
  const [feedback, setFeedback] = useState(''); // Holds the user's input
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the feedback data to send to the server
    const feedbackData = { message: feedback }; // Send the `feedback` as `message`

    try {
      const response = await fetch('http://localhost:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });

      if (response.ok) {
        alert('Feedback submitted successfully');
        setSubmitted(true); // Mark as submitted
        setFeedback(''); // Clear the textarea after submission
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }

    console.log('Feedback submitted:', feedback); // For debugging purposes
  };

  return (
    <div>
      <h3>Feedback Form</h3>
      {submitted ? (
        <p>Thank you for your feedback!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)} // Update `feedback` state
            placeholder="Enter your feedback here"
            rows="3"
            required
          />
          <br />
          <button type="submit">Submit Feedback</button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;

