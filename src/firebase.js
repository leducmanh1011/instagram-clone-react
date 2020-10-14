import firebase from "firebase";
// import '@firebase/firestore';
// import '@firebase/auth';
// import '@firebase/storage';

 firebase.initializeApp({
  apiKey: "AIzaSyC4HImOm3dE1A07vWTVF_zNuoe6coTERgA",
  authDomain: "instagram-clone-3107a.firebaseapp.com",
  databaseURL: "https://instagram-clone-3107a.firebaseio.com",
  projectId: "instagram-clone-3107a",
  storageBucket: "instagram-clone-3107a.appspot.com",
  messagingSenderId: "987259368422",
  appId: "1:987259368422:web:b72de768b270e8177c9c27",
  measurementId: "G-53GEJ0M512"
});

const db = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export default { firebase, db, auth, storage };
