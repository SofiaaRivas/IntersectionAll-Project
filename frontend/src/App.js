import './App.css';

import React from 'react';
import GoogleMapComponent from './MapAPIComponent';

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