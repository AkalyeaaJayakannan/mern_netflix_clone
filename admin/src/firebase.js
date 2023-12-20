import firebase, { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUMV9uvbzpDh8RFs839xa8Yn7qaYkPEXs",
  authDomain: "react-netflix-clone-25840.firebaseapp.com",
  projectId: "react-netflix-clone-25840",
  storageBucket: "react-netflix-clone-25840.appspot.com",
  messagingSenderId: "837710401059",
  appId: "1:837710401059:web:39ce741e35a09a68d26b96",
  measurementId: "G-PFG908G6Q0",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export default storage;
