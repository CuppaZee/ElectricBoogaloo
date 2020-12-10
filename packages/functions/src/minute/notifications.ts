
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'Expo'.
const { Expo } = require('expo-server-sdk');

// Create a new Expo SDK client
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'expo'.
let expo = new Expo();

module.exports = {
  path: "minute/notifications",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({
        db
      }: any) {
        var notificationData = (await db.collection('notifications').where('sent_at', '<=', Date.now() - (1800000)).get()).docs;
        let receiptIds = [];
        for (let notificationBatch of notificationData) {
          for (let ticket of notificationBatch.data().tickets) {
            if (ticket.id) {
              receiptIds.push(ticket.id);
            }
          }
          notificationBatch.ref.delete();
        }
        var allReceipts: any = [];
        let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
        for (let chunk of receiptIdChunks) {
          try {
            let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
            allReceipts = allReceipts.concat(receipts);
            console.log(receipts);
            for (let receiptId in receipts) {
              let { status, message, details } = receipts[receiptId];
              if (status === 'ok') {
                continue;
              } else if (status === 'error') {
                console.error(
                  `There was an error sending a notification: ${message}`
                );
                if (details && details.error) {
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
          data: allReceipts
        };
      }
    }
  ]
}