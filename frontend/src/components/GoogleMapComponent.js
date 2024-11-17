
// src/components/GoogleMapComponent.js
import React, { useState, useRef } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocationButton from './UserLocationButton';
import FilterButton from './MarkerFilterButton';
import useGeolocation from '../hooks/useGeolocation';
import MarkerSubmissionPopup from './MarkerSubmissionPopup';
// import useMarkers from '../hooks/useMarkers';
import { containerStyle, defaultCenter, defaultZoom } from '../config/googleMapConfig';
//import { createDescriptor} from '../createDescriptor';

const GoogleMapComponent = () => { 
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { userLocation, getUserLocation } = useGeolocation();
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  //const [mapZoom, setMapZoom] = useState(defaultZoom); // Default zoom level
  
  // useEffect(() => {
  //   const loadMarkers = async () => {
  //     try {
  //       const data = await cre(); // Call the API function
  //       // setMarkers(data); // Set the markers state
  //       setStatusMessage('Markers fetched successfully!'); // Success message
  //       console.log('Fetched markers:', data); // Log the fetched data
  //     } catch (error) { 
  //       setStatusMessage('Failed to fetch markers Please try again later.'); // Failure message
  //       console.error('Error fetching markers:', error); // Log the error for debugging
  //     }
  //   };

  //   loadMarkers();
  // }, []);


  const handleCenterUserLocation = () => {
    getUserLocation();
    if (userLocation && mapRef.current){
      mapRef.current.panTo(userLocation);
      mapRef.current.setZoom(defaultZoom);
    } 
  };


  const handleMapClick = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLocation({ lat, lng });
  };

  const closePopup = () => setSelectedLocation(null);

  const handleMarkerSubmit = (markerData) => {
    // Handle the submitted marker data (e.g., log or send it to backend)
    console.log('Marker data submitted:', markerData);
  };

  // const handleSubmitMarker = async (location) => {
  //   try {
  //     await createMarker({
  //       latitude: location.lat,
  //       longitude: location.lng,
  //       description: 'User-submitted marker',
  //     });
  //     console.log('Marker successfully submitted:', location);
  //   } catch (error) {
  //     console.error('Error submitting marker:', error);
  //   }
  // };

  return (
    <div className='map-form-container'>
      <div className='map-section'>
        <UserLocationButton onClick={handleCenterUserLocation} />
        <FilterButton/>
        <LoadScript googleMapsApiKey="AIzaSyC0qEtwJQpgLI1Z6YP0jGTPPjgdqsdAjCw">
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={defaultZoom}
            onLoad={(map) => (mapRef.current = map)} // Save the map instance to the ref
            onClick={handleMapClick} // Left-click for laptop
          >
            {userLocation && <Marker position={userLocation} />}
            {/* {markers.map((marker) => (
              <Marker key={marker.id} position={marker.position} />
            ))} */}
            {selectedLocation && (
              <MarkerSubmissionPopup 
                isOpen={selectedLocation !== null}
                location={selectedLocation}
                onClose={closePopup}
                onSubmit={handleMarkerSubmit}
              />
            )}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default GoogleMapComponent;

