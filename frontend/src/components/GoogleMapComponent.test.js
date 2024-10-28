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

    // Check if the 'center' attribute is set to defaultCenter
    expect(googleMap).toHaveAttribute('center', JSON.stringify(defaultCenter));
  });
});
