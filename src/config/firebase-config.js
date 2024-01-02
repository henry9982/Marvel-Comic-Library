// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvqNkTdw_ThISN-qFh1TgSIHhAK00MjJk",
  authDomain: "marvel-comic-library.firebaseapp.com",
  projectId: "marvel-comic-library",
  storageBucket: "marvel-comic-library.appspot.com",
  messagingSenderId: "223929686640",
  appId: "1:223929686640:web:df3c10e4657603a41e72b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)