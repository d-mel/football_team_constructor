// Import the functions you need from the SDKs you need
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGzXjF_tb5vJ4IK_z12gbN6nzyQODg_uQ',
  authDomain: 'football-80212.firebaseapp.com',
  projectId: 'football-80212',
  storageBucket: 'football-80212.appspot.com',
  messagingSenderId: '452759428168',
  appId: '1:452759428168:web:cb401c332bddd5dc36cc7d',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
