import { DrawerActions } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import {
  Icon,
  Layout,
  Spinner,
  TopNavigation,
  TopNavigationAction,
} from "@ui-kitten/components";
import React from "react";
import { useIsFetching, useQueryClient } from "react-query";
import day from "dayjs";
import { useWindowDimensions } from "react-native";

export default function Header(props: StackHeaderProps) {
  const dimensions = useWindowDimensions();
  const loading = useIsFetching();
  const queryClient = useQueryClient();
  const titleData = (
    props.scene.descriptor.options.headerTitle?.toString() ??
    props.scene.route.name
  ).split("|");
  return (
    <Layout style={{ paddingTop: props.insets.top }}>
      <TopNavigation
        alignment="center"
        title={titleData[0] ?? ""}
        subtitle={titleData[1] ?? day().format("DD/MM/YYYY HH:mm")}
        accessoryLeft={() => (
          <>
            {props.navigation.canGoBack() && (
              <TopNavigationAction
                icon={props => <Icon {...props} name="arrow-left" />}
                onPress={() => props.navigation.goBack()}
              />
            )}
            {dimensions.width <= 1000 && (
              <TopNavigationAction
                onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
                icon={props => <Icon {...props} name="menu" />}
              />
            )}
          </>
        )}
        accessoryRight={() => (
          <TopNavigationAction
            icon={props => (loading ? <Spinner /> : <Icon {...props} name="refresh" />)}
            onPress={() =>
              queryClient.refetchQueries({
                predicate: query => query.queryKey[0] !== "token",
                active: true,
              })
            }
          />
        )}
      />
    </Layout>
  );
}
