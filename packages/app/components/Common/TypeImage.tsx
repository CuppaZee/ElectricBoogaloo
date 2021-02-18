import * as React from "react";
import db from "@cuppazee/types";
import { Image, ImageProps, ImageStyle } from "react-native";

type TypeImageProps = Omit<ImageProps, "style" | "source"> & {
  style: Omit<ImageStyle, "height" | "width"> & { size: number };
  icon: string;
  iconSize?: number;
};

export function getRemoteTypeImage(icon: string, iconSize = 64) {
  if (icon === "missing") return `https://icons.cuppazee.app/missing.png`;
  const type = db.getType(icon);
  return type
    ? `https://icons.cuppazee.app/${iconSize ?? 64}/${type.strippedIcon}.png`
    : `https://icons.cuppazee.app/${iconSize ?? 64}/${
        icon.startsWith("https://munzee.global") ? icon.slice(49, -4) : icon
      }.png`;
}

export function getTypeImage(icon: string, iconSize = 64) {
  return { uri: getRemoteTypeImage(icon, iconSize) };
}

export default function TypeImage({ icon, iconSize, style, ...rest }: TypeImageProps) {
  const source = getTypeImage(icon, iconSize);

  return (
    <Image
      source={source}
      style={{
        ...style,
        height: style.size,
        width: style.size,
      }}
      {...rest}
    />
  );
}
