// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCj-zulVS48fAw7Ft7EURAIyS4kMPOYlKI",
  authDomain: "ample-form.firebaseapp.com",
  projectId: "ample-form",
  storageBucket: "ample-form.appspot.com",
  messagingSenderId: "735300054254",
  appId: "1:735300054254:web:94f7f900c5d9fd5d4a17ff",
  measurementId: "G-BDPZWHQ9HM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const db = getFirestore(app);

export { db };
