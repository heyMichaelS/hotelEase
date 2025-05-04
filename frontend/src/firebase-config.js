
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCwrVyGtaOydZraD2qM07r03cj4dAikcqw",
    authDomain: "hotelease-f346d.firebaseapp.com",
    projectId: "hotelease-f346d",
    storageBucket: "hotelease-f346d.firebasestorage.app",
    messagingSenderId: "684990064051",
    appId: "1:684990064051:web:db27a9de7557e4883957c6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); 