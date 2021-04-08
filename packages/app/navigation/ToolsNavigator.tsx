import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import * as React from "react";

import { MainDrawerParamList, ToolsStackParamList } from "../types";
import Header from "./Header";

// Pages
import lazy from "../components/lazy";
import { CompositeNavigationProp } from "@react-navigation/native";
import { DrawerNavigationProp } from "@react-navigation/drawer";
const SearchScreen = lazy(() => import("../screens/Tools/Search"));
const CalendarScreen = lazy(() => import("../screens/Tools/Calendar"));
const CreditsScreen = lazy(() => import("../screens/Tools/Credits"));
const TestScanScreen = lazy(() => import("../screens/Tools/TestScan"));
const OpenSourceScreen = lazy(() => import("../screens/Tools/OpenSource"));
const BouncersScreen = lazy(() => import("../screens/Tools/Bouncers"));
const BouncersExpiringScreen = lazy(() => import("../screens/Tools/BouncersExpiring"));
const BouncersMapScreen = lazy(() => import("../screens/Tools/BouncersMap"));
const NearbyScreen = lazy(() => import("../screens/Tools/Nearby"));
const DonateScreen = lazy(() => import("../screens/Tools/Donate"));
const POIPlannerScreen = lazy(() => import("../screens/Tools/POIPlanner"));
const DestinationPlannerScreen = lazy(() => import("../screens/Tools/DestinationPlanner"));
const EvoPlannerScreen = lazy(() => import("../screens/Tools/EvoPlanner"));
const MunzeeScreen = lazy(() => import("../screens/Tools/Munzee"));
const TypeCategoryScreen = lazy(() => import("../screens/Tools/Types/Category"));
const TypeMunzeeScreen = lazy(() => import("../screens/Tools/Types/Type"));
const ActivityWidgetScreen = lazy(() => import("../screens/Tools/WidgetConfigure/ActivityWidget"));
const GardenPainterScreen = lazy(() => import("../screens/Tools/Garden/Painter"));

const ToolsStack = createStackNavigator<ToolsStackParamList>();

export type ToolsNavigatorProp<T extends keyof ToolsStackParamList> = CompositeNavigationProp<
  DrawerNavigationProp<MainDrawerParamList, "Tools">,
  StackNavigationProp<ToolsStackParamList, T>
>;

export default function ToolsNavigator() {
  return (
    <ToolsStack.Navigator
      screenOptions={{
        header: props => <Header {...props} />,
        cardStyle: {
          maxHeight: "100%",
        },
      }}>
      <ToolsStack.Screen name="Search" component={SearchScreen} />

      <ToolsStack.Screen name="Calendar" component={CalendarScreen} />
      <ToolsStack.Screen name="EvoPlanner" component={EvoPlannerScreen} />
      <ToolsStack.Screen name="TestScan" component={TestScanScreen} />
      <ToolsStack.Screen name="WidgetConfigureActivityWidget" component={ActivityWidgetScreen} />

      <ToolsStack.Screen name="Bouncers" component={BouncersScreen} />
      <ToolsStack.Screen name="BouncersExpiring" component={BouncersExpiringScreen} />
      <ToolsStack.Screen name="Nearby" component={NearbyScreen} />
      <ToolsStack.Screen name="BouncersMap" component={BouncersMapScreen} />

      <ToolsStack.Screen name="POIPlanner" component={POIPlannerScreen} />
      <ToolsStack.Screen name="DestinationPlanner" component={DestinationPlannerScreen} />

      <ToolsStack.Screen name="GardenPainter" component={GardenPainterScreen} />

      <ToolsStack.Screen
        getId={({ params }) => `${params.a}/${params.b}`}
        name="Munzee"
        component={MunzeeScreen}
      />

      <ToolsStack.Screen
        getId={({ params }) => params.category}
        name="TypeCategory"
        component={TypeCategoryScreen}
      />
      <ToolsStack.Screen
        getId={({ params }) => params.type}
        name="TypeMunzee"
        component={TypeMunzeeScreen}
      />

      <ToolsStack.Screen name="Credits" component={CreditsScreen} />
      <ToolsStack.Screen name="Donate" component={DonateScreen} />
      <ToolsStack.Screen name="OpenSource" component={OpenSourceScreen} />
    </ToolsStack.Navigator>
  );
}
