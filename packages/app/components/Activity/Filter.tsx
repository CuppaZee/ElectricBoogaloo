import { Button, CheckBox, Text } from "@ui-kitten/components";
import * as React from "react";
import { TypeState } from "@cuppazee/db";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "../Common/Icon";
import { UserActivityData, UserActivityFilters, UserActivityType } from "@cuppazee/utils/lib";

const types: {
  label: string;
  value: UserActivityType;
}[] = [
  {
    label: "Captures",
    value: UserActivityType.Capture,
  },
  {
    label: "Deploys",
    value: UserActivityType.Deploy,
  },
  {
    label: "Passive Deploys",
    value: UserActivityType.PassiveDeploy,
  },
  {
    label: "Capons",
    value: UserActivityType.Capon,
  },
];

const states = [
  {
    label: "Physicals",
    value: TypeState.Physical,
  },
  {
    label: "Virtuals",
    value: TypeState.Virtual,
  },
  {
    label: "Bouncers",
    value: TypeState.Bouncer,
  },
  {
    label: "Locationless",
    value: TypeState.Locationless,
  },
];

export default function UserActivityFilter({
  d,
  filters: baseFilters,
  setFilters: setBaseFilters,
}: {
  d: UserActivityData;
  filters: UserActivityFilters;
  setFilters(filters: UserActivityFilters): void;
}) {
  const { t } = useTranslation();
  const [filters, setFilters] = React.useState(baseFilters);
  React.useEffect(() => {
    setFilters(baseFilters);
  }, [baseFilters]);
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4 }}>
      <Button
        onPress={() => setBaseFilters(filters)}
        accessoryLeft={props => <Icon {...props} name="content-save" />}
        size="small"
        appearance="outline">
        {t("user_activity:filter_save")}
      </Button>
      <Text category="s1" style={{ padding: 4 }}>
        {t("user_activity:filter_types")}
      </Text>
      {types.map(i => (
        <CheckBox
          key={i.value}
          style={{ margin: 4 }}
          checked={filters.activity.has(i.value)}
          onChange={() => {
            if (filters.activity.has(i.value)) {
              filters.activity.delete(i.value);
            } else {
              filters.activity.add(i.value);
            }
            setFilters({ ...filters });
          }}>
          {i.label}
        </CheckBox>
      ))}
      <Text category="s1" style={{ padding: 4 }}>
        {t("user_activity:filter_state")}
      </Text>
      {states.map(i => (
        <CheckBox
          key={i.value}
          style={{ margin: 4 }}
          checked={filters.state.has(i.value)}
          onChange={() => {
            if (filters.state.has(i.value)) {
              filters.state.delete(i.value);
            } else {
              filters.state.add(i.value);
            }
            setFilters({ ...filters });
          }}>
          {i.label}
        </CheckBox>
      ))}
      <Text category="s1" style={{ padding: 4 }}>
        {t("user_activity:filter_category")}
      </Text>
      {d.categories.map(i => (
        <CheckBox
          key={i.id}
          style={{ margin: 4 }}
          checked={filters.category.has(i)}
          onChange={() => {
            if (filters.category.has(i)) {
              filters.category.delete(i);
            } else {
              filters.category.add(i);
            }
            setFilters({ ...filters });
          }}>
          {i.name}
        </CheckBox>
      ))}
    </ScrollView>
  );
}
