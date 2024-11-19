// NOT functional
// TODO: reference it within the marker form that is publically visible when a user clicks on a marker

import React, { useState, useEffect } from "react";

const MarkerFeedback = ({ markerId, user }) => {
  const [voteCount, setVoteCount] = useState(0);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    // Fetch the current vote count for this marker
    const fetchVotes = async () => {
      try {
        const response = await fetch(`/api/feedback/${markerId}`);
        const data = await response.json();
        setVoteCount(data.total_votes || 0);
      } catch (error) {
        console.error("Error fetching votes:", error);
      }
    };
    fetchVotes();
  }, [markerId]);

  const handleVote = async (vote) => {
    if (user.role === "AdminUser") {
      alert("Admins cannot vote on markers.");
      return;
    }

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marker_id: markerId, user_id: user.id, vote }),
      });

      if (response.ok) {
        // Update the UI based on the new vote
        setVoteCount((prev) => prev + (vote - (userVote || 0))); // Adjust count
        setUserVote(vote);
      } else {
        const error = await response.json();
        alert(`Error: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting vote:", error);
    }
  };

  if (user.role === "AdminUser") {
    return null; // Admins shouldn't see voting controls
  }

  return (
    <div className="marker-feedback">
      <button
        onClick={() => handleVote(1)}
        disabled={userVote === 1}
      >
        👍 Upvote
      </button>
      <span>{voteCount}</span>
      <button
        onClick={() => handleVote(-1)}
        disabled={userVote === -1}
      >
        👎 Downvote
      </button>
    </div>
  );
};

export default MarkerFeedback;
