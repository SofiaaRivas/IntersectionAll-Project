// import React, { useEffect, useContext, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { onAuthStateChanged } from "firebase/auth";
// import { auth } from "./config/FirebaseConfigComponent";
// import Navbar from "./components/NavBarComponent";
// import RoleBasedRouter from "./components/RoleBasedRouting";
// import Login from "./components/LoginFormComponent";
// import Register from "./components/RegisterComponent";
// import Home from "./components/HomeComponent";
// import { fetchUserRole } from "./utils";
// import { UserContext, UserProvider } from "./components/UserContext";

// function AppContent() {
//   const { user, setUser } = useContext(UserContext); // Consume context
//   const [loading, setLoading] = useState(true); // Loading state while fetching user data

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
//       if (firebaseUser) {
//         // Fetch the user's role from the backend using their Firebase UID
//         const role = await fetchUserRole(firebaseUser.uid);

//         if (role) {
//           // Update context with user details and role
//           setUser({ firebaseUid: firebaseUser.uid, role });
//         } else {
//           console.error("User role could not be determined.");
//           setUser(null);
//         }
//       } else {
//         // No user is logged in
//         setUser(null);
//       }
//       setLoading(false);
//     });

//     // Cleanup listener on unmount
//     return () => unsubscribe();
//   }, [setUser]);

//   if (loading) {
//     return <div>Loading...</div>; // Show a loading spinner while initializing
//   }

//   return (
//     <Router>
//       {/* Navbar is visible only if a user is logged in */}
//       {user && <Navbar user={user} />}

//       <Routes>
//         {/* Public routes (e.g., Login and Register) */}
//         {!user && (
//           <>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route path="*" element={<Navigate to="/login" />} />
//           </>
//         )}

//         {/* Private routes for authenticated users */}
//         {user && (
//           <>
//             <Route path="/" element={<Home user={user} />} />
//             <Route path="/*" element={<RoleBasedRouter user={user} />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// }

// export default function App() {
//   return (
//     <UserProvider>
//       <AppContent />
//     </UserProvider>
//   );
// }



import './App.css';

import React from 'react';
import GoogleMapComponent from './components/GoogleMapComponent';

function App() {
  return (
    <div>
      <header className='App-header'>
        <h1>IntersectionAll</h1>
      </header>
      <GoogleMapComponent />
    </div>
  );
}

export default App;