import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw3QXKLIgjSxduHIj4Ih7lEnuC8eFKS70",
  authDomain: "clone-c7ffb.firebaseapp.com",
  databaseURL: "https://clone-c7ffb.firebaseio.com",
  projectId: "clone-c7ffb",
  storageBucket: "clone-c7ffb.appspot.com",
  messagingSenderId: "443096472787",
  appId: "1:443096472787:web:a0f92136c552a6a6ae8826",
  measurementId: "G-Y32BLPKCKN"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };