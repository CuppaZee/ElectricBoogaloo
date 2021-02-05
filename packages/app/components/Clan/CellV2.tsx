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
import { Settings, useSettings } from "../../hooks/useSettings";
import { Dayjs } from "dayjs";
import { useTranslation } from "react-i18next";
// import Color from 'color';

function pickTextColor(bgColor: string, lightColor: string = "#fff", darkColor: string = "#000") {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map(col => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
  return L > 0.179 ? darkColor : lightColor;
}

// const start = "#eb0000";

// const levelColours: string[] = [start];

// for (let i = 1; i < 6; i++) {
//   const prev = Color(levelColours[levelColours.length - 1]);
//   for (let rot = 0; rot < 360; rot++) {
//     const col = Color(levelColours[levelColours.length - 1]).rotate(rot);
//     console.log(`%c${col}`, `color: ${col}`)
//     if (col.contrast(prev) > 1.4) {
//       console.log(col.hex(), prev.hex(), col.contrast(prev));
//       levelColours.push(col.hex());
//       break;
//     };
//   }
// }

const levelColours = [
  // "#000000",
  "#eb0000",
  "#ef6500",
  "#fa9102",
  "#fcd302",
  "#bfe913",
  "#55f40b",
  "#0cf4af",
  "",
  "",
  "",
  "",
  "#FFE97F",
  "#DFF77E",
  "#B0FC8D",
];

export interface CommonCellProps {
  type: "title" | "header" | "header_stack" | "data";
  color?: number;
  image?: ImageSourcePropType;
  icon?: string;
  title?: string;
  subtitle?: string;
  settings?: Settings;
}

export function CommonCell(props: CommonCellProps) {
  const [settings_saved] = useSettings();
  const settings = props.settings ?? settings_saved;
  const theme = useTheme();

  const isCompact = settings.clan_style >= 2;
  const isStack = props.type === "title" || props.type === "header_stack";
  const isSingleLine = settings.clan_single_line && !isStack;
  const imageSize = (isSingleLine ? 0.75 : 1) * (isCompact ? 24 : 32);
  const iconSize = isSingleLine ? 16 : 24;
  const iconMargin = isCompact ? 4 : 8;

  const height = {
    title: isCompact ? 69 : 77,
    header_stack: isCompact ? 69 : 77,
    header: isSingleLine ? (isCompact ? 26 : 32) : isCompact ? 34 : 40,
    data: isSingleLine ? (isCompact ? 26 : 32) : isCompact ? 34 : 40,
  }[props.type];

  return (
    <Layout
      level={isCompact ? "2" : "3"}
      style={[
        isCompact ? {} : styles.card,
        {
          height,
          flexDirection: isStack ? "column" : "row",
          alignItems: "center",
          opacity: props.color === -1 ? 0.4 : 1,
        },
        props.color !== undefined && settings.clan_full_background
          ? { backgroundColor: levelColours[props.color] ?? "#aaaaaa" }
          : props.color !== undefined
          ? { backgroundColor: (levelColours[props.color] ?? "#aaaaaa") + "22" }
          : undefined,
      ]}>
      {props.color !== undefined && !isStack && !settings.clan_full_background && (
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
            borderRadius:
              typeof props.image === "object" &&
              "uri" in props.image &&
              (props.image.uri?.includes("/avatars/ua") ||
                props.image.uri?.includes("/clan_logos/"))
                ? imageSize / 2
                : 0,
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
              color:
                props.color !== undefined && settings.clan_full_background
                  ? pickTextColor(levelColours[props.color] ?? "#aaaaaa")
                  : theme.style === "dark"
                  ? "#fff"
                  : "#000",
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
          <Text
            style={[
              props.color !== undefined && settings.clan_full_background
                ? { color: pickTextColor(levelColours[props.color] ?? "#aaaaaa") }
                : undefined,
              {
                textAlign: !!props.subtitle ? "left" : "center",
                marginLeft:
                  !!props.subtitle ||
                  !(props.color !== undefined && !isStack && !settings.clan_full_background)
                    ? 0
                    : -4,
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
            category="s2">
            {props.title}
          </Text>
        )}
        {!isSingleLine && props.subtitle && (
          <Text
            style={
              props.color !== undefined && settings.clan_full_background
                ? { color: pickTextColor(levelColours[props.color] ?? "#aaaaaa") }
                : undefined
            }
            numberOfLines={1}
            ellipsizeMode="tail"
            category="c1">
            {props.subtitle}
          </Text>
        )}
      </View>
      {props.color !== undefined && isStack && !settings.clan_full_background && (
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
  const { t } = useTranslation();

  if (settings.clan_style === 0) {
    return (
      <CommonCell
        type="data"
        color={props.user?.requirements[props.task_id]?.level}
        icon={!props.user || "username" in props.user ? undefined : "shield-half-full"}
        image={
          !props.user || "username" in props.user
            ? {
                uri:
                  props.user && "username" in props.user
                    ? `https://munzee.global.ssl.fastly.net/images/avatars/ua${props.user.user_id.toString(
                        36
                      )}.png`
                    : requirementMeta[props.task_id]?.icon,
              }
            : undefined
        }
        title={
          settings.clan_reverse
            ? `${requirementMeta[props.task_id]?.top} ${requirementMeta[props.task_id]?.bottom}`
            : props.user && "username" in props.user
            ? props.user.username ?? ""
            : t("clan:group_total")
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

export interface RequirementDataCellProps {
  requirements?: ClanStatsFormattedRequirements;
  level: number;
  task: number;
  type: "individual" | "group";
}

export function RequirementDataCell(props: RequirementDataCellProps) {
  const [settings] = useSettings();
  const { t } = useTranslation();

  if (settings.clan_style === 0) {
    return (
      <CommonCell
        type="data"
        color={props.level}
        icon={
          settings.clan_reverse
            ? undefined
            : props.type === "individual"
            ? "account-check"
            : "shield-check"
        }
        image={
          settings.clan_reverse
            ? {
                uri: requirementMeta[props.task]?.icon,
              }
            : undefined
        }
        title={
          settings.clan_reverse
            ? `${requirementMeta[props.task]?.top} ${requirementMeta[props.task]?.bottom}`
            : t(`clan:${props.type}_level` as const, { level: props.level })
        }
        subtitle={
          props.requirements?.tasks[props.type][props.task]?.[props.level]?.toString() ?? "-"
        }
      />
    );
  }

  return (
    <CommonCell
      type="data"
      color={props.level}
      title={props.requirements?.tasks[props.type][props.task]?.[props.level]?.toString() ?? "-"}
    />
  );
}

export type UserCellProps = {
  user: ClanStatsFormattedUser | ClanStatsFormattedData;
  stack?: boolean;
};

export function UserCell(props: UserCellProps) {
  const { t } = useTranslation();
  return (
    <CommonCell
      type={props.stack ? "header_stack" : "header"}
      color={props.user.level}
      image={
        "user_id" in props.user
          ? {
              uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${props.user.user_id.toString(
                36
              )}.png`,
            }
          : undefined
      }
      icon={"user_id" in props.user ? undefined : "shield-half-full"}
      title={"user_id" in props.user ? props.user.username ?? "" : "Clan Total"}
      subtitle={t("clan:level", { level: props.user.level })}
    />
  );
}

export type LevelCellProps = {
  level: number;
  type: "individual" | "group";
  stack?: boolean;
};

export function LevelCell(props: LevelCellProps) {
  const { t } = useTranslation();
  const [settings] = useSettings();
  return (
    <CommonCell
      type={props.stack ? "header_stack" : "header"}
      color={props.level}
      icon={props.type === "individual" ? "account-check" : "shield-check"}
      title={t(
        settings.clan_single_line && !props.stack
          ? props.type === "individual"
            ? "clan:individual_level"
            : "clan:group_level"
          : "clan:level",
        { level: props.level }
      )}
      subtitle={t(`clan:${props.type}` as const)}
    />
  );
}

export type TitleCellProps = {
  clan: ClanV2["response"];
  shadow?: { data?: ClanShadowData };
};

export function TitleCell(props: TitleCellProps) {
  const { t } = useTranslation();
  return (
    <CommonCell
      type="title"
      image={{
        uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${props.clan.data?.details.clan_id.toString(
          36
        )}.png`,
      }}
      title={props.clan.data?.details.name ?? t("clan:loading")} //TODO: Translate
      subtitle={`#${props.clan.data?.result.rank}`}
    />
  );
}

export type RequirementTitleCellProps = {
  game_id: number;
  date: Dayjs;
};

export function RequirementTitleCell(props: RequirementTitleCellProps) {
  const { t } = useTranslation();
  return (
    <CommonCell
      type="title"
      icon="playlist-check"
      title={t("clan:requirements")}
      subtitle={props.date.format("MMM YYYY")}
    />
  );
}

export type RequirementCellProps = {
  task_id: number;
  stack?: boolean;
  requirements: ClanStatsFormattedRequirements;
};

export function RequirementCell(props: RequirementCellProps) {
  const g = props.requirements.group.includes(props.task_id);
  const i = props.requirements.individual.includes(props.task_id);
  return (
    <CommonCell
      type={props.stack ? "header_stack" : "header"}
      color={g ? (i ? 12 : 13) : 11}
      image={{ uri: requirementMeta[props.task_id]?.icon }}
      title={requirementMeta[props.task_id]?.top}
      subtitle={requirementMeta[props.task_id]?.bottom}
    />
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 4,
    borderRadius: 8,
  },
});
