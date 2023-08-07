// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDL2pG43tVQD02-OP4ie5et8WXBq_k42YI",
  authDomain: "grfinance-d8fbd.firebaseapp.com",
  projectId: "grfinance-d8fbd",
  storageBucket: "grfinance-d8fbd.appspot.com",
  messagingSenderId: "702349227566",
  appId: "1:702349227566:web:6c479a33e3f7407a7891bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getFirestore(app);
const storage = getStorage();
export { app, auth, provider, database, storage };
