import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCaVggQRh4UvL9Wuef89Nsf-XUYyhx-9n8",
    authDomain: "ecommerce-react-app-db-2a08e.firebaseapp.com",
    databaseURL: "https://ecommerce-react-app-db-2a08e.firebaseio.com",
    projectId: "ecommerce-react-app-db-2a08e",
    storageBucket: "ecommerce-react-app-db-2a08e.appspot.com",
    messagingSenderId: "584030444518",
    appId: "1:584030444518:web:3b0d76b7f6ebb5c4c71427",
    measurementId: "G-W0LVPC6KW6"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
   
    if(!snapShot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  };

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account '});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;