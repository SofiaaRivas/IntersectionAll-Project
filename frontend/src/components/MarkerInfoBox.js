// src/components/MarkerInfoBox.js
import React from 'react';

const MarkerInfoBox = ({ selectedMarker, closeInfoBox }) => {
  return (
    <div style={{
        position: 'absolute',
        top: '120px',  // Fixed position at the top of the screen for now
        left: '500px',
        backgroundColor: 'white',
        padding: '10px',
        borderRadius: '5px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        zIndex: 10,
      }}>
        <h3>{selectedMarker.marker_type}</h3>
        <p>Reliability: {selectedMarker.reliability}</p>
        <p>Width: {selectedMarker.width}</p>
        <p>Incline: {selectedMarker.incline}</p>
        <p>Surface: {selectedMarker.surface}</p>
        <p>Details: {selectedMarker.details}</p>
        <div>
            <button type="button" onClick={closeInfoBox}>
              Close
            </button>
        </div>
      </div>
    );
  };
  
  export default MarkerInfoBox;