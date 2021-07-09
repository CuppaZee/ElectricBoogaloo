import {
  TypePoints,
  TypeHidden,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const gaming: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  state: TypeState;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
  points?: TypePoints;
}[] = [
  {
    name: "Surprise",
    icons: ["surprise"],
    id: "surprise",
    munzee_id: 400,
    state: TypeState.Virtual,
  },
  {
    name: "Prize Wheel",
    icons: ["prizewheel"],
    id: "prizewheel",
    munzee_id: 444,
    state: TypeState.Physical,
  },
  {
    name: "Scatter",
    icons: ["scatter"],
    id: "scatter",
    munzee_id: 500,
    state: TypeState.Physical,
  },
  {
    name: "Rock Paper Scissors",
    icons: ["rockpaperscissors"],
    id: "rockpaperscissors",
    munzee_id: 522,
    state: TypeState.Physical,
  },
  {
    name: "Bowling Ball",
    icons: ["bowlingball"],
    id: "bowlingball",
    munzee_id: 1643,
    state: TypeState.Physical,
  },
  {
    name: "Urban Fit",
    icons: ["urbanfit"],
    id: "urbanfit",
    munzee_id: 1824,
    state: TypeState.Physical,
  },
  {
    name: "Joystick Physical",
    icons: ["joystick", "joystickphysical"],
    id: "joystick",
    munzee_id: 1976,
    state: TypeState.Physical,
  },
  {
    name: "Joystick Virtual",
    icons: ["joystickvirtual"],
    id: "joystickvirtual",
    munzee_id: 2002,
    state: TypeState.Virtual,
  },
  {
    name: "Sir Prize Wheel",
    icons: ["sirprizewheel"],
    id: "sirprizewheel",
    munzee_id: 2412,
    state: TypeState.Virtual,
  },
];

export default gaming;