import {
  DestinationType,
  PointsInterface,
  PointsType,
  TypeHidden,
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const destinations: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  type: DestinationType;
  size?: number;
  star_level?: number;
  room_of?: number;
  temporary?: boolean;

  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: PointsInterface;
}[] = [
  {
    name: "1 Star Motel",
    icon: "1starmotel",
    id: 70,
    star_level: 1,
    type: DestinationType.Rooms,
    size: 5,
    state: TypeState.Physical,
  },
  {
    name: "1 Star Motel Room",
    icon: "1starmotelroom",
    id: 71,
    star_level: 1,
    room_of: 70,
    type: DestinationType.Room,
    state: TypeState.Physical,
  },
  {
    name: "Hotel",
    icon: "hotel",
    id: 170,
    type: DestinationType.Rooms,
    size: 10,
    state: TypeState.Physical,
  },
  {
    name: "Hotel Room",
    icon: "hotelroom",
    id: 171,
    room_of: 170,
    type: DestinationType.Room,
    state: TypeState.Physical,
  },
  {
    name: "Virtual Resort",
    icon: "virtual_resort",
    id: 470,
    type: DestinationType.Rooms,
    size: 15,
    state: TypeState.Virtual,
  },
  {
    name: "Virtual Resort Room",
    icon: "virtual_resort_room",
    id: 471,
    room_of: 470,
    type: DestinationType.Room,
    state: TypeState.Virtual,
  },
  {
    name: "Time Share",
    icon: "timeshare",
    id: 970,
    temporary: true,
    size: 5,
    type: DestinationType.Rooms,
    state: TypeState.Physical,
  },
  {
    name: "Time Share Room",
    icon: "timeshareroom",
    id: 971,
    room_of: 970,
    temporary: true,
    type: DestinationType.Room,
    state: TypeState.Physical,
  },
  {
    name: "Treehouse",
    icon: "treehouse",
    id: 2145,
    type: DestinationType.Bouncer,
    size: 6,
    state: TypeState.Physical,
  },
  {
    name: "Vacation Condo",
    icon: "vacationcondo",
    id: 2183,
    temporary: true,
    type: DestinationType.Rooms,
    size: 5,
    state: TypeState.Virtual,
  },
  {
    name: "Vacation Condo Room",
    icon: "vacationcondoroom",
    id: 2184,
    room_of: 2183,
    temporary: true,
    type: DestinationType.Room,
    state: TypeState.Virtual,
  },
  {
    name: "2 Star Motel",
    icon: "2starmotel",
    id: 2356,
    star_level: 2,
    type: DestinationType.Rooms,
    size: 10,
    state: TypeState.Physical,
  },
  {
    name: "2 Star Motel Room",
    icon: "2starmotelroom",
    id: 2357,
    room_of: 2356,
    star_level: 2,
    type: DestinationType.Room,
    state: TypeState.Physical,
  },
  {
    name: "3 Star Motel",
    icon: "3starmotel",
    id: 2358,
    star_level: 3,
    type: DestinationType.Rooms,
    size: 15,
    state: TypeState.Physical,
  },
  {
    name: "3 Star Motel Room",
    icon: "3starmotelroom",
    id: 2359,
    room_of: 2358,
    star_level: 3,
    type: DestinationType.Room,
    state: TypeState.Physical,
  },
  {
    name: "Skyland",
    icon: "skyland",
    id: 2426,
    type: DestinationType.Bouncer,
    size: 6,
    state: TypeState.Virtual,
  },
];

export default destinations;
