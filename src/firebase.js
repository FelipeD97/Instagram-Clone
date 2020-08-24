import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBoKwFC-Sq_xu9y8LGFtyaatn-l57GQ6z4",
    authDomain: "instagram-clone-a3525.firebaseapp.com",
    databaseURL: "https://instagram-clone-a3525.firebaseio.com",
    projectId: "instagram-clone-a3525",
    storageBucket: "instagram-clone-a3525.appspot.com",
    messagingSenderId: "440510773748",
    appId: "1:440510773748:web:c5d14477b464676e8fe1a1",
    measurementId: "G-X1XKJCDQ6H"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

export default db;