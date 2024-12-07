
// src/components/GoogleMapComponent.js
import React, { useState, useRef, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import UserLocationButton from './UserLocationButton';
import FilterButton from './MarkerFilterButton';
import useGeolocation from '../hooks/useGeolocation';
import MarkerSubmissionPopup from './MarkerSubmissionPopup';
import { containerStyle, defaultCenter, defaultZoom } from '../config/googleMapConfig';
import{fetchMarkers} from './FetchandCreateMarker'
import MarkerInfoBox from './MarkerInfoBox';

const GoogleMapComponent = () => { 
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const { userLocation, getUserLocation } = useGeolocation();
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState(null); // Initially, no filter is applied


  // Loads markers from database
  useEffect(() => {
    const loadMarkers = async () => {
    try{
      const markerData = await fetchMarkers();
      setMarkers(markerData);
    } catch (error){
      console.error('Error fetching markers:', error);
    }
  };
    loadMarkers();
  }, []);

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

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };
  
  const closePopup = () => setSelectedLocation(null);

  const addMarker = (markerData) => {
    setMarkers((prevMarkers) => [...prevMarkers, markerData]);
  };

  const closeInfoBox = () => setSelectedMarker(null);  // Close the info box by setting selectedMarker to null

  const applyFilter = (filterType) => {
    setSelectedFilter(filterType); // Set the selected filter
  };

  const filteredMarkers = selectedFilter
  ? markers.filter((marker) => marker.marker_type === selectedFilter) // Only include markers matching the filter
  : markers; // If no filter is selected, show all markers

  
  return (
    <div className='map-form-container'>
      <div className='map-section'>
        <UserLocationButton onClick={handleCenterUserLocation} />
        <FilterButton onFilterSelect={applyFilter}/>
        <LoadScript googleMapsApiKey="AIzaSyC0qEtwJQpgLI1Z6YP0jGTPPjgdqsdAjCw">
          <GoogleMap mapContainerStyle={containerStyle} center={mapCenter} zoom={defaultZoom}
            onLoad={(map) => (mapRef.current = map)} 
            onClick={handleMapClick}
          >
            {userLocation && <Marker position={userLocation} />}
            {filteredMarkers.map((marker, index) => (
              <Marker 
                key={index} 
                position={{lat: marker.latitude, lng: marker.longitude}} 
                label={marker.type}
                onClick={() => handleMarkerClick(marker)} 
                />
            ))} 
            {selectedLocation && (
              <MarkerSubmissionPopup 
                isOpen={!!selectedLocation}
                location={selectedLocation}
                onClose={closePopup}
                onSubmit={addMarker} 
              />
            )}
            {selectedMarker && <MarkerInfoBox
              selectedMarker={selectedMarker} 
              closeInfoBox={closeInfoBox}
            />}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default GoogleMapComponent;

