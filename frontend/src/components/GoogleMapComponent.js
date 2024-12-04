
// src/components/GoogleMapComponent.js
import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocationButton from './UserLocationButton';
import FilterButton from './MarkerFilterButton';
import useGeolocation from '../hooks/useGeolocation';
import MarkerSubmissionPopup from './MarkerSubmissionPopup';
import { containerStyle, defaultCenter, defaultZoom } from '../config/googleMapConfig';
import{fetchMarkerLocations,submitMarkerType,submitMarkerLocation} from './FetchandCreateMarker'

const GoogleMapComponent = () => { 
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { userLocation, getUserLocation } = useGeolocation();
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  //const [popupLocation, setPopupLocation] = useState(null);
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

  // Load marker locations when the component mounts
  useEffect(() => {
    const loadMarkers = async () => {
      const markerData = await fetchMarkerLocations();
      setMarkers(markerData);
    };
    loadMarkers();
  }, []);

  const handleMapClick = (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      setSelectedLocation({ lat, lng });
  };

  const closePopup = () => setSelectedLocation(null);

  const handleMarkerSubmit = async (markerData) => {
    try {
      await submitMarkerType(markerData.tye);
      // Submit marker location
      const newMarker = await submitMarkerLocation(markerData.latitude, markerData.longitude);

      // Update markers on the map
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setSelectedLocation(null); // Close popup
    } catch (error) {
      console.error('Error submitting marker:', error);
    }
  };

  
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
        {selectedLocation && (
        <MarkerSubmissionPopup
          isOpen={!!selectedLocation}
          onClose={() => setSelectedLocation(null)}
          location={selectedLocation}
          onSubmit={(formData) => 
            handleMarkerSubmit({
              type: formData.type,
              latitude: selectedLocation.lat,
              longitude: selectedLocation.lng,
            })
          }
        />
        )}
      </div>
    </div>
  );
};

export default GoogleMapComponent;

