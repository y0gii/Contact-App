// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyChU-ns2xqfaackBZ-8OovETyIVvKZb0dc",
  authDomain: "project-contact-de402.firebaseapp.com",
  projectId: "project-contact-de402",
  storageBucket: "project-contact-de402.appspot.com",
  messagingSenderId: "487082254917",
  appId: "1:487082254917:web:65f831e7e896418363b92c"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);