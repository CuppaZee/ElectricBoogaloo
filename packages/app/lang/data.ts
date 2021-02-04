export type TranslationFormat = {
  "404": {
    "title": string;
    "subtitle": string;
    "home": string;
  },
  "pages": {
    "dashboard_dashboard": string;
    "user_profile": string;
    "user_activity": string;
    "user_inventory": string;
    "user_zeeops": string;
    "user_clan_progress": string;
    "user_bouncers": string;
    "user_blast_checker": string;
    "user_qrew_checker": string;
    "user_universal_capper": string;
    "user_challenges": string;
    "clan_requirements": string;
    "tools_bouncers": string;
    "tools_munzee_types": string;
    "tools_calendar": string;
    "tools_evo_planner": string;
    "tools_search": string;
    "settings_personalisation": string;
    "settings_notifications": string;
    "settings_accounts": string;
    "settings_bookmarks": string;
    "tools_credits": string;
    "tools_open_source": string;
  },
  "user_activity": {
    "overview_points": string;
    "overview_captures": string;
    "overview_deploys": string;
    "overview_capons": string;
    "filter_save": string;
    "filter_types": string;
    "filter_state": string;
    "filter_category": string;
    "activity_capture": string;
    "activity_deploy": string;
    "activity_capon": string;
    "owned_by_user": string;
    "owned_by_self": string;
    "none": string;
  },
  "user_inventory": {
    "amount_undeployed": string;
    "amount_credits": string;
    "history": string;
  },
  "user_zeeops": {
    "collected": string;
  },
  "clan": {
    "requirements": string;
    "clan_requirements": string;
    "loading": string;
    "individual": string;
    "group": string;
    "level": string;
    "individual_level": string;
    "group_level": string;
    "group_total": string;
  },
  "maps": {
    "location_fail": string;
  },
  "settings_common": {
    "save": string;
    "saved": string;
  },
  "settings_accounts": {
    "reauthenticate": string;
    "logout": string;
    "add_account": string;
  },
  "settings_notifications": {
    "error_web": string;
    "error_permissions": string;
    "bouncers_title": string;
    "bouncers_enabled": string;
    "bouncers_distance_default": string;
    "bouncers_distance_starred": string;
    "bouncers_override_distance": string;
    "bouncers_override_search": string;
    "bouncers_override_search_hint": string;
    "bouncers_override_add": string;
    "starred_users_title": string;
    "starred_users_search": string;
    "starred_users_add": string;
    "locations_title": string;
    "locations_live_title": string;
    "locations_live_disabled": string;
    "locations_static_name": string;
    "locations_static_done": string;
    "locations_static_add": string;
    "other_title": string;
    "other_news_munzee": string;
    "other_units_title": string;
    "other_units_metric": string;
    "other_units_imperial": string;
  },
  "bouncers": {
    "uncategorised": string;
  },
  "calendar": {
    "dates": string;
    "qrewzees_on": string;
    "qrewzees_off": string;
    "egyptian_status": string;
    "western_status": string;
    "chinese_status": string;
  },
  "open_source": {
    "title": string;
    "description": string;
    "source_code": string;
    "packages": string;
    "packages_types": string;
    "packages_icons": string;
    "packages_api": string;
    "license": string;
  },
  "user_bouncers": {
    "host": string;
    "location": string;
    "captures": string;
    "never": string;
    "rest_a": string;
    "rest_b": string;
    "rest_c": string;
  },
  "welcome": {
    "facebook_title": string;
    "facebook_description": string;
    "messenger_title": string;
    "messenger_ios_description": string;
    "title": string;
    "theme": string;
    "language": string;
    "accounts": string;
    "add_account": string;
    "add_extra_account": string;
    "continue": string;
  }
};
  export const langs = {
    "en-GB": {"404":{"title":"Coffee Not Found","subtitle":"Looks like there is no coffee here.","home":"Return Home"},"pages":{"dashboard_dashboard":"Dashboard","user_profile":"Profile","user_activity":"Activity","user_inventory":"Inventory","user_zeeops":"ZeeOps","user_clan_progress":"Clan Progress","user_bouncers":"Bouncers","user_blast_checker":"Blast Checker","user_qrew_checker":"QRew Checker","user_universal_capper":"Universal Capper","user_challenges":"Challenges","clan_requirements":"Clan Requirements","tools_bouncers":"Bouncers","tools_munzee_types":"Munzee Types","tools_calendar":"Calendar","tools_evo_planner":"Evo Planner","tools_search":"Search","settings_personalisation":"Personalisation","settings_notifications":"Notifications","settings_accounts":"Accounts","settings_bookmarks":"Bookmarks","tools_credits":"Credits","tools_open_source":"Open Source"},"user_activity":{"overview_points":"{{count}} Total Point","overview_points_plural":"{{count}} Total Points","overview_captures":"{{count}} Capture","overview_captures_plural":"{{count}} Captures","overview_deploys":"{{count}} Deploy","overview_deploys_plural":"{{count}} Deploys","overview_capons":"{{count}} Capon","overview_capons_plural":"{{count}} Capons","filter_save":"Save Filters","filter_types":"Types","filter_state":"State","filter_category":"Category","activity_capture":"You captured","activity_deploy":"You deployed","activity_capon":"{{user}} captured","owned_by_user":"by {{user}}","owned_by_self":"by you","none":"None"},"user_inventory":{"amount_undeployed":"{{count}} Undeployed","amount_undeployed_plural":"{{count}} Undeployed","amount_credits":"{{count}} Credit","amount_credits_plural":"{{count}} Credits","history":"History"},"user_zeeops":{"collected":"Collected!"},"clan":{"requirements":"Requirements","clan_requirements":"Clan Requirements","loading":"Loading","individual":"Individual","group":"Group","level":"Level {{level}}","individual_level":"Indiv L{{level}}","group_level":"Group L{{level}}","group_total":"Group Total"},"maps":{"location_fail":"Failed retrieving location"},"settings_common":{"save":"Save","saved":"Settings Saved"},"settings_accounts":{"reauthenticate":"Reauthenticate","logout":"Logout","add_account":"Add Account"},"settings_notifications":{"error_web":"Notifications aren't supported on Web","error_permissions":"Requesting permissions failed. Did you allow notifications?","bouncers_title":"Bouncers","bouncers_enabled":"Enabled","bouncers_distance_default":"Default Distance ({{unit}})","bouncers_distance_starred":"Starred User Distance ({{unit}})","bouncers_override_distance":"Distance ({{unit}})","bouncers_override_search":"Search","bouncers_override_search_hint":"You can search for Categories or individual Types","bouncers_override_add":"Add Category/Type","starred_users_title":"Starred Users","starred_users_search":"Search","starred_users_add":"Add User","locations_title":"Locations","locations_live_title":"Live Location","locations_live_disabled":"Disabled","locations_static_name":"Location Name","locations_static_done":"Done","locations_static_add":"Add Static Location","other_title":"Other","other_news_munzee":"Munzee Blog","other_units_title":"Units","other_units_metric":"Metric Units (km/m)","other_units_imperial":"Imperial Units (mi/ft)"},"bouncers":{"uncategorised":"Uncategorised"},"calendar":{"dates":"SMTWTFS","qrewzees_on":"QRewZees: On","qrewzees_off":"QRewZees: Off","egyptian_status":"Egyptian: {{type}}","western_status":"Western: {{type}}","chinese_status":"Chinese: {{types}}"},"open_source":{"title":"CuppaZee Open Source","description":"The source code for the CuppaZee App is available on GitHub","source_code":"Source Code","packages":"CuppaZee publishes 3 packages on NPM","packages_types":"@cuppazee/types - A Database of Most Munzee Types","packages_icons":"@cuppazee/icons - A Database of Most Munzee Type Icons","packages_api":"@cuppazee/api - TypeScript Definitions for the Munzee API","license":"{{license}} License"},"user_bouncers":{"host":"At {{name}} by {{creator}}","location":"{{town}}, {{country}} [{{times}}]","captures":"{{number}} Captured - Last Captured {{date}}","never":"Never","rest_a":"Having a Rest","rest_b":"Catching a Flight","rest_c":"Waiting at the Bus Stop"},"welcome":{"facebook_title":"CuppaZee isn't supported in the Facebook Browser","facebook_description":"You can press the <1 /> Menu icon in the top right corner and press \"Open in Browser\" button to view CuppaZee in a supported browser.","messenger_title":"CuppaZee isn't supported in the Messenger Browser","messenger_ios_description":"You can press the <1 /> Menu icon in the bottom right corner and press \"Open in Safari\" button to view CuppaZee in a supported browser.","title":"Welcome","theme":"Pick a Theme","language":"Select your Language","accounts":"Add Accounts","add_account":"Add Account","add_extra_account":"Add Another Account","continue":"Continue to Dashboard"}},
    "test": {"404":{"title":"🦍🙈🦈🦆🐯🐼 🦉🐳🐶 🦨🐯🐃🦒🦥","subtitle":"🐎🙉🦇🦓🦚 🐯🐡🦐🦟 🦘🐧🐩🦀🐁 🐹🐺 🦡🦇 🐞🦂🦗🐣🐭🐀 🦮🐻🐭🐖.","home":"🐝🐃🐥🐂🐜🐘 🦚🦆🐄🐋"},"pages":{"dashboard_dashboard":"🐐🐝🦧🐕🦘🐼🦮🐝🦐","user_profile":"🦌🦮🐍🦞🦝🐛🐺","user_activity":"🐏🦜🐅🦕🐾🐣🦒🐛","user_inventory":"🐈🦖🐌🐑🦅🦜🐉🐞🦂","user_zeeops":"🦕🐬🙈🐝🐜🐬","user_clan_progress":"🦐🐅🦦🐑 🙊🐢🐂🦀🐴🐱🦓🦮","user_bouncers":"🕊️🦃🦢🐩🦓🦈🦄🦗","user_blast_checker":"🐷🙊🦆🐶🦟 🐄🦗🦧🐸🦏🦩🐩","user_qrew_checker":"🦖🐔🐊🐰 🐿️🐢🐀🐎🦨🐠🦖","user_universal_capper":"🦘🦍🐀🦙🐎🦁🐳🦎🐂 🐋🐷🦎🦮🐕‍🦺🐍","user_challenges":"🐂🐺🐄🐃🦡🐓🐥🐷🐨🙈","clan_requirements":"🦑🦦🦊🦐 🦞🐲🙉🙉🐬🦢🦑🦏🦐🐼🦉🦗","tools_bouncers":"🦏🦩🐕🐭🐕‍🦺🐌🦒🐮","tools_munzee_types":"🦌🐸🐱🙈🐮🐪 🦐🐒🐏🦚🐵","tools_calendar":"🐅🐕‍🦺🐋🦅🦜🦅🦈🐬","tools_evo_planner":"🐣🦑🐩 🐍🐆🦍🦞🐵🐔🐢","tools_search":"🐭🐇🐎🦒🦕🐣","settings_personalisation":"🐜🐒🦟🐽🐒🐛🦑🐹🦕🦛🐁🦎🐼🦗🐲","settings_notifications":"🦆🐅🦢🦮🐄🦘🐿️🐃🦞🐬🦔🐳🐨","settings_accounts":"🐥🐡🕷️🦚🙈🐌🦚🐒","settings_bookmarks":"🐏🦇🐜🐆🦍🐵🐺🐆🐃","tools_credits":"🐤🙊🐄🦂🐼🦐🦛","tools_open_source":"🦑🦎🐱🐬 🐆🦃🐓🐲🐑🐳"},"user_activity":{"overview_points":"{{count}} 🐙🐶🐿️🦚🐱 🐞🐣🐥🐵🦓","overview_points_plural":"{{count}} 🦢🐿️🦔🦡🦡 🐁🐎🐝🐄🐾🙊","overview_captures":"{{count}} 🦞🦂🐒🐗🐱🐒🦗","overview_captures_plural":"{{count}} 🐶🐪🦛🐍🦘🐱🦚🐭","overview_deploys":"{{count}} 🦝🐱🦡🙈🦊🦍","overview_deploys_plural":"{{count}} 🦁🦍🦕🐓🦛🐆🐰","overview_capons":"{{count}} 🐗🐄🐨🦡🐳","overview_capons_plural":"{{count}} 🐷🙊🦋🐵🦃🐵","filter_save":"🐭🦕🐔🐑 🦑🦟🐰🐥🦏🐒🐁","filter_types":"🙈🦧🐊🐇🐹","filter_state":"🐬🐔🦁🐉🦗","filter_category":"🐋🐠🐁🦧🐱🦇🦧🙈","activity_capture":"🦙🦩🐊 🦊🦔🐲🐊🐗🦁🐹🦐","activity_deploy":"🐩🐍🦡 🦌🦑🐿️🦋🐠🦡🦢🐵","activity_capon":"{{user}} 🐟🦧🦖🦛🦛🐴🦊🦆","owned_by_user":"🐼🐈 {{user}}","owned_by_self":"🐨🐸 🦜🦔🕷️","none":"🦗🦑🦈🦧"},"user_inventory":{"amount_undeployed":"{{count}} 🦙🐀🦂🐿️🐔🦃🦟🐝🐷🦙","amount_undeployed_plural":"{{count}} 🐦🐫🐲🐭🐄🐵🐫🐴🐩🐏","amount_credits":"{{count}} 🦏🐁🐛🦝🐙🐓","amount_credits_plural":"{{count}} 🦙🐐🦔🦒🐣🦍🐱","history":"🦈🐦🦄🐪🐹🦑🦅"},"user_zeeops":{"collected":"🦚🐘🦋🦧🦦🦉🐕🐄🐏!"},"clan":{"requirements":"🐸🐑🐁🦜🐀🐁🦘🦕🐗🐯🦐🐡","clan_requirements":"🦈🐮🐃🐷 🐩🦘🐷🦇🐏🐲🐫🐎🐫🐤🐴🐊","loading":"🦕🐋🐉🦊🐣🦕🦅","individual":"🐾🐦🐲🐽🦌🐖🦎🦏🐑🦦","group":"🦌🦕🦓🐳🐎","level":"🦚🐎🐘🦛🐶 {{level}}","individual_level":"🐎🦓🐭🐬🦢 🐅{{level}}","group_level":"🐤🦚🦒🐗🦙 🦉{{level}}","group_total":"🦖🦒🦦🐮🐨 🐖🐫🐣🦏🐣"},"maps":{"location_fail":"🕊️🐮🦒🦈🐹🐻 🕷️🐀🦋🐥🐐🐃🦝🦦🐶🐰 🐢🐌🦙🐋🐢🦉🦔🦨"},"settings_common":{"save":"🦌🐑🐦🦎","saved":"🦓🦧🐼🐝🦆🐃🐤🦎 🦀🐲🐛🐾🐭"},"settings_accounts":{"reauthenticate":"🦒🦀🐎🦌🐿️🐤🐞🦍🐋🦞🐁🐊🐕🐽","logout":"🦇🦢🐱🐭🐕‍🦺🦉","add_account":"🦌🦓🐻 🐒🦏🐅🐶🦦🐮🦧"},"settings_notifications":{"error_web":"🐕🐆🐿️🐱🦎🐡🐌🐕‍🦺🐕‍🦺🐰🐉🐕🐷 🐐🐁🐎🐴'🦈 🐑🐕‍🦺🐍🐬🦏🦝🐿️🐊🐜 🐈🐠 🐇🐏🐋","error_permissions":"🐵🦈🙈🦌🐳🐹🐏🙉🐲🙊 🦇🦖🐷🐉🦓🐰🦀🐏🦀🐎🦩 🐓🦌🦟🐭🐭🐲. 🦮🦀🦒 🐩🐕‍🦺🐟 🦦🦉🦞🐶🦧 🐰🐦🦆🦝🐕🐕🦚🐼🐺🦕🐐🐜🐆?","bouncers_title":"🐕‍🦺🐜🐄🦙🦚🐨🐶🐬","bouncers_enabled":"🦟🐔🐨🐈🐕‍🦺🐴🐂","bouncers_distance_default":"🐓🐅🦉🐿️🦎🦂🐣 🦚🙈🐡🦮🐺🦮🐰🐛 ({{unit}})","bouncers_distance_starred":"🐔🐁🐓🐭🕷️🐒🦩 🦥🐺🦟🐑 🦋🐓🐙🦕🐀🦎🦟🦃 ({{unit}})","bouncers_override_distance":"🐩🐡🦌🐙🐕‍🦺🐾🐝🐢 ({{unit}})","bouncers_override_search":"🐖🦟🐼🐊🦮🕊️","bouncers_override_search_hint":"🐭🐴🦚 🐂🦝🐆 🐼🐭🐀🐳🦉🕷️ 🦉🦨🐷 🐩🦄🐭🐲🦌🐾🦟🐽🐶🦜 🐫🐵 🐯🦚🦜🐘🐍🐫🐲🐻🐝🐴 🦞🐙🐽🐆🦙","bouncers_override_add":"🐾🦓🐬 🐹🦑🐺🦉🐪🦎🐹🦖/🦉🐣🐉🦡","starred_users_title":"🐋🦟🐒🦄🐩🕷️🙉 🐵🐐🦛🦜🐥","starred_users_search":"🐆🐡🐊🐸🐾🐟","starred_users_add":"🦓🦆🦛 🐛🐰🐁🐬","locations_title":"🐈🐥🐐🦀🦨🦔🐕‍🦺🐁🐏","locations_live_title":"🦦🐸🐳🦦 🦦🦟🐩🐫🦝🐠🐕🐯","locations_live_disabled":"🐂🦒🐜🦃🦈🐭🐁🦂","locations_static_name":"🐦🐎🦕🦁🐥🐼🐎🦋 🦍🐒🦜🕷️","locations_static_done":"🦓🦃🐗🐶","locations_static_add":"🦕🐱🦚 🐹🦄🐕🐷🐣🐒 🦥🦘🐞🦋🦮🐮🐴🐄","other_title":"🐾🦇🦌🦀🐇","other_news_munzee":"🐥🦁🐼🐀🦧🦅 🦦🦮🦘🦀","other_units_title":"🐛🦍🐸🦂🐪","other_units_metric":"🐙🐗🐃🦮🐄🦆 🦂🦢🐡🦘🐅 (🐊🐶/🐎)","other_units_imperial":"🐳🐍🦖🦞🦮🦔🐏🦜 🦞🦐🐾🐜🐥 (🐔🐑/🐦🦌)"},"bouncers":{"uncategorised":"🐅🐁🐎🦘🐳🦁🐠🐥🐺🐠🐱🦘🐩"},"calendar":{"dates":"🐇🦮🐣🦖🦑🐺🐎","qrewzees_on":"🐾🐪🦡🐎🐘🦏🦐🐣: 🐨🦐","qrewzees_off":"🐿️🦙🐮🐡🦓🐍🐽🕷️: 🦙🦝🐍","egyptian_status":"🦏🐘🐺🐡🦡🐩🐽🦄: {{type}}","western_status":"🐽🐝🦁🐒🦋🐽🦖: {{type}}","chinese_status":"🐐🦌🦖🐟🐙🐾🐒: {{types}}"},"open_source":{"title":"🐼🐗🐅🐷🐒🐗🐥🐡 🦚🐠🐅🐧 🦝🦒🐱🦞🐝🦝","description":"🐀🐥🐜 🐻🐱🕷️🦉🐡🐾 🐰🐦🕊️🐵 🐢🐇🦝 🦋🐱🙈 🐳🐙🦞🦎🐷🐁🦥🐝 🐱🐫🐐 🐺🦚 🦀🐣🦒🦇🦃🐈🦩🐍🦄 🦑🐾 🐁🐂🐡🐏🐆🐁","source_code":"🐩🦄🐁🦘🐇🦦 🦈🐾🐲🐠","packages":"🐩🐓🦘🐬🦑🐋🐳🐔 🦖🙊🐃🦨🐼🐬🐋🐐🐉 3 🦈🐈🐨🐓🐪🐷🐨🐈 🦉🐝 🐱🙈🦥","packages_types":"@🐿️🐼🦃🦈🐈🐣🐉🦘/🐇🦞🐙🐔🐄 - 🦧 🦒🐏🦗🐶🐣🐼🐙🐧 🐻🐳 🦘🐇🦉🦀 🦄🦌🐸🐜🐌🦆 🐉🦥🐶🦧🐦","packages_icons":"@🦁🦀🕊️🦟🦘🐏🐞🐇/🦌🐌🦞🐪🐯 - 🦒 🐼🦩🦦🦒🦏🐌🐳🐠 🦃🦨 🐕🐧🐜🐒 🐉🦧🐶🕊️🐐🐅 🦊🦖🐝🐑 🐳🦔🦄🦍🐆","packages_api":"@🦂🦇🦩🐩🦦🦩🐜🐹/🐺🦊🐿️ - 🦇🐱🐞🐜🦂🐕🐅🦝🐸🐩 🐇🐂🐿️🦆🐯🦥🐰🦋🐸🐽🦎 🦉🐀🐲 🐯🐖🐭 🦍🦗🐮🦮🦈🦁 🐆🐾🐩","license":"{{license}} 🦞🐉🐫🐧🦙🦝🐴"},"user_bouncers":{"host":"🦕🐪 {{name}} 🐁🐘 {{creator}}","location":"{{town}}, {{country}} [{{times}}]","captures":"{{number}} 🦍🦩🦥🐾🐣🦑🦦🦚 - 🐟🐣🦥🐗 🐅🐄🐝🐝🦝🦇🐻🐁 {{date}}","never":"🦥🐨🐶🦝🕊️","rest_a":"🐨🐃🐼🐊🐁🐃 🐙 🐙🦇🐱🐙","rest_b":"🦦🐎🐖🦌🐬🐥🦅🐵 🐨 🐣🐵🐦🐊🐀🐽","rest_c":"🐟🐄🐅🦂🦞🦃🦚 🦜🦋 🦢🐇🦄 🦍🦞🦡 🐇🐩🐞🦕"},"welcome":{"facebook_title":"🦗🦗🐾🦐🦒🐋🐷🐾 🐑🐕‍🦺🐝'🐍 🦧🐇🐁🦛🦎🦌🐘🦚🐽 🦀🐐 🐮🐲🐡 🐅🐯🦕🦔🦕🦩🐌🕷️ 🐄🐙🦒🐤🦟🐯🙊","facebook_description":"🐔🦎🙉 🦝🐘🦜 🐣🦌🐋🐋🐼 🦡🐽🐦 <1 /> 🦂🐙🦒🙊 🦔🐒🐻🐝 🐙🐩 🦅🐩🦋 🐘🦎🐞 🐟🐎🐳🐃🐏 🐣🐝🦛🦂🐣🐲 🦂🐭🐒 🐗🐖🐅🦉🦃 \"🐟🐶🦁🦅 🐲🐇 🐤🦂🐵🐣🐶🐯🦙\" 🦟🦦🐃🐗🐞🐉 🐍🐄 🐴🐲🐕🦙 🦮🙈🐓🐸🐨🦁🐯🐱 🐉🐷 🦨 🐛🐾🦃🦄🐨🦥🐳🐦🐅 🐯🐸🐅🐐🐃🐐🐅.","messenger_title":"🐗🦦🐳🐪🐓🦌🦕🐳 🦔🐤🐨'🦓 🙊🙊🐦🦃🐈🐂🦦🐜🐌 🙈🦒 🐮🦏🐌 🦟🐫🐨🙊🦛🐬🦟🐯🦌 🦓🐝🐀🐖🦮🦜🦘","messenger_ios_description":"🐋🐂🙊 🐪🦆🐭 🦛🐩🦏🐴🐙 🙉🐶🐇 <1 /> 🐠🦅🐭🦒 🦚🐵🦈🦛 🦋🦥 🐍🙈🦕 🦑🦟🐐🦃🐰🦈 🦜🐘🐵🐉🐥 🦢🐸🐌🐭🦜🕊️ 🐗🐩🦎 🐿️🦡🦦🐦🦃 \"🐏🦉🦡🐖 🦡🦅 🦉🦡🦖🦅🦏🐵\" 🐌🕊️🐥🐌🦎🐇 🦑🐕‍🦺 🐔🐂🦮🐪 🐐🐋🐝🦚🐭🐃🐾🦛 🕷️🐀 🐕 🐧🐃🐫🕊️🐼🦃🐉🐈🦥 🐁🐸🦋🐮🐔🐅🐺.","title":"🐎🐡🐙🐿️🐼🐹🐵","theme":"🐋🐝🦡🦉 🦒 🦖🦋🐟🐉🐴","language":"🐴🦐🦟🐾🦡🦧 🐕‍🦺🐳🐱🦌 🐆🦜🦧🦙🦢🦅🐎🐨","accounts":"🐞🦧🐨 🦏🐇🦂🐧🦄🦍🐠🐕‍🦺","add_account":"🦅🦄🦦 🦋🐄🦈🐌🙊🦨🐃","add_extra_account":"🕊️🐹🦩 🐻🙈🐑🦑🐈🐨🐮 🐭🐴🐙🦟🦁🐶🐥","continue":"🦥🐗🦟🐮🦋🦇🐒🐄 🦮🐺 🦟🐆🐘🐌🐫🐷🐣🐌🦈"}}
  }