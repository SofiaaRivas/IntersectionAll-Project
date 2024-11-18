import React from 'react';
import Navbar from '../NavBarComponent';
import GoogleMapComponent from '../GoogleMapComponent';

const Home = ({ user }) => {
  return (
    <div>
      <Navbar user={user} />
      <div className="content">
        <GoogleMapComponent />
      </div>
    </div>
  );
};

export default Home;
