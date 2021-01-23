import {
  PointsInterface,
  TypeHidden,
  TypeID,
  TypeState,
  TypeTags,
} from "../../munzee";

const gaming: {
  name: string;
  icon: string;
  id: TypeID;
  state: TypeState;
  alt_icons?: string[];
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: PointsInterface;
}[] = [
  {
    name: "Surprise",
    icon: "surprise",
    id: 400,
    state: TypeState.Virtual,
  },
  {
    name: "Prize Wheel",
    icon: "prizewheel",
    id: 444,
    state: TypeState.Physical,
  },
  {
    name: "Scatter",
    icon: "scatter",
    id: 500,
    state: TypeState.Physical,
  },
  {
    name: "Rock Paper Scissors",
    icon: "rockpaperscissors",
    id: 522,
    state: TypeState.Physical,
  },
  {
    name: "Bowling Ball",
    icon: "bowlingball",
    id: 1643,
    state: TypeState.Physical,
  },
  {
    name: "Urban Fit",
    icon: "urbanfit",
    id: 1824,
    state: TypeState.Physical,
  },
  {
    name: "Joystick Physical",
    icon: "joystick",
    id: 1976,
    state: TypeState.Physical,
    alt_icons: ["joystickphysical"],
  },
  {
    name: "Joystick Virtual",
    icon: "joystickvirtual",
    id: 2002,
    state: TypeState.Virtual,
  },
  {
    name: "Sir Prize Wheel",
    icon: "sirprizewheel",
    id: 2412,
    state: TypeState.Virtual,
  },
];

export default gaming;