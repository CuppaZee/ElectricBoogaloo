import React from "react";
import { Layout, Text } from "@ui-kitten/components";
import { View } from "react-native";
import { UserActivityItem } from "./Data";
import useDay from "../../hooks/useDay";
import TypeImage from "../Common/TypeImage";
import { useTranslation } from "react-i18next";

export default React.memo(
  function UserActivityListItem(item: UserActivityItem) {
    const { t } = useTranslation();
    const day = useDay();
    return (
      <Layout
        level="3"
        style={{
          margin: 4,
          borderRadius: 4,
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
          width: 500,
          maxWidth: "100%",
        }}>
        <View
          style={{
            width: 4,
            alignSelf: "stretch",
            backgroundColor: {
              capture: "#aaffaa",
              deploy: "#a5fffc",
              capon: "#ffbcad",
            }[item.type],
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
          }}
        />
        <View style={{ flex: 1 }}>
          {[item, ...(item.subCaptures ?? [])].map(i => (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ alignItems: "center", width: 50, paddingLeft: 4 }}>
                <Text category={i.sub ? "s2" : "s1"}>
                  {i.points > 0 ? "+" : ""}
                  {i.points || t('user_activity:none')}
                </Text>
                <TypeImage icon={i.pin} style={{ size: i.sub ? 24 : 32 }} />
              </View>
              <View style={{ padding: 4, flex: 1 }}>
                {!i.sub && (
                  <Text category="c1">
                    {
                      {
                        capture: t("user_activity:activity_capture"),
                        deploy: t("user_activity:activity_deploy"),
                        capon: t("user_activity:activity_capon", { user: i.capper }),
                      }[i.type]
                    }
                  </Text>
                )}
                <Text category="s1">{i.name}</Text>
                {i.type === "capture" && (
                  <Text category="c1">
                    {t("user_activity:owned_by_user", { user: i.creator || "" })}
                  </Text>
                )}
              </View>
            </View>
          ))}
        </View>
        <View style={{ paddingHorizontal: 4, paddingRight: 8 }}>
          <Text style={{ textAlign: "right" }} category="s1">
            {day(item.time).format("HH:mm")}
          </Text>
          <Text style={{ textAlign: "right" }} category="c1">
            {day(item.time).mhq().format("HH:mm [MHQ]")}
          </Text>
        </View>
      </Layout>
    );
  },
  (prev, now) => prev.key === now.key
);
