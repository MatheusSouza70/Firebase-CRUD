import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAS55PM_intUXIIVRMYz8ihv8xg6WN9IKE",
  authDomain: "crud-firebase-30ea9.firebaseapp.com",
  databaseURL: "https://crud-firebase-30ea9-default-rtdb.firebaseio.com",
  projectId: "crud-firebase-30ea9",
  storageBucket: "crud-firebase-30ea9.appspot.com",
  messagingSenderId: "658191599936",
  appId: "1:658191599936:web:547f25bc78db3d406352a5",
  measurementId: "G-LTV7N4J17Y",
};

export const app = initializeApp(firebaseConfig);
// MARK: Firestore Reference
export const db = getFirestore(app);
