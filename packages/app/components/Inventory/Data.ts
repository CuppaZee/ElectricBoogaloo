import moment from 'moment';
import 'moment-timezone';
import db, { Type, TypeCategory, TypeHidden } from '@cuppazee/types';
import { UserCredits, UserCreditsHistory } from '@cuppazee/api/user/credits';
import { UserBoostersCredits } from '@cuppazee/api/user/boosters';
import { Dayjs } from 'dayjs';

export type UserInventoryData = {
  credits: UserCredits["response"]["data"];
  boosters: UserBoostersCredits["response"]["data"];
  history: UserCreditsHistory["response"]["data"];
  undeployed: {
    type: string;
    amount: Number;
  }[];
}

export type UserInventoryConvertedType = {
  icon?: string;
  name?: string;
  credit?: number;
  undeployed?: number;
  type?: Type | null;
  amount: number;
}

export type UserInventoryConvertedLog = {
  icon: string;
  title: string;
  description: string;
  time: Dayjs;
  types: UserInventoryConvertedType[];
}

export type UserInventoryConvertedData = {
  types: UserInventoryConvertedType[];
  categories: TypeCategory[];
  history: {}[];
}

export default function InventoryConverter(dataraw: UserInventoryData, mode = "category", includeZeros = "all") {
  var historyBatchTitle = "";
  var historyBatchTime = Infinity;
  var data: UserInventoryConvertedData = {
    history: [],
    types: [],
    categories: [],
  };

  for(const type of db.types.filter(i=>!i.hidden(TypeHidden.Inventory))) {
    data.types.push({
      icon: type.icon,
      name: type.name,
      type: type,
      amount: 0,
    })
  }

  for(const credit in dataraw.credits) {
    const type = db.getType(credit);
    const d = data.types.find(i=>i.type === type);
    if(d) {
      d.credit = Number(dataraw.credits[credit]);
      d.amount += d.credit;
    } else {
      data.types.push({
        icon: credit,
        name: type?.name ?? credit,
        type: type,
        amount: Number(dataraw.credits[credit]),
        credit: Number(dataraw.credits[credit]),
      })
    }
  }

  for(const credit in dataraw.boosters) {
    const type = db.getType(dataraw.boosters[credit].name);
    const d = data.types.find(i=>i.type === type);
    if(d) {
      d.credit = Number(dataraw.boosters[credit].credits);
      d.amount += d.credit;
    } else {
      data.types.push({
        icon: type?.icon,
        name: dataraw.boosters[credit].name,
        type: type,
        amount: Number(dataraw.boosters[credit].credits),
        credit: Number(dataraw.boosters[credit].credits),
      })
    }
  }

  for(const credit in dataraw.undeployed) {
    const type = db.getType(dataraw.undeployed[credit].type);
    const d = data.types.find(i=>i.type === type);
    if(d) {
      d.undeployed = Number(dataraw.undeployed[credit].amount);
      d.amount += d.undeployed;
    } else {
      data.types.push({
        icon: type?.icon || dataraw.undeployed[credit].type,
        name: type?.name || dataraw.undeployed[credit].type,
        type: type,
        amount: Number(dataraw.undeployed[credit].amount),
        undeployed: Number(dataraw.undeployed[credit].amount),
      })
    }
  }

  for(const credit of data.types) {
    const category = credit.type?.category || db.getCategory('others');
    if(!category) console.log(credit, Array.from(db.categories.values()).map(i=>i.id));
    if(category && !data.categories.includes(category)) data.categories.push(category)
  }

  return data;
}