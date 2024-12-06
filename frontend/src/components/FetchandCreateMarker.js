// markerService.js

export const fetchMarkers = async () => {
  try {
    const response = await fetch('http://localhost:5000/markers', {
      method: 'GET', // Include the method inside the options object
      headers: {
        'Content-Type': 'application/json', // Optional but good practice for clarity
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching markers: ${response.statusText}`);
    }

    return await response.json(); // Parse and return the marker data
  } catch (error) {
    console.error('Error fetching markers:', error);
    return []; // Return an empty array to avoid breaking the application
  }
};

// export const fetchMarkers = async () => {
//   try {
//     const response = await fetch('http://localhost:5000/markers');
//       method: 'GET',
//     if (!response.ok) {
//       throw new Error(`Error fetching marker types: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };


// export const fetchMarkerLocations = async () => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/markers/Markers`);
//     if (!response.ok) {
//       throw new Error(`Error fetching marker locations: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// };

// export const submitMarkerType = async (markerType) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/descriptors/Descriptors`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ type: markerType }),
//     });
//     if (!response.ok) {
//       throw new Error(`Error submitting marker type: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };

// export const submitMarkerLocation = async (latitude, longitude) => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/markers/Markers`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ latitude, longitude }),
//     });
//     if (!response.ok) {
//       throw new Error(`Error submitting marker location: ${response.statusText}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
