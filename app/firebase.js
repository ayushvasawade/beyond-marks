import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAiipWTIWJTQRNdsTG20jO-p_y-75f_1Iw",
  authDomain: "beyond-marks-37e39.firebaseapp.com",
  projectId: "beyond-marks-37e39",
  storageBucket: "beyond-marks-37e39.appspot.com",
  messagingSenderId: "549537347366",
  appId: "1:549537347366:web:631678773d5bf5a5efb3e7",
  measurementId: "G-6G1S8E0XJ4"
};

// Initialize Firebase only once (for Next.js hot reload)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db }; 