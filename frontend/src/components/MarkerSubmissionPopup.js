import React, { useState } from 'react';
import MarkerSubmissionForm from './MarkerSubmissionForm.js'; // Import the form component

const MarkerSubmissionPopup = ({ isOpen, onClose, location, onSubmit }) => {
  const [showForm, setShowForm] = useState(false); // Toggle visibility of the form

  if (!isOpen) return null; // Only show when popup is open

  const handleYesClick = () => {
    setShowForm(true); // Show the form when the user clicks 'Yes'
  };

  const handleMarkerSubmit = (markerData) => {
    // Add the marker to the map
    onSubmit(markerData);
  }

  return (
    <div className="modal-popup">
      <div className="modal">
        {showForm ? (
          <MarkerSubmissionForm location={location} onClose={onClose} onSubmit={handleMarkerSubmit} />
        ) : (
          <>
            <p>Do you want to create a marker here?</p>
            <p>Latitude: {location.lat}</p>
            <p>Longitude: {location.lng}</p>
            <button onClick={handleYesClick}>Yes</button>
            <button onClick={onClose}>Cancel</button>
          </>
        )}
      </div>
    </div>
  );
};

export default MarkerSubmissionPopup;





// import React, { useState } from 'react';

// const MarkerSubmissionPopup = ({ isOpen, onClose, onSubmit, location }) => {
//     const [showForm, setShowForm] = useState(false); // Toggle form visibility
//     const [formData, setFormData] = useState({ title: "", description: "" }); // Form data
//     if (isOpen) return null;

//     const MarkerSubmissionForm = ({ location }) => {
//         const [description, setDescription] = useState('');
      
//         const handleSubmit = (e) => {
//           e.preventDefault();
//           // Process form submission (for now you can log the data or handle it)
//           console.log('Submitting marker:', { ...location, description });
//         };

//         const handleFormChange = (event) => {
//             const { name, value } = event.target;
//             setFormData((prevData) => ({ ...prevData, [name]: value }));
//         };

//         const handleSave = () => {
//             console.log("Marker Details:", formData);
//             setShowForm(false); // Close the form
//             onClose(); // Close the popup
//         };
    
//     if (showForm) {
//     return (
//         <div className="marker-form-popup">
//             <div className = "modal">
//                 <h3>Enter Marker Details</h3>
//                 <form>
//                 <div>
//                 <label>Title:</label>
//                 <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleFormChange}
//                 />
//                 </div>
//                 <div>
//                 <label>Description:</label>
//                 <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleFormChange}
//                 />
//                 </div>
//                 <button type="button" onClick={handleSave}>
//                 Save
//                 </button>
//                 <button type="button" onClick={onClose}>
//                 Close
//                 </button>
//             </form>
//             </div>
//         </div>
//     );
//     }
    

//     return (
//         <div className="modal-popup">
//             <div className = "modal">
//                 <p>Do you want to create a marker here?</p>
//                 <p>Latitude: {location.lat}</p>
//                 <p>Longitude: {location.lng}</p>
//                 <button onClick={() => setShowForm(true)}>Yes</button>
//                 <button onClick={onClose}>Cancel</button>
//             </div>
//         </div>
//     ); 
// };

// export default MarkerSubmissionPopup;

// // return (
// //     <div className = "modal-overlay">
// //         <div className = "modal">
// //             <h3> Do you want to create a marker?</h3>
// //             <button onClick = {onClose}> Cancel</button>
// //             <button onClick = {handleSubmit}> Continue</button>
// //         </div>
// //     </div>
// // ); 
// // };