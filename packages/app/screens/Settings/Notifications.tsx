import {
  Button,
  CheckBox,
  Icon,
  Input,
  Layout,
  List,
  ListItem,
  Modal,
  Spinner,
  Text,
} from "@ui-kitten/components";
import * as React from "react";
import { Platform, ScrollView, View, Image } from "react-native";
import useTitle from "../../hooks/useTitle";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import db, { TypeTags } from "@cuppazee/types";
import TypeImage from "../../components/Common/TypeImage";
import MapView from "../../components/Maps/MapView";
import useSearch from "../../hooks/useSearch";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import fuse from "fuse.js";

interface LocationPickerModalProps {
  location: DeviceNotificationStaticLocation;
  close: () => void;
  remove: () => void;
}

function LocationPickerModal({ location, close, remove }: LocationPickerModalProps) {
  return (
    <Layout level="4" style={{ borderRadius: 8, padding: 4 }}>
      <UpdateWrapper>
        {update => (
          <View>
            <Input
              style={{ margin: 4 }}
              label="Location Name"
              value={location.name}
              onChangeText={text => {
                location.name = text;
                update();
              }}
            />
            <View style={{ flex: 1, margin: 4, height: 400, width: 400, maxWidth: "100%" }}>
              <UpdateWrapper>
                {mini => (
                  <MapView
                    region={{
                      latitude: Number(location.latitude),
                      longitude: Number(location.longitude),
                      latitudeDelta: 16,
                      longitudeDelta: 16,
                    }}
                    zoom={10}
                    markers={[
                      {
                        id: "main",
                        lat: Number(location.latitude),
                        lng: Number(location.longitude),
                        icon: "munzee",
                      },
                    ]}
                    onRegionChange={({ latitude, longitude }) => {
                      location.latitude = latitude.toString();
                      location.longitude = longitude.toString();
                      mini();
                    }}
                  />
                )}
              </UpdateWrapper>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Button
                style={{ margin: 4 }}
                status="danger"
                accessoryLeft={props => <Icon name="delete-forever" {...props} />}
                onPress={remove}
              />
              <Button style={{ margin: 4, flex: 1 }} onPress={close}>
                Done
              </Button>
            </View>
          </View>
        )}
      </UpdateWrapper>
    </Layout>
  );
}
interface UserSearchModalProps {
  close: (data: { user_id: number; username: string }) => void;
}

