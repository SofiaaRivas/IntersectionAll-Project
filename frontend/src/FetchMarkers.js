// src/api/markerAPI.js
import axios from 'axios';

const fetchMarkers = async () => {
  try {
    const response = await axios.get('http://your-backend-url/markers');
    return response.data;
  } catch (error) {
    console.error('Error fetching markers:', error);
    throw error;
  }
};

export { fetchMarkers };
