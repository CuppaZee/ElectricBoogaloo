export type RootStackParamList = {
  Root: undefined;
  somewherewithoutcoffee: undefined;
};

type MainDrawerParams<Params> = {
  [K in keyof Params]: { screen: K; params: Params[K] };
}[keyof Params];

export type MainDrawerParamList = {
  Dashboard: MainDrawerParams<DashStackParamList>;
  User: MainDrawerParams<UserStackParamList> & { username: string };
  Clan: MainDrawerParams<ClanStackParamList>;
  Tools: MainDrawerParams<ToolsStackParamList>;
  Settings: MainDrawerParams<SettingsStackParamList>;
  Welcome: undefined;
};

export type UserStackParamList = {
  Profile: { username: string };
  Activity: { username: string; date?: string };
  Inventory: { username: string };
  Challenges: { username: string; date?: string };
  Challenge: { username: string; challenge: string; date?: string };
  Captures: { username: string; category?: string };
  ZeeOps: { username: string };
  Bouncers: { username: string };
  ClanProgress: { username: string };
  QRew: { username: string };
  Cubimals: { username: string };
  QRates: { username: string };
  Rooms: { username: string };
};

export type DashStackParamList = {
  Dash: undefined;
};

export type ClanStackParamList = {
  Cuppa: undefined;
  Requirements: { year?: number; month?: number };
  Bookmarks: { year?: number; month?: number };
  Stats: { clanid: number; year?: number; month?: number };
};

export type ToolsStackParamList = {
  Search: undefined;
  Donate: undefined;
  Calendar: undefined;
  Credits: undefined;
  TestScan: undefined;
  OpenSource: undefined;
  Bouncers: undefined;
  BouncersExpiring: undefined;
  BouncersMap: { type: string };
  Munzee: { a: string; b?: string };
  Nearby: undefined;
  POIPlanner: undefined;
  DestinationPlanner: undefined;
  EvoPlanner: undefined;
  Universal: undefined;
  Blast: undefined;
  TypeCategory: { category: string };
  TypeMunzee: { type: string };
  WidgetConfigureActivityWidget: { id: string };
  GardenPainter: undefined;
};

export type SettingsStackParamList = {
  Personalisation: undefined;
  Accounts: undefined;
  Notifications: undefined;
  Bookmarks: undefined;
};
