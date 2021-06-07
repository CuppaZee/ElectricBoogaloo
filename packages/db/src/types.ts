import { CuppaZeeDB } from ".";

export enum TypeState {
  Physical = 0x01,
  Virtual = 0x02,
  Bouncer = 0x03,
  Locationless = 0x04,
}

export enum TypePointsType {
  Split = 0x01,
}

export interface TypePoints {
  deploy?: number;
  capture?: number;
  capon?: number;
  type?: TypePointsType;
  split?: number;
  min?: number;
  interval?: number;
}

export enum TypeHidden {
  All = 0x01,
  Inventory = 0x02,
  Bouncers = 0x03,
  Capture = 0x04,
  Deploy = 0x05,
}

export enum TypeTags {
  // Type Tags
  TypeEvent = 0x00,
  TypeEventCustom = 0x01,
  TypeEventStandard = 0x02,

  TypeWeapon = 0x03,
  TypeWeaponClan = 0x04,
  TypeWeaponZeeops = 0x05,

  TypeZodiac = 0x06,
  TypeZodiacWestern = 0x07,
  TypeZodiacChinese = 0x08,
  TypeZodiacEgyptian = 0x09,

  TypeMystery = 0x0a,
  TypeMysteryElemental = 0x0b,

  TypeReseller = 0x0c,
  TypeResellerRetired = 0x0d,

  TypePOI = 0x0e,
  TypeDestination = 0x0f,
  TypeGaming = 0x10,
  TypeJewel = 0x11,
  TypeFlat = 0x12,
  TypeTrail = 0x13,
  TypeTourism = 0x14,
  TypeSeasonal = 0x15,
  TypeUnique = 0x16,
  TypeVirtual = 0x17,

  TypePersonal = 0x18,
  TypeSocial = 0x19,
  TypeUniversal = 0x1a,

  // Bouncer Tags
  BouncerPC = 0x1b,
  BouncerPCS1 = 0x1c,
  BouncerPCS2 = 0x1d,
  BouncerPCEscaped = 0x1e,
  BouncerPCZombie = 0x1f,
  BouncerPCFunfinity = 0x20,
  BouncerPCGleaming = 0x21,
  BouncerPCStageless = 0x22,
  BouncerPCStage1 = 0x23,
  BouncerPCStage2 = 0x24,
  BouncerPCStage3 = 0x25,
  BouncerMyth = 0x26,
  BouncerMythOriginal = 0x27,
  BouncerMythClassical = 0x28,
  BouncerMythMirror = 0x29,
  BouncerMythModern = 0x2a,
  BouncerMythAlterna = 0x2b,
  BouncerMythVariant = 0x2c,
  BouncerRetired = 0x2d,
  BouncerFlat = 0x2e,
  BouncerFlatPhantom = 0x2f,
  BouncerEvolution = 0x30,
  BouncerTPOB = 0x31,
  BouncerTPOBBabyAnimal = 0x32,
  BouncerNomad = 0x33,
  BouncerSeasonal = 0x34,
  BouncerSeasonal2021 = 0x35,
  BouncerSeasonal2020 = 0x36,
  BouncerSeasonal2019 = 0x37,
  BouncerSeasonal2018 = 0x38,
  BouncerSeasonal2017 = 0x39,
  BouncerSeasonal2016 = 0x3a,
  BouncerSeasonal2015 = 0x3b,
  BouncerSeasonalLegacy = 0x3c,
  Bouncer = 0x3d,

  // Bouncer Host Tags
  BouncerHostPC = 0x3e,
  BouncerHostPCEscaped = 0x3f,
  BouncerHostPCZombie = 0x40,
  BouncerHostPCFunfinity = 0x41,
  BouncerHostPCGleaming = 0x42,
  BouncerHostPCStage1 = 0x43,
  BouncerHostPCStage2 = 0x44,
  BouncerHostPCStage3 = 0x45,
  BouncerHostMyth = 0x46,
  BouncerHostMythOriginal = 0x47,
  BouncerHostMythClassical = 0x48,
  BouncerHostMythMirror = 0x49,
  BouncerHostMythModern = 0x4a,
  BouncerHostMythAlterna = 0x4b,
  BouncerHostMythVariant = 0x4c,
  BouncerHostRetired = 0x4d,
  BouncerHostFlat = 0x4e,
  BouncerHostEvolution = 0x4f,
  BouncerHostTPOB = 0x50,
  BouncerHostTPOBBabyAnimal = 0x51,
  BouncerHostSeasonal = 0x52,
  BouncerHostSeasonal2021 = 0x53,
  BouncerHostSeasonal2020 = 0x54,
  BouncerHostSeasonal2019 = 0x55,
  BouncerHostSeasonal2018 = 0x56,
  BouncerHostSeasonal2017 = 0x57,
  BouncerHostSeasonalLegacy = 0x58,
  BouncerHost = 0x59,

