// markerService.js

export const fetchMarkers = async () => {
  try {
    const response = await fetch('http://localhost:5000/markers', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching markers: ${response.statusText}`);
    }

    return await response.json(); // Parse and return the marker data
  } catch (error) {
    console.error('Error fetching markers:', error);
    return []; 
  }
};
