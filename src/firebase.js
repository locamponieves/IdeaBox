// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbvWgwNJwtNN3WHyRoTTrv1IvpSB6qAng",
    authDomain: "ideabox-e5951.firebaseapp.com",
    projectId: "ideabox-e5951",
    storageBucket: "ideabox-e5951.appspot.com",
    messagingSenderId: "857672804465",
    appId: "1:857672804465:web:b8b17823a079a34f0413d0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db   = firebase.firestore();

export { auth, db, firebase };