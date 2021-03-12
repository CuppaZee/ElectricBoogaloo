import React from "react";
import { loadAsync } from "expo-font";
import { ImageStyle, StyleProp, StyleSheet, TextStyle, View, ViewStyle } from "react-native";
import { Text } from "@ui-kitten/components";
import { MaterialCommunityIcons } from "@expo/vector-icons";

async function loadIconFont() {
  for (let i = 0; i < 5; i++) {
    try {
      return await loadAsync(MaterialCommunityIcons.font);
    } catch (e) {}
  }
  return false;
}
const iconLoaded = loadIconFont();

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;
export default React.memo(function Icon({
  name,
  style,
}: {
  name?: IconName;
  style?: StyleProp<Partial<ImageStyle> & Partial<TextStyle> & Partial<ViewStyle>>;
}) {
  const { height, tintColor, color, ...iconStyle } = StyleSheet.flatten(style);
  const [loaded, setLoaded] = React.useState(0);
  React.useEffect(() => {
    iconLoaded.then(() => setLoaded(1)).catch(() => setLoaded(2));
  });
  return (
    <View style={{ height }}>
      {loaded === 2 ? (
        <Text
          style={{
            width: Number(height) + 16,
            height,
            fontSize: Number(height),
            textAlign: "center",
          }}>
          ?
        </Text>
      ) : loaded === 1 ? (
        <MaterialCommunityIcons
          name={name}
          size={Number(height)}
          color={color ?? tintColor}
          style={iconStyle}
        />
      ) : (
        <View style={{ width: Number(height) + 16, height }} />
      )}
    </View>
  );
});
