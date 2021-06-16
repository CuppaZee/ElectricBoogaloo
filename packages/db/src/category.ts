import { CuppaZeeDB } from ".";

export enum CategoryAccessoryType {
  Button = 0x01,
}

export interface CategoryButton {
  type: CategoryAccessoryType.Button;
  label: string;
  translation_key?: string;
  link: string;
  color: string;
}

export type CategoryAccessory = CategoryButton;

export interface CategoryInterface {
  name: string;
  id: string;
  icon: string;
  parents: string[];
  seasonal?: {
    year: number;
    start?: number;
    end?: number;
  };
  accessories?: CategoryAccessory[];
}

export class Category {
  private i: CategoryInterface;
  private d: CuppaZeeDB;

  constructor(category: CategoryInterface, database: CuppaZeeDB) {
    this.i = category;
    this.d = database;
  }

  get name() {
    return this.i.name;
  }

  get id() {
    return this.i.id;
  }

  get munzee_id() {
    return this.i.id;
  }

  get icon() {
    return this.i.icon;
  }

  get accessories() {
    return this.i.accessories;
  }

  get parents() {
    return this.i.parents.map(i => this.d.getCategory(i));
  }

  get ancestors() {
    function flatten(arr: Category[][]) {
      return ([] as Category[]).concat.apply([], arr);
    }
    function getAncestors(c?: Category): Category[] {
      return c ? flatten([[c], ...(c.parents.map(getAncestors) ?? [])]) : [];
    }
    return Array.from(new Set(getAncestors(this)));
  }

  get seasonal() {
    return this.i.seasonal;
  }

  get types() {
    return this.d.getChildTypes(this);
  }

  get children() {
    return this.d.getChildren(this);
  }

  get active() {
    return (
      !this.i.seasonal ||
      ((this.seasonal?.start || 0) < Date.now() && (this.seasonal?.end || 0) > Date.now())
    );
  }
}
