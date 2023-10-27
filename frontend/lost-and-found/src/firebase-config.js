
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import "firebase/storage";



const firebaseConfig = {

 apiKey: "AIzaSyCHvOKMINwnWJ2lo9LorD0PqGJgp_z-DTE",
    authDomain: "lostnfound-7c21c.firebaseapp.com",
    projectId: "lostnfound-7c21c",
    storageBucket: "lostnfound-7c21c.appspot.com",
    messagingSenderId: "449053372042",
    appId: "1:449053372042:web:0fb75687141b460f97c773",
    measurementId: "G-92REP3KQB1"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
