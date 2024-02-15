import {initializeApp} from 'firebase/app';
import {getAnalytics} from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyAZfwwbPbs54XeAPdUC1cK_iXGJ17tLWS0",
    authDomain: "urban-transport-bf307.firebaseapp.com",
    databaseURL: "https://urban-transport-bf307-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "urban-transport-bf307",
    storageBucket: "urban-transport-bf307.appspot.com",
    messagingSenderId: "513585789062",
    appId: "1:513585789062:web:a358ada75f02de4153b907",
    measurementId: "G-3CSWJTKBSN"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { analytics, auth, db, functions };