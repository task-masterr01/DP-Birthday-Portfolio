import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAm4ATK7pAhuUAgcHzm_Trf30sYbvFLwVc",
  authDomain: "birthday-portfolio.firebaseapp.com",
  projectId: "birthday-portfolio",
  storageBucket: "birthday-portfolio.firebasestorage.app",
  messagingSenderId: "968136223616",
  appId: "1:968136223616:web:7a2f75b322008d56fd2f65",
};

const app      = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db       = getFirestore(app);
