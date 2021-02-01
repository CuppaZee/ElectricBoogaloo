import { Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import React from "react";
import { Image, ImageSourcePropType, StyleSheet, View } from "react-native";
import {
  ClanStatsFormattedUser,
  ClanStatsFormattedData,
  requirementMeta,
  ClanShadowData,
  ClanStatsFormattedRequirements,
} from "./Data";
import { ClanV2 } from "@cuppazee/api/clan/main";
import { useSettings } from "../../hooks/useSettings";

const levelColours = ["#eb0000", "#ef6500", "#fa9102", "#fcd302", "#bfe913", "#55f40b"];

interface CommonCellProps {
  type: "title" | "header" | "header_stack" | "data";
  color?: number;
  image?: ImageSourcePropType;
  icon?: string;
  title?: string;
  subtitle?: string;
}

function CommonCell(props: CommonCellProps) {
  const [settings] = useSettings();
  const theme = useTheme();

  const isCompact = settings.clan_style >= 2;
  const isStack = props.type === "title" || props.type === "header_stack";
  const isSingleLine = settings.clan_single_line;
  const imageSize = (isSingleLine ? 0.75 : 1) * (isCompact ? 24 : 32);
  const iconSize = isSingleLine ? 16 : 24;
  const iconMargin = isCompact ? 4 : 8;

  const height = {
    title: isCompact ? 69 : 77,
    header_stack: isCompact ? 69 : 77,
    header: isCompact ? 34 : 40,
    data: isCompact ? 34 : 40,
  }[props.type];

  return (
    <Layout
      level={isCompact ? "0" : "2"}
      style={[
        isCompact ? {} : styles.card,
        {
          height,
          flexDirection: isStack ? "column" : "row",
          alignItems: "center",
        },
      ]}>
      {props.color !== undefined && !isStack && (
        <View
          style={{
            width: 4,
            alignSelf: "stretch",
            borderTopLeftRadius: isCompact ? 0 : 8,
            borderBottomLeftRadius: isCompact ? 0 : 8,
            backgroundColor: levelColours[props.color] ?? "#aaaaaa",
          }}
        />
      )}
      {props.image && (
        <Image
          source={props.image}
          style={{
            width: imageSize,
            height: imageSize,
            borderRadius: imageSize / 2,
            margin: 4,
          }}
        />
      )}
      {props.icon && (
        <View style={isStack ? { marginVertical: iconMargin } : {}}>
          <Icon
            style={{
              width: iconSize,
              height: iconSize,
              marginHorizontal: iconMargin,
              color: theme.style === "dark" ? "#fff" : "#000",
            }}
            name={props.icon}
          />
        </View>
      )}
      <View
        style={{
          padding: 4,
          paddingVertical: 0,
          flex: 1,
          alignItems: isStack ? "center" : "stretch",
          maxWidth: "100%",
        }}>
        {props.title && (
          <Text numberOfLines={1} ellipsizeMode="tail" category="s2">
            {props.title}
          </Text>
        )}
        {props.subtitle && (
          <Text numberOfLines={1} ellipsizeMode="tail" category="c1">
            {props.subtitle}
          </Text>
        )}
      </View>
      {props.color !== undefined && isStack && (
        <View
          style={{
            height: 4,
            width: 45,
            borderTopLeftRadius: isCompact ? 0 : 8,
            borderBottomLeftRadius: isCompact ? 0 : 8,
            backgroundColor: levelColours[props.color] ?? "#aaaaaa",
          }}
        />
      )}
    </Layout>
  );
}

export interface DataCellProps {
  user?: ClanStatsFormattedUser | ClanStatsFormattedData | null;
  task_id: number;
}

export function DataCell(props: DataCellProps) {
  const [settings] = useSettings();

  if (settings.clan_style === 0) {
    return (
      <CommonCell
        type="data"
        color={props.user?.requirements[props.task_id]?.level}
        icon={!props.user || "username" in props.user ? undefined : "shield-half-full"}
        image={!props.user || "username" in props.user ? {
          uri:
            props.user && "username" in props.user
              ? `https://munzee.global.ssl.fastly.net/images/avatars/ua${props.user.user_id.toString(
                  36
                )}.png`
              : requirementMeta[props.task_id]?.icon,
        } : undefined}
        title={
          settings.clan_reverse
            ? `${requirementMeta[props.task_id]?.top} ${requirementMeta[props.task_id]?.bottom}`
            : props.user && "username" in props.user
            ? props.user.username ?? ""
            : "Clan Total"
        }
        subtitle={props.user?.requirements[props.task_id]?.value?.toLocaleString() ?? "🚫"}
      />
    );
  }

  return (
    <CommonCell
      type="data"
      color={props.user?.requirements[props.task_id]?.level}
      title={props.user?.requirements[props.task_id]?.value?.toLocaleString() ?? "🚫"}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    borderRadius: 8,
  },
});
