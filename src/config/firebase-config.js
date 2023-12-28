// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAV-cfQDHR_WTNGiZajAzMl5FD4v91arX8",
  authDomain: "marvel-comic-7f1bd.firebaseapp.com",
  projectId: "marvel-comic-7f1bd",
  storageBucket: "marvel-comic-7f1bd.appspot.com",
  messagingSenderId: "990959224728",
  appId: "1:990959224728:web:aea041eb6f81186fd38ded"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()