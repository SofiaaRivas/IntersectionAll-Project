import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GoogleMapComponent from './components/GoogleMapComponent';
import Menu from './components/menuBar';
import AdminUI from './components/AdminUI';
import './App.css';

const App = () => {
  const [mapKey, setMapKey] = useState(0); // Unique key for remounting

  const handleHomeNavigation = () => {
    setMapKey((prevKey) => prevKey + 1); // Update key to force remount
  };

  return (
    <Router>
      <div>
        <header className="App-header">
          <h1>intersectionAll</h1>
        </header>
        <Menu onHomeClick={handleHomeNavigation}/> 

        <main>
          <Routes>
            {/* Default route shows the map */}
            <Route path="/" element={<GoogleMapComponent key={mapKey} />} />
            {/* Admin UI route */}
            <Route path="/admin" element={<AdminUI />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;


