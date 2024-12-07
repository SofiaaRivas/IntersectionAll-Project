// NOT FUNCTIONAL

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // For the pie chart
// import "./SubmissionHistory.css";

const SubmissionHistory = ({ user }) => {
  const [submissions, setSubmissions] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await fetch(`/api/markers/history?user_id=${user.userId}`); 
        const data = await response.json();
        setSubmissions(data);
      } catch (error) {
        console.error("Error fetching submission history:", error);
      }
    };

    fetchSubmissions();
  }, [user.userId]);

  // Sorting logic
  const sortedSubmissions = [...submissions].sort((a, b) => {
    if (sortBy === "popularity") return b.votes - a.votes;
    if (sortBy === "status") return a.status.localeCompare(b.status);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  // Chart data
  const chartData = {
    labels: ["Verified", "Rejected", "Pending"],
    datasets: [
      {
        data: [
          submissions.filter((s) => s.status === "Verified").length,
          submissions.filter((s) => s.status === "Rejected").length,
          submissions.filter((s) => s.status === "Pending").length,
        ],
        backgroundColor: ["#66bb6a", "#ef5350", "#ffca28"],
      },
    ],
  };

  return (
    <div className="submission-history-container">
      <h2>Submission History</h2>

      <div className="chart-container">
        <Pie data={chartData} />
      </div>

      <div className="controls">
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="popularity">Popularity</option>
          <option value="status">Status</option>
          <option value="date">Date</option>
        </select>
      </div>

      <table className="submission-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Actions</th>
            <th>Votes</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedSubmissions.map((submission) => (
            <tr key={submission.marker_id}>
              <td>{submission.location_name}</td>
              <td>
                {submission.status === "Verified" || submission.status === "Rejected" ? (
                  "Unavailable"
                ) : (
                  <>
                    <button>Edit</button>
                    <button>Delete</button>
                  </>
                )}
              </td>
              <td>{submission.votes}</td>
              <td>{submission.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionHistory;
