import { Expo, ExpoPushReceipt } from "expo-server-sdk";
import { Route } from "../types";
import mongo from "../util/mongo";

const expo = new Expo();

const route: Route = {
  path: "minute/notifications",
  latest: 1,
  versions: [
    {
      version: 1,
      async function() {
        var notificationData = await mongo
          .collection("notification_tickets")
          .find({ sent_at: { $lte: Date.now() - 1800000 } })
          .toArray();
        let receiptIds = [];
        let tickets = new Map<string, any>();
        for (let notificationBatch of notificationData) {
          for (let ticket of notificationBatch.tickets) {
            if (ticket.id) {
              receiptIds.push(ticket.id);
              tickets.set(ticket.id, ticket);
            }
          }
          // notificationBatch.ref.delete();
        }
        await mongo.collection("notification_tickets").deleteMany({ sent_at: { $lte: Date.now() - 1810000 } });
        var allReceipts: ExpoPushReceipt[] = [];
        let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
        for (let chunk of receiptIdChunks) {
          try {
            let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
            allReceipts = allReceipts.concat(Object.values(receipts));
            for (let receiptId in receipts) {
              let { status, details, ...rest } = receipts[receiptId];
              if (status === "ok") {
                continue;
              } else if (status === "error") {
                console.error(
                  `There was an error sending a notification (#${receiptId}, ${tickets.get(receiptId)?.token}): ${
                    "message" in rest ? rest.message : ""
                  }`
                );
                
                if (details && "error" in details) {
                  // The error codes are listed in the Expo documentation:
                  // https://docs.expo.io/versions/latest/guides/push-notifications/#individual-errors
                  // You must handle the errors appropriately.
                  console.error(`The error code is ${details.error}`);
                }
              }
            }
          } catch (error) {
            console.error(error);
          }
        }
        return {
          status: "success",
          data: allReceipts,
        };
      },
    },
  ],
};
export default route;
