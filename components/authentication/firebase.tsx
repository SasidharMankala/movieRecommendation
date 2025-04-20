import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAFWjW0gdMpbZM_1RsdLBOcOULj6zoACQU",
  authDomain: "movierecommendation-a1ba2.firebaseapp.com",
  projectId: "movierecommendation-a1ba2",
  storageBucket: "movierecommendation-a1ba2.firebasestorage.app",
  messagingSenderId: "602249703754",
  appId: "1:602249703754:web:7ff1a6ce3c38707ca2d1b3",
  measurementId: "G-SN31SY01KX"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };