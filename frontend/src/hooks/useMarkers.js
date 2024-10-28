// src/hooks/useMarkers.js
// import { useEffect, useState } from 'react';
// import { fetchMarkers } from '../api/markerAPI';

// const useMarkers = () => {
//   const [markers, setMarkers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const loadMarkers = async () => {
//       try {
//         const data = await fetchMarkers();
//         setMarkers(data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadMarkers();
//   }, []);

//   return { markers, loading, error };
// };

// export default useMarkers;


// src/hooks/useMarkers.js
import { useState } from 'react';

const useMarkers = () => {
  const [markers] = useState([
    { id: 1, position: { lat: 41.504341, lng: -81.608383 } } // Example marker
  ]);

  return { markers };
};

export default useMarkers;
