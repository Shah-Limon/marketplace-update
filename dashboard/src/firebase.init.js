// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA422z6A-gWrKZwd1vn7gVBn2bU4dO4oa0",
  authDomain: "freelancer-356b4.firebaseapp.com",
  projectId: "freelancer-356b4",
  storageBucket: "freelancer-356b4.appspot.com",
  messagingSenderId: "858441104440",
  appId: "1:858441104440:web:99189acadfc31317a0bacd",
  measurementId: "G-BJHCG1VVK5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export default auth;