import {initializeApp} from 'firebase/app';
import {getAnalytics} from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getFunctions} from 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBeqFAHvPqlEfBpM06Dzz2uxcHkIC6gvi4",
    authDomain: "contacts-dbms.firebaseapp.com",
    projectId: "contacts-dbms",
    storageBucket: "contacts-dbms.appspot.com",
    messagingSenderId: "628752789938",
    appId: "1:628752789938:web:ab2a97e7f2e6beeb5db4ab",
    measurementId: "G-1NNQZRVS86"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { analytics, auth, db, functions };