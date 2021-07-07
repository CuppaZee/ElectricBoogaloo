import { ClanRequirementInterface } from "@cuppazee/db/lib/requirements";

const requirements: ClanRequirementInterface[] = Object.values({
    1: {
        task_id: 1,
        top: "Days of",
        bottom: "Activity",
        total: "min",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     days: true,
        //     exclude: i => i.state === TypeState.Locationless,
        // },
    },
    2: {
        task_id: 2,
        top: "Total",
        bottom: "Captures",
        // meta: {
        //     activity: ["capture"],
        // },
    },
    3: {
        task_id: 3,
        top: "Total",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        // },
        hidden: ["u89"],
    },
    6: {
        task_id: 6,
        top: "Total",
        bottom: "Deploys",
        // meta: {
        //     activity: ["deploy"],
        //     points: true,
        //     exclude: i => ["personalmunzee", "premiumpersonal"].includes(i.icon),
        // },
    },
    7: {
        task_id: 7,
        top: "Dest.",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.TypeDestination),
        //     exclude: i => i.icon === "skyland",
        // },
    },
    9: {
        task_id: 9,
        top: "Greenie",
        bottom: "Captures",
        // meta: {
        //     activity: ["capture"],
        //     types: i => i.icon === "munzee",
        // },
    },
    10: {
        task_id: 10,
        top: "Deploy",
        bottom: "Points",
        // meta: {
        //     activity: ["deploy"],
        //     points: true,
        //     exclude: i => ["personalmunzee", "premiumpersonal"].includes(i.icon),
        // },
    },
    12: {
        task_id: 12,
        top: "Evo",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.Evolution),
        // },
    },
    13: {
        task_id: 13,
        top: "Places",
        bottom: "Captures",
        // meta: {
        //     activity: ["capture"],
        //     types: i => i.has_tag(TypeTags.TypePOI),
        // },
    },
    14: {
        task_id: 14,
        top: "Jewel",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.TypeJewel),
        // },
    },
    17: {
        task_id: 17,
        top: "Evo",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.Evolution),
        // },
    },
    19: {
        task_id: 19,
        top: "Jewel",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.TypeJewel),
        // },
    },
    20: {
        task_id: 20,
        top: "Weapon",
        bottom: "Deploys",
        // meta: {
        //     activity: ["deploy"],
        //     types: i => i.has_tag(TypeTags.TypeWeaponClan) || i.id === "trojanunicorn",
        // },
    },
    22: {
        task_id: 22,
        top: "Urban Fit",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.icon === "urbanfit",
        // },
    },
    23: {
        task_id: 23,
        top: "Weapon",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.TypeWeaponClan) || i.id === "trojanunicorn",
        // },
    },
    24: {
        task_id: 24,
        top: "Bouncer",
        bottom: "Captures",
        // meta: {
        //     activity: ["capture"],
        //     types: i => i.state === TypeState.Bouncer,
        // },
    },
    25: {
        task_id: 25,
        top: "Mystery",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.TypeMystery),
        // },
    },
    26: {
        task_id: 26,
        top: "Weapon",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.TypeWeaponClan) || i.id === "trojanunicorn",
        // },
    },
    27: {
        task_id: 27,
        top: "Zodiac",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.TypeZodiac),
        // },
    },
    28: {
        task_id: 28,
        top: "Flat",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.TypeFlat),
        // },
    },
    29: {
        task_id: 29,
        top: "Elemental",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i =>
        //         i.has_tag(TypeTags.Evolution) &&
        //         (!i.has_tag(TypeTags.Scatter) ||
        //             ["fire", "waterdroplet", "frozengreenie", "charge"].includes(i.icon)),
        // },
    },
    30: {
        task_id: 30,
        top: "Reseller",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.TypeReseller),
        // },
    },
    31: {
        task_id: 31,
        top: "Gaming",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.TypeGaming),
        // },
    },
    32: {
        task_id: 32,
        top: "Gaming",
        bottom: "Activity",
        // meta: {
        //     activity: ["capture", "deploy"],
        //     types: i => i.has_tag(TypeTags.TypeGaming),
        // },
    },
    33: {
        task_id: 33,
        top: "Renovate",
        bottom: "Destination",
        // meta: {
        //     activity: ["capture"],
        //     types: i => i.icon === "renovation",
        // },
    },
    34: {
        task_id: 34,
        top: "Mystery",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.TypeMystery),
        // },
    },
    35: {
        task_id: 35,
        top: "QRewZee",
        bottom: "Captures",
        // meta: {
        //     activity: ["capture"],
        //     types: i => i.icon === "qrewzee",
        // },
    },
    36: {
        task_id: 36,
        top: "Card",
        bottom: "Points",
        // meta: {
        //     activity: ["capture", "deploy", "capon"],
        //     points: true,
        //     types: i => i.has_tag(TypeTags.Card),
        // },
    },
});

export default requirements;