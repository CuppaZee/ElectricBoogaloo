import { useLinkBuilder, useRoute } from "@react-navigation/native";
import { Button, Icon, Layout, LayoutProps, Spinner, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { Image, View } from "react-native";
import { QueryObserverResult } from "react-query";
import useComponentSize from "../hooks/useComponentSize";
import useLogin from "../hooks/useLogin";
import { useTeakens } from "../hooks/useToken";

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
        <Text category="h4">Looks like {(route.params as any)?.username || "this user"} hasn't logged in on this device.</Text>
        <Text category="s1">Requesting this data requires them to log in.</Text>
        <Button
          onPress={login}
          style={{ margin: 4 }}
          appearance="outline"
          status="success"
          accessoryLeft={props => <Icon name="account-plus" {...props} />}>
          Add Account
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
          Looks like{" "}
          {teakens.data[
            data.find(i => i.tokenStatus?.status === "expired")?.tokenStatus?.user_id || ""
          ]?.username || "you"}{" "}
          needs to log in again.
        </Text>
        <Text category="s1">Your Munzee API authentication is a bit too cold now.</Text>
        <Button
          onPress={login}
          style={{ margin: 4 }}
          appearance="outline"
          status="success"
          accessoryLeft={props => <Icon name="account-plus" {...props} />}>
          Log in again
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
        <Text category="h4">Looks like the coffee spilt out of the cup.</Text>
        <Text category="s1">Something went wrong when requesting this data.</Text>
        {sentReport ? (
          <View>
            <Text status="success" style={{ textAlign: "center" }} category="h6">
              Report Sent
            </Text>
            <Text status="success" style={{ textAlign: "center" }} category="p1">
              Details about this error have been sent to CuppaZee. If you would like to give more
              information on this issue, please contact us.
            </Text>
          </View>
        ) : (
          <Button
            onPress={async () => {
              await fetch(`https://server.beta.cuppazee.app/report`, {
                method: "POST",
                body: JSON.stringify({
                  reports: 
                    data.map(i => (i.error instanceof Error ? i.error.toString() : i.error))
                }),
              });
              setSentReport(true);
            }}
            style={{ margin: 4 }}
            appearance="outline"
            status="warning"
            accessoryLeft={props => <Icon name="message-alert" {...props} />}>
            Report to CuppaZee
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
