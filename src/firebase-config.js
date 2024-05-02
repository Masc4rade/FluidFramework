import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCahmIX0VgdR-z_XaHaEHP-04hd5WdWVJ4",
  authDomain: "fluidframework-74659.firebaseapp.com",
  projectId: "fluidframework-74659",
  storageBucket: "fluidframework-74659.appspot.com",
  messagingSenderId: "1073948519508",
  appId: "1:1073948519508:web:0d7d3834ac1baa69a211c1",
  measurementId: "G-70WM082PBV"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = firebase.auth();
