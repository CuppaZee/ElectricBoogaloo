import { DrawerActions } from "@react-navigation/native";
import { StackHeaderProps } from "@react-navigation/stack";
import { Layout, TopNavigation, TopNavigationAction, useTheme } from "@ui-kitten/components";
import React from "react";
import { useIsFetching, useQueryClient } from "react-query";
import day from "dayjs";
import { ActivityIndicator, useWindowDimensions, View } from "react-native";
import Icon from "../components/Common/Icon";
import EvaWrapper from "../EvaWrapper";
import { Box, Button, Heading, HStack, Text } from "native-base";

function LoadIcon() {
  const loading = useIsFetching();
  const queryClient = useQueryClient();
  const theme = useTheme();
  return (
    <Button
      size="sm"
      bg="none"
      startIcon={loading ? (
          <ActivityIndicator color={theme["color-primary-500"]} size={24} />
        ) : (
          <Icon style={{ height: 24 }} name="refresh" />
        )
      }
      onPress={() =>
        queryClient.refetchQueries({
          predicate: query => query.queryKey[0] !== "token",
          active: true,
        })
      }
    />
  );
}

export default function Header(props: StackHeaderProps) {
  const dimensions = useWindowDimensions();
  const titleData = (
    props.scene.descriptor.options.headerTitle?.toString() ?? props.scene.route.name
  ).split("|");
  return (
    <Box bg="coolGray.200" _dark={{ bg: "coolGray.800" }} style={{ paddingTop: props.insets.top }}>
      <HStack alignItems="center" p={1}>
        {dimensions.width <= 1000 && (
          <Button
            onPress={() => props.navigation.dispatch(DrawerActions.toggleDrawer())}
            startIcon={<Icon style={{ height: 24 }} name="menu" />}
          />
        )}
        <Button
          size="sm"
          bg="none"
          style={{ opacity: props.navigation.canGoBack() ? 1 : 0.4 }}
          startIcon={<Icon style={{ height: 24 }} name="arrow-left" />}
          onPress={() => props.navigation.goBack()}
          disabled={!props.navigation.canGoBack()}
        />
        <Box flex={1}>
          <Heading fontSize="lg">{titleData[0] ?? ""}</Heading>
          <Text fontSize="sm">{titleData[1] ?? day.mhqNow().format("L LT [MHQ]")}</Text>
        </Box>
        <Button
          size="sm"
          bg="none"
          startIcon={<Icon style={{ height: 24 }} name="home" />}
          onPress={() =>
            props.navigation.reset({
              routes: [
                {
                  name: "Root",
                },
              ],
            })
          }
        />
        <LoadIcon />
      </HStack>
    </Box>
  );
}
