import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to fetch the user's role from the backend
  const fetchUserRole = async (firebaseUid) => {
    try {
      const baseUrl = "https://apex.oracle.com/pls/apex/intersectionall/users/Users"; // Replace with your API base URL
      const response = await fetch(`${baseUrl}?firebase_uid=${firebaseUid}`);
      const userData = await response.json();

      if (userData.status === "error") {
        throw new Error(userData.message);
      }

      const user = userData[0]; // Extract the first user from the array
      return user.role; // Returns "AdminUser" or "GeneralUser"
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };

  // Handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Authenticate the user with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUid = userCredential.user.uid;

      // Fetch the user's role
      const role = await fetchUserRole(firebaseUid);

      if (!role) {
        alert("Error retrieving user role. Please contact support.");
        return;
      }

      alert(`Login successful! Role: ${role}`);

      // Pass user info back to the parent
      onLoginSuccess({ firebaseUid, role });
    } catch (error) {
      console.error("Login error:", error);
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;


