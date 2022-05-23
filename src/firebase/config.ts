import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import dotenv from "dotenv";
import serviceAccount from "./serviceAccountKey.json";
import { ServiceAccount } from "firebase-admin";
dotenv.config();

const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID
};

const app = initializeApp(firebaseConfig);

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as ServiceAccount)
});

export default { app, admin }
