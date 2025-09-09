// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB3TpLZqUDKd9j3jXrQdsZfsiK1JPc7esY",
  authDomain: "wyffle.firebaseapp.com",
  databaseURL: "https://wyffle-default-rtdb.firebaseio.com",
  projectId: "wyffle",
  storageBucket: "wyffle.firebasestorage.app",
  messagingSenderId: "254219167375",
  appId: "1:254219167375:web:d9d3807396e5c8768c32fa",
  measurementId: "G-GB3TLVYF6F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

// Providers
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export { auth,storage , googleProvider, githubProvider };
