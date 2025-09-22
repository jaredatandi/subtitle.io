// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDFUp_sum9blanxteoYGaxyapvHekEZQZo",
  authDomain: "subtitleo.firebaseapp.com",
  projectId: "subtitleo",
  storageBucket: "subtitleo.appspot.com",
  messagingSenderId: "853462515019",
  appId: "1:853462515019:web:ebc62ac9900ce3843c7cce",
  measurementId: "G-F1WQTXM4DY",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
