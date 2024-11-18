// routing
// move to ROUTING FOLDER

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import SubmissionHistory from "../components/SubmissionHistory";
import VoteOnMarkers from "../components/VoteOnMarkers";

const RoleBasedRouter = ({ user }) => {
  return (
    <Routes>
      {/* Admin-specific routes */}
      {user.role === "AdminUser" && (
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      )}

      {/* General user-specific routes */}
      {user.role === "GeneralUser" && (
        <>
          <Route path="/submission-history" element={<SubmissionHistory />} />
          <Route path="/vote-on-markers" element={<VoteOnMarkers />} />
        </>
      )}

      {/* Catch-all: Redirect authenticated users to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoleBasedRouter;
