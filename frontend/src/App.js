import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebaseConfig";
import Navbar from "./components/Navbar";
import RoleBasedRouter from "./routing/RoleBasedRouter";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";

// Utility function to fetch user role
const fetchUserRole = async (firebaseUid) => {
  try {
    // Call your backend API to fetch the user role by Firebase UID
    const response = await fetch(
      `https://apex.oracle.com/pls/apex/intersectionall/users/Users?firebase_uid=${firebaseUid}`
    );
    const userData = await response.json();

    if (response.ok && userData.length > 0) {
      // Assuming the backend returns an array of users filtered by UID
      return userData[0].role; // Extract the role from the first user object
    } else {
      console.error("Failed to fetch user role:", userData.message || "Unknown error");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
};

function App() {
  const [user, setUser] = useState(null); // State for the logged-in user
  const [loading, setLoading] = useState(true); // Loading state while fetching user data

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch the user's role from the backend using their Firebase UID
        const role = await fetchUserRole(firebaseUser.uid);

        if (role) {
          // Update state with user details and role
          setUser({ firebaseUid: firebaseUser.uid, role });
        } else {
          console.error("User role could not be determined.");
          setUser(null);
        }
      } else {
        // No user is logged in
        setUser(null);
      }
      setLoading(false);
    });

    // Cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
    // Show a loading spinner while initializing
  }

  return (
    <Router>
      // Navbar is visible only if a user is logged in
      {user && <Navbar user={user} />}

      <Routes>
        /* Public routes (e.g., Login and Register) */
        {!user && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}

        /* Private routes for authenticated users */
        {user && (
          <>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/*" element={<RoleBasedRouter user={user} />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
