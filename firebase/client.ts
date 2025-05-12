import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAfJ6hVDkM-h8lRcfc5CGu6XmB0a8dT3Jw",
  authDomain: "interviewpal-53549.firebaseapp.com",
  projectId: "interviewpal-53549",
  storageBucket: "interviewpal-53549.firebasestorage.app",
  messagingSenderId: "921722542285",
  appId: "1:921722542285:web:6ec6a78b6558c631bef184",
  measurementId: "G-0PYYLLGH59"
};

const app = !getApps.length ? initializeApp(firebaseConfig): getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);