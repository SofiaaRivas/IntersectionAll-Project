// firebaseConfigComponent.js

// Code imported from Firebase website
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOf6NGCAOb6nms8rRG0m2m0E-kjJrdzls",
  authDomain: "intersectionall-22c5f.firebaseapp.com",
  projectId: "intersectionall-22c5f",
  storageBucket: "intersectionall-22c5f.firebasestorage.app",
  messagingSenderId: "203290633510",
  appId: "1:203290633510:web:919a7dbe9ca1ea218f4de7",
  measurementId: "G-PRBJ8LQ4L3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
