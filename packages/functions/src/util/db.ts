import * as functions from "firebase-functions";
import admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
export default admin.firestore();