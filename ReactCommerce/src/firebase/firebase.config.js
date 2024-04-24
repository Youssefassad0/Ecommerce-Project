// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbZp0eqTDYmfFIO8wf8jtGBWp3FLi8m4Q",
  authDomain: "assadshop-9e00b.firebaseapp.com",
  projectId: "assadshop-9e00b",
  storageBucket: "assadshop-9e00b.appspot.com",
  messagingSenderId: "678054769469",
  appId: "1:678054769469:web:8811785f4064ab64410b54",
  measurementId: "G-3J5WHWGKQV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;