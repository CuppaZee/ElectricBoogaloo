import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import useTitle from "../../hooks/useTitle";
import Loading from "../../components/Loading";
import { Image, ScrollView, View } from "react-native";
import {
  ClanRequirementsConverter,
  ClanRewardsData,
  monthToGameID,
  requirementMeta,
} from "../../components/Clan/Data";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import Requirements from "../../components/Clan/Requirements";
import { useSettings } from "../../hooks/useSettings";
import { pickTextColor } from "../../components/Clan/Cell";
import { TypeState } from "@cuppazee/types/lib";
import dayjs from "dayjs";

interface QRewData {
  cap: {
    type: number;
    state: TypeState;
    name: string;
    icon: string;
    amount: number;
  }[];
  dep: {
    type: number;
    state: TypeState;
    name: string;
    icon: string;
    amount: number;
  }[];
  recent_cap: string;
  recent_dep: string;
  recent_capt: string;
  recent_depl: string;
  next_check: string;
  earliest: string;
}

interface CardProps {
  title: string;
  description: string;
  done: boolean;
}

function Card(props: CardProps) {
  const theme = useTheme();
  const [settings] = useSettings();
  return (
    <View style={{ padding: 4 }}>
      <Layout level="3" style={{ flexDirection: "row", alignItems: "center", borderRadius: 8 }}>
        <View style={{ padding: 8, flex: 1 }}>
          <Text category="h6">{props.title}</Text>
          <Text category="s1">{props.description}</Text>
        </View>
        <Layout
          level="4"
          style={{
            padding: 8,
            borderBottomRightRadius: 8,
            borderTopRightRadius: 8,
            alignSelf: "stretch",
            justifyContent: "center",
            width: 60,
            borderLeftWidth: settings.clan_full_background ? 0 : 4,
            borderColor: settings.clan_colours[props.done ? 5 : 0],
            backgroundColor:
              settings.clan_colours[props.done ? 5 : 0] +
              (settings.clan_full_background ? "" : "22"),
            alignItems: "center",
          }}>
          <Icon
            style={{
              height: 32,
              width: 32,
              color: settings.clan_full_background
                ? pickTextColor(settings.clan_colours[props.done ? 5 : 0])
                : theme["text-basic-color"],
            }}
            name={props.done ? "check" : "close"}
          />
        </Layout>
      </Layout>
    </View>
  );
}

export default function UserClanScreen() {
  const theme = useTheme();
  const [size, onLayout] = useComponentSize();
  const route = useRoute<RouteProp<UserStackParamList, "Clan">>();
  useTitle(`☕ ${route.params.username} - QRew Checker`);
  const user = useMunzeeRequest(
    "user",
    { username: route.params?.username },
    route.params?.username !== undefined
  );
  const data = useCuppaZeeRequest<{ data: QRewData }>(
    "user/qrew",
    {
      user_id: user.data?.data?.user_id,
      username: user.data?.data?.username,
    },
    user.data?.data?.user_id !== undefined
  );

  if (!data.data || !size) {
    return (
      <Layout onLayout={onLayout} style={{ flex: 1 }}>
        <Loading data={[data]} />
      </Layout>
    );
  }

  const caps = data.data.data.cap.reduce((a, b) => a + b.amount, 0);
  const physCaps = data.data.data.cap.reduce(
    (a, b) => a + (b.state === TypeState.Physical ? b.amount : 0),
    0
  );

  const deps = data.data.data.dep.reduce((a, b) => a + b.amount, 0);
  const physDeps = data.data.data.dep.reduce(
    (a, b) => a + (b.state === TypeState.Physical ? b.amount : 0),
    0
  );

  return (
    <Layout onLayout={onLayout} style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ alignItems: "center" }}>
        <View style={{ width: 800, maxWidth: "100%", flexDirection: "row", flexWrap: "wrap" }}>
          <View style={{ padding: 4, width: "100%" }}>
            <Layout
              style={{
                margin: 4,
                borderRadius: 8,
                padding: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
              level="3">
              <View style={{ padding: 4 }}>
                <Icon
                  style={{ height: 24, width: 24, color: theme["text-basic-color"] }}
                  name="information"
                />
              </View>
              <Text category="h6">
                Checking if {user.data?.data?.username || ""} will{" "}
                {user.data?.data?.titles.join(",").includes("ZeeQRew")
                  ? "keep"
                  : user.data?.data?.titles.join(",").includes("QRew")
                  ? "keep/gain"
                  : "gain"}{" "}
                QRew/ZeeQRew Status on {dayjs(data.data.data.next_check).format("L")}
              </Text>
            </Layout>
          </View>
          <View style={{ width: 300, flexGrow: 1, maxWidth: "100%" }}>
            <Text style={{ margin: 4 }} category="h4">
              QRew
            </Text>
            <Card
              title="Premium"
              description={user.data?.data?.premium === 1 ? "Yes" : "No"}
              done={user.data?.data?.premium === 1}
            />
            <Card title="Captures" description={`${caps} / 1000`} done={caps >= 1000} />
            <Card title="Deploys" description={`${deps} / 100`} done={deps >= 100} />
            <Card
              title="Recent Capture"
              description={
                data.data.data.recent_cap ||
                `No Captures after ${dayjs(data.data.data.earliest).format("L")}`
              }
              done={!!data.data.data.recent_cap}
            />
            <Card
              title="Recent Deploy"
              description={
                data.data.data.recent_dep ||
                `No Deploys after ${dayjs(data.data.data.earliest).format("L")}`
              }
              done={!!data.data.data.recent_dep}
            />
          </View>
          <View style={{ width: 300, flexGrow: 1, maxWidth: "100%" }}>
            <Text style={{ margin: 4 }} category="h4">
              ZeeQRew
            </Text>
            <Card
              title="Premium"
              description={user.data?.data?.premium === 1 ? "Yes" : "No"}
              done={user.data?.data?.premium === 1}
            />
            <Card
              title="Physical Captures"
              description={`${physCaps} / 500`}
              done={physCaps >= 500}
            />
            <Card
              title="Physical Deploys"
              description={`${physDeps} / 250`}
              done={physDeps >= 250}
            />
            <Card
              title="Total Points"
              description={`${user.data?.data?.points} / 100000`}
              done={(user.data?.data?.points ?? 0) >= 100000}
            />
            <Card
              title="Recent Capture"
              description={
                data.data.data.recent_cap ||
                `No Captures after ${dayjs(data.data.data.earliest).format("L")}`
              }
              done={!!data.data.data.recent_cap}
            />
            <Card
              title="Recent Deploy"
              description={
                data.data.data.recent_dep ||
                `No Deploys after ${dayjs(data.data.data.earliest).format("L")}`
              }
              done={!!data.data.data.recent_dep}
            />
          </View>
        </View>
      </ScrollView>
    </Layout>
  );
}
