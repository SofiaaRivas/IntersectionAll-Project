// MarkerFilterButton.js
import React, { useState } from 'react';

const MarkerFilterButton = ({ onFilterSelect }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const handleFilterClick = (filterType) => {
    onFilterSelect(filterType); // Pass the selected filter type to the parent component
    setIsMenuOpen(false); // Close the menu
  };

  return (
    <div className="filter-container">
      <button className="filter-button" onClick={toggleMenu}>
        <i className="fa-solid fa-filter fa-xl"></i>
      </button>
      {isMenuOpen && (
        <div className="filter-menu">
          <button onClick={() => handleFilterClick(null)}>All</button>
          <button onClick={() => handleFilterClick('Ramp')}>Ramps</button>
          <button onClick={() => handleFilterClick('Walkway')}>Walkways</button>
          <button onClick={() => handleFilterClick('Terrain')}>Terrain</button>
          <button onClick={() => handleFilterClick('Automatic Door')}>Automatic Door</button>
        </div>
      )}
    </div>
  );
};

export default MarkerFilterButton;
