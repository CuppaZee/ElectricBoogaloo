import db, { TypeHidden, TypeTags } from "@cuppazee/types";
import { Icon, Input, Layout, List, ListItem, Text } from "@ui-kitten/components";
import * as React from "react";
import { FlatList, Image, View } from "react-native";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useSearch from "../../hooks/useSearch";
import useTitle from "../../hooks/useTitle";
import Fuse from "fuse.js";
import types from "@cuppazee/types";
import TypeImage from "../../components/Common/TypeImage";
import { useNavigation } from "@react-navigation/native";
import Tip from "../../components/Common/Tip";

export default function SearchScreen() {
  useTitle(`☕ Search`);
  const [value, search, onValue] = useSearch(500);
  const users = useMunzeeRequest("user/find", { text: search }, true, undefined, true);
  const clans = useCuppaZeeRequest("clan/list", { format: "list" }, true, undefined, true);
  const nav = useNavigation();

  const fuse = React.useMemo(
    () =>
      new Fuse(
        [
          ...(clans.data?.data ?? []),
          ...types.types,
          ...types.categories,
          ...(users.data?.data?.users ?? []),
        ],
        {
          keys: ["name", "username", "icon", "id", "user_id", "clan_id"],
        }
      ),
    [clans.dataUpdatedAt, users.dataUpdatedAt]
  );
  const results = React.useMemo(() => fuse.search(search), [fuse, search]);

  return (
    <Layout style={{ padding: 4, flex: 1 }}>
      <Input
        style={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
        label="Search"
        value={value}
        onChangeText={onValue}
      />

      {!search && (
        <Tip
          wrapperStyle={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
          tip="As well as searching for Players and Clans, you can also look up Munzee Types here to find out more about them!"
          id="search_munzee_types"
        />
      )}

      <FlatList
        style={{
          flex: 1,
          width: 400,
          maxWidth: "100%",
          alignSelf: "center",
          margin: 4,
          borderRadius: 8,
        }}
        windowSize={2}
        data={results}
        renderItem={({ item, index }: { item: typeof results[0]; index: number }) => (
          <ListItem
            accessoryLeft={() =>
              "icon" in item.item ? (
                <TypeImage style={{ size: 32 }} icon={item.item.icon} />
              ) : (
                <Image
                  style={{ height: 32, width: 32, borderRadius: 16 }}
                  source={{
                    uri:
                      "user_id" in item.item
                        ? `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                            item.item.user_id
                          ).toString(36)}.png`
                        : `https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(
                            item.item.clan_id
                          ).toString(36)}.png`,
                  }}
                />
              )
            }
            accessoryRight={props => (
              <Icon
                name={
                  "icon" in item.item
                    ? "category" in item.item
                      ? "map-marker"
                      : "map-marker-multiple"
                    : "user_id" in item.item
                    ? "account"
                    : "shield-half-full"
                }
                {...props}
              />
            )}
            title={item.item.username ?? item.item.name}
            description={
              "icon" in item.item
                ? "category" in item.item
                  ? "Type"
                  : "Type Category"
                : "user_id" in item.item
                ? "Player"
                : "Clan"
            }
            onPress={() => {
              if ("user_id" in item.item) {
                nav.navigate("User", {
                  screen: "Profile",
                  params: {
                    username: item.item.username,
                  },
                });
              } else if ("clan_id" in item.item) {
                nav.navigate("Clan", {
                  screen: "Stats",
                  params: {
                    clanid: item.item.clan_id,
                  },
                });
              }
            }}
          />
        )}
      />
    </Layout>
  );
}
