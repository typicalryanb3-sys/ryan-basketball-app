import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBvM43PBZKR_CC0sF_PahmeoCUA_Y8endQ",
  authDomain: "ryan-basketball-app.firebaseapp.com",
  projectId: "ryan-basketball-app",
  storageBucket: "ryan-basketball-app.appspot.com",
  messagingSenderId: "57766695790",
  appId: "1:57766695790:web:1093ea82c5554af081677f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
