import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBSCozCGblxER7evC4YB33UQR96KMZ3OxA",
  authDomain: "shri-hit-seva.firebaseapp.com",
  projectId: "shri-hit-seva",
  storageBucket: "shri-hit-seva.firebasestorage.app",
  messagingSenderId: "588680936009",
  appId: "1:588680936009:web:f2f14bfe290a8e5e151d98",
  measurementId: "G-MYE8V910R7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
