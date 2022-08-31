// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBrHGD9d09vepCxZQHNK5llBlq9KQcgI8",
  authDomain: "e-commerce-mern-6c31c.firebaseapp.com",
  projectId: "e-commerce-mern-6c31c",
  storageBucket: "e-commerce-mern-6c31c.appspot.com",
  messagingSenderId: "935534989378",
  appId: "1:935534989378:web:e47903dab7c05644311ddb",
  measurementId: "G-QBSWN45QT8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);