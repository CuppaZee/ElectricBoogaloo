import { Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import {
  ClanStatsFormattedUser,
  ClanStatsFormattedData,
  requirementMeta,
  ClanShadowData,
  ClanStatsFormattedRequirements,
} from "./Data";
import { ClanV2 } from "@cuppazee/api/clan/main";

export type DataCellProps = {
  requirements?: ClanStatsFormattedRequirements;
  size: { width: number; height: number };
  levelColours: string[];
  user?: ClanStatsFormattedUser | ClanStatsFormattedData | null;
  task_id: number;
  reverse?: boolean;
  compact?: number;
  subtract?: number;
  stack?: boolean;
  height: number;
};

export function DataCell({
  requirements,
  size,
  levelColours,
  user,
  task_id,
  reverse,
  compact,
  subtract,
  stack,
  height,
}: DataCellProps) {
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        {
          height,
          flexDirection: stack ? "column" : "row",
          alignItems: "center",
          opacity: (user?.requirements[task_id]?.level ?? -1) === -1 ? 0.5 : 1,
        },
      ]}
    >
      <View
        style={{
          width: 4,
          alignSelf: "stretch",
          // minHeight: compact === 2 ? 34 : 40,
          borderTopLeftRadius: compact === 2 ? 0 : 8,
          borderBottomLeftRadius: compact === 2 ? 0 : 8,
          backgroundColor:
            levelColours[user?.requirements[task_id]?.level ?? -1] ?? "#aaaaaa",
        }}
      />
      {size.width <= 720 &&
        !compact &&
        (reverse || (user && "user_id" in user) ? (
          <Image
            source={{
              uri: reverse
                ? requirementMeta[task_id]?.icon
                : `https://munzee.global.ssl.fastly.net/images/avatars/ua${(
                    (user && "user_id" in user && user?.user_id) ||
                    0
                  ).toString(36)}.png`,
            }}
            style={{
              margin: 4,
              height: 32,
              width: 32,
              borderRadius: reverse ? 0 : 16,
            }}
          />
        ) : (
          <Icon
            style={{
              height: 24,
              width: 24,
              marginHorizontal: 8,
              color: "#fff",
            }}
            name="shield-half-full"
          />
        ))}
      <View
        style={{
          padding: 4,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        {size.width <= 720 &&
          !compact &&
          (reverse ? (
            <Text category="s1">
              {requirementMeta[task_id]?.top} {requirementMeta[task_id]?.bottom}
            </Text>
          ) : (
            <Text category="s1">
              {user && "username" in user ? user.username ?? "" : "Clan Total"}
            </Text>
          ))}
        <Text category={size.width <= 720 && compact !== 2 ? "c1" : "s2"}>
          {user?.requirements[task_id]?.value?.toLocaleString() ?? "🚫"}
        </Text>
      </View>
    </Layout>
  );
}

export type RequirementDataCellProps = {
  requirements?: ClanStatsFormattedRequirements;
  size: { width: number; height: number };
  levelColours: string[];
  level: number;
  task: number;
  type: "individual" | "group";
  reverse?: boolean;
  compact?: number;
  subtract?: number;
  stack?: boolean;
  height: number;
};

export function RequirementDataCell({
  requirements,
  size,
  levelColours,
  reverse,
  compact,
  level,
  task,
  type,
  subtract,
  stack,
  height,
}: RequirementDataCellProps) {
  const theme = useTheme();
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        {
          height,
          flexDirection: stack ? "column" : "row",
          alignItems: "center",
          opacity:
            (requirements?.tasks[type][task]?.[level] || 0) === 0 ? 0.5 : 1,
        },
      ]}
    >
      <View
        style={{
          width: 4,
          alignSelf: "stretch",
          // minHeight: compact === 2 ? 34 : 40,
          borderTopLeftRadius: compact === 2 ? 0 : 8,
          borderBottomLeftRadius: compact === 2 ? 0 : 8,
          backgroundColor:
            ((requirements?.tasks[type][task]?.[level] || 0) === 0
              ? null
              : levelColours[level]) ?? "#aaaaaa",
        }}
      />
      {size.width <= 720 && !compact && (
        <Image
          source={{
            uri: reverse
              ? requirementMeta[task]?.icon
              : `https://munzee.global.ssl.fastly.net/images/avatars/ua0.png`,
          }}
          style={{
            margin: 4,
            height: 32,
            width: 32,
            borderRadius: reverse ? 0 : 16,
          }}
        />
      )}
      <View
        style={{
          padding: 4,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        {size.width <= 720 && !compact && (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Icon
              name={type === "group" ? "shield-half-full" : "account"}
              style={{
                height: 16,
                width: 16,
                marginRight: 4,
                color: theme.dark ? "white" : "black",
              }}
            />
            {reverse ? (
              <Text category="s1">
                {requirementMeta[task]?.top} {requirementMeta[task]?.bottom}
              </Text>
            ) : (
              <Text category="s1">Level {level || 0}</Text>
            )}
          </View>
        )}
        <Text category={size.width <= 720 && compact !== 2 ? "c1" : "s2"}>
          {requirements?.tasks[type][task]?.[level] || "-"}
        </Text>
      </View>
    </Layout>
  );
}

