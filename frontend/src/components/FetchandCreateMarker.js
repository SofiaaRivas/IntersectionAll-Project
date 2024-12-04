// markerService.js

const API_BASE_URL = 'https://apex.oracle.com/pls/apex/intersectionall';

export const fetchMarkerTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/descriptors/Descriptors`);
    if (!response.ok) {
      throw new Error(`Error fetching marker types: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchMarkerLocations = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/markers/Markers`);
    if (!response.ok) {
      throw new Error(`Error fetching marker locations: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const submitMarkerType = async (markerType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/descriptors/Descriptors`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type: markerType }),
    });
    if (!response.ok) {
      throw new Error(`Error submitting marker type: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const submitMarkerLocation = async (latitude, longitude) => {
  try {
    const response = await fetch(`${API_BASE_URL}/markers/Markers`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ latitude, longitude }),
    });
    if (!response.ok) {
      throw new Error(`Error submitting marker location: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
