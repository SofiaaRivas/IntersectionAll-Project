// src/components/UserLocationButton.js
import React from 'react';

const UserLocationButton = ({ onClick }) => (
  <button data-testid='centerLocation-Button' className='centerLocation-Button' onClick={onClick} zoom={17} >
    <i className="fa-solid fa-location-crosshairs fa-2xl"></i>
  </button>
);

export default UserLocationButton;
