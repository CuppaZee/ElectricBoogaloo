export interface Endpoint {
    label: string;
    endpoint: string;
}

export const Endpoints = {
    MunzeeSpecials: {
        label: "Nomads, Scatters, Special Bouncers",
        endpoint: "/munzee/specials",
    },
    MunzeeSpecialsMythological: {
        label: "Mythological Bouncers",
        endpoint: "/munzee/specials/mythological",
    },
    MunzeeSpecialsPouchcreatures: {
        label: "Pouch Creature Bouncers",
        endpoint: "/munzee/specials/pouchcreatures",
    },
    MunzeeSpecialsFlat: {
        label: "Fancy Flat Bouncers",
        endpoint: "/munzee/specials/flat",
    },
    MunzeeSpecialsRetired: {
        label: "Retired Bouncers",
        endpoint: "/munzee/specials/retired",
    },
    MunzeeSpecialsBouncers: {
        label: "tPOB Bouncers",
        endpoint: "/munzee/specials/bouncers",
    }
}

export const EndpointsDown = new Set<Endpoint>();