import { Type, Category, TypeHidden, TypeState, CuppaZeeDB } from "@cuppazee/db";
import { UserCredits, UserCreditsHistory } from "@cuppazee/api/user/credits";
import { UserBoostersCredits } from "@cuppazee/api/user/boosters";
import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import {dayjsMHQPlugin} from "./dayjsmhq";
dayjs.extend(utc);
dayjs.extend(dayjsMHQPlugin);

export interface UserInventoryInputData {
  credits: UserCredits["response"]["data"];
  boosters: UserBoostersCredits["response"]["data"];
  history: UserCreditsHistory["response"]["data"];
  undeployed: {
    type: string;
    amount: Number;
  }[];
};

export interface UserInventoryItem {
  icon?: string;
  name?: string;
  credit?: number;
  undeployed?: number;
  type?: Type | null;
  amount: number;
};

export interface UserInventoryHistoryEntry {
  icon?: string;
  title: string | [string, any?];
  description?: string;
  time: Dayjs;
  types: UserInventoryItem[];
};

export interface UserInventoryOptions {
  groupByState?: boolean;
  hideZeroes?: boolean;
}

export interface UserInventoryData {
  groups: ((
    | {
      state: "physical" | "virtual" | "credit";
    }
    | {
      category: Category;
    }
  ) & {
    types?: UserInventoryItem[];
    total?: number;
  })[];
  types: UserInventoryItem[];
  categories: Category[];
  history: UserInventoryHistoryEntry[];
};

export function getCategory(db: CuppaZeeDB, i: UserInventoryItem) {
  const cat = i.type?.category;
  if (i.type?.icon === "destination") return db.getCategory("destination");
  if (i.type?.icon.includes("zodiac")) return db.getCategory("misc");
  if (!cat) return db.getCategory("other");
  if (cat.id === "virtual") return db.getCategory("misc");
  if (cat.id.startsWith("evolution_")) return db.getCategory("evolution");
  return cat;
}

function processLogText(text: string) {
  let title: string | [string, any?] = text;
  let description = undefined;
  let icon = undefined;
  // TODO: Inventory History Icons

  if (text.match(/space\s*coast/i)) {
    title = ["user_inventory:history_space_coast_geo_store"];
  } else if (text.match(/munzee\s*store/i)) {
    title = ["user_inventory:history_freeze_tag_store"];
  } else if (text.match(/pimedus/i)) {
    title = ["user_inventory:history_pimedus"];
  } else if (text.match(/magnetus/i)) {
    title = ["user_inventory:history_magnetus"];
  } else if (text.match(/qrate/i)) {
    title = ["user_inventory:history_qrate"];
  } else if (text.match(/prize\s*wheel/i)) {
    title = ["user_inventory:history_prize_wheel"];
  } else if (text.match(/thank/i) && text.match(/premium/i)) {
    title = ["user_inventory:history_premium"];
  } else if (text.match(/rewards/i) && text.match(/level [0-9]/i)) {
    title = [
      "user_inventory:history_clan",
      {
        level: text.match(/level ([0-9])/i)?.[1],
        month: text.match(/([a-z]+) ([0-9]{2,})/i)?.[1],
        year: text.match(/([a-z]+) ([0-9]{2,})/i)?.[2],
      },
    ];
  } else if (text.match(/rewards/i) && text.match(/zeeops/i)) {
    title = ["user_inventory:history_zeeops"];
  } else if (text.match(/munzee\s*support/i)) {
    title = ["user_inventory:history_support"];
  } else if (text.match(/\btest\b/i)) {
    title = ["user_inventory:history_test"];
  }

  return { icon, title, description: description ?? (title === text ? undefined : text) };
}

