import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAm4ATK7pAhuUAgcHzm_Trf30sYbvFLwVc",
  authDomain: "birthday-portfolio.firebaseapp.com",
  projectId: "birthday-portfolio",
  storageBucket: "birthday-portfolio.firebasestorage.app",
  messagingSenderId: "968136223616",
  appId: "1:968136223616:web:c5d9555d39bf1b14fd2f65",
  measurementId: "G-6NXG5N7982"
};

const app      = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db       = getFirestore(app);
