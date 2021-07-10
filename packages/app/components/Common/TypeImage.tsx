import * as React from "react";
import { Type } from "@cuppazee/db";
import { Image, ImageProps, ImageStyle, View } from "react-native";
import useDB from "../../hooks/useDB";

type TypeImageProps = Omit<ImageProps, "style" | "source"> & {
  category?: "types" | "cubimals";
  style: Omit<ImageStyle, "height" | "width"> & { size: number };
  icon: string;
  iconSize?: number;
};

export function getRemoteTypeImage(input: string | Type, iconSize = 64, category = "types") {
  const db = useDB();
  const type = typeof input === "string" ? db.getType(input) : input;
  const icon = typeof input === "string" ? input : type?.icon ?? "";
  return type
    ? `https://images.cuppazee.app/${category}/${iconSize ?? 64}/${type.strippedIcon}.png`
    : `https://images.cuppazee.app/${category}/${iconSize ?? 64}/${
        icon.startsWith("https://munzee.global") ? icon.slice(49, -4) : icon
      }.png`;
}

export function getTypeImage(icon: string | Type, iconSize = 64, category = "types") {
  return { uri: getRemoteTypeImage(icon, iconSize, category) };
}

export default function TypeImage({ icon, iconSize, style: { size, ...style }, category, ...rest }: TypeImageProps) {
  const db = useDB();
  const type = db.getType(icon);
  const source = getTypeImage(type || icon, iconSize, category);
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
        style={[style, {
          height: size,
          width: size,
          margin: 0,
        }]}
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
