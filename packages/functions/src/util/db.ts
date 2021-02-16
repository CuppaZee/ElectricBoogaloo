import * as functions from "firebase-functions";
import admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
export const rtdb = admin.database();
export default admin.firestore();