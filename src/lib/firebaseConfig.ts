import { initializeApp } from "firebase/app";
import { getStorage, FirebaseStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzOkojYzVUf6EB1p8Ws7ilcqFkPV4lFyQ",
    authDomain: "matafomedelivery-images.firebaseapp.com",
    projectId: "matafomedelivery-images",
    storageBucket: "matafomedelivery-images.appspot.com",
    messagingSenderId: "501231168254",
    appId: "1:501231168254:web:2340a7d6b12b180c0513af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage: FirebaseStorage = getStorage(app);

export { storage };
