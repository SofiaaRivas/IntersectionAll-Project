// GoogleMapComponent.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import GoogleMapComponent from './GoogleMapComponent';

// Define the default center position to match the component
const defaultCenter = {
  lat: 41.504341,
  lng: -81.608383,
};

describe('GoogleMapComponent', () => {
  test('centers the map at the default location on initial render', () => {
    render(<GoogleMapComponent />);

    // Find the mocked GoogleMap component
    const googleMap = screen.getByTestId('google-map');

    // Check if that center is set to defaultCenter
    expect(googleMap).toHaveAttribute('center', JSON.stringify(defaultCenter));
  });
});



describe('GoogleMapComponent', () => {
    const mockUserLocation = { lat: 40.73061, lng: -73.935242 }; 
  
    beforeEach(() => {
      // Mock the geolocation API
      global.navigator.geolocation = {
        getCurrentPosition: jest.fn((success) => 
          success({ coords: { latitude: mockUserLocation.lat, longitude: mockUserLocation.lng } })
        )
      };
    });
    afterEach(() => jest.clearAllMocks());
  
    test('centers the map on the user location when the button is clicked', async () => {
      render(<GoogleMapComponent />);
  
      // Trigger the button click to get the user location
      const centerButton = screen.getByTestId('centerLocation-Button');
      fireEvent.click(centerButton);
  
      // Wait for the map center to be updated to the user's location
      await waitFor(() => {
        const googleMap = screen.getByTestId('google-map');
        expect(googleMap).toHaveAttribute('center', JSON.stringify(mockUserLocation));
      });
    });
  });
