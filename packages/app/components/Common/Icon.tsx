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
const iconLoadedRef = { iconLoaded: 0 };
const iconLoaded = loadIconFont();
iconLoaded.then(() => (iconLoadedRef.iconLoaded = 1)).catch(() => (iconLoadedRef.iconLoaded = 2));

export type IconName = keyof typeof MaterialCommunityIcons.glyphMap;
export default React.memo(function Icon({
  name,
  style,
}: {
  name?: IconName;
  style?: StyleProp<Partial<ImageStyle> & Partial<TextStyle> & Partial<ViewStyle>>;
  }) {
  const { height, tintColor, color, marginHorizontal, ...iconStyle } = StyleSheet.flatten(style);
  const [loaded, setLoaded] = React.useState(iconLoadedRef.iconLoaded);
  React.useEffect(() => {
    if (!loaded) iconLoaded.then(() => setLoaded(1)).catch(() => setLoaded(2));
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
          style={[
            iconStyle,
            {
              marginHorizontal:
                marginHorizontal === 10 ? 2 : marginHorizontal,
            },
          ]}
        />
      ) : (
        <View style={{ width: Number(height) + 16, height }} />
      )}
    </View>
  );
});
