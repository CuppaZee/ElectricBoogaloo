import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Layout, Modal, Spinner, Text } from "@ui-kitten/components";
import dayjs from "dayjs";
import * as React from "react";
import {
  ActivityConverter,
  UserActivityData,
  UserActivityFilters,
} from "../../components/Activity/Data";
import useCuppaZeeRequest from "../../hooks/useCuppaZeeRequest";
import useMunzeeRequest from "../../hooks/useMunzeeRequest";
import useComponentSize from "../../hooks/useComponentSize";
import { UserStackParamList } from "../../types";
import UserActivityList from "../../components/Activity/List";
import UserActivityFilter from "../../components/Activity/Filter";
import useTitle from "../../hooks/useTitle";

export default function UserActivityScreen() {
  const [size, onLayout] = useComponentSize();
  const [visible, setVisible] = React.useState(false);
  const [filters, setFilters] = React.useState<UserActivityFilters>({
    activity: new Set(),
    category: new Set(),
    state: new Set(),
  });
  const route = useRoute<RouteProp<UserStackParamList, "Activity">>();  
  useTitle(`☕ ${route.params.username} - Activity - ${dayjs(route.params?.date).format("DD/MM/YYYY")}`);
  const user = useMunzeeRequest("user", { username: route.params?.username }, route.params?.username !== undefined);
  const data = useCuppaZeeRequest<{ data: UserActivityData }>(
    "user/activity",
    {
      user_id: user.data?.data?.user_id,
      day: route.params?.date ?? dayjs().format("YYYY-MM-DD"),
    },
    user.data?.data?.user_id !== undefined
  );
  const d = React.useMemo(
    () =>
      data.data?.data
        ? ActivityConverter(data.data?.data, filters, { username: "sohcah" })
        : null,
    [data.dataUpdatedAt, filters]
  );
  
  if (!data.data || !d || !size) {
    return (
      <Layout
        onLayout={onLayout}
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Spinner />
        <Text>{JSON.stringify(route.params)}</Text>
      </Layout>
    );
  }
  return (
    <Layout onLayout={onLayout} style={{ flex: 1, flexDirection: "row" }}>
      <UserActivityList
        toggleFilterModal={
          (size?.width || 0) > 720 ? undefined : () => setVisible(!visible)
        }
        d={d}
        user_id={user.data?.data?.user_id ?? 0}
      />
      {(size?.width || 0) > 720 ? (
        <Layout level="3" style={{ width: 300 }}>
          <UserActivityFilter d={d} filters={filters} setFilters={setFilters} />
        </Layout>
      ) : (
        <Modal
          visible={visible}
          backdropStyle={{ backgroundColor: "#0007" }}
          onBackdropPress={() => setVisible(false)}
        >
          <Layout level="3" style={{ width: 300 }}>
            <UserActivityFilter
              d={d}
              filters={filters}
              setFilters={setFilters}
            />
          </Layout>
        </Modal>
      )}
    </Layout>
  );
}
