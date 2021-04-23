import mongo from "./mongo";

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

  platform?: "android_2.0.1" | "android_2.0.2" | "ios";
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

export default function (options?: any): Promise<DeviceNotificationSettings[]> {
  return mongo.collection("notification_settings").find(options ?? {}).toArray()
}
