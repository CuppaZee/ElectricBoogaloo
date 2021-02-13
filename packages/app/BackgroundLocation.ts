import * as TaskManager from "expo-task-manager";
import { LocationObject } from "expo-location";
import * as Notifications from "expo-notifications";

TaskManager.defineTask("BACKGROUND_LOCATION", async ({ data, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (data) {
  const locs = ((data as any).locations.slice() as LocationObject[]).sort((a, b) => b.timestamp - a.timestamp);
  await fetch(`https://server.beta.cuppazee.app/notifications/location`, {
    method: "POST",
    body: JSON.stringify({
      latitude: locs[0].coords.latitude,
      longitude: locs[0].coords.longitude,
      token: (
        await Notifications.getExpoPushTokenAsync({
          experienceId: "@sohcah/PaperZee",
        })
      ).data,
    }),
  });
  }
});
