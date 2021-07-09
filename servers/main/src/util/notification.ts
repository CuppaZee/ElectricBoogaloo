import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import mongo from './mongo';

const expo = new Expo();

export default async function (messages: ExpoPushMessage[]) {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let to = chunk.map(i => i.to).flat();
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      console.log(`Sent Notifications:`, ticketChunk.length);
      tickets.push(...ticketChunk.map((i,n)=>({...i, token: to[n] })));
    } catch (error) {
      console.error(error);
    }
  }

  return await mongo.collection("notification_tickets").insertOne({
    tickets,
    sent_at: Date.now()
  });
}