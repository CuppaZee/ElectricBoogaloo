// import moment from 'moment';
// import 'moment-timezone';
import db, { Type, TypeCategory, TypeHidden } from "@cuppazee/types";
import { UserCredits, UserCreditsHistory } from "@cuppazee/api/user/credits";
import { UserBoostersCredits } from "@cuppazee/api/user/boosters";
import dayjs, { Dayjs } from "dayjs";

export type UserInventoryData = {
  credits: UserCredits["response"]["data"];
  boosters: UserBoostersCredits["response"]["data"];
  history: UserCreditsHistory["response"]["data"];
  undeployed: {
    type: string;
    amount: Number;
  }[];
};

export type UserInventoryConvertedType = {
  icon?: string;
  name?: string;
  credit?: number;
  undeployed?: number;
  type?: Type | null;
  amount: number;
};

export type UserInventoryConvertedLog = {
  icon?: string;
  title: string;
  description?: string;
  time: Dayjs;
  types: UserInventoryConvertedType[];
};

export type UserInventoryConvertedData = {
  types: UserInventoryConvertedType[];
  categories: TypeCategory[];
  history: UserInventoryConvertedLog[];
};

function processLogText(text: string) {
  let title = text;
  let description = undefined;
  let icon = undefined;
  // TODO: Inventory History Icons

  if (text.match(/space\s*coast/i)) {
    title = "Space Coast Geo Store";
  } else if (text.match(/munzee\s*store/i)) {
    title = "Freeze Tag Store";
  } else if (text.match(/pimedus/i)) {
    title = "Pimedus Reward";
  } else if (text.match(/magnetus/i)) {
    title = "Magnetus Reward";
  } else if (text.match(/prize\s*wheel/i)) {
    title = "Prize Wheel Reward";
  } else if (text.match(/thanks/i) && text.match(/premium/i)) {
    title = "Premium Reward";
  } else if (text.match(/rewards/i) && text.match(/level [0-9]/i)) {
    title = `${text.match(/level [0-9]/i)?.[0]} - ${text.match(/[a-z]+ [0-9]{2,}/i)?.[0]}`;
  } else if (text.match(/rewards/i) && text.match(/zeeops/i)) {
    title = "ZeeOps Rewards";
  } else if (text.match(/munzee\s*support/i)) {
    title = "Munzee Support";
  } else if (text.match(/\btest\b/i)) {
    title = "Test";
  }

  return { icon, title, description: description ?? (title === text ? undefined : text) };
}

export default function InventoryConverter(
  dataraw: UserInventoryData,
  mode = "category",
  includeZeros = "all"
) {
  var historyBatchTitle = "";
  var historyBatchTime = Infinity;
  var data: UserInventoryConvertedData = {
    history: [],
    types: [],
    categories: [],
  };

  for (const type of db.types.filter(i => !i.hidden(TypeHidden.Inventory))) {
    data.types.push({
      icon: type.icon,
      name: type.name,
      type: type,
      amount: 0,
    });
  }

  for (const credit in dataraw.credits) {
    const type = db.getType(credit);
    const d = data.types.find(i => i.type === type);
    if (d) {
      d.credit = Number(dataraw.credits[credit]);
      d.amount += d.credit;
    } else {
      data.types.push({
        icon: credit,
        name: type?.name ?? credit,
        type: type,
        amount: Number(dataraw.credits[credit]),
        credit: Number(dataraw.credits[credit]),
      });
    }
  }

  for (const credit in dataraw.boosters) {
    const type = db.getType(dataraw.boosters[credit].name);
    const d = data.types.find(i => i.type === type);
    if (d) {
      d.credit = Number(dataraw.boosters[credit].credits);
      d.amount += d.credit;
    } else {
      data.types.push({
        icon: type?.icon,
        name: dataraw.boosters[credit].name,
        type: type,
        amount: Number(dataraw.boosters[credit].credits),
        credit: Number(dataraw.boosters[credit].credits),
      });
    }
  }

  for (const credit in dataraw.undeployed) {
    const type = db.getType(dataraw.undeployed[credit].type);
    const d = data.types.find(i => i.type === type);
    if (d) {
      d.undeployed = Number(dataraw.undeployed[credit].amount);
      d.amount += d.undeployed;
    } else {
      data.types.push({
        icon: type?.icon || dataraw.undeployed[credit].type,
        name: type?.name || dataraw.undeployed[credit].type,
        type: type,
        amount: Number(dataraw.undeployed[credit].amount),
        undeployed: Number(dataraw.undeployed[credit].amount),
      });
    }
  }

  for (const credit of data.types) {
    const category = credit.type?.category || db.getCategory("others");
    if (category && !data.categories.includes(category)) data.categories.push(category);
  }

  let latestTime = 0;
  let latestTitle = "";
  for (const log of dataraw.history?.items ?? []) {
    const item = {
      name: db.getType(log.type.replace(/^([0-9]+)x? /i, ""))?.name || log.type,
      original_name: log.type,
      reason: log.log_text,
      icon: db.getType(log.type.replace(/^([0-9]+)x? /i, ""))?.icon ?? "missing",
      time: dayjs.tz(log.time_awarded, "America/Chicago").valueOf(),
    };
    console.log(latestTime, item.time);
    if (
      latestTitle === item.reason &&
      latestTime > item.time - 60000 &&
      latestTime < item.time + 60000
    ) {
      const existingIndex = data.history[data.history.length - 1].types.findIndex(
        i => i.icon === item.icon && i.name === item.name
      );
      if (existingIndex !== -1) {
        data.history[data.history.length - 1].types[existingIndex].amount++;
      } else {
        data.history[data.history.length - 1].types.push({
          icon: item.icon,
          name: item.name,
          type: db.getType(item.icon),
          amount: 1,
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
            amount: 1,
          },
        ],
      });
    }
  }

  return data;
}
