import { getAuth, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB7B4LL51Y8GK28SGqo9WnQxkvq7y2tdM4",
  authDomain: "whatschat-3645f.firebaseapp.com",
  projectId: "whatschat-3645f",
  storageBucket: "whatschat-3645f.appspot.com",
  messagingSenderId: "846351997269",
  appId: "1:846351997269:web:8aec455170e5d7e07bf7dc",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { db, auth, provider };
