import * as TaskManager from "expo-task-manager";
import * as Permissions from "expo-permissions";
import {
  stopLocationUpdatesAsync,
  startLocationUpdatesAsync,
  Accuracy,
} from "expo-location";
import { NativeModules, Platform } from "react-native";

export default async function CheckStatus() {
  if (Platform.OS === "web") return "";

  if ("LiveLocation" in NativeModules) {
    try {
      const status = await NativeModules.LiveLocation.getLocationUpdatesStatus();
      
      // Running using LiveLocation Module
      if (status) {
        // Check Permission allowed Always
        const { status, permissions } = await Permissions.getAsync(Permissions.LOCATION);
        if (status !== "granted" || permissions.location?.scope !== "always") {
          NativeModules.LiveLocation.stopLocationUpdates();
          return "permission_failed";
        }

        return "";
      }
    } catch(e){ }
  }

  const taskManagerOptions = (await TaskManager.getTaskOptionsAsync("BACKGROUND_LOCATION")) as any;
  if (taskManagerOptions && typeof taskManagerOptions === "object") {
    // Check Permission allowed Always
    const { status, permissions } = await Permissions.getAsync(Permissions.LOCATION);
    if (status !== "granted" || permissions.location?.scope !== "always") {
      await stopLocationUpdatesAsync("BACKGROUND_LOCATION");
      return "permission_failed";
    }

    // Update to LiveLocation Module
    if ("LiveLocation" in NativeModules) {
      await stopLocationUpdatesAsync("BACKGROUND_LOCATION");
      NativeModules.LiveLocation.startLocationUpdates(900000, 600000, 1800000);
      return "updated_native";
    }

    // Update to latest configuration
    if (
      taskManagerOptions.accuracy !== Accuracy.Low ||
      taskManagerOptions.deferredUpdatesDistance !== 250 ||
      taskManagerOptions.deferredUpdatesTimeout !== 900000
    ) {
      await stopLocationUpdatesAsync("BACKGROUND_LOCATION");
      await startLocationUpdatesAsync("BACKGROUND_LOCATION", {
        accuracy: Accuracy.Low,
        deferredUpdatesDistance: 250,
        deferredUpdatesTimeout: 900000,
      });
      return "updated";
    }
  }

  // Everything is fine (hopefully? maybe? maybe better to say slightly less likely to be wrong?)
  return "";
}
