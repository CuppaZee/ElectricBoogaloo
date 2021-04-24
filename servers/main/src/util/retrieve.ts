// import { logger } from "firebase-functions";
import fetch from "node-fetch";
import { URLSearchParams } from "url";
import _config from "../config";
// import db from "./db";
import mongo from "./mongo";

// const auth_default = new Promise<Map<string, any>>((resolve, reject) => {
//   const d = new Map();
//   let resolved = false;
//   db.collection("auth").onSnapshot(querySnapshot => {
//     querySnapshot.docChanges().forEach(change => {
//       if (change.type === "added" || change.type === "modified") {
//         d.set(change.doc.id, change.doc.data());
//       }
//       if (change.type === "removed") {
//         d.delete(change.doc.id);
//       }
//     });
//     if (!resolved) {
//       resolved = true;
//       resolve(d);
//     }
//   });
// });

export default async function (
  { user_id, teaken }: { user_id: number | string; teaken: string | boolean },
  time: number,
  application: "main" | "team" | "universal" = "main"
) {
  try {
    const config = application in _config ? (_config as any)[application] : _config;
    const data = await mongo
      .collection("auth")
      .findOne({ application, user_id: Number(user_id) });
    if (!data) return null;
    if (teaken === false || data.teakens.includes(teaken)) {
      const token = data.token;
      if (time && token.expires * 1000 > Date.now() + time * 1000) {
        const { refresh_token: _, ...r } = token;
        return r;
      }
      console.info("CZ- REFRESHING", token.expires, Date.now(), time);
      const formData = new URLSearchParams();
      formData.append("client_id", config.client_id);
      formData.append("client_secret", config.client_secret);
      formData.append("grant_type", "refresh_token");
      formData.append("refresh_token", token.refresh_token);
      const n = await fetch("https://api.munzee.com/oauth/login", {
        method: "POST",
        body: formData,
      });
      const ne = await n.json();
      await mongo
        .collection("auth")
        .updateOne({ application, user_id }, { $set: { token: { ...token, ...ne.data.token } } });
      return ne.data.token;
    } else {
      return null;
    }
  } catch (e) {
    console.error(e);
    return null;
  }
}
