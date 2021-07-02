import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyDr5V65wYbZvvG8SWXH6s7Lm701t38vIEs",
    authDomain: "filr-de764.firebaseapp.com",
    projectId: "filr-de764",
    storageBucket: "filr-de764.appspot.com",
    messagingSenderId: "416761316005",
    appId: "1:416761316005:web:d83fb7396067e4dfbc434c"
  };

  
const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export {auth, storage, provider}
export default db;