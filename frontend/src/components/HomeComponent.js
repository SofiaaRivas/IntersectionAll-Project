import React from "react";
import GoogleMapComponent from "../GoogleMapComponent"; // Your map component

const Home = ({ user }) => {
  return (
    <div className="home-container">
      <header>
        <h1>Welcome to IntersectionAll</h1>
      </header>
      <main>
        {/* Include the map */}
        <GoogleMapComponent />
      </main>
    </div>
  );
};

export default Home;

