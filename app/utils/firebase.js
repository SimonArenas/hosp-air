import firebase from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyAFye7S3pa-gih8Aj3YW_oz7VD7nawJ5LU",
  authDomain: "hospital-air-40f98.firebaseapp.com",
  databaseURL: "https://hospital-air-40f98.firebaseio.com",
  projectId: "hospital-air-40f98",
  storageBucket: "hospital-air-40f98.appspot.com",
  messagingSenderId: "251779998479",
  appId: "1:251779998479:web:167186eb2ae898f519147a",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
