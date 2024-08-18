// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // If using authentication
import { getFirestore } from "firebase/firestore"; // If using Firestore
import { getDatabase } from "firebase/database"; // If using Realtime Database
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBImOpZxGMGSQmVApTLSQ_A38UL5NflcXE",
  authDomain: "aiflashcard-20bf7.firebaseapp.com",
  projectId: "aiflashcard-20bf7",
  storageBucket: "aiflashcard-20bf7.appspot.com",
  messagingSenderId: "612353817715",
  appId: "1:612353817715:web:a020bdec7803c2a8753e06",
  measurementId: "G-QJ608E7KY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const realtimeDatabase = getDatabase(app);
const analytics = getAnalytics(app);

export { app, auth, firestore, realtimeDatabase, analytics };