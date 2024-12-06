import React, { useState } from 'react';
import "../MarkerSubmissionForm.css";

const MarkerSubmissionForm = ({ location, onClose, onSubmit }) => {
  const [markerType, setMarkerType] = useState('');
  const [width, setWidth] = useState('');
  const [incline, setIncline] = useState('');
  const [surface, setSurface] = useState('');
  const [reliability, setReliability] = useState(1);
  const [details, setDetails] = useState('');

  // Mapping for marker types and categories as specified in database tables
  const markerMappings = {
    Ramp: { marker_type_id: 29, marker_type: 'Ramp', marker_category: 'Outdoor' },
    'Automatic Door': { marker_type_id: 30, marker_type: 'Automatic Door', marker_category: 'Indoor' },
    'Walkway': { marker_type_id: 31, marker_type: 'Walkway', marker_category: 'Outdoor' },
    Terrain: { marker_type_id: 32, marker_type: 'Terrain', marker_category: 'Outdoor' },
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent page reload
    if (!markerType || !width || !incline || !surface) {
      alert('Please fill out all required fields.');
      return;
    }

    // Retrieve the marker type ID and category from the mappings
    const { marker_type_id, marker_type, marker_category } = markerMappings[markerType];

    const markerData = {
      marker_type_id: marker_type_id, // The ID corresponding to the marker type (e.g., Ramp)
      marker_type: marker_type,
      marker_category: marker_category, // The description entered by the user
      latitude: location.lat,
      longitude: location.lng,
      width: width,
      incline: incline,
      surface: surface,
      reliability: reliability,
      details: details,
    };
    //   markerType,
    //   markerCategory,
    //   width,
    //   incline,
    //   surface,
    //   reliability,
    //   details,

    // };

    console.log('Form submitted:', markerData);

      try {
        const response = await fetch('http://localhost:5000/markers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(markerData),
        });

      if (response.ok) {
        const result = await response.json();
        console.log('Marker saved:', result);
        onSubmit(markerData); // Pass the data to the parent component for adding to the map
        onClose(); // Close the form
      } else {
        console.error('Failed to save marker:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting marker:', error);
    }
  };

  return (
    <div className="marker-form-popup">
      <div className="modal">
        <h3>Enter Marker Details</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <p>Select Marker Type:</p>
            {["Ramp", "Walkway", "Automatic Door", "Terrain"].map((type) => (
              <label key={type}>
              <input
                type="radio"
                name="markerType"
                value={type}
                checked={markerType === type}
                onChange={(e) => setMarkerType(e.target.value)}
              />
              {type}
            </label>
            ))}
          </div>

          <div>
            <label>
              Width (ft):
              <input
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                required
                min="0"
              />
            </label>
          </div>

          <div>
            <label>
              Incline (ft):
              <input
                type="number"
                value={incline}
                onChange={(e) => setIncline(e.target.value)}
                required
                min="0"
              />
            </label>
          </div>

          <div>
            <label>
              Surface:
              <select
                value={surface}
                onChange={(e) => setSurface(e.target.value)}
                required
              >
                <option value="" disabled>Select surface type</option>
                <option value="Grassy">Grassy</option>
                <option value="Gravel">Gravel</option>
                <option value="Sidewalk">Sidewalk</option>
                <option value="Road">Road</option>
              </select>
            </label>
          </div>

          <div>
            <label>
              Reliability (1-5):
              <input
                type="range"
                min="1"
                max="5"
                value={reliability}
                onChange={(e) => setReliability(e.target.value)}
              />
              <span>{reliability}</span>
            </label>
          </div>

          <div>
            <label>
              Additional Details:
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Enter any additional details"
              />
            </label>
          </div>

          <div>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MarkerSubmissionForm;