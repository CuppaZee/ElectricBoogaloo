// import * as React from "react";
// import { StyleSheet, View } from "react-native";
// import { Layout, Text } from "@ui-kitten/components";
// import { PanGestureHandler, TapGestureHandler } from "react-native-gesture-handler";
// import Animated, { useAnimatedGestureHandler, useAnimatedReaction, useAnimatedRef, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

export default function CuppaManagerScreen() {
  return null;
  // const pressed = useSharedValue(false);
  // const eventHandler = useAnimatedGestureHandler({
  //   onStart: (event, context) => {
  //     pressed.value = true;
  //   },
  //   onEnd: (event, context) => {
  //     pressed.value = false;
  //   },
  // });
  // const uas = useAnimatedStyle(() => {
  //   return {
  //     backgroundColor: pressed.value ? "#ff5500" : "#0055ff",
  //     transform: [{ scale: pressed.value ? 1.2 : 1 }]
  //   }
  // });

  // return (
  //   <PanGestureHandler onGestureEvent={eventHandler}>
  //     <Animated.View style={[styles.ball, uas]}></Animated.View>
  //   </PanGestureHandler>
  // )
}

// const styles = StyleSheet.create({
//   ball: {
//     backgroundColor: "blue",
//     height: 100,
//     width: 100,
//     borderRadius: 50,
//   }
// })