export function generateInventoryData(
  db: CuppaZeeDB,
  inputData: UserInventoryInputData,
  options?: UserInventoryOptions
) {
  const data: UserInventoryData = {
    history: [],
    types: [],
    categories: [],
    groups: [],
  };

  for (const type of db.types.filter(i => !i.hidden(TypeHidden.Inventory))) {
    data.types.push({
      icon: type.icon,
      name: type.name,
      type: type,
      amount: 0,
    });
  }

  for (const credit in inputData.credits) {
    const type = db.getType(credit);
    const d = data.types.find(i => i.type !== undefined && i.type !== null && i.type === type);
    if (d) {
      d.credit = Number(inputData.credits[credit]);
      d.amount += d.credit;
    } else {
      data.types.push({
        icon: credit,
        name: type?.name ?? credit,
        type: type,
        amount: Number(inputData.credits[credit]),
        credit: Number(inputData.credits[credit]),
      });
    }
  }

  for (const credit in inputData.boosters) {
    const type = db.getType(inputData.boosters[credit].name);
    const d = data.types.find(i => i.type === type);
    if (d) {
      d.credit = Number(inputData.boosters[credit].credits);
      d.amount += d.credit;
    } else {
      data.types.push({
        icon: type?.icon,
        name: inputData.boosters[credit].name,
        type: type,
        amount: Number(inputData.boosters[credit].credits),
        credit: Number(inputData.boosters[credit].credits),
      });
    }
  }

  for (const credit in inputData.undeployed) {
    const type = db.getType(inputData.undeployed[credit].type);
    const d = type
      ? data.types.find(i => i.type === type)
      : data.types.find(i => i.icon === inputData.undeployed[credit].type);
    if (d) {
      d.undeployed = Number(inputData.undeployed[credit].amount);
      d.amount += d.undeployed;
    } else {
      data.types.push({
        icon: type?.icon || inputData.undeployed[credit].type,
        name: type?.name || inputData.undeployed[credit].type,
        type: type,
        amount: Number(inputData.undeployed[credit].amount),
        undeployed: Number(inputData.undeployed[credit].amount),
      });
    }
  }

  for (const credit of data.types) {
    const category = getCategory(db, credit);
    if (category && !data.categories.includes(category)) data.categories.push(category);
  }

  let latestTime = 0;
  let latestTitle = "";
  for (const log of inputData.history?.items ?? []) {
    const item = {
      name: db.getType(log.type.replace(/^([0-9]+)x? /i, ""))?.name || log.type,
      amount: Number(log.type.match(/^([0-9]+)x? /i)?.[1] ?? "1"),
      original_name: log.type,
      reason: log.log_text,
      icon:
        db.getType(log.type.replace(/^([0-9]+)x? /i, ""))?.icon ??
        log.type.replace(/^([0-9]+)x? /i, ""),
      time: dayjs.mhqParse(log.time_awarded).valueOf(),
    };
    if (
      latestTitle === item.reason &&
      latestTime > item.time - 60000 &&
      latestTime < item.time + 60000
    ) {
      const existingIndex = data.history[data.history.length - 1].types.findIndex(
        i => i.icon === item.icon && i.name === item.name
      );
      if (existingIndex !== -1) {
        data.history[data.history.length - 1].types[existingIndex].amount += item.amount;
      } else {
        data.history[data.history.length - 1].types.push({
          icon: item.icon,
          name: item.name,
          type: db.getType(item.icon),
          amount: item.amount,
        });
      }
    } else {
      latestTitle = item.reason;
      latestTime = item.time;
      const { title, description, icon } = processLogText(item.reason);
      data.history.push({
        title,
        description,
        icon,
        time: dayjs(item.time),
        types: [
          {
            icon: item.icon,
            name: item.name,
            type: db.getType(item.icon),
            amount: item.amount,
          },
        ],
      });
    }
  }

  data.types.sort((a, b) => b.amount - a.amount);

  data.groups = options?.groupByState
    ? [
        {
          state: "physical",
          types: data.types.filter(
            i => i.type?.state === TypeState.Physical && (!options?.hideZeroes || i.amount > 0)
          ),
          total: data.types
            .filter(i => i.type?.state === TypeState.Physical)
            .reduce((a, b) => a + b.amount, 0),
        },
        {
          state: "virtual",
          types: data.types.filter(
            i => i.type?.state === TypeState.Virtual && (!options?.hideZeroes || i.amount > 0)
          ),
          total: data.types
            .filter(i => i.type?.state === TypeState.Virtual)
            .reduce((a, b) => a + b.amount, 0),
        },
        {
          state: "credit",
          types: data.types.filter(
            i =>
              i.type?.state !== TypeState.Physical &&
              i.type?.state !== TypeState.Virtual &&
              (!options?.hideZeroes || i.amount > 0)
          ),
          total: data.types
            .filter(
              i => i.type?.state !== TypeState.Physical && i.type?.state !== TypeState.Virtual
            )
            .reduce((a, b) => a + b.amount, 0),
        },
      ]
    : data.categories
        .map(c => ({
          category: c,
          types: data.types.filter(
            i => getCategory(db, i) === c && (!options?.hideZeroes || i.amount > 0)
          ),
          total: data.types.filter(i => getCategory(db, i) === c).reduce((a, b) => a + b.amount, 0),
        }))
        .filter(i => i.types.length !== 0 && (!options?.hideZeroes || i.total > 0))
        .sort((a, b) => b.total - a.total);

  return data;
}
