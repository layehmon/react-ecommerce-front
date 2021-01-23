import firebase from "firebase/app";
import "firebase/auth";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyApV6XgM8qh_5UCSnjiPFK1jt1SVSX_HEI",
  authDomain: "ecommerce-9cd8f.firebaseapp.com",
  projectId: "ecommerce-9cd8f",
  storageBucket: "ecommerce-9cd8f.appspot.com",
  messagingSenderId: "591082563450",
  appId: "1:591082563450:web:12aabff1d16b3b0a6c18c3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const  faceBookAuthProvider = new firebase.auth.FacebookAuthProvider();
