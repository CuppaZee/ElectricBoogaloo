import { Type, TypeHidden, TypeInterface, TypeState, TypeTags } from "./types";
import { Category, CategoryInterface } from "./category";
import { decode } from "@msgpack/msgpack";
// @ts-expect-error
import lzwCompress from "lzwcompress";

export type EventInterface =
  | [string, string, number]
  | [string, number | null]
  | [string, string]
  | string;

export * from "./category";
export * from "./types";

export class CuppaZeeDB {
  private _types: Map<string, Type>;
  private _icons: Map<string, string>;
  private _categories: Map<string, Category>;

  constructor(types: TypeInterface[], events: EventInterface[], categories: CategoryInterface[]) {
    let lastId = 0;
    for (const index in events) {
      const event = events[index];
      let name, icon, id;
      if (typeof event === "string") {
        name = event;
        icon = event.toLowerCase().replace(/\s/g, "");
        id = lastId + 1;
      } else {
        name = event[0];
        icon =
          event.slice(1).find(i => typeof i === "string")?.toString() ?? event[0].toLowerCase().replace(/\s/g, "");
        id = Number(event.find(i => typeof i === "number") ?? lastId + 1);
      }
      types.push({
        name,
        icons: [icon],
        id: icon,
        munzee_id: id,
        category: "event",
        state: TypeState.Physical,
        tags: [TypeTags.TypeEvent, TypeTags.TypeEventCustom],
        hidden: [TypeHidden.Inventory],
      });
      lastId = id;
    }
    this._types = new Map();
    this._icons = new Map();
    for (const type_data of types) {
      const type = new Type(type_data, this);
      const main_icon = type.strippedIcon;
      this._types.set(main_icon, type);
      for (const icon of type.strippedIcons) {
        this._icons.set(icon, main_icon);
      }
    }
    this._categories = new Map();
    for (const category_data of categories) {
      const category = new Category(category_data, this);
      this._categories.set(category.id, category);
    }
  }

  getCategory(id: string) {
    return this._categories.get(id);
  }

  getType(id: string) {
    const icon = this._icons.get(this.strip(id));
    return icon ? this._types.get(icon) : null;
  }

  getChildren(category: Category) {
    return Array.from(this._categories.values()).filter(i => i.parents.includes(category));
  }

  getChildTypes(category: Category) {
    return Array.from(this._types.values()).filter(i => i.category === category);
  }

  strip(icon: string) {
    if (icon.startsWith("https://munzee.global")) icon = icon.slice(49, -4);
    var x = decodeURIComponent(icon)
      .replace(/[^a-zA-Z0-9]/g, "")
      .toLowerCase();
    if (x !== "munzee" && x.endsWith("munzee")) return x.replace(/munzee$/, "");
    return x;
  }

  get types() {
    return Array.from(this._types.values());
  }

  get categories() {
    return Array.from(this._categories.values());
  }
}

export interface Data {
  types: TypeInterface[];
  events: EventInterface[];
  categories: CategoryInterface[];
  version: number;
}

export function loadFromCache(cache: Data) {
  return new CuppaZeeDB(cache.types, cache.events, cache.categories);
}

export function loadFromArrayBuffer(buffer: ArrayBufferLike) {
  const data: Data = lzwCompress.unpack(JSON.stringify(decode(buffer)));
  return {
    db: new CuppaZeeDB(data.types, data.events, data.categories),
    cache: data,
  };
}

export function loadFromLzwJson(lzwJson: string) {
  const data: Data = lzwCompress.unpack(lzwJson);
  return {
    db: new CuppaZeeDB(data.types, data.events, data.categories),
    cache: data,
  };
}