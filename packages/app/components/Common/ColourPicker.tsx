import React from "react";
import Color from "color";
// import { LinearGradient } from "expo-linear-gradient";
import { PanResponder, View, ViewStyle } from "react-native";
import { Svg, LinearGradient, Circle, Stop, Defs, Rect } from "react-native-svg";
import { Input, Layout } from "@ui-kitten/components";

interface HueSquareStyle extends ViewStyle {
  height: number;
  width: number;
}

interface HueSquareProps {
  style: HueSquareStyle;
  colour: Color;
  setColour: (colour: Color) => void;
}

function HueSquare(props: HueSquareProps) {
  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          const ev = e.nativeEvent as any;
          const x = ev.layerX || ev.locationX;
          const y = ev.layerY || ev.locationY;
          const saturation = Math.min(Math.max(x / props.style.width, 0), 1) * 100;
          const value = 100 - Math.min(Math.max(y / props.style.height, 0), 1) * 100;
          props.setColour(props.colour.saturationv(saturation).value(value));
        },
      }),
    [props.colour]
  );
  return (
    <View
      {...responder.panHandlers}
      style={{
        ...props.style,
        backgroundColor: props.colour.saturationv(100).value(100).hex(),
      }}>
      <Svg height={props.style.height} width={props.style.width}>
        <Defs>
          <LinearGradient id="white_grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="white" stopOpacity="1" />
            <Stop offset="1" stopColor="white" stopOpacity="0" />
          </LinearGradient>
          <LinearGradient id="black_grad" x1="0" y1="1" x2="0" y2="0">
            <Stop offset="0" stopColor="#000" stopOpacity="1" />
            <Stop offset="1" stopColor="#000" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width={props.style.width}
          height={props.style.height}
          fill="url(#white_grad)"
        />
        <Rect
          x="0"
          y="0"
          width={props.style.width}
          height={props.style.height}
          fill="url(#black_grad)"
        />
        <Circle
          cx={(props.colour.saturationv() * props.style.width) / 100}
          cy={((100 - props.colour.value()) * props.style.height) / 100}
          r="8"
          fill="transparent"
          stroke="white"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}

interface HueSliderStyle extends ViewStyle {
  height: number;
  width: number;
}

interface HueSliderProps {
  style: HueSliderStyle;
  colour: Color;
  setColour: (colour: Color) => void;
}

function HueSlider(props: HueSliderProps) {
  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          const ev = e.nativeEvent as any;
          const x = ev.layerX || ev.locationX;
          const hue = Math.min(Math.max(x / props.style.width, 0), 1) * 360;
          props.setColour(props.colour.hue(hue));
        },
      }),
    [props.colour]
  );
  return (
    <View {...responder.panHandlers} style={props.style}>
      <Svg height={props.style.height} width="100%">
        <Defs>
          <LinearGradient id="hue_grad" x1="0" y1="0" x2="1" y2="0">
            {["#f00", "#ff0", "#0f0", "#0ff", "#00f", "#f0f", "#f00"].map(i =>
              Color(i).saturationv(props.colour.saturationv()).value(props.colour.value()).hex()
            ).map((i, ind) => <Stop offset={ind / 6} stopColor={i} stopOpacity="1" />)}
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height={props.style.height}
          fill="url(#hue_grad)"
        />
        <Circle
          cx={(props.colour.hue() * props.style.width) / 360}
          cy="8"
          r="8"
          fill="transparent"
          stroke="white"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}

interface OpacitySliderStyle extends ViewStyle {
  height: number;
  width: number;
}

interface OpacitySliderProps {
  style: OpacitySliderStyle;
  colour: Color;
  setColour: (colour: Color) => void;
}

function OpacitySlider(props: OpacitySliderProps) {
  const responder = React.useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (e, gestureState) => {
          const ev = e.nativeEvent as any;
          const x = ev.layerX || ev.locationX;
          const opacity = Math.min(Math.max(x / props.style.width, 0), 1);
          props.setColour(props.colour.alpha(opacity));
        },
      }),
    [props.colour]
  );
  return (
    <View {...responder.panHandlers} style={props.style}>
      <Svg height={props.style.height} width="100%">
        <Defs>
          <LinearGradient id="opacity_grad" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={props.colour.hex()} stopOpacity="0" />
            <Stop offset="1" stopColor={props.colour.hex()} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={props.style.height} fill="url(#opacity_grad)" />
        <Circle
          cx={(props.colour.alpha() * props.style.width)}
          cy="8"
          r="8"
          fill="transparent"
          stroke="white"
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}

export interface ColourPickerProps {
  colour: string;
  alpha?: number;
  setColour: (colour: string) => void;
  setAlpha?: (alpha: number) => void;
}

function getColour(color: string, alpha: number) {
  try {
    return Color(color).alpha(alpha);
  } catch(e) {
    return Color("#000");
  }
}

export default function ColourPicker({colour, alpha, setColour, setAlpha}: ColourPickerProps) {
  return (
    <Layout level="2">
      <HueSquare
        style={{ height: 150, width: 300 }}
        colour={getColour(colour, alpha ?? 1)}
        setColour={c => {
          setColour(c.hex());
          setAlpha?.(c.alpha());
        }}
      />
      <View style={{ flexDirection: "row", padding: 4, alignItems: "center" }}>
        <View
          style={{
            height: 32,
            width: 32,
            borderRadius: 16,
            margin: 4,
            backgroundColor: colour,
          }}
        />
        <View>
          <HueSlider
            style={{ height: 16, width: 300 - 16 - 40, margin: 4 }}
            colour={getColour(colour, alpha ?? 1)}
            setColour={c => {
              setColour(c.hex());
              setAlpha?.(c.alpha());
            }}
          />

          {alpha !== undefined && <OpacitySlider
            style={{ height: 16, width: 300 - 16 - 40, margin: 4 }}
            colour={getColour(colour, alpha ?? 1)}
            setColour={c => {
              setColour(c.hex());
              setAlpha?.(c.alpha());
            }}
          />}
        </View>
      </View>
      <View style={{ flexDirection: "row", width: 300, padding: 4 }}>
        <Input
          label="Hex"
          style={{ flex: 1, margin: 4 }}
          value={colour}
          onChangeText={value => setColour(value)}
        />
        {/* <Input
          label="Red"
          style={{ flex: 1, margin: 4 }}
          value={Math.round(colour.red()).toString()}
          onChangeText={value => setColour(colour.red(Number(value)))}
        />
        <Input
          label="Green"
          style={{ flex: 1, margin: 4 }}
          value={Math.round(colour.green()).toString()}
          onChangeText={value => setColour(colour.green(Number(value)))}
        />
        <Input
          label="Blue"
          style={{ flex: 1, margin: 4 }}
          value={Math.round(colour.blue()).toString()}
          onChangeText={value => setColour(colour.blue(Number(value)))}
        /> */}
        {alpha !== undefined && <Input
          label="Alpha"
          style={{ flex: 1, margin: 4 }}
          value={alpha.toString()}
          onChangeText={value => setAlpha?.(Number(value))}
        />}
      </View>
    </Layout>
  );
}