export type UserCellProps = {
  levelColours: string[];
  user: ClanStatsFormattedUser | ClanStatsFormattedData;
  compact?: number;
  stack?: boolean;
  height: number;
};

export function UserCell({
  levelColours,
  user,
  compact,
  stack,
  height,
}: UserCellProps) {
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        {
          height,
          flexDirection: stack ? "column" : "row",
          alignItems: "center",
        },
      ]}
    >
      {!stack && (
        <View
          style={{
            width: 4,
            alignSelf: "stretch",
            // minHeight: compact === 2 ? 34 : 40,
            borderTopLeftRadius: compact === 2 ? 0 : 8,
            borderBottomLeftRadius: compact === 2 ? 0 : 8,
            backgroundColor: levelColours[user?.level ?? -1] ?? "#aaaaaa",
          }}
        />
      )}
      {"user_id" in user ? (
        <Image
          source={{
            uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${user.user_id.toString(
              36
            )}.png`,
          }}
          style={{
            width: compact === 2 ? 24 : 32,
            height: compact === 2 ? 24 : 32,
            borderRadius: 16,
            margin: 4,
          }}
        />
      ) : (
        <View style={stack ? { marginVertical: compact === 2 ? 4 : 8 } : {}}>
          <Icon
            style={{
              width: 24,
              height: 24,
              marginHorizontal: compact === 2 ? 4 : 8,
              color: "#fff",
            }}
            name="shield-half-full"
          />
        </View>
      )}
      <View
        style={{
          padding: 4,
          paddingVertical: 0,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
          {"user_id" in user ? user.username ?? user.user_id : "Clan Total"}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" category="c1">
          Level {user.level}
        </Text>
      </View>
      {stack && (
        <View
          style={{
            height: 4,
            width: 45,
            borderTopLeftRadius: compact === 2 ? 0 : 8,
            borderBottomLeftRadius: compact === 2 ? 0 : 8,
            backgroundColor: levelColours[user?.level ?? -1] ?? "#aaaaaa",
          }}
        />
      )}
    </Layout>
  );
}

export type LevelCellProps = {
  levelColours: string[];
  level: number;
  type: "individual" | "group";
  compact?: number;
  stack?: boolean;
  height: number;
};

export function LevelCell({
  levelColours,
  level,
  type,
  compact,
  stack,
  height,
}: LevelCellProps) {
  const theme = useTheme();
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        { 
          height,flexDirection: stack ? "column" : "row", alignItems: "center" },
      ]}
    >
      {!stack && (
        <View
          style={{
            width: 4,
            alignSelf: "stretch",
            // minHeight: compact === 2 ? 34 : 40,
            borderTopLeftRadius: compact === 2 ? 0 : 8,
            borderBottomLeftRadius: compact === 2 ? 0 : 8,
            backgroundColor: levelColours[level] ?? "#aaaaaa",
          }}
        />
      )}
      <View
        style={{
          padding: 4,
          paddingVertical: 0,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Icon
            name={type === "group" ? "shield-half-full" : "account"}
            style={{
              height: 12,
              width: 12,
              marginRight: 4,
              color: theme.dark ? "white" : "black",
            }}
          />
          <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
            {type === "group" ? "Group" : "Indiv"}
          </Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" category="s1">
          Level {level}
        </Text>
      </View>
      {stack && (
        <View
          style={{
            height: 4,
            width: 45,
            borderTopLeftRadius: compact === 2 ? 0 : 8,
            borderBottomLeftRadius: compact === 2 ? 0 : 8,
            backgroundColor: levelColours[level] ?? "#aaaaaa",
          }}
        />
      )}
    </Layout>
  );
}

export type RequirementTitleCellProps = {
  compact?: number;
  stack?: boolean;
  reverse?: boolean;
  height: number;
};

export function RequirementTitleCell({
  compact,
  stack,
  reverse,
  height,
}: RequirementTitleCellProps) {
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        {
          height,
          // minHeight:
            // (compact === 2 ? 34 : 40) + (stack ? (reverse ? 7 : 33) : 0),
          flexDirection: stack ? "column" : "row",
          alignItems: "center",
          paddingVertical: stack ? 2 : 0,
        },
      ]}
    >
      <View
        style={{
          padding: 4,
          paddingVertical: 0,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" category="s1">
          Requirements
        </Text>
      </View>
    </Layout>
  );
}

export type RequirementCellProps = {
  levelColours: string[];
  task_id: number;
  compact?: number;
  stack?: boolean;
  type?: "individual" | "group";
  height: number;
};

export function RequirementCell({
  levelColours,
  task_id,
  compact,
  stack,
  type,
  height,
}: RequirementCellProps) {
  const theme = useTheme();
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        {
          height,
          // minHeight: compact === 2 ? 34 : 40,
          flexDirection: stack ? "column" : "row",
          alignItems: "center",
        },
      ]}
    >
      {/* {type && !stack && (
        <View
          style={{
            width: 4,
            alignSelf: "stretch",
            minHeight: compact === 2 ? 34 : 40,
            borderTopLeftRadius: compact === 2 ? 0 : 8,
            borderBottomLeftRadius: compact === 2 ? 0 : 8,
            backgroundColor:
              levelColours[type === "group" ? 5 : 3] ?? "#aaaaaa",
          }}
        />
      )} */}
      <Image
        source={{ uri: requirementMeta[task_id]?.icon }}
        style={{
          margin: 4,
          marginRight: 0,
          height: compact === 2 ? 24 : 32,
          width: compact === 2 ? 24 : 32,
        }}
      />
      <View
        style={{
          padding: 4,
          paddingVertical: 0,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {type && (
            <Icon
              name={type === "group" ? "shield-half-full" : "account"}
              style={{
                height: 16,
                width: 16,
                marginRight: 4,
                color: theme.dark ? "white" : "black",
              }}
            />
          )}
          <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
            {requirementMeta[task_id]?.top}
          </Text>
        </View>
        <Text numberOfLines={1} ellipsizeMode="tail" category="c1">
          {requirementMeta[task_id]?.bottom}
        </Text>
      </View>
      {/* {stack && (
        <View
          style={{
            height: 4,
            width: 45,
            borderTopLeftRadius: compact === 2 ? 0 : 8,
            borderBottomLeftRadius: compact === 2 ? 0 : 8,
            backgroundColor:
              levelColours[type === "group" ? 5 : 3] ?? "#aaaaaa",
          }}
        />
      )} */}
    </Layout>
  );
}

export type TitleCellProps = {
  clan: ClanV2["response"];
  shadow?: { data: ClanShadowData };
  reverse?: boolean;
  compact?: number;
  stack?: boolean;
  height: number;
};

export function TitleCell({
  clan,
  shadow,
  reverse,
  compact,
  stack,
  height,
}: TitleCellProps) {
  return (
    <Layout
      level={compact === 2 ? "0" : "2"}
      style={[
        compact === 2 ? {} : styles.card,
        {
          height,
          // minHeight: (compact === 2 ? 34 : 40) + (stack ? 33 : 0),
          flexDirection: stack ? "column" : "row",
          alignItems: "center",
        },
      ]}
    >
      <Image
        source={{
          uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${clan.data?.details.clan_id.toString(
            36
          )}.png`,
        }}
        style={{
          width: compact === 2 ? 24 : 32,
          height: compact === 2 ? 24 : 32,
          borderRadius: 16,
          margin: 4,
        }}
      />
      <View
        style={{
          padding: 4,
          paddingVertical: 0,
          flex: 1,
          alignItems: stack ? "center" : "stretch",
          maxWidth: "100%",
        }}
      >
        <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
          {shadow?.data?.details.name ?? clan.data?.details.name ?? ""}
        </Text>
        <Text numberOfLines={1} ellipsizeMode="tail" category="c1">
          {shadow?.data?.details.name
            ? "Shadow Clan"
            : `#${clan.data?.result.rank || ""}`}
        </Text>
      </View>
    </Layout>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    borderRadius: 8,
  },
});
