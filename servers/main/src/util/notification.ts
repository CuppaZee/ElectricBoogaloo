import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import { firestore } from 'firebase-admin';
import mongo from './mongo';

const expo = new Expo();

export default async function (db: firestore.Firestore, messages: ExpoPushMessage[]) {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(ticketChunk);
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  return await mongo.db('notifications').collection("tickets").insertOne({
    tickets,
    sent_at: Date.now()
  });
}