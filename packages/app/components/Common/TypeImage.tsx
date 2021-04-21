import * as React from "react";
import db, { Type } from "@cuppazee/types";
import { Image, ImageProps, ImageStyle, Text, View } from "react-native";

const useNewIconsServer = true;

type TypeImageProps = Omit<ImageProps, "style" | "source"> & {
  style: Omit<ImageStyle, "height" | "width"> & { size: number };
  icon: string;
  iconSize?: number;
};

export function getRemoteTypeImage(input: string | Type, iconSize = 64) {
  // if (icon === "missing") return `https://${useNewIconsServer ? "images.cuppazee.app/types" : "icons.cuppazee.app"}/missing.png`;
  const type = typeof input === "string" ? db.getType(input) : input;
  const icon = typeof input === "string" ? input : type?.icon ?? "";
  return type
    ? `https://${useNewIconsServer ? "images" : "icons"}.cuppazee.app/${useNewIconsServer ? "types/" : ""}${iconSize ?? 64}/${type.strippedIcon}.png`
    : `https://${useNewIconsServer ? "images" : "icons"}.cuppazee.app/${useNewIconsServer ? "types/" : ""}${iconSize ?? 64}/${
        icon.startsWith("https://munzee.global") ? icon.slice(49, -4) : icon
      }.png`;
}

export function getTypeImage(icon: string | Type, iconSize = 64) {
  return { uri: getRemoteTypeImage(icon, iconSize) };
}

export default function TypeImage({ icon, iconSize, style: { size, ...style }, ...rest }: TypeImageProps) {
  const type = db.getType(icon);
  const source = getTypeImage(type || icon, iconSize);
  let hostIcon;
  if ((type?.meta?.host_types?.length ?? 0) > 0) {
    const host = type?.meta?.host_types?.[0];
    const hostType = db.getType(host?.toString() ?? "") || db.types.find(i=>i.id === host);
    if (hostType) {
      hostIcon = hostType;
    }
  }
  if (!hostIcon && icon.includes("host") && db.strip(icon).match(/^(.+)(?:virtual|physical)?host$/)) {
    hostIcon = db.getType(db.strip(icon).match(/^(.+)(?:virtual|physical)?host$/)?.[1] ?? "");
  }

  return (
    <View style={{ ...style, height: size, width: size }}>
      <Image
        source={source}
        style={{
          ...style,
          height: size,
          width: size,
        }}
        {...rest}
      />
      {hostIcon && (
        <Image
          source={getTypeImage(hostIcon, size)}
          style={{
            position: "absolute",
            bottom: 0,
            right: -size * 0.1,
            height: size * 0.8,
            width: size * 0.8,
          }}
          {...rest}
        />
      )}
    </View>
  );
}
