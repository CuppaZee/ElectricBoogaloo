import { firestore } from "firebase-admin";

export type Device = {
  bouncers?: {
    dynamic: boolean;
    enabled: boolean;
    locations: {
      latitude: number;
      longitude: number;
      name: string;
    }[]
  }
  munzee_blog?: boolean;
  token: string;
  users?: {
    [user_id: string]: {
      inventory?: boolean;
    }
  }
}

export default function (db: firestore.Firestore) {
  let devices: Device[] = [];

  let hasData = false;

  let waiting: (() => void)[] = [];

  db.collection('push')
    .onSnapshot((querySnapshot: any) => {
      devices = querySnapshot.docs.map((i: any) => i.data());
      hasData = true;
      waiting.forEach(i=>i());
      waiting = [];
    });

  return function (): Promise<Device[]> {
    return new Promise((resolve, reject) => {
      if(hasData) {
        resolve(devices);
        return;
      } else {
        waiting.push(()=>resolve(devices));
      }
    })
  };
}