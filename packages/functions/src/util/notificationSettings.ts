import { firestore } from "firebase-admin";
import database from "./db";

export type Device = {
  bouncers?: {
    dynamic: boolean;
    enabled: boolean;
    locations: {
      latitude: number;
      longitude: number;
      name: string;
    }[];
    settings: {
      [key: string]: number;
    };
  };
  munzee_blog?: boolean;
  token: string;
  users?: {
    [user_id: string]: {
      inventory?: boolean;
    };
  };
  location?: {
    latitude: number;
    longitude: number;
  };
};

export type DeviceNotificationUser = {
  user_id: number;
  username: string;
  primary?: boolean;
  streaksaver?: {
    time: number;
    types: ("deploy" | "capture" | "poi")[];
  };
};

export type DeviceNotificationStaticLocation = {
  enabled: boolean;
  latitude: string;
  longitude: string;
  name: string;
};

export type DeviceNotificationSettings = {
  type: "expo";
  token: string;

  users: DeviceNotificationUser[];

  locations?: {
    dynamic?: {
      latitude: number;
      longitude: number;
    };
    static: DeviceNotificationStaticLocation[];
  };

  bouncers?: {
    enabled: boolean;
    default: string;
    starred: string;
    overrides: (
      | {
          tag: string;
          radius: string;
        }
      | {
          icon: string;
          radius: string;
        }
    )[];
  };

  starred_users?: {
    user_id: number;
    username: string;
  }[];

  munzee_blog?: boolean;
  imperial?: boolean;
};

export type FullDeviceNotificationSettings = {
  type: "expo";
  token: string;

  users: DeviceNotificationUser[];

  locations: {
    dynamic?: {
      latitude: number;
      longitude: number;
    };
    static: DeviceNotificationStaticLocation[];
  };

  bouncers: {
    enabled: boolean;
    default: string;
    starred: string;
    overrides: (
      | {
          tag: string;
          radius: string;
        }
      | {
          icon: string;
          radius: string;
        }
    )[];
  };

  starred_users: {
    user_id: number;
    username: string;
  }[];

  munzee_blog: boolean;
  imperial: boolean;
};

export default (function (db: firestore.Firestore) {
  let devices: DeviceNotificationSettings[] = [];

  let hasData = false;

  let waiting: (() => void)[] = [];

  db.collection("notification_settings").onSnapshot(querySnapshot => {
    devices = querySnapshot.docs.map(i => i.data() as DeviceNotificationSettings);
    hasData = true;
    waiting.forEach(i => i());
    waiting = [];
  });

  return function (): Promise<DeviceNotificationSettings[]> {
    return new Promise((resolve, reject) => {
      if (hasData) {
        resolve(devices);
        return;
      } else {
        waiting.push(() => resolve(devices));
      }
    });
  };
})(database)
