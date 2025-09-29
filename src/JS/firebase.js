// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAZ7UImhQ-sSuc8aUB0u6WuHwX8dTDe6m8",
  authDomain: "crudfirebaseangular-f567e.firebaseapp.com",
  databaseURL: "https://crudfirebaseangular-f567e-default-rtdb.firebaseio.com",
  projectId: "crudfirebaseangular-f567e",
  storageBucket: "crudfirebaseangular-f567e.firebasestorage.app",
  messagingSenderId: "139213728766",
  appId: "1:139213728766:web:f8fa5f5c8a4271e78eeeaf",
  measurementId: "G-9RVHN12TR1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);