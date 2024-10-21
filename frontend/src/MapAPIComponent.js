// src/GoogleMapComponent.js
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 40.730610,  // Default center (e.g., New York City)
  lng: -73.935242,
};

const GoogleMapComponent = () => {
  return (
    <LoadScript googleMapsApiKey="AIzaSyC0qEtwJQpgLI1Z6YP0jGTPPjgdqsdAjCw">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        {/* Example marker */}
        <Marker position={{ lat: 40.730610, lng: -73.935242 }} />
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;
