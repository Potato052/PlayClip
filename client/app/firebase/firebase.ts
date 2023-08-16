// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAhBTXxPWq0dwzudMoPuoAG5VNVXanbm6Y",
    authDomain: "playclip.firebaseapp.com",
    projectId: "playclip",
    storageBucket: "playclip.appspot.com",
    messagingSenderId: "252854328896",
    appId: "1:252854328896:web:6bc31b4b69a9f76e8489a5"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export function signInWithGoogle() {
  return signInWithPopup(auth, new GoogleAuthProvider());
}

export function signOut() {
  return auth.signOut();
}

export function onAuthStateChangedHelper(callback: (user: User | null) => void) {
  return onAuthStateChanged(auth, callback);
}

export default app;