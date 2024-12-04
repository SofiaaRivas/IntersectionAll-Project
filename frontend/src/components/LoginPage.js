import React from "react";
import "./LoginPage.css"; // Import your custom CSS
import Login from "./LoginFormComponent"; 

const LoginPage = () => {
  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="app-title">IntersectionAll</h1>
        <p className="app-subtitle">Welcome to your crowd-sourced campus navigation tool! Please log in to continue.</p>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;

