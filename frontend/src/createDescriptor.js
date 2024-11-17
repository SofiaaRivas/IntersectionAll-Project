// src/api/markerAPI.js
import axios from 'axios';

const createDescriptor = async (descriptor) => {
  try {
    const response = await axios.post('https://apex.oracle.com/pls/apex/intersectionall/descriptors/Descriptors', descriptor);
    return response.data; // newly created descriptor
  } catch (error) {
    console.error('Error creating descriptor:', error);
    throw error;
  }
};

export { createDescriptor };
