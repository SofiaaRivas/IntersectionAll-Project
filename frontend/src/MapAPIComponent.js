// src/GoogleMapComponent.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import FilterButton from './MarkerFilterButton';

const containerStyle = {
  width: '100%', // Set the width of the map
  height: '100%', // Set the height of the map
};

const defaultCenter = {
  lat: 41.504341, // Default center (CWRU)
  lng: -81.608383,
};

const GoogleMapComponent = () => {
  const [mapCenter, setMapCenter] = useState(defaultCenter); // State for map center
  const [userLocation, setUserLocation] = useState(null); // State for user location

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = { lat: latitude, lng: longitude };
          setUserLocation(newLocation); // Save user location
          setMapCenter(newLocation); // Center map to user location
        },
        (error) => {
          console.error('Error getting location', error);
        },
        {
          enableHighAccuracy: true
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  return (
    <div className='map-container'> 
      <button className='centerLocation-Button' onClick={getUserLocation}>
        <i className="fa-solid fa-location-crosshairs fa-2xl"></i>
      </button>
      <FilterButton/>
      <LoadScript googleMapsApiKey="AIzaSyC0qEtwJQpgLI1Z6YP0jGTPPjgdqsdAjCw">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={mapCenter} // Use state for center
          zoom={17} // Set the zoom level
        >
          {userLocation && <Marker position={userLocation} />} {/* Marker for user location */}
          <Marker position={defaultCenter} /> {/* Example marker at default center */}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;