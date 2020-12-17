import fetch from "node-fetch";
import { URLSearchParams } from "url";
import _config from "../config.json";
export default async function (
  db: any,
  { user_id, teaken }: any,
  time: any,
  application: "default" | "team" | "universal" = "default"
) {
  try {
    var config;
    if (application === "default") {
      config = _config;
    } else {
      config = _config[application];
    }
    var doc = db
      .collection(application === "default" ? "auth" : `auth_${application}`)
      .doc(user_id.toString());
    var data = (await doc.get()).data();
    if (teaken === false || data.teakens.includes(teaken)) {
      var token = data.token;
      if (time && token.expires * 1000 > Date.now() + time * 1000)
        return ((i) => {
          delete i.refresh_token;
          return i;
        })(token);
      var formData = new URLSearchParams();
      formData.append("client_id", config.client_id);
      formData.append("client_secret", config.client_secret);
      formData.append("grant_type", "refresh_token");
      formData.append("refresh_token", token.refresh_token);
      var n = await fetch("https://api.munzee.com/oauth/login", {
        method: "POST",
        body: formData,
      });
      var ne = await n.json();
      doc.update({
        token: Object.assign({}, token, ne.data.token),
      });
      return ne.data.token;
    } else {
      return null;
    }
  } catch (e) {
    return null;
  }
}