  // Card Tags
  Card = 0x5a,
  CardOpen = 0x5b,
  Card2020 = 0x5c,
  Card2020HCCC = 0x5d,
  Card2021 = 0x5e,
  Card2021VCCC = 0x5f,

  // Evolution
  Evolution = 0x60,
  EvolutionFarm = 0x61,
  EvolutionEducation = 0x62,
  EvolutionNature = 0x63,
  EvolutionReseller = 0x64,
  EvolutionGeneric = 0x65,

  // Virtual Colours
  VirtualColourPink = 0x66,
  VirtualColourLouPink = 0x67,
  VirtualColourGreen = 0x68,
  VirtualColourRed = 0x69,
  VirtualColourBlue = 0x6a,
  VirtualColourBlack = 0x6b,
  VirtualColourBrown = 0x6c,

  // Scatter Tags
  Scatter = 0x6d,
  ScatterStandalone = 0x6e,

  // Destination Tags
  DestinationRooms = 0x73,
  DestinationRoom = 0x74,
  DestinationBouncer = 0x75,
  DestinationTemporary = 0x76,

  // Other Tags
  Credit = 0x6f,
  Other = 0x70,

  // Function Tags
  FunctionSwap = 0x71,
  FunctionBlast = 0x72,
}
// Latest: DestinationTemporary = 0x76

export type TypeQuery = string | number | ((type: Type) => boolean);

export interface TypeMeta {
  capture_radius?: number;

  evolution_stage?: number;
  evolution_base?: string;

  destination_size?: number;
  destination_star_level?: number;
  destination_room_of?: string | number;
  destination_temporary?: boolean;

  bouncer_duration?: number;
  bouncer_lands_on?: TypeQuery[];
  bouncer_base?: string;

  host_types?: TypeQuery[];

  scatter_duration?: number;
  scatter_lands_on?: TypeQuery[];

  scatterer_types?: TypeQuery[];
  scatterer_min?: number;
  scatterer_max?: number;
  scatterer_radius?: number;
}

export interface TypePoints {
  deploy?: number;
  capture?: number;
  capon?: number;
  type?: TypePointsType;
  split?: number;
  min?: number;
  interval?: number;
}

export interface TypeInterface {
  // Munzee Name
  name: string;
  // Munzee Icons
  icons: string[];
  // CuppaZee ID
  id: string;
  // Munzee ID
  munzee_id?: number;
  // State - `physical`/`virtual`/`bouncer`/`locationless`
  state: TypeState;
  // Category ID
  category: string;
  // Points Data
  points?: TypePoints;
  // Type Tags
  tags: TypeTags[];
  // Type Hidden
  hidden?: TypeHidden[];
  // Type Meta
  meta?: TypeMeta;
}
export class Type {
  private i: TypeInterface;
  private d: CuppaZeeDB;

  constructor(munzee: TypeInterface, database: CuppaZeeDB) {
    this.i = munzee;
    this.d = database;
  }

  get name() {
    return this.i.name;
  }

  get icon() {
    return this.i.icons[0];
  }

  get icons() {
    return this.i.icons;
  }

  get strippedIcon() {
    return this.d.strip(this.icon);
  }

  get strippedIcons() {
    return this.icons.map(i => this.d.strip(i));
  }

  get id() {
    return this.i.id;
  }

  get munzee_id() {
    return this.i.munzee_id;
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
    return this.i.points;
  }

  get tags() {
    return this.i.tags;
  }

  get meta() {
    return this.i.meta ?? {};
  }

  hidden(tag?: TypeHidden) {
    return (tag ? this.i.hidden?.includes(tag) : false) || this.i.hidden?.includes(TypeHidden.All);
  }

  has_tag(...tags: TypeTags[]) {
    return !tags.some(i => !this.i.tags.includes(i));
  }

  has_tags(...tags: TypeTags[]) {
    return !tags.some(i => !this.i.tags.includes(i));
  }
}
