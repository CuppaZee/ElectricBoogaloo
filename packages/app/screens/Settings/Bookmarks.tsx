import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button, Icon, Input, Layout, List, ListItem, Modal, Text } from "@ui-kitten/components";
import * as React from "react";
import { Image, ScrollView, View } from "react-native";
import { useClanBookmarks, useUserBookmarks } from "../../hooks/useBookmarks";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useTitle from "../../hooks/useTitle";
import { UpdateWrapper, UserSearchModal } from "./Notifications";
import Fuse from "fuse.js";
import useSearch from "../../hooks/useSearch";

interface ClanSearchModalProps {
  close: (data: { clan_id: number; name: string; tagline: string }) => void;
}

function ClanSearchModal({ close }: ClanSearchModalProps) {
  const [value, search, onValue] = useSearch(500);
  const clans = useCuppaZeeRequest("clan/list", { format: "list" }, true, undefined, true);

  const fuse = React.useMemo(
    () =>
      new Fuse(clans.data?.data ?? [], {
        keys: ["name", "clan_id"],
      }),
    [clans.dataUpdatedAt]
  );
  const results = React.useMemo(() => fuse.search(search), [fuse, search]);
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
        data={results}
        windowSize={2}
        renderItem={({ item, index }) => (
          <ListItem
            accessoryLeft={() => (
              <Image
                style={{ height: 24, width: 24, borderRadius: 12 }}
                source={{
                  uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(
                    item.item.clan_id
                  ).toString(36)}.png`,
                }}
              />
            )}
            title={`${item.item.name}`}
            onPress={() =>
              close({
                clan_id: Number(item.item.clan_id),
                name: item.item.name,
                tagline: item.item.tagline,
              })
            }
          />
        )}
      />
    </Layout>
  );
}

export default function AccountsScreen() {
  useTitle("☕ Settings - Accounts");
  const [userBookmarks, setUserBookmarks] = useUserBookmarks();
  const [clanBookmarks, setClanBookmarks] = useClanBookmarks();
  const [addUserModal, setAddUserModal] = React.useState(false);
  const [addClanModal, setAddClanModal] = React.useState(false);
  const [saved, setSaved] = React.useState(false);
  return (
    <Layout style={{ flex: 1 }}>
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={addUserModal}
        onBackdropPress={() => setAddUserModal(false)}>
        <UserSearchModal
          close={data => {
            userBookmarks.push({ user_id: data.user_id.toString(), username: data.username });
            setAddUserModal(false);
          }}
        />
      </Modal>
      <Modal
        backdropStyle={{ backgroundColor: "#00000077" }}
        visible={addClanModal}
        onBackdropPress={() => setAddClanModal(false)}>
        <ClanSearchModal
          close={data => {
            clanBookmarks?.push(data);
            setAddClanModal(false);
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
              Users
            </Text>
            <UpdateWrapper>
              {update => (
                <>
                  {userBookmarks.map((i, index) => (
                    <Layout
                      key={i.user_id}
                      level="3"
                      style={{
                        margin: 4,
                        borderRadius: 8,
                        padding: 4,
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <Image
                        style={{ height: 32, width: 32, borderRadius: 16, marginRight: 8 }}
                        source={{
                          uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(
                            i.user_id
                          ).toString(36)}.png`,
                        }}
                      />
                      <Text style={{ flex: 1 }} category="h6">
                        {i.username}
                      </Text>
                      <View>
                        <Button
                          style={{ height: 24 }}
                          size="tiny"
                          appearance="ghost"
                          onPress={() => {
                            userBookmarks.splice(index, 1);
                            userBookmarks.splice(index - 1, 0, i);
                            update();
                          }}
                          accessoryLeft={props => (
                            <Icon {...props} style={{ height: 24, width: 24 }} name="chevron-up" />
                          )}
                        />
                        <Button
                          style={{ height: 24 }}
                          size="tiny"
                          appearance="ghost"
                          onPress={() => {
                            userBookmarks.splice(index, 1);
                            userBookmarks.splice(index + 1, 0, i);
                            update();
                          }}
                          accessoryLeft={props => (
                            <Icon
                              {...props}
                              style={{ height: 24, width: 24 }}
                              name="chevron-down"
                            />
                          )}
                        />
                      </View>
                      <Button
                        style={{ margin: 4 }}
                        size="small"
                        status="danger"
                        appearance="outline"
                        onPress={() => {
                          userBookmarks.splice(index, 1);
                          update();
                        }}
                        accessoryLeft={props => <Icon {...props} name="close" />}
                      />
                    </Layout>
                  ))}

                  <Button
                    appearance="outline"
                    style={{ margin: 4 }}
                    onPress={() => setAddUserModal(true)}
                    accessoryLeft={props => <Icon {...props} name="account-plus" />}>
                    Add User
                  </Button>
                </>
              )}
            </UpdateWrapper>
          </Layout>
        </View>
        <View style={{ width: 400, flexGrow: 1, maxWidth: "100%", padding: 4 }}>
          <Layout level="2" style={{ margin: 4, padding: 4, flex: 1, borderRadius: 8 }}>
            <Text style={{ margin: 4 }} category="h6">
              Clans
            </Text>
            <UpdateWrapper>
              {update => (
                <>
                  {clanBookmarks?.map((i, index) => (
                    <Layout
                      key={i.clan_id}
                      level="3"
                      style={{
                        margin: 4,
                        borderRadius: 8,
                        padding: 4,
                        flexDirection: "row",
                        alignItems: "center",
                      }}>
                      <Image
                        style={{ height: 32, width: 32, borderRadius: 16, marginRight: 8 }}
                        source={{
                          uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(
                            i.clan_id
                          ).toString(36)}.png`,
                        }}
                      />
                      <Text style={{ flex: 1 }} category="h6">
                        {i.name}
                      </Text>
                      <View>
                        <Button
                          style={{ height: 24 }}
                          size="tiny"
                          appearance="ghost"
                          onPress={() => {
                            clanBookmarks.splice(index, 1);
                            clanBookmarks.splice(index - 1, 0, i);
                            update();
                          }}
                          accessoryLeft={props => (
                            <Icon {...props} style={{ height: 24, width: 24 }} name="chevron-up" />
                          )}
                        />
                        <Button
                          style={{ height: 24 }}
                          size="tiny"
                          appearance="ghost"
                          onPress={() => {
                            clanBookmarks.splice(index, 1);
                            clanBookmarks.splice(index + 1, 0, i);
                            update();
                          }}
                          accessoryLeft={props => (
                            <Icon
                              {...props}
                              style={{ height: 24, width: 24 }}
                              name="chevron-down"
                            />
                          )}
                        />
                      </View>
                      <Button
                        style={{ margin: 4 }}
                        size="small"
                        status="danger"
                        appearance="outline"
                        onPress={() => {
                          clanBookmarks.splice(index, 1);
                          update();
                        }}
                        accessoryLeft={props => <Icon {...props} name="close" />}
                      />
                    </Layout>
                  ))}

                  <Button
                    appearance="outline"
                    style={{ margin: 4 }}
                    onPress={() => setAddClanModal(true)}
                    accessoryLeft={props => <Icon {...props} name="shield-plus" />}>
                    Add Clan
                  </Button>
                </>
              )}
            </UpdateWrapper>
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
            if (clanBookmarks) {
              setClanBookmarks({ loaded: true, data: clanBookmarks });
              AsyncStorage.setItem("CLAN_BOOKMARKS", JSON.stringify(clanBookmarks));
            }
            if (userBookmarks) {
              setUserBookmarks({ loaded: true, data: userBookmarks });
              AsyncStorage.setItem("USER_BOOKMARKS", JSON.stringify(userBookmarks));
            }
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
