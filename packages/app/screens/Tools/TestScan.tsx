import * as React from "react";
import { StyleSheet, View } from "react-native";
import { Layout, Text } from "@ui-kitten/components";
import { Camera } from "expo-camera";

export default function TestScanScreen() {
  const [zoom, setZoom] = React.useState(0);
  const [flash, setFlash] = React.useState(false);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  return (
    <Camera
      style={{ flex: 1 }}
      zoom={zoom}
      type={type}
      flashMode={flash ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}
      barCodeScannerSettings={{
        barCodeTypes: ["qr"],
      }}
      onBarCodeScanned={a => {
        console.log(a);
      }}>
      {/* <View
        style={{
          backgroundColor: "transparent",
          flexDirection: "row",
          flex: 1,
        }}>
        <View style={{ position: "absolute", bottom: 16, left: 16, right: 16, zIndex: 1000 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <IconButton
              style={{ backgroundColor: "white" }}
              icon={`camera-${type === Camera.Constants.Type.back ? "rear" : "front"}`}
              size={32}
              color="#016930"
              onPress={() =>
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )
              }
            />
            <Slider
              style={{ flex: 1, marginHorizontal: 8 }}
              color="#016930"
              value={zoom}
              onValueChange={value => setZoom(value)}
            />
            <IconButton
              disabled={type === Camera.Constants.Type.front}
              style={{ backgroundColor: "white" }}
              icon="flashlight"
              size={32}
              color="#016930"
              onPress={() => setFlash(!flash)}
            />
          </View>
        </View> */}
      {/* </View> */}
    </Camera>
  );
}

// const styles = StyleSheet.create({
//   ball: {
//     backgroundColor: "blue",
//     height: 100,
//     width: 100,
//     borderRadius: 50,
//   }
// })
