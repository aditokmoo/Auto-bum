// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtCOt0pDplIHR0kHFxh2IJrXG1Sd2pqSU",
  authDomain: "car-market-56a4a.firebaseapp.com",
  projectId: "car-market-56a4a",
  storageBucket: "car-market-56a4a.appspot.com",
  messagingSenderId: "190457897518",
  appId: "1:190457897518:web:7a18be1b72df2a627335bf"
};

initializeApp(firebaseConfig);
export const db = getFirestore();
