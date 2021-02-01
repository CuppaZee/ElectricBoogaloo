import * as React from 'react';
import icons from '@cuppazee/icons';
import db from '@cuppazee/types';
import { Image, ImageProps, ImageStyle } from 'react-native';

type TypeImageProps = Omit<ImageProps, "style" | "source"> & {
  style: Omit<ImageStyle, "height" | "width"> & { size: number };
  icon: string;
  iconSize?: 64 | 128;
};

export function getTypeImage(icon: string, iconSize: 64 | 128 = 64) {
  if (icon === "missing") return { uri: `https://icons.cuppazee.app/missing.png` };
  const stripped = db.strip(icon);
  return icons[stripped] ?? {
    uri: db.getType(icon)
      ? `https://icons.cuppazee.app/${iconSize ?? 64}/${stripped}.png`
      : `https://munzee.global.ssl.fastly.net/images/pins/${
          icon.startsWith("https://munzee.global") ? icon.slice(49, -4) : icon
        }.png`,
  };
}

export default function TypeImage({ icon, iconSize, style, ...rest }: TypeImageProps) {
  const source = getTypeImage(icon, iconSize);

  return <Image
    source={source}
    style={{
      ...style,
      height: style.size,
      width: style.size,
    }}
    {...rest}
  />
}