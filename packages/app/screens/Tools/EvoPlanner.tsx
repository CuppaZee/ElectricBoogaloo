import { Datepicker, Layout, Text } from "@ui-kitten/components";
import * as React from "react";
import { ScrollView, View } from "react-native";
import useTitle from "../../hooks/useTitle";
import TypeImage from "../../components/Common/TypeImage";
import { useNavigation } from "@react-navigation/native";
import Select from "../../components/Common/Select";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import getDateService from "../../components/Common/getDateService";


const options = [
  {
    id: "farm",
    name: "3 Stages (eg. Farm, Education)",
    stages: [
      {
        days: 0,
        icon: "calf",
      },
      {
        days: 30,
        icon: "cow",
      },
      {
        days: 60,
        icon: "milk",
      },
    ],
  },
  {
    id: "flower",
    name: "5 Stages (eg. Carnation, Rose)",
    stages: [
      {
        days: 0,
        icon: "carnationseed",
      },
      {
        days: 7,
        icon: "carnationgermination",
      },
      {
        days: 21,
        icon: "carnationgrowth",
      },
      {
        days: 42,
        icon: "carnationbud",
      },
      {
        days: 70,
        icon: "redcarnationblossom",
      },
    ],
  },
  {
    id: "butterfly",
    name: "5 Stages (eg. Butterfly, Turtle)",
    stages: [
      {
        days: 0,
        icon: "turtleegg",
      },
      {
        days: 4,
        icon: "turtlehatchling",
      },
      {
        days: 18,
        icon: "juvenileturtle",
      },
      {
        days: 28,
        icon: "adultturtle",
      },
      {
        days: 28,
        icon: "seaturtle",
      },
    ],
  },
  {
    id: "bee",
    name: "5 Stages (eg. Bee)",
    stages: [
      {
        days: 0,
        icon: "beeeggs",
      },
      {
        days: 3,
        icon: "beelarvae",
      },
      {
        days: 9,
        icon: "beepupae",
      },
      {
        days: 21,
        icon: "emptyhoneycomb",
      },
      {
        days: 21,
        icon: "wallabee",
      },
    ],
  },
];

export default function SearchScreen() {
  const { t } = useTranslation();
  useTitle(`☕ ${t("pages:tools_evo_planner")}`);
  const [date, setDate] = React.useState(Date.now());
  const [level, setLevel] = React.useState(0);
  const [type, setType] = React.useState("farm");
  const nav = useNavigation();

  return (
    <Layout style={{ padding: 4, flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ width: 400, alignSelf: "center", maxWidth: "100%", padding: 4 }}>
          <Select
            label={t("evo_planner:type")}
            style={{ margin: 4 }}
            value={type}
            onValueChange={t => {
              setType(t);
              setLevel(0);
            }}
            options={options.map(i => ({
              value: i.id,
              label: t(`evo_planner:type_${i.id}` as any),
            }))}
          />
          <Select
            label={t("evo_planner:stage")}
            style={{ margin: 4 }}
            value={level.toString()}
            onValueChange={t => setLevel(Number(t))}
            options={
              options
                .find(i => i.id === type)
                ?.stages.map((_, index) => ({
                  value: index.toString(),
                  label: index
                    ? t("evo_planner:stage_evolve", { stage: index + 1 })
                    : t("evo_planner:stage_deploy"),
                })) ?? []
            }
          />
          <Datepicker
            style={{ margin: 4 }}
            date={new Date(date)}
            onSelect={d => setDate(d.valueOf())}
            dateService={getDateService()}
          />
          {options
            .find(i => i.id === type)
            ?.stages.map((i, index) => (
              <View style={{ padding: 4 }}>
                <Layout
                  level="3"
                  style={{
                    borderRadius: 8,
                    padding: 4,
                    flexDirection: "row",
                    alignItems: "center",
                  }}>
                  <TypeImage style={{ size: 48, marginRight: 8 }} icon={i.icon} />
                  <View>
                    <Text category="h6">
                      {dayjs(date)
                        .subtract(
                          options.find(i => i.id === type)?.stages?.[level]?.days || 0,
                          "days"
                        )
                        .add(i.days, "days")
                        .format("L")}
                    </Text>
                    <Text category="s1">
                      {index
                        ? t("evo_planner:description_stage", { stage: index + 1 })
                        : t("evo_planner:description_deploy")}
                    </Text>
                  </View>
                </Layout>
              </View>
            ))}
          {/* {!search && (
            <Tip
              wrapperStyle={{ margin: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}
              tip="As well as searching for Players and Clans, you can also look up Munzee Types here to find out more about them!"
              id="search_munzee_types"
            />
          )} */}
        </View>
      </ScrollView>
    </Layout>
  );
}
