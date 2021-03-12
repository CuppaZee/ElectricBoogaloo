import { useLinkBuilder, useRoute } from "@react-navigation/native";
import { Button, Layout, LayoutProps, Spinner, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import { QueryObserverResult } from "react-query";
import useComponentSize from "../hooks/useComponentSize";
import useLogin from "../hooks/useLogin";
import { useTeakens } from "../hooks/useToken";
import Icon from "./Common/Icon";

export default function Loading({
  data,
  level,
}: {
  data: (QueryObserverResult & {tokenStatus?: {
    status: string,
    user_id: string | number,
    token?: any,
  }})[];
  level?: "1" | "2" | "3" | "4";
}) {
  const { t } = useTranslation();
  const [size, onLayout] = useComponentSize();
  const buildLink = useLinkBuilder();
  const route = useRoute();
  const [loading, login, ready] = useLogin(buildLink(route.name, route.params) || "");
  const teakens = useTeakens();
  const [sentReport, setSentReport] = React.useState(false);
  const theme = useTheme();
  if (data.some(i => i.tokenStatus?.status === "missing")) {
    return (
      <Layout
        level={level}
        onLayout={onLayout}
        style={[
          { flex: 1, justifyContent: "center", alignItems: "center" },
          !level && { backgroundColor: "transparent" },
        ]}>
        <Image
          source={
            theme.style === "dark"
              ? require("../assets/images/error.png")
              : require("../assets/images/error-light.png")
          }
          resizeMode="contain"
          style={{
            width: Math.min(300, size?.width || 0),
            height: Math.min(100, size?.height || 0),
          }}
        />
        <Text category="h4">
          {t("error:user_device_title", {
            username: (route.params as any)?.username || "this user",
          })}
        </Text>
        <Text category="s1">{t("error:user_device_description")}</Text>
        <Button
          onPress={login}
          style={{ margin: 4 }}
          appearance="outline"
          status="success"
          accessoryLeft={props => <Icon name="account-plus" {...props} />}>
          {t("error:user_device_add_account")}
        </Button>
      </Layout>
    );
  }
  if (data.some(i => i.tokenStatus?.status === "expired")) {
    return (
      <Layout
        level={level}
        onLayout={onLayout}
        style={[
          { flex: 1, justifyContent: "center", alignItems: "center" },
          !level && { backgroundColor: "transparent" },
        ]}>
        <Image
          source={
            theme.style === "dark"
              ? require("../assets/images/error.png")
              : require("../assets/images/error-light.png")
          }
          resizeMode="contain"
          style={{
            width: Math.min(300, size?.width || 0),
            height: Math.min(100, size?.height || 0),
          }}
        />
        <Text category="h4">
          {t("error:user_expired_title", {
            username:
              teakens.data[
                data.find(i => i.tokenStatus?.status === "expired")?.tokenStatus?.user_id || ""
              ]?.username || "you",
          })}
        </Text>
        <Text category="s1">{t("error:user_expired_description")}</Text>
        <Button
          onPress={login}
          style={{ margin: 4 }}
          appearance="outline"
          status="success"
          accessoryLeft={props => <Icon name="account-plus" {...props} />}>
          {t("error:user_expired_log_in")}
        </Button>
      </Layout>
    );
  }
  if (data.some(i => i.isError)) {
    return (
      <Layout
        level={level}
        onLayout={onLayout}
        style={[
          { flex: 1, justifyContent: "center", alignItems: "center" },
          !level && { backgroundColor: "transparent" },
        ]}>
        <Image
          source={
            theme.style === "dark"
              ? require("../assets/images/error.png")
              : require("../assets/images/error-light.png")
          }
          resizeMode="contain"
          style={{
            width: Math.min(300, size?.width || 0),
            height: Math.min(100, size?.height || 0),
          }}
        />
        <Text category="h4">{t("error:error_title")}</Text>
        <Text category="s1">{t("error:error_description")}</Text>
        {sentReport ? (
          <View>
            <Text status="success" style={{ textAlign: "center" }} category="h6">
              {t("error:error_report_sent_title")}
            </Text>
            <Text status="success" style={{ textAlign: "center" }} category="p1">
              {t("error:error_report_sent_description")}
            </Text>
          </View>
        ) : (
          <Button
            onPress={async () => {
              await fetch(`https://server.beta.cuppazee.app/report`, {
                method: "POST",
                body: JSON.stringify({
                  reports: data.map(i => (i.error instanceof Error ? i.error.toString() : i.error)),
                }),
              });
              setSentReport(true);
            }}
            style={{ margin: 4 }}
            appearance="outline"
            status="warning"
            accessoryLeft={props => <Icon name="message-alert" {...props} />}>
            {t("error:error_report")}
          </Button>
        )}
      </Layout>
    );
  }

  return (
    <Layout
      level={level}
      onLayout={onLayout}
      style={[
        { flex: 1, justifyContent: "center", alignItems: "center" },
        !level && { backgroundColor: "transparent" },
      ]}>
      <Spinner size="large" status="primary" />
    </Layout>
  );
}
