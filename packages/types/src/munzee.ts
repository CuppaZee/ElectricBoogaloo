export enum TypeTags {
  // Type Tags
  TypeEvent,
  TypeEventCustom,
  TypeEventStandard,

  TypeWeapon,
  TypeWeaponClan,
  TypeWeaponZeeops,

  TypeZodiac,
  TypeZodiacWestern,
  TypeZodiacChinese,

  TypeMystery,
  TypeMysteryElemental,

  TypeReseller,
  TypeResellerRetired,

  TypePOI,
  TypeDestination,
  TypeGaming,
  TypeJewel,
  TypeFlat,
  TypeTrail,
  TypeTourism,
  TypeSeasonal,
  TypeUnique,
  TypeVirtual,

  TypePersonal,
  TypeSocial,
  TypeUniversal,

  // Bouncer Tags
  BouncerPC,
  BouncerPCS1,
  BouncerPCS2,
  BouncerPCEscaped,
  BouncerPCZombie,
  BouncerPCFunfinity,
  BouncerPCGleaming,
  BouncerPCStageless,
  BouncerPCStage1,
  BouncerPCStage2,
  BouncerPCStage3,
  BouncerMyth,
  BouncerMythOriginal,
  BouncerMythClassical,
  BouncerMythMirror,
  BouncerMythModern,
  BouncerMythAlterna,
  BouncerMythVariant,
  BouncerRetired,
  BouncerFlat,
  BouncerEvolution,
  BouncerTPOB,
  BouncerTPOBBabyAnimal,
  BouncerNomad,
  BouncerSeasonal,
  BouncerSeasonal2021,
  BouncerSeasonal2020,
  BouncerSeasonal2019,
  BouncerSeasonal2018,
  BouncerSeasonal2017,
  BouncerSeasonal2016,
  BouncerSeasonal2015,
  BouncerSeasonalLegacy,
  Bouncer,

  // Bouncer Host Tags
  BouncerHostPC,
  BouncerHostPCEscaped,
  BouncerHostPCZombie,
  BouncerHostPCFunfinity,
  BouncerHostPCGleaming,
  BouncerHostPCStage1,
  BouncerHostPCStage2,
  BouncerHostPCStage3,
  BouncerHostMyth,
  BouncerHostMythOriginal,
  BouncerHostMythClassical,
  BouncerHostMythMirror,
  BouncerHostMythModern,
  BouncerHostMythAlterna,
  BouncerHostMythVariant,
  BouncerHostRetired,
  BouncerHostFlat,
  BouncerHostEvolution,
  BouncerHostTPOB,
  BouncerHostTPOBBabyAnimal,
  BouncerHostSeasonal,
  BouncerHostSeasonal2021,
  BouncerHostSeasonal2020,
  BouncerHostSeasonal2019,
  BouncerHostSeasonal2018,
  BouncerHostSeasonal2017,
  BouncerHostSeasonalLegacy,
  BouncerHost,

  // Card Tags
  Card,
  CardOpen,
  Card2020,

  // Evolution
  Evolution,
  EvolutionFarm,
  EvolutionEducation,
  EvolutionNature,
  EvolutionReseller,
  EvolutionGeneric,

  // Virtual Colours
  VirtualColourPink,
  VirtualColourLouPink,
  VirtualColourGreen,
  VirtualColourRed,
  VirtualColourBlue,
  VirtualColourBlack,
  VirtualColourBrown,

  // Scatter Tags
  Scatter,
  ScatterStandalone,

  // Other Tags
  Credit,
  Other,

  // Function Tags
  FunctionSwap,
  FunctionBlast,
}

export type TypeID = string | number | ((type: Type) => boolean);

export enum TypeHidden {
  All,
  Inventory,
  Bouncers,
  Capture,
  Deploy,
  IconApp,
  IconServer,
}

export enum DestinationType {
  Rooms,
  Room,
  Bouncer,
}

export interface TypeMeta {
  capture_radius?: number;

  evolution_stage?: number;
  evolution_base?: string;

  destination_type?: DestinationType;
  destination_size?: number;
  destination_star_level?: number;
  destination_room_of?: number;
  destination_temporary?: boolean;

  bouncer_duration?: number;
  bouncer_lands_on?: TypeID[];
  bouncer_base?: string;

  host_types?: TypeID[];

  scatter_duration?: number;
  scatter_lands_on?: TypeID[];

  scatterer_types?: TypeID[];
  scatterer_min?: number;
  scatterer_max?: number;
  scatterer_radius?: number;
}

export enum PointsType {
  Split,
}

export enum TypeState {
  Physical,
  Virtual,
  Bouncer,
  Locationless,
}

export interface PointsInterface {
  deploy?: number;
  capture?: number;
  capon?: number;
  type?: PointsType;
  split?: number;
  min?: number;
  interval?: number;
}

export class Points {
  deploy?: number;
  capture?: number;
  capon?: number;
  type?: PointsType;
  split?: number;
  min?: number;
  interval?: number;

