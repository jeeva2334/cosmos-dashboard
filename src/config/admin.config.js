import { initializeApp } from "firebase-admin/app";
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';
import { getDatabase } from 'firebase-admin/database'
import { getStorage } from 'firebase-admin/storage'

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
export const fs = getFirestore(app)
export const auth = getAuth(app)
export const db = getDatabase(app)
export const storage = getStorage(app)