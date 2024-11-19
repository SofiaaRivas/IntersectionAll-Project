// utils.js
export const fetchUserRole = async (firebaseUid) => {
    try {
      const response = await fetch(
        `https://apex.oracle.com/pls/apex/intersectionall/users/Users?firebase_uid=${firebaseUid}`
      );
      const userData = await response.json();
  
      if (response.ok && userData.length > 0) {
        return userData[0].role;
      } else {
        console.error("Failed to fetch user role:", userData.message || "Unknown error");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user role:", error);
      return null;
    }
  };
