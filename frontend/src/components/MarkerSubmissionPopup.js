import React, { useState } from 'react';
import MarkerSubmissionForm from './MarkerSubmissionForm.js'; // Import the form component

const MarkerSubmissionPopup = ({ isOpen, onClose, location, onSubmit }) => {
  const [showForm, setShowForm] = useState(false); // Toggle visibility of the form

  if (!isOpen) return null; // Only show when popup is open

  const handleYesClick = () => {
    setShowForm(true); // Show the form when the user clicks 'Yes'
  };

  return (
    <div className="modal-popup">
      <div className="modal">
        {showForm ? (
          <MarkerSubmissionForm location={location} onClose={onClose} onSubmit={onSubmit} />
        ) : (
          <>
            <p>Do you want to create a marker here?</p>
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleYesClick}>Yes</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MarkerSubmissionPopup;



