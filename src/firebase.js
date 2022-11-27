// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBELP8e9wGLjWadgeJ_lJk_c_YbJO1FnEo",

  authDomain: "chat-app-6199a.firebaseapp.com",

  projectId: "chat-app-6199a",

  storageBucket: "chat-app-6199a.appspot.com",

  messagingSenderId: "802600455389",

  appId: "1:802600455389:web:b1d2696e5f27558841df34",

  measurementId: "G-WB5TTT99BP"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()