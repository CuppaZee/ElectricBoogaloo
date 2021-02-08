import fetch from "node-fetch";
import { URLSearchParams } from "url";
import _config from "../config.json";
import db from "./db";

const auth_default = new Promise<Map<string, any>>((resolve, reject) => {
  const d = new Map();
  let resolved = false;
  db.collection("auth").onSnapshot(querySnapshot => {
    querySnapshot.docChanges().forEach(change => {
      if (change.type === "added" || change.type === "modified") {
        d.set(change.doc.id, change.doc.data());
      }
      if (change.type === "removed") {
        d.delete(change.doc.id);
      }
    });
    if (!resolved) {
      resolved = true;
      resolve(d);
    }
  });
});

export default async function (
  { user_id, teaken }: { user_id: number | string; teaken: string | boolean },
  time: number,
  application: "default" | "team" | "universal" = "default"
) {
  try {
    const config = application === "default" ? _config : _config[application];
    const doc = db
      .collection(application === "default" ? "auth" : `auth_${application}`)
      .doc(user_id.toString());
    let data;
    if (application === "default") {
      data = (await auth_default).get(user_id.toString());
    } else {
      data = (await doc.get()).data();
    }
    if (!data) return null;
    if (teaken === false || data.teakens.includes(teaken)) {
      const token = data.token;
      if (time && token.expires * 1000 > Date.now() + time * 1000) {
        const { refresh_token: _, ...r } = token;
        return r;
      }
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
      doc.update({
        token: { ...token, ...ne.data.token },
      }).catch((e) => {console.error(e)});
      return ne.data.token;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
