// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp-PPXs6LmkKdFhXK5RXHDMLeJsASZSBc",
  authDomain: "african-sharks.firebaseapp.com",
  projectId: "african-sharks",
  storageBucket: "african-sharks.firebasestorage.app",
  messagingSenderId: "259488252219",
  appId: "1:259488252219:web:f0fab351b7ba2f97ae771e",
  measurementId: "G-0F0P042YD5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
