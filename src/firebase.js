// Add the signInWithPopup import
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from './app.config'

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const provider = new GoogleAuthProvider();

// Export signInWithPopup
export { auth, provider, signInWithPopup }
export default db