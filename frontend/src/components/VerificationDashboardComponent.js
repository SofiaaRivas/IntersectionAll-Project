// not yet functional

import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2"; // For the progress chart
import { useNavigate } from "react-router-dom";

const VerificationDashboard = () => {
  const [progressData, setProgressData] = useState(null); // Chart data
  const [pendingMarkers, setPendingMarkers] = useState([]); // Pending list
  const [orderBy, setOrderBy] = useState("newest"); // Sorting criteria
  const navigate = useNavigate();

  // Fetch progress data and pending markers
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch progress data
        const progressResponse = await fetch("/api/marker-progress"); // FIX
        const progressResult = await progressResponse.json();

        // Fetch pending markers
        const pendingResponse = await fetch(`/api/verifications?status=Pending&order=${orderBy}`); // FIX
        const pendingResult = await pendingResponse.json();

        if (progressResponse.ok && pendingResponse.ok) {
          setProgressData(progressResult);
          setPendingMarkers(pendingResult);
        } else {
          console.error("Error fetching data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [orderBy]);

  // Navigate to review a specific marker
  const handleReview = (marker) => {
    navigate(`/review-marker/${marker.marker_id}`); // ENSURE path works
  };

  return (
    <div className="verification-dashboard">
      <h1>Accessibility Review Dashboard</h1>
      <div className="dashboard-content">
        {/* Progress Chart */}
        <div className="progress-chart">
          <h2>Progress Chart</h2>
          {progressData ? (
            <Pie
              data={{
                labels: ["Verified", "Rejected", "Pending"],
                datasets: [
                  {
                    data: [
                      progressData.verified,
                      progressData.rejected,
                      progressData.pending,
                    ],
                    backgroundColor: ["#4CAF50", "#F44336", "#FFC107"],
                  },
                ],
              }}
            />
          ) : (
            <p>Loading chart...</p>
          )}
        </div>

        {/* Pending Review List */}
        <div className="pending-review-list">
          <h2>Pending Review List</h2>
          <div className="order-options">
            <label>Order by:</label>
            <select
              value={orderBy}
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="popularity">Popularity</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Select</th>
                <th>Location</th>
                <th>Submission Date</th>
                <th>Reviewed</th>
              </tr>
            </thead>
            <tbody>
              {pendingMarkers.map((marker) => (
                <tr key={marker.marker_id}>
                  <td>
                    <button onClick={() => handleReview(marker)}>Review</button>
                  </td>
                  <td>{marker.location_name}</td>
                  <td>{new Date(marker.submission_date).toLocaleString()}</td>
                  <td>
                    <input type="checkbox" disabled checked={marker.reviewed} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VerificationDashboard;
