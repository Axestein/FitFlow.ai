import { initializeApp } from 'firebase/app'; // Import Firebase app initialization
import { getAuth } from 'firebase/auth'; // Import the modular auth function
import { getAnalytics } from 'firebase/analytics'; // Optional: if you use analytics

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCBaowDBgWop5NUoQKS4MF8rZuhI0SVZ-c",
  authDomain: "fitflow-53082.firebaseapp.com",
  projectId: "fitflow-53082",
  storageBucket: "fitflow-53082.firebasestorage.app",
  messagingSenderId: "683384422314",
  appId: "1:683384422314:web:fc7b230e1be372592d75d3",
  measurementId: "G-1YFRRDW811"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Optional: initialize Firebase Analytics
const analytics = getAnalytics(app);

// Initialize Firebase Auth using the modular SDK
export const auth = getAuth(app); // Export the auth module

export default app; // Default export of the Firebase app instance