  constructor(points: PointsInterface) {
    this.deploy = points.deploy;
    this.capture = points.capture;
    this.capon = points.capon;
    this.type = points.type;
    this.split = points.split;
    this.min = points.min;
    this.interval = points.interval;
  }
}

export interface TypeInterface {
  // Munzee Name
  name: string;
  // Munzee Icon
  icon: string;
  // Munzee ID
  id: TypeID;
  // Alternative Icons
  alt_icons: string[];
  // State - `physical`/`virtual`/`bouncer`/`locationless`
  state: TypeState;
  // Category ID
  category: string;
  // Points Data
  points?: PointsInterface;
  // Type Tags
  tags: TypeTags[];
  // Type Hidden
  hidden?: TypeHidden[];
  // Type Meta
  meta?: TypeMeta;
}

export interface TypeCategoryInterface {
  name: string;
  id: string;
  icon: string;
  parents: string[];
  seasonal?: {
    year: number;
    start?: number;
    end?: number;
  };
}

export class TypeCategory {
  private i: TypeCategoryInterface;
  private d: TypeDatabase;

  constructor(category: TypeCategoryInterface, database: TypeDatabase) {
    this.i = category;
    this.d = database;
  }

  get name() {
    return this.i.name;
  }

  get id() {
    return this.i.id;
  }

  get icon() {
    return this.i.icon;
  }

  get iconURL() {
    return `https://server.cuppazee.app/icons/64/${this.i.name}.png`;
  }

  get iconURL128() {
    return `https://server.cuppazee.app/icons/128/${this.i.name}.png`;
  }

  get iconReactNative() {
    return { uri: `https://server.cuppazee.app/icons/64/${this.i.name}.png` };
  }

  get parents() {
    return this.i.parents.map((i) => this.d.getCategory(i));
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
}

export class TypeDatabase {
  private _types: Map<string, Type>;
  private _icons: Map<string, string>;
  private _categories: Map<string, TypeCategory>;

  constructor(types: TypeInterface[], categories: TypeCategoryInterface[]) {
    this._types = new Map();
    this._icons = new Map();
    for (const type_data of types) {
      const type = new Type(type_data, this);
      const stripped_icon = this.strip(type.icon);
      this._types.set(stripped_icon, type);
      this._icons.set(stripped_icon, stripped_icon);
      for (const icon of type.alt_icons) {
        this._icons.set(this.strip(icon), stripped_icon);
      }
    }
    this._categories = new Map();
    for (const category_data of categories) {
      const category = new TypeCategory(category_data, this);
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

  getChildren(category: TypeCategory) {
    return Array.from(this._categories.values()).find((i) =>
      i.parents.includes(category)
    );
  }

  getChildTypes(category: TypeCategory) {
    return Array.from(this._types.values()).filter(
      (i) => i.category === category
    );
  }

  strip(icon: string) {
    if (icon.startsWith("https://munzee.global")) icon = icon.slice(49, -4);
    var x = decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g, "");
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

export class Type {
  private i: TypeInterface;
  private d: TypeDatabase;

  constructor(munzee: TypeInterface, database: TypeDatabase) {
    this.i = munzee;
    this.d = database;
  }

  get name() {
    return this.i.name;
  }

  get icon() {
    return this.i.icon;
  }

  get iconURL() {
    return `https://server.cuppazee.app/pins/64/${this.d.strip(
      this.i.icon
    )}.png`;
  }

  get iconURL128() {
    return `https://server.cuppazee.app/pins/128/${this.d.strip(
      this.i.icon
    )}.png`;
  }

  get iconReactNative() {
    return {
      uri: `https://server.cuppazee.app/pins/64/${this.d.strip(
        this.i.icon
      )}.png`,
    };
  }

  get id() {
    return this.i.id;
  }

  get alt_icons() {
    return this.i.alt_icons;
  }

  get state() {
    return this.i.state;
  }

  get category() {
    return this.d.getCategory(this.i.category);
  }

  get category_raw() {
    return this.i.category;
  }

  get points() {
    return this.i.points ? new Points(this.i.points) : undefined;
  }

  get tags() {
    return this.i.tags;
  }

  get meta() {
    return this.i.meta ?? {};
  }

  hidden(tag?: TypeHidden) {
    if (tag === TypeHidden.IconApp || tag === TypeHidden.IconServer) {
      return this.i.hidden?.includes(tag);
    } else if (tag) {
      return (
        (tag ? this.i.hidden?.includes(tag) : false) ||
        this.i.hidden?.includes(TypeHidden.All)
      );
    } else {
      return this.i.hidden?.includes(TypeHidden.All);
    }
  }

  has_tag(...tags: TypeTags[]) {
    return !tags.some((i) => !this.i.tags.includes(i));
  }

  has_tags(...tags: TypeTags[]) {
    return !tags.some((i) => !this.i.tags.includes(i));
  }
}
