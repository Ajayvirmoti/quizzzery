// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCX6sAlGOZQIAXXOE-8JIUFFhLvCP9iHw",
  authDomain: "quizzapp-d19d7.firebaseapp.com",
  projectId: "quizzapp-d19d7",
  storageBucket: "quizzapp-d19d7.appspot.com",
  messagingSenderId: "940923247922",
  appId: "1:940923247922:web:1fd447a1a397edee17cb2b",
  measurementId: "G-40TGT94GWL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();