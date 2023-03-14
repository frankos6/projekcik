import {initializeApp} from "firebase/app";
import {getFirestore} from "@firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyChdq5OC4xNvcdvugC-meACgdly9EnFWlY",
    authDomain: "projekcik-2f25c.firebaseapp.com",
    projectId: "projekcik-2f25c",
    storageBucket: "projekcik-2f25c.appspot.com",
    messagingSenderId: "493648612434",
    appId: "1:493648612434:web:500a111d2e3661a6e6238b"
};
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);