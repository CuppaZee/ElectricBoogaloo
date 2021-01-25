import color from "color";
import dark from "@eva-design/eva/themes/dark.json";
import light_base from "@eva-design/eva/themes/light.json";
const light = {
  ...light_base, //"#FFFFFF"
  "color-basic-100": "#F7F9FC",
  "color-basic-200": "#EDF1F7",
  "color-basic-300": "#E4E9F2",
  "color-basic-400": "#C5CEE0",
  "color-basic-500": "#8F9BB3",
  "color-basic-600": "#2E3A59",
  "color-basic-700": "#222B45",
  "color-basic-800": "#1A2138",
  "color-basic-900": "#151A30",
  "color-basic-1000": "#101426",
};

type Theme = typeof dark & { style: "light" | "dark" };

export const white_light: Theme = { ...light, style: "light" };

export const green_light: Theme = generateLightTheme(
  light,
  (c) => {
    let x = color(c);
    return x
      .hue((x.hue() || 220) - 80)
      .saturationv((x.saturationv() + 5) * 2.5);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).value(0);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).darken(0.8);
  },
  "light"
);

export const blue_light: Theme = generateLightTheme(
  light,
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 20).saturationv((x.saturationv() + 15) * 2);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 20);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 20).value(0);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 20).darken(0.8);
  },
  "light"
);

export const teal_light: Theme = generateLightTheme(
  light,
  (c) => {
    let x = color(c);
    return x
      .hue((x.hue() || 220) - 45)
      .saturationv((x.saturationv() + 5) * 2.5);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 45);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 45).value(0);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 45).darken(0.8);
  },
  "light"
);

export const purple_light: Theme = generateLightTheme(
  light,
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) + 50).saturationv((x.saturationv() + 5) * 2);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) + 50);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) + 50).value(0);
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) + 50).darken(0.8);
  },
  "light"
);

// export const purple_light: Theme = generateLightTheme(
//   light,
//   c => {
//     let x = color(c);
//     return  x.hue((x.hue() || 220) + 65).saturationv((x.saturationv() + 5) * 2);
//   },
//   c => {
//     let x = color(c);
//     return  x.hue((x.hue() || 220) + 65);
//   },
//   c => {
//     let x = color(c);
//     return x.hue((x.hue() || 220) + 65).value(0);
//   },
//   c => {
//     let x = color(c);
//     return x.hue((x.hue() || 220) + 65).darken(0.8);
//   },
//   "light"
// )

export const gray_light: Theme = generateLightTheme(
  light,
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) + 25).saturationv(0); //.value((x.value() * 2.5) - 160)
  },
  (c) => {
    let x = color(c);
    return x.hue((x.hue() || 220) + 25).saturationv(0); //.value((x.value() * 2.5) - 160)
  },
  (c) => {
    let x = color(c);
    return x
      .hue((x.hue() || 220) + 25)
      .saturationv(0)
      .value(0);
  },
  (c) => {
    let x = color(c);
    return x
      .hue((x.hue() || 220) + 25)
      .saturationv(0)
      .darken(0.8);
  },
  "light"
);

export const blue_dark: Theme = { ...dark, style: "dark" };

export const green_dark: Theme = generateTheme(
  dark,
  (c) => color(c).rotate(-70),
  (c) => color(c).rotate(-70).saturationv(90),
  "dark"
);

export const purple_dark: Theme = generateTheme(
  dark,
  (c) => color(c).rotate(70),
  (c) => color(c).rotate(70).saturationv(100).lighten(0.3),
  "dark"
);

export const gray_dark: Theme = generateTheme(
  dark,
  (c) => color(c).rotate(70).saturationv(0),
  (c) => color(c).rotate(70).saturationv(0).darken(0.5),
  "dark"
);

export const teal_dark: Theme = generateTheme(
  dark,
  (c) => color(c).rotate(-35).lighten(0.5),
  (c) => color(c).rotate(-35).lighten(0.5).saturationv(100),
  "dark"
);

function generateTheme(
  base: Record<string, string>,
  a: (c: string, l: string) => color,
  b: (c: string, l: string) => color,
  style: "dark" | "light"
): Theme {
  return {
    ...Object.fromEntries(
      Object.entries(base).map((i) => {
        if (
          i[0].match(/^color-basic-[1-6]00$/) ||
          i[0].match(/^color-basic-transparent-[1-6]00$/)
        ) {
          return [i[0], a(i[1], i[0]).rgb().string()];
        } else if (
          i[0].match(/^color-basic-[7-9]00$/) ||
          i[0].match(/^color-basic-1[0-1]00$/) ||
          i[0].match(/^color-primary-[0-9]+$/) ||
          i[0].match(/^color-primary-transparent-[0-9]+$/)
        ) {
          return [i[0], b(i[1], i[0]).rgb().string()];
        }
        return i;
      })
    ),
    style,
  } as Theme;
}

function generateLightTheme(
  base: Record<string, string>,
  a: (c: string, l: string) => color,
  b: (c: string, l: string) => color,
  c: (c: string, l: string) => color,
  d: (c: string, l: string) => color,
  style: "dark" | "light"
): Theme {
  return {
    ...Object.fromEntries(
      Object.entries(base).map((i) => {
        if (i[0].match(/^color-basic-[1-6]00$/)) {
          return [i[0], a(i[1], i[0]).rgb().string()];
        } else if (
          i[0].match(/^color-basic-[7-9]00$/) ||
          i[0].match(/^color-basic-1[0-1]00$/)
        ) {
          return [i[0], b(i[1], i[0]).rgb().string()];
        } else if (i[0].match(/^color-basic-transparent-[1-6]00$/)) {
          return [i[0], c(i[1], i[0]).rgb().string()];
        } else if (
          i[0].match(/^color-primary-[0-9]+$/) ||
          i[0].match(/^color-primary-transparent-[0-9]+$/)
        ) {
          return [i[0], d(i[1], i[0]).rgb().string()];
        }
        return i;
      })
    ),
    style,
  } as Theme;
}
