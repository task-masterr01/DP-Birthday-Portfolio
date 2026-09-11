import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBKMGJfpWd82dMoL3jdlbIZ_vnS4pocsE0",
  authDomain: "dp-birthday-portfolio.firebaseapp.com",
  projectId: "dp-birthday-portfolio",
  storageBucket: "dp-birthday-portfolio.firebasestorage.app",
  messagingSenderId: "964554282949",
  appId: "1:964554282949:web:2e81fe59e7d97c9ae81dac",
  measurementId: "G-QBJP3T8FMH"
};

const app = initializeApp(firebaseConfig);
export const auth     = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db       = getFirestore(app, 'birthday-db');
