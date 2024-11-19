// routing
// The marker submissions pending verification dashboard, the 
// user's personal submission history, and the functionality to 
// give feedback on markers, hasn't been implemented

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import VerificationDashboard from "./VerificationDashboardComponent";
import SubmissionHistory from "./SubmissionHistory";
import Feedback from "./Feedback";

const RoleBasedRouter = ({ user }) => {
  return (
    <Routes>
      {/* Admin-specific routes */}
      {user.role === "AdminUser" && (
        <Route path="/verification-dashboard" element={<VerificationDashboard />} />
      )}

      {/* General user-specific routes */}
      {user.role === "GeneralUser" && (
        <>
          <Route path="/submission-history" element={<SubmissionHistory />} />
          <Route path="/feedback" element={<feedback />} />
        </>
      )}

      {/* Catch-all: Redirect authenticated users to home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default RoleBasedRouter;
