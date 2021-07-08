import { useLinkBuilder, useRoute } from "@react-navigation/native";
import { Button, Layout, Spinner, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, View } from "react-native";
import { QueryObserverResult } from "react-query";
import useComponentSize from "../hooks/useComponentSize";
import useLogin from "../hooks/useLogin";
import { useTeakens } from "../hooks/useToken";
import Icon from "./Common/Icon";
import baseURL from "../baseURL";

function LoginError({ children }: { children: (login: () => void) => React.ReactElement }) {
  const buildLink = useLinkBuilder();
  const route = useRoute();
  const [loading, login, ready] = useLogin(buildLink(route.name, route.params) || "");
  return children(login);
}

export default function Loading({
  data,
  customErrors,
  level,
  skeleton: Skeleton,
}: {
  data?: (QueryObserverResult & {
    tokenStatus?: {
      status: string;
      user_id: string | number;
      token?: any;
    };
  })[];
  customErrors?: any[];
  level?: "1" | "2" | "3" | "4";
  skeleton?: (props: {
    backgroundColor?: string;
    colors?: string[];
    backgroundSize?: number;
    colorMode?: "light" | "dark";
  }) => React.ReactElement;
}) {
  const { t } = useTranslation();
  const [size, onLayout] = useComponentSize();
  const route = useRoute();
  const teakens = useTeakens();
  const [sentReport, setSentReport] = React.useState(false);
  const theme = useTheme();
  if (data?.some(i => i.tokenStatus?.status === "missing")) {
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
        <LoginError>
          {login => (
            <Button
              onPress={login}
              style={{ margin: 4 }}
              appearance="outline"
              status="success"
              accessoryLeft={props => <Icon name="account-plus" {...props} />}>
              {t("error:user_device_add_account")}
            </Button>
          )}
        </LoginError>
      </Layout>
    );
  }
  if (data?.some(i => i.tokenStatus?.status === "expired") || data?.some(i => {
    if (i.error && typeof i.error === "object") {
      if ("status" in i.error) {
        if ((i.error as any).status === 401 || (i.error as any).status === "401") {
          return true;
        }
      }
    }
    return false;
  })) {
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
        <LoginError>
          {login => (
            <Button
              onPress={login}
              style={{ margin: 4 }}
              appearance="outline"
              status="success"
              accessoryLeft={props => <Icon name="account-plus" {...props} />}>
              {t("error:user_expired_log_in")}
            </Button>
          )}
        </LoginError>
      </Layout>
    );
  }
  if (customErrors?.length || data?.some(i => i.isError)) {
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
              await fetch(`${baseURL}/report`, {
                method: "POST",
                body: JSON.stringify({
                  reports: [...(customErrors ?? []), ...(data ?? [])].map(i =>
                    i.error instanceof Error ? i.error.toString() : i.error
                  ),
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
        Skeleton ? { flex: 1 } : { flex: 1, justifyContent: "center", alignItems: "center" },
        !level && { backgroundColor: "transparent" },
      ]}>
      {Skeleton ? (
        <Skeleton
          colorMode={theme.style === "dark" ? "dark" : "light"}
          colors={
            theme.style === "dark"
              ? [
                  theme["color-basic-800"],
                  theme["color-basic-900"],
                  theme["color-basic-800"],
                  theme["color-basic-900"],
                ]
              : [
                  theme["color-basic-500"],
                  theme["color-basic-400"],
                  theme["color-basic-500"],
                  theme["color-basic-400"],
                ]
          }
        />
      ) : (
        // <Spinner size="large" status="primary" />
        <ActivityIndicator color={theme["color-primary-500"]} size={24} />
      )}
    </Layout>
  );
}
