import { useNavigation } from "@react-navigation/native";
import { Button, Icon, Layout, Text, useTheme } from "@ui-kitten/components";
import * as React from "react";
import { Image } from "react-native";
import useTitle from "../hooks/useTitle";


export default function SomewhereWithoutCoffeeScreen() {
  useTitle(`❌ Coffee Not Found`);
  const theme = useTheme();
  const nav = useNavigation();
  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image source={theme.style === "dark" ? require('../assets/images/404.png') : require('../assets/images/404-light.png')} style={{ width: 300, height: 100 }} />
      <Text category="h1">Coffee Not Found</Text>
      <Text category="h4">Looks like there is no coffee here.</Text>
      <Button onPress={() => nav.navigate('Root', {screen: "Dashboard"})} appearance="outline" size="large" accessoryLeft={props => <Icon {...props} name="home" />}>Return Home</Button>
    </Layout>
  );
}
