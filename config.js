// firebase config key setup
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// web app's firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDSjESqwpZzkjo-j-M93FFF2y6goHbjHeE",
    authDomain: "authenticationsystem-9e2c9.firebaseapp.com",
    projectId: "authenticationsystem-9e2c9",
    storageBucket: "authenticationsystem-9e2c9.appspot.com",
    messagingSenderId: "703041927444",
    appId: "1:703041927444:web:e17fd9332a173a1d8c2a01",
    measurementId: "G-GKSE30DDN6"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };