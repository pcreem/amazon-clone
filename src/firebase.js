import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA92gJ2VtTfMgxMNXVr1Qppn1ksjSRY58c",
  authDomain: "clone-2d2ea.firebaseapp.com",
  databaseURL: "https://clone-2d2ea.firebaseio.com",
  projectId: "clone-2d2ea",
  storageBucket: "clone-2d2ea.appspot.com",
  messagingSenderId: "337204952851",
  appId: "1:337204952851:web:23fe66821bab95249c64e6"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();

export { db, auth };