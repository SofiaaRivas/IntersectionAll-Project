import './App.css';

import React from 'react';
import GoogleMapComponent from './MapAPIComponent';

function App() {
  return (
    <div>
      <h1>IntersectionAll - Campus Accessibility Map</h1>
      <GoogleMapComponent />
    </div>
  );
}

export default App;