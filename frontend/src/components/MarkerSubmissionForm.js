import React, { useState } from 'react';

const MarkerSubmissionForm = ({ location, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    onSubmit(formData); // Send form data to the parent component or API
    onClose(); // Close the form after submitting
  };

  return (
    <div className="marker-form-popup">
      <div className="modal">
        <h3>Enter Marker Details</h3>
        <form>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleFormChange}
            />
          </div>
          <button type="button" onClick={handleSubmit}>
            Save
          </button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default MarkerSubmissionForm;
