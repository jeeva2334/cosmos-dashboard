import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCyi1qS7tf1KvzHQq9jk3c3oynIXUSTlsA",
    authDomain: "cosmos-8810d.firebaseapp.com",
    databaseURL: "https://cosmos-8810d-default-rtdb.firebaseio.com",
    projectId: "cosmos-8810d",
    storageBucket: "cosmos-8810d.appspot.com",
    messagingSenderId: "264409901026",
    appId: "1:264409901026:web:cab2c1db51733c7ab23bbb",
    measurementId: "G-HBPRZ1T7V5"  
};

const app = initializeApp(firebaseConfig)
export const fsuser = getFirestore(app)
export const authuser = getAuth(app)
export const dbuser = getDatabase(app)
export const storageuser = getStorage(app)