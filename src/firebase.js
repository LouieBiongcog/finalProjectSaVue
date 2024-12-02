import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCnz9G_HCTmn8M3RETH8GtJ2o-E-2ICl88",
    authDomain: "donation-platform-ef8e8.firebaseapp.com",
    projectId: "donation-platform-ef8e8",
    storageBucket: "donation-platform-ef8e8.firebasestorage.app",
    messagingSenderId: "437958731097",
    appId: "1:437958731097:web:1a8749a73d9bfa6f599848"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
