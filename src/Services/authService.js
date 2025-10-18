// src/services/authService.js
//import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged  } from "firebase/auth";
import { auth } from "../Firebase/congif";

// Registro
// src/services/authService.js
import { 
  createUserWithEmailAndPassword, 
  sendEmailVerification, 
  signInWithEmailAndPassword, 
  signOut,updateProfile 
} from "firebase/auth";

export async function registerUser(email, password,displayName) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(userCredential.user, { displayName });
  }
  await sendEmailVerification(userCredential.user);
  return userCredential.user;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  if (!userCredential.user.emailVerified) {
    throw new Error("EMAIL_NOT_VERIFIED");
  }
  return userCredential.user;
}

export async function logoutUser() {
  await signOut(auth);
}
