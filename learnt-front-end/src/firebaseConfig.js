// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAI2FQHPOxPMfk2wpif18KOXSbNlUF5YWM",
  authDomain: "learnt-app-39abf.firebaseapp.com",
  projectId: "learnt-app-39abf",
  storageBucket: "learnt-app-39abf.appspot.com",
  messagingSenderId: "33765552940",
  appId: "1:33765552940:web:ebbcea4e9b8085ded83289",
  measurementId: "G-P6JVTJ5SW6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
