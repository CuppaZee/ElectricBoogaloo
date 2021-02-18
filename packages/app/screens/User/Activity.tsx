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
import useActivity from "../../hooks/useActivity";
import Loading from "../../components/Loading";

export default function UserActivityScreen() {
  const [size, onLayout] = useComponentSize();
  const [visible, setVisible] = React.useState(false);
  const [filters, setFilters] = React.useState<UserActivityFilters>({
    activity: new Set(),
    category: new Set(),
    state: new Set(),
  });
  const route = useRoute<RouteProp<UserStackParamList, "Activity">>();  
  useTitle(
    `☕ ${route.params.username} - Activity - ${dayjs(route.params?.date ?? dayjs.mhqNow()).format(
      "DD/MM/YYYY"
    )}`
  );
  const user = useMunzeeRequest("user", { username: route.params?.username }, route.params?.username !== undefined);
  const data = useActivity(user.data?.data?.user_id, route.params?.date);
  const d = React.useMemo(
    () =>
      data.data?.data
        ? ActivityConverter(data.data?.data, filters, { username: user.data?.data?.username })
        : null,
    [data.dataUpdatedAt, filters]
  );
  
  if (!user.isFetched || !data.isFetched || !d || !size) {
    return (
      <Layout style={{ flex: 1 }} onLayout={onLayout}>
        <Loading data={[user, data]} />
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
          style={{ maxHeight: "90%"}}
          visible={visible}
          backdropStyle={{ backgroundColor: "#0007" }}
          onBackdropPress={() => setVisible(false)}
        >
          <Layout level="3" style={{ width: 300, flex: 1 }}>
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
