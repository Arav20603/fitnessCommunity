// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBfyOett06Dv7kaFUd6Ta8Tx_UArwt-sY",
  authDomain: "fitnesstracker-410b1.firebaseapp.com",
  projectId: "fitnesstracker-410b1",
  storageBucket: "fitnesstracker-410b1.firebasestorage.app",
  messagingSenderId: "32551606556",
  appId: "1:32551606556:web:66e5d6ee71ef4e243542d9",
  measurementId: "G-MRZZLY8N9V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app); 