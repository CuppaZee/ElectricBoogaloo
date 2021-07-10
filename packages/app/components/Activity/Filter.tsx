import * as React from "react";
import { TypeState } from "@cuppazee/db";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native-gesture-handler";
import Icon from "../Common/Icon";
import { UserActivityData, UserActivityFilters, UserActivityType } from "@cuppazee/utils/lib";
import { Button, Checkbox, Heading } from "native-base";

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
        startIcon={<Icon style={{ height: 24 }} name="content-save" />}
        onPress={() => setBaseFilters(filters)}
        size="sm">
        {t("user_activity:filter_save")}
      </Button>
      <Heading fontSize="lg" style={{ padding: 4 }}>
        {t("user_activity:filter_types")}
      </Heading>
      <Checkbox.Group
        value={Array.from(filters.activity)}
        onChange={arr => {
          setFilters({ ...filters, activity: new Set(arr) });
        }}>
        {types.map(i => (
          <Checkbox key={i.value} style={{ margin: 4 }} value={i.value}>
            {i.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Heading fontSize="lg" style={{ padding: 4 }}>
        {t("user_activity:filter_state")}
      </Heading>
      <Checkbox.Group
        value={Array.from(filters.state).map(i => i.toString())}
        onChange={(arr: any[]) => {
          setFilters({ ...filters, state: new Set(arr.map(i => Number(i))) });
        }}>
        {states.map(i => (
          <Checkbox key={i.value} style={{ margin: 4 }} value={i.value.toString()}>
            {i.label}
          </Checkbox>
        ))}
      </Checkbox.Group>
      <Heading fontSize="lg" style={{ padding: 4 }}>
        {t("user_activity:filter_category")}
      </Heading>
      <Checkbox.Group
        value={Array.from(filters.category).map(i=>i.id)}
        onChange={(arr: any[]) => {
          setFilters({ ...filters, category: new Set(arr.map(i=>d.categories.find(c=>c.id === i) as any)) });
        }}>
        {d.categories.map(i => (
          <Checkbox key={i.id} style={{ margin: 4 }} value={i.id}>
            {i.name}
          </Checkbox>
        ))}
      </Checkbox.Group>
      {/* <Heading fontSize="lg" style={{ padding: 4 }}>
        {t("user_activity:filter_state")}
      </Heading>
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
      <Heading fontSize="lg" style={{ padding: 4 }}>
        {t("user_activity:filter_category")}
      </Heading>
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
      ))} */}
    </ScrollView>
  );
}
