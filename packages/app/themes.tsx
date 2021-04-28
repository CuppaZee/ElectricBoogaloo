import color from "color";
import dark from "@eva-design/eva/themes/dark.json";
import light_base from "@eva-design/eva/themes/light.json";

const lighter = {
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
const light = {
  ...light_base, //"#FFFFFF"
  "color-basic-500": "#F7F9FC",
  "color-basic-400": "#EDF1F7",
  "color-basic-300": "#E4E9F2",
  "color-basic-200": "#C5CEE0",
  "color-basic-100": "#8F9BB3",
  "color-basic-600": "#2E3A59",
  "color-basic-700": "#222B45",
  "color-basic-800": "#1A2138",
  "color-basic-900": "#151A30",
  "color-basic-1000": "#101426",
};

type Theme = typeof dark & { style: "light" | "dark"; mapboxURL: string };

const base_light: Theme = generateLightTheme(
  lighter,
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).saturationv((x.saturationv() + 5) * 2.5);
  },
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80);
  },
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).value(0);
  },
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).darken(0.8);
  },
  "light",
  "mapbox://styles/mapbox/streets-v11"
);

const base_lighter: Theme = generateLightTheme(
  lighter,
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).saturationv((x.saturationv() + 5) * 2.5);
  },
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80);
  },
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).value(0);
  },
  c => {
    let x = color(c);
    return x.hue((x.hue() || 220) - 80).darken(0.8);
  },
  "light",
  "mapbox://styles/mapbox/streets-v11"
);

export const green_light: Theme = generateTheme2("#BFF7CE", 0);

export const blue_light: Theme = generateTheme2("#99DEF7", 0);

export const teal_light: Theme = generateTheme2("#BFF7EF", 0);

export const purple_light: Theme = generateTheme2("#DECAF7", 0);

export const gray_light: Theme = generateTheme2("#F7F7F7", 0);



// export const green_light: Theme = generateTheme2("#BFF7CE", 1);

// export const blue_light: Theme = generateTheme2("#99DEF7", 1);

// // export const teal_lighter: Theme = generateTheme2("#BFF7EF", false);
// export const teal_light: Theme = generateTheme2("#6EE4F5", 1);

// // export const purple_lighter: Theme = generateTheme2("#DECAF7", false);
// export const purple_light: Theme = generateTheme2("#CF65DE", 1);

// export const gray_light: Theme = generateTheme2("#F7F7F7", 1);

export const green_dark: Theme = generateTheme2("#053021", 2);

export const blue_dark: Theme = generateTheme2("#151A30", 2);

export const teal_dark: Theme = generateTheme2("#003748", 2);

export const purple_dark: Theme = generateTheme2("#3D003E", 2);

export const gray_dark: Theme = generateTheme2("#181818", 2);

// export const green_dark: Theme = generateTheme(
//   dark,
//   c => color(c).rotate(-70),
//   c => color(c).rotate(-70).saturationv(90),
//   "dark",
//   "mapbox://styles/sohcah/ckmhpjzea357h17mka0tjl024"
// );

// export const blue_dark: Theme = {
//   ...dark,
//   style: "dark",
//   mapboxURL: "mapbox://styles/sohcah/ckmhpks8s90c317qlb7gmutgt",
// };

// export const teal_dark: Theme = generateTheme(
//   dark,
//   c => color(c).rotate(-35).lighten(0.5),
//   c => color(c).rotate(-35).lighten(0.5).saturationv(100),
//   "dark",
//   "mapbox://styles/sohcah/ckmhp35zs0jhp17ph3qmcjw9b"
// );

// export const purple_dark: Theme = generateTheme(
//   dark,
//   c => color(c).rotate(70),
//   c => color(c).rotate(70).saturationv(100).lighten(0.3),
//   "dark",
//   "mapbox://styles/sohcah/ckmhphnje2wie17mfzfjgryk5"
// );

// export const gray_dark: Theme = generateTheme(
//   dark,
//   c => color(c).rotate(70).saturationv(0),
//   c => color(c).rotate(70).saturationv(0).darken(0.5),
//   "dark",
//   "mapbox://styles/sohcah/ckmhpiun60jzp18qv0wa0icyz"
// );

function generateTheme(
  base: Record<string, string>,
  a: (c: string, l: string) => color,
  b: (c: string, l: string) => color,
  style: "dark" | "light",
  mapboxURL: string
): Theme {
  return {
    ...Object.fromEntries(
      Object.entries(base).map(i => {
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
    mapboxURL,
  } as Theme;
}

function generateLightTheme(
  base: Record<string, string>,
  a: (c: string, l: string) => color,
  b: (c: string, l: string) => color,
  c: (c: string, l: string) => color,
  d: (c: string, l: string) => color,
  style: "dark" | "light",
  mapboxURL: string
): Theme {
  return {
    ...Object.fromEntries(
      Object.entries(base).map(i => {
        if (i[0].match(/^color-basic-[1-6]00$/)) {
          return [i[0], a(i[1], i[0]).rgb().string()];
        } else if (i[0].match(/^color-basic-[7-9]00$/) || i[0].match(/^color-basic-1[0-1]00$/)) {
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
    mapboxURL,
  } as Theme;
}

function shift(from: string, to: string, colour: string) {
  const hue = color(to).hue() - color(from).hue();
  const saturationv = color(to).saturationv() / color(from).saturationv();
  const value = color(to).value() / color(from).value();
  const c = color(colour);
  return (
    c
      .hue(color(from).hue() && color(to).hue() ? c.hue() + hue : c.hue())
      .saturationv(c.saturationv() * saturationv)
      .value(c.value() * value)
      // .saturationv(color(to).saturationv())
      // .value(color(to).value())
      .alpha(color(to).alpha())
      .string()
  );
}

function generateTheme2(transformColour: string, themeStyle: 0 | 1 | 2, mapboxURL?: string) {
  const base = [base_lighter, base_light, dark][themeStyle] as Record<string, string>;
  const baseBasicColour = base[themeStyle === 2 ? "color-basic-1000" : "color-basic-100"];
  const basePrimaryColour = base[themeStyle === 2 ? "color-primary-1000" : "color-basic-100"];
  return {
    ...(Object.fromEntries(
      Object.entries(base).map(i => {
        if (i[0].match(/^color-(primary)(-transparent)?-[0-9]+$/)) {
          const mc = shift(basePrimaryColour, i[1], transformColour);
          return [i[0], mc];
        }
        if (i[0].match(/^color-(basic)(-transparent)?-[0-9]+$/)) {
          const mc = shift(baseBasicColour, i[1], transformColour);
          return [i[0], mc];
        }
        return i;
      })
    ) as any),
    style: themeStyle === 2 ? "dark" : "light",
    styleNum: themeStyle.toString(),
    mapboxURL: mapboxURL ?? "mapbox://styles/mapbox/streets-v11",
  };
}

export function generate(colour: string) {
  return generateTheme2(colour.startsWith("$") ? colour.slice(1) : colour, colour.startsWith("$") ? 2 : 0);
}
