export type RootStackParamList = {
  Root: undefined;
  somewherewithoutcoffee: undefined;
};

export type MainDrawerParamList = {
  Dashboard: undefined;
  User: undefined;
  Clan: undefined;
  Tools: undefined;
  Settings: undefined;
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
  Universal: { username: string };
  Blast: { username: string };
  QRew: { username: string };
};

export type DashStackParamList = {
  Dash: undefined;
};


export type ClanStackParamList = {
  Requirements: { year?: number; month?: number };
  Bookmarks: { year?: number; month?: number };
  Stats: { clanid: number; year?: number; month?: number };
};

export type ToolsStackParamList = {
  Search: undefined;
  Donate: undefined;
  Calendar: undefined;
  Credits: undefined;
  OpenSource: undefined;
  Bouncers: undefined;
  BouncersMap: { type: string };
  Munzee: { a: string; b?: string };
  Nearby: undefined;
  POIPlanner: undefined;
  EvoPlanner: undefined;
  WidgetConfigureActivityWidget: { id: string };
};

export type SettingsStackParamList = {
  Personalisation: undefined;
  Accounts: undefined;
  Notifications: undefined;
  Bookmarks: undefined;
};
