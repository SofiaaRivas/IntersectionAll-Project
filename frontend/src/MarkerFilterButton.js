// MarkerFilterButton.js
import React from 'react';

const FilterButton = ({ onClick }) => {
  return (
    <button className="filter-button" onClick={onClick}>
      <i className="fa-solid fa-filter fa-xl"></i> 
    </button>
  );
};

export default FilterButton;