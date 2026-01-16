import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGURmmJML8HAiQ21sQV-QH55qBcKWPAMg",
  authDomain: "ailatrieuphu-af7d4.firebaseapp.com",
  projectId: "ailatrieuphu-af7d4",
  storageBucket: "ailatrieuphu-af7d4.firebasestorage.app",
  messagingSenderId: "339606073678",
  appId: "1:339606073678:web:d668485abb63457a442e1f"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
