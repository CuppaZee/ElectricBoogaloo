import {
  TypePoints,
  TypeHidden,
  TypeQuery,
  TypeMeta,
  TypeState,
  TypeTags,
} from "@cuppazee/db";

const copen: {
  name: string;
  icons: string[];
  id: string;
  munzee_id?: number;
  duration?: number;
  lands_on?: TypeQuery[];
  meta?: TypeMeta;
  state?: TypeState;
  points?: TypePoints;
  tags?: TypeTags[];
  hidden?: TypeHidden[];
}[] = [
  {
    name: "Get Well Card",
    icons: ["getwellcard"],
    id: "getwellcard",
    munzee_id: 2421,
  },
  {
    name: "Birthday Card",
    icons: ["birthdaycard"],
    id: "birthdaycard",
    munzee_id: 2420,
  },
  {
    name: "Thank You Card",
    icons: ["thankyoucard"],
    id: "thankyoucard",
    munzee_id: 2432,
  },
  {
    name: "Howdy Card",
    icons: ["howdycard"],
    id: "howdycard",
    munzee_id: 2450,
  },
  {
    name: "Congrats Card",
    icons: ["congratscard"],
    id: "congratscard",
    munzee_id: 2495,
  },
  {
    name: "Sorry Card",
    icons: ["sorrycard"],
    id: "sorrycard",
    munzee_id: 2496,
  },
  {
    name: "Sorry Card 1",
    icons: ["sorrycard1"],
    id: "sorrycard1",
    munzee_id: 2497,
  },
  {
    name: "Sorry Card 2",
    icons: ["sorrycard2"],
    id: "sorrycard2",
    munzee_id: 2498,
  },
  {
    name: "Sorry Card 3",
    icons: ["sorrycard3"],
    id: "sorrycard3",
    munzee_id: 2499,
  },
  {
    name: "Summer Card",
    icons: ["summer_card"],
    id: "summer_card",
    munzee_id: 2532,
  },
  {
    name: "Winter Card",
    icons: ["winter_card"],
    id: "winter_card",
    munzee_id: 2533,
  },
  {
    name: "Event Card",
    icons: ["eventcard"],
    id: "eventcard",
    munzee_id: 2542,
  },
  {
    name: "Fall Card",
    icons: ["fall_card"],
    id: "fall_card",
    munzee_id: 2602,
  },
  {
    name: "Spring Card",
    icons: ["spring_card"],
    id: "spring_card",
    munzee_id: 2601,
  },
  {
    name: "Tech Issues Card",
    icons: ["techissuescard"],
    id: "techissuescard",
    munzee_id: 2622,
  },
];

export default copen;