
// src/components/GoogleMapComponent.js
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocationButton from './UserLocationButton';
import FilterButton from './MarkerFilterButton';
import useGeolocation from '../hooks/UseGeolocation';
import useMarkers from '../hooks/UseMarkers';
import { containerStyle, defaultCenter } from '../config/googleMapConfig';

const GoogleMapComponent = () => { 
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { userLocation, getUserLocation } = useGeolocation();
  const { markers } = useMarkers();

  const handleCenterUserLocation = () => {
    getUserLocation();
    if (userLocation) setMapCenter(userLocation);
  };

  return (
    <div className='map-container'>
      <UserLocationButton onClick={handleCenterUserLocation} />
      <FilterButton/>
      <LoadScript googleMapsApiKey="AIzaSyC0qEtwJQpgLI1Z6YP0jGTPPjgdqsdAjCw">
        <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={17}>
          {userLocation && <Marker position={userLocation} />}
          {markers.map((marker) => (
            <Marker key={marker.id} position={marker.position} />
          ))}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default GoogleMapComponent;