export function UserSearchModal({ close }: UserSearchModalProps) {
  const [value, search, onValue] = useSearch(500);
  const data = useMunzeeRequest("user/find", { text: search }, true, undefined, true);
  return (
    <Layout level="4" style={{ borderRadius: 8, padding: 4 }}>
      <Input style={{ margin: 4 }} label="Search" value={value} onChangeText={onValue} />

      <List
        style={{
          height: 400,
          width: 300,
          margin: 4,
          borderRadius: 8,
          maxWidth: "100%",
          flexShrink: 1,
        }}
        data={data.data?.data?.users ?? []}
        renderItem={({ item, index }) => (
          <ListItem
            accessoryLeft={() => (
              <Image
                style={{ height: 24, width: 24, borderRadius: 12 }}
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                    item.user_id
                  ).toString(36)}.png`,
                }}
              />
            )}
            title={`${item.username}`}
            onPress={() =>
              close({
                user_id: Number(item.user_id),
                username: item.username,
              })
            }
          />
        )}
      />
      {/* {data.data?.data?.users.map(i=><View style={{ flexDirection: "row", alignItems: ""}})} */}
    </Layout>
  );
}
interface OverrideSearchModalProps {
  close: (data: { tag: string; radius: string } | { icon: string; radius: string }) => void;
}

const Tags = Object.keys(TypeTags)
  .filter(i => (i.startsWith("Bouncer") && !i.startsWith("BouncerHost")) || i.startsWith("Scatter"))
  .map(i => ({
    i,
    l: i
      .replace(/^Bouncer/, "")
      .replace(/PCS([0-2])/, "PC Season $1")
      .replace("PC", "Pouch Creature")
      .replace("Seasonal", "SeasonalSpecials")
      .replace(/Stage([0-3])/, "Stage $1")
      .replace(/SeasonalSpecials([0-9]+)/, "$1 Seasonal Specials")
      .replace("SeasonalSpecials", "AllSeasonalSpecials")
      .replace(/([A-Za-z])([A-Z0-9])([a-z0-9])/g, "$1 $2$3")
      .replace(/Pouch Creature (.+)/, "$1 Pouch Creatures")
      .replace(/Pouch Creature$/, "Pouch Creatures")
      .replace(/Myth (.+)/, "$1 Myths")
      .replace(/Myth$/, "Myths")
      .replace(/Retired$/, "All Retired")
      .replace(/Flat$/, "Fancy Flats")
      .replace(/Flat Phantom$/, "Phantom Flats")
      .replace(/Scatter$/, "Scatters")
      .replace(/Scatter Standalone$/, "Standalone Scatters")
      .replace(/Nomad$/, "Nomads")
      .replace(/TPOB$/, "tPOBs"),
    t: "tag",
    p: db.types.filter(t => t.has_tag(TypeTags[i as keyof typeof TypeTags])).length,
  }))
  .filter(i => db.types.find(t => t.has_tag(TypeTags[i.i as keyof typeof TypeTags])))
  .filter(i => i.l);

const Types = db.types
  .filter(i => i.has_tag(TypeTags.Bouncer) || i.has_tag(TypeTags.Scatter))
  .map(i => ({
    i: i.icon,
    l: i.name,
    t: "icon",
    p: 0,
  }));

const OverrideSearch = new fuse([...Tags, ...Types], {
  keys: ["i", "l"],
});

function OverrideSearchModal({ close }: OverrideSearchModalProps) {
  const [value, search, onValue] = useSearch(500);
  const results = search.length > 0 ? OverrideSearch.search(search).map(i => i.item) : Tags;
  return (
    <Layout level="4" style={{ borderRadius: 8, padding: 4 }}>
      <Input
        style={{ margin: 4 }}
        label="Search"
        value={value}
        onChangeText={onValue}
        caption="You can search for Categories and individual Types"
      />

      <List
        windowSize={3}
        style={{
          height: 400,
          width: 300,
          margin: 4,
          borderRadius: 8,
          maxWidth: "100%",
          flexShrink: 1,
        }}
        data={results}
        renderItem={({ item, index }) => (
          <ListItem
            accessoryLeft={() =>
              item.t === "icon" ? (
                <TypeImage style={{ size: 24 }} icon={item.i} />
              ) : (
                <TypeImage
                  style={{ size: 24 }}
                  icon={
                    db.types.find(t => t.has_tag(TypeTags[item.i as keyof typeof TypeTags]))
                      ?.icon ?? ""
                  }
                />
              )
            }
            title={`${item.l}`}
            onPress={() => {
              if (item.t === "icon") {
                close({
                  icon: item.i,
                  radius: "0",
                });
              } else {
                close({
                  tag: item.i,
                  radius: "0",
                });
              }
            }}
          />
        )}
      />
    </Layout>
  );
}

export function UpdateWrapper({ children }: { children: (update: () => void) => React.ReactElement }) {
  const [, update] = React.useReducer(a => a + 1, 0);
  return children(update);
}

export type DeviceNotificationUser = {
  user_id: number;
  username: string;
  primary?: boolean;
  streaksaver?: {
    time: number;
    types: ("deploy" | "capture" | "poi")[];
  };
};

export type DeviceNotificationStaticLocation = {
  enabled: boolean;
  latitude: string;
  longitude: string;
  name: string;
};

export type DeviceNotificationSettings = {
  type: "expo";
  token: string;

  users: DeviceNotificationUser[];

  locations: {
    dynamic?: {
      latitude: number;
      longitude: number;
    };
    static: DeviceNotificationStaticLocation[];
  };

  bouncers: {
    enabled: boolean;
    default: string;
    starred: string;
    overrides: (
      | {
          tag: string;
          radius: string;
        }
      | {
          icon: string;
          radius: string;
        }
    )[];
  };

  starred_users: {
    user_id: number;
    username: string;
  }[];

  munzee_blog: boolean;
  imperial: boolean;
};

export default function NotificationScreen() {
  useTitle("☕ Settings - Notifications");
  const [settings, setSettings] = React.useState<DeviceNotificationSettings>();
  const [token, setToken] = React.useState<string>();
  const [saved, setSaved] = React.useState(false);
  const [locationPickerIndex, setLocationPickerIndex] = React.useState<number>();
  const [starredUserModal, setStarredUserModal] = React.useState(false);
  const [distanceOverrideModal, setDistanceOverrideModal] = React.useState(false);

  async function registerForPushNotificationsAsync() {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        setToken("_failed");
        return;
      }
      const token = (await Notifications.getExpoPushTokenAsync()).data;
      setToken(token);
    } else {
      setToken("_failed");
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  }

  React.useEffect(() => {
    if (Platform.OS === "web") return;
    if (token && token !== "_failed") {
      (async function () {
        const response = await fetch(`https://server.beta.cuppazee.app/notifications/get`, {
          method: "POST",
          body: JSON.stringify({ token }),
        });
        setSettings((await response.json()).data);
      })();
    } else if (!token) {
      registerForPushNotificationsAsync();
    }
  }, [token]);

  if (Platform.OS === "web")
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text category="h5">Notifications aren't supported on Web</Text>
      </Layout>
    );
  if (!token)
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </Layout>
    );
  if (token === "_failed")
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text category="h5">Granting permissions failed. Did you allow notifications?</Text>
      </Layout>
    );
  if (!settings)
    return (
      <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Spinner />
      </Layout>
    );

  return (
    <Layout style={{ flex: 1 }}>
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={locationPickerIndex !== undefined}
        onBackdropPress={() => setLocationPickerIndex(undefined)}>
        <LocationPickerModal
          close={() => setLocationPickerIndex(undefined)}
          remove={() => {
            settings.locations.static.splice(locationPickerIndex ?? 0, 1);
            setLocationPickerIndex(undefined);
          }}
          location={settings.locations.static[locationPickerIndex ?? 0]}
        />
      </Modal>
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={starredUserModal}
        onBackdropPress={() => setStarredUserModal(false)}>
        <UserSearchModal
          close={data => {
            settings.starred_users.push(data);
            setStarredUserModal(false);
          }}
        />
      </Modal>
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={distanceOverrideModal}
        onBackdropPress={() => setDistanceOverrideModal(false)}>
        <OverrideSearchModal
          close={data => {
            settings.bouncers.overrides.push(data);
            settings.bouncers.overrides.sort((a, b) => {
              const ap = "icon" in a ? 1 : Tags.find(i => i.i === a.tag)?.p;
              const bp = "icon" in b ? 1 : Tags.find(i => i.i === b.tag)?.p;
              return (ap || 0) - (bp || 0);
            });
            setDistanceOverrideModal(false);
          }}
        />
      </Modal>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          alignSelf: "center",
          width: 1000,
          maxWidth: "100%",
          padding: 4,
          flexDirection: "row",
          flexWrap: "wrap",
        }}>
        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Bouncers
            </Text>
            <CheckBox
              style={{ margin: 8 }}
              checked={settings.bouncers.enabled}
              onChange={checked =>
                setSettings({ ...settings, bouncers: { ...settings.bouncers, enabled: checked } })
              }>
              Enabled
            </CheckBox>
            {settings.bouncers.enabled ? (
              <>
                <UpdateWrapper>
                  {update => (
                    <Input
                      style={{ margin: 4 }}
                      value={settings.bouncers.default}
                      label={`Default Distance (${settings.imperial ? "mi" : "km"})`}
                      onChangeText={text => {
                        settings.bouncers.default = text;
                        update();
                      }}
                    />
                  )}
                </UpdateWrapper>
                <UpdateWrapper>
                  {update => (
                    <Input
                      style={{ margin: 4 }}
                      value={settings.bouncers.starred}
                      label={`Starred User Distance (${settings.imperial ? "mi" : "km"})`}
                      onChangeText={text => {
                        settings.bouncers.starred = text;
                        update();
                      }}
                    />
                  )}
                </UpdateWrapper>
                <Text style={{ margin: 4 }} category="s1">
                  Categories and Types
                </Text>
                <UpdateWrapper>
                  {bigupdate => (
                    <>
                      {settings.bouncers.overrides.map((i, index) => (
                        <UpdateWrapper>
                          {update => (
                            <Layout level="3" style={{ margin: 4, borderRadius: 8 }}>
                              {"icon" in i ? (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 4,
                                  }}>
                                  <TypeImage style={{ size: 24, marginRight: 8 }} icon={i.icon} />
                                  <Text style={{ flex: 1 }} category="s1">
                                    {Types.find(t => t.i === i.icon)?.l}
                                  </Text>
                                  <Button
                                    size="small"
                                    appearance="outline"
                                    status="danger"
                                    accessoryLeft={props => <Icon name="close" {...props} />}
                                    onPress={() => {
                                      settings.bouncers.overrides.splice(index, 1);
                                      bigupdate();
                                    }}
                                  />
                                </View>
                              ) : (
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 4,
                                  }}>
                                  <TypeImage
                                    style={{ size: 24, marginRight: 8 }}
                                    icon={
                                      db.types.find(t =>
                                        t.has_tag(TypeTags[i.tag as keyof typeof TypeTags])
                                      )?.icon ?? ""
                                    }
                                  />
                                  <Text style={{ flex: 1 }} category="s1">
                                    {Tags.find(t => t.i === i.tag)?.l}
                                  </Text>
                                  <Button
                                    size="small"
                                    appearance="outline"
                                    status="danger"
                                    accessoryLeft={props => <Icon name="close" {...props} />}
                                    onPress={() => {
                                      settings.bouncers.overrides.splice(index, 1);
                                      bigupdate();
                                    }}
                                  />
                                </View>
                              )}
                              <Input
                                style={{ margin: 4 }}
                                value={i.radius}
                                label={`Distance (${settings.imperial ? "mi" : "km"})`}
                                onChangeText={text => {
                                  i.radius = text;
                                  update();
                                }}
                              />
                            </Layout>
                          )}
                        </UpdateWrapper>
                      ))}
                      <Button
                        style={{ margin: 4 }}
                        size="small"
                        appearance="outline"
                        accessoryLeft={props => <Icon name="plus" {...props} />}
                        onPress={() => {
                          setDistanceOverrideModal(true);
                        }}>
                        Add Category/Type
                      </Button>
                    </>
                  )}
                </UpdateWrapper>
              </>
            ) : null}
          </Layout>
        </View>

        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Starred Users
            </Text>
            <UpdateWrapper>
              {update => (
                <>
                  {settings.starred_users.map((i, index) => (
                    <Layout
                      level="3"
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        padding: 4,
                        margin: 4,
                        borderRadius: 8,
                      }}>
                      <Image
                        style={{ height: 24, width: 24, borderRadius: 12, marginRight: 8 }}
                        source={{
                          uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(
                            36
                          )}.png`,
                        }}
                      />
                      <Text style={{ flex: 1 }} category="s1">
                        {i.username}
                      </Text>
                      <Button
                        size="small"
                        status="danger"
                        appearance="outline"
                        accessoryLeft={props => <Icon name="close" {...props} />}
                        onPress={() => {
                          settings.starred_users.splice(index, 1);
                          update();
                        }}
                      />
                    </Layout>
                  ))}
                  <Button
                    style={{ margin: 4 }}
                    size="small"
                    appearance="outline"
                    accessoryLeft={props => <Icon name="plus" {...props} />}
                    onPress={() => {
                      setStarredUserModal(true);
                    }}>
                    Add User
                  </Button>
                </>
              )}
            </UpdateWrapper>
          </Layout>
        </View>

        {/* Locations */}
        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text category="h6">Locations</Text>
            <UpdateWrapper>
              {update => (
                <Layout
                  level="3"
                  style={{
                    margin: 4,
                    borderRadius: 8,
                    padding: 4,
                    paddingHorizontal: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <CheckBox
                    checked={!!settings.locations.dynamic}
                    onChange={async () => {
                      if (settings.locations.dynamic) {
                        settings.locations.dynamic = undefined;
                      } else {
                        await Location.requestPermissionsAsync();
                        const loc =
                          (await Location.getLastKnownPositionAsync()) ??
                          (await Location.getCurrentPositionAsync());
                        if (!loc) return;
                        settings.locations.dynamic = {
                          latitude: loc.coords.latitude,
                          longitude: loc.coords.longitude,
                        };
                      }
                      update();
                    }}
                  />
                  <View style={{ marginHorizontal: 8, flex: 1 }}>
                    <Text category="s1">
                      <Icon style={{ height: 16, width: 16 }} name="crosshairs-gps" /> Live Location
                    </Text>
                    {settings.locations.dynamic ? (
                      <Text category="c1">
                        {settings.locations.dynamic.latitude} {settings.locations.dynamic.longitude}
                      </Text>
                    ) : (
                      <Text category="c1">Not Enabled</Text>
                    )}
                  </View>
                </Layout>
              )}
            </UpdateWrapper>
            {settings.locations.static.map((i, index) => (
              <UpdateWrapper>
                {update => (
                  <Layout
                    level="3"
                    style={{
                      margin: 4,
                      borderRadius: 8,
                      padding: 4,
                      paddingHorizontal: 8,
                      flexDirection: "row",
                      alignItems: "center",
                    }}>
                    <CheckBox
                      checked={i.enabled}
                      onChange={checked => {
                        i.enabled = checked;
                        update();
                      }}
                    />
                    <View style={{ marginHorizontal: 8, flex: 1 }}>
                      <Text category="s1">{i.name}</Text>
                      <Text category="c1">
                        {i.latitude} {i.longitude}
                      </Text>
                    </View>
                    <Button
                      size="small"
                      appearance="outline"
                      accessoryLeft={props => <Icon name="pencil" {...props} />}
                      onPress={() => setLocationPickerIndex(index)}
                    />
                  </Layout>
                )}
              </UpdateWrapper>
            ))}
            <Button
              style={{ margin: 4 }}
              size="small"
              appearance="outline"
              accessoryLeft={props => <Icon name="plus" {...props} />}
              onPress={() => {
                settings.locations.static.push({
                  latitude: "0",
                  longitude: "0",
                  name: "",
                  enabled: true,
                });
                setLocationPickerIndex(settings.locations.static.length - 1);
              }}>
              Add Static Location
            </Button>
          </Layout>
        </View>

        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Other
            </Text>
            <CheckBox
              style={{ margin: 8 }}
              checked={settings.munzee_blog}
              onChange={checked => setSettings({ ...settings, munzee_blog: checked })}>
              Munzee Blog
            </CheckBox>
            <CheckBox
              style={{ margin: 8 }}
              checked={settings.imperial}
              onChange={checked => setSettings({ ...settings, imperial: checked })}>
              Imperial Units
            </CheckBox>
          </Layout>
        </View>
      </ScrollView>
      <View style={{ width: 600, maxWidth: "100%", padding: 4, alignSelf: "center" }}>
        {saved && (
          <Layout level="3" style={{ margin: 4, borderRadius: 8, padding: 4 }}>
            <Text category="h6">
              <Icon name="check" style={{ height: 24, width: 24 }} /> Settings Saved
            </Text>
          </Layout>
        )}
        <Button
          style={{ margin: 4 }}
          onPress={async () => {
            if (!settings) return;
            if (settings.locations.dynamic) {
              const { status } = await Location.requestPermissionsAsync();
              if (status === "granted") {
                await Location.startLocationUpdatesAsync("BACKGROUND_LOCATION", {
                  accuracy: Location.Accuracy.Balanced,
                });
              } else {
                settings.locations.dynamic = undefined;
              }
            } else {
              try {
                await Location.stopLocationUpdatesAsync("BACKGROUND_LOCATION");
              } catch (e) {}
            }
            await fetch(`https://server.beta.cuppazee.app/notifications/signup`, {
              method: "POST",
              body: JSON.stringify({ data: JSON.stringify(settings) }),
            });
            setSaved(true);
            setTimeout(() => {
              setSaved(false);
            }, 5000);
          }}
          accessoryLeft={props => <Icon {...props} name="content-save" />}>
          Save
        </Button>
      </View>
    </Layout>
  );
}
