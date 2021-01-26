export type RootStackParamList = {
  Root: undefined;
  somewherewithoutcoffee: undefined;
};

export type MainDrawerParamList = {
  Dashboard: undefined;
  User: undefined;
  Clan: undefined;
  Tools: undefined;
  Auth: undefined;
};

export type UserStackParamList = {
  Profile: { username: string };
  Activity: { username: string; date?: string };
  Inventory: { username: string };
  Challenges: { username: string; date?: string };
  ZeeOps: { username: string };
};

export type DashStackParamList = {
  Dash: undefined;
};


export type ClanStackParamList = {
  Stats: { clanid: number, year?: number, month?: number };
  // Activity: { username: string; date?: string };
};

export type ToolsStackParamList = {
  Calendar: undefined;
  Credits: undefined;
  Bouncers: undefined;
  WidgetConfigureActivityWidget: { id: string };
  // Activity: { username: string; date?: string };
};
