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
    "clan_bookmarks": string;
    "settings": string;
    "tools_donate": string;
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
    "history_space_coast_geo_store": string;
    "history_freeze_tag_store": string;
    "history_pimedus": string;
    "history_magnetus": string;
    "history_prize_wheel": string;
    "history_premium": string;
    "history_clan": string;
    "history_zeeops": string;
    "history_support": string;
    "history_test": string;
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
    "rewards": string;
    "clan_rewards": string;
    "share": string;
    "share_level": string;
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
  },
  "drawer": {
    "more_clans": string;
  },
  "search": {
    "search": string;
    "type": string;
    "category": string;
    "player": string;
    "clan": string;
  },
  "dashboard": {
    "clans": string;
  },
  "tips": {
    "drawer_user_bookmarks": string;
    "drawer_clan_bookmarks": string;
    "clan_stats_customisation": string;
    "search_munzee_types": string;
    "title": string;
  }
};
  export const langs = {
    "en-GB": {"404":{"title":"Coffee Not Found","subtitle":"Looks like there is no coffee here.","home":"Return Home"},"pages":{"dashboard_dashboard":"Dashboard","user_profile":"Profile","user_activity":"Activity","user_inventory":"Inventory","user_zeeops":"ZeeOps","user_clan_progress":"Clan Progress","user_bouncers":"Bouncers","user_blast_checker":"Blast Checker","user_qrew_checker":"QRew Checker","user_universal_capper":"Universal Capper","user_challenges":"Challenges","clan_requirements":"Clan Requirements","tools_bouncers":"Bouncers","tools_munzee_types":"Munzee Types","tools_calendar":"Calendar","tools_evo_planner":"Evo Planner","tools_search":"Search","settings_personalisation":"Personalisation","settings_notifications":"Notifications","settings_accounts":"Accounts","settings_bookmarks":"Bookmarks","tools_credits":"Credits","tools_open_source":"Open Source","clan_bookmarks":"Bookmarked Clans","settings":"Settings","tools_donate":"Donate"},"user_activity":{"overview_points":"{{count}} Point","overview_points_plural":"{{count}} Points","overview_captures":"{{count}} Capture","overview_captures_plural":"{{count}} Captures","overview_deploys":"{{count}} Deploy","overview_deploys_plural":"{{count}} Deploys","overview_capons":"{{count}} Capon","overview_capons_plural":"{{count}} Capons","filter_save":"Save Filters","filter_types":"Types","filter_state":"State","filter_category":"Category","activity_capture":"You captured","activity_deploy":"You deployed","activity_capon":"{{user}} captured","owned_by_user":"by {{user}}","owned_by_self":"by you","none":"None"},"user_inventory":{"amount_undeployed":"{{count}} Undeployed","amount_undeployed_plural":"{{count}} Undeployed","amount_credits":"{{count}} Credit","amount_credits_plural":"{{count}} Credits","history":"History","history_space_coast_geo_store":"Space Coast Geo Store","history_freeze_tag_store":"Freeze Tag Store","history_pimedus":"Pimedus Rewards","history_magnetus":"Magnetus Rewards","history_prize_wheel":"Prize Wheel Rewards","history_premium":"Premium Rewards","history_clan":"Level {{level}} - {{month}} {{year}}","history_zeeops":"ZeeOps Rewards","history_support":"Munzee Support","history_test":"Test"},"user_zeeops":{"collected":"Collected!"},"clan":{"requirements":"Requirements","clan_requirements":"Clan Requirements","loading":"Loading","individual":"Individual","group":"Group","level":"Level {{level}}","individual_level":"Indiv L{{level}}","group_level":"Group L{{level}}","group_total":"Group Total","rewards":"Rewards","clan_rewards":"Clan Rewards","share":"Share","share_level":"Share L{{level}}"},"maps":{"location_fail":"Failed retrieving location"},"settings_common":{"save":"Save","saved":"Settings Saved"},"settings_accounts":{"reauthenticate":"Reauthenticate","logout":"Logout","add_account":"Add Account"},"settings_notifications":{"error_web":"Notifications aren't supported on Web","error_permissions":"Requesting permissions failed. Did you allow notifications?","bouncers_title":"Bouncers","bouncers_enabled":"Enabled","bouncers_distance_default":"Default Distance ({{unit}})","bouncers_distance_starred":"Starred User Distance ({{unit}})","bouncers_override_distance":"Distance ({{unit}})","bouncers_override_search":"Search","bouncers_override_search_hint":"You can search for Categories or individual Types","bouncers_override_add":"Add Category/Type","starred_users_title":"Starred Users","starred_users_search":"Search","starred_users_add":"Add User","locations_title":"Locations","locations_live_title":"Live Location","locations_live_disabled":"Disabled","locations_static_name":"Location Name","locations_static_done":"Done","locations_static_add":"Add Static Location","other_title":"Other","other_news_munzee":"Munzee Blog","other_units_title":"Units","other_units_metric":"Metric Units (km/m)","other_units_imperial":"Imperial Units (mi/ft)"},"bouncers":{"uncategorised":"Uncategorised"},"calendar":{"dates":"SMTWTFS","qrewzees_on":"QRewZees: On","qrewzees_off":"QRewZees: Off","egyptian_status":"Egyptian: {{type}}","western_status":"Western: {{type}}","chinese_status":"Chinese: {{types}}"},"open_source":{"title":"CuppaZee Open Source","description":"The source code for the CuppaZee App is available on GitHub","source_code":"Source Code","packages":"CuppaZee publishes 3 packages on NPM","packages_types":"@cuppazee/types - A Database of Most Munzee Types","packages_icons":"@cuppazee/icons - A Database of Most Munzee Type Icons","packages_api":"@cuppazee/api - TypeScript Definitions for the Munzee API","license":"{{license}} License"},"user_bouncers":{"host":"At {{name}} by {{creator}}","location":"{{town}}, {{country}} [{{times}}]","captures":"{{number}} Captured - Last Captured {{date}}","never":"Never","rest_a":"Having a Rest","rest_b":"Catching a Flight","rest_c":"Waiting at the Bus Stop"},"welcome":{"facebook_title":"CuppaZee isn't supported in the Facebook Browser","facebook_description":"You can press the <1 /> Menu icon in the top right corner and press \"Open in Browser\" button to view CuppaZee in a supported browser.","messenger_title":"CuppaZee isn't supported in the Messenger Browser","messenger_ios_description":"You can press the <1 /> Menu icon in the bottom right corner and press \"Open in Safari\" button to view CuppaZee in a supported browser.","title":"Welcome","theme":"Pick a Theme","language":"Select your Language","accounts":"Add Accounts","add_account":"Add Account","add_extra_account":"Add Another Account","continue":"Continue to Dashboard"},"drawer":{"more_clans":"More Clans"},"search":{"search":"Search","type":"Type","category":"Type Category","player":"Player","clan":"Clan"},"dashboard":{"clans":"Clans"},"tips":{"drawer_user_bookmarks":"You can add and remove users from your Bookmarks in the Settings","drawer_clan_bookmarks":"You can add and remove clans from your Bookmarks in the Settings","clan_stats_customisation":"There are a lot of options to make Clan Stats your own in the Personalisation settings","search_munzee_types":"As well as searching for Players and Clans, you can also look up Munzee Types here to find out more about them!","title":"Here's a quick tip!"}},"nl": {"404":{"title":"Koffie niet gevonden","subtitle":"Zo te zien is hier geen koffie.","home":"Terug naar Home"},"pages":{"dashboard_dashboard":"Dashboard\n","user_profile":"Profiel","user_activity":"Activiteit","user_inventory":"Inventaris","user_zeeops":"ZeeOps","user_clan_progress":"Clan voortgang","user_bouncers":"Bouncers","user_blast_checker":"Blast Checker","user_qrew_checker":"QRew Checker","user_universal_capper":"Universal Capper","user_challenges":"Uitdagingen","clan_requirements":"Clan Vereisten","tools_bouncers":"Bouncers","tools_munzee_types":"Soorten Munzee","tools_calendar":"Kalender","tools_evo_planner":"Evo Planner","tools_search":"Zoeken","settings_personalisation":"Personalisatie","settings_notifications":"Notificaties","settings_accounts":"Accounts","settings_bookmarks":"Bookmarks","tools_credits":"Credits","tools_open_source":"Open Source"},"user_activity":{"overview_points":"{{count}} punten","overview_points_plural":"{{count}} punten","overview_captures":"{{count}} Capture","overview_captures_plural":"{{count}} Captures","overview_deploys":"{{count}} Deploy","overview_deploys_plural":"{{count}} Deploys","overview_capons":"{{count}} Capon","overview_capons_plural":"{{count}} Capons","filter_save":"Bewaar Filters","filter_types":"Typen","filter_state":"Status","filter_category":"Categorie","activity_capture":"Je hebt captured","activity_deploy":"Je hebt deployed","activity_capon":"{{user}} captured","owned_by_user":"door {{user}}","owned_by_self":"door jou","none":"Geen"},"user_inventory":{"amount_undeployed":"{{count}} Niet gedeployed","amount_undeployed_plural":"{{count}} Niet gedeployed ","amount_credits":"{{count}} Credit","amount_credits_plural":"{{count}} Credits","history":"Geschiedenis"},"user_zeeops":{"collected":"Verzameld!"},"clan":{"requirements":"Vereisten","clan_requirements":"Clan Requirements","loading":"Laden","individual":"Individueel","group":"Groep","level":"Niveau {{level}}","individual_level":"Indiv L{{level}}","group_level":"Groep L{{level}}","group_total":"Groep Totaal"},"maps":{"location_fail":"Kan de locatie niet ophalen"},"settings_common":{"save":"Opslaan","saved":"Instellingen bewaard"},"settings_accounts":{"reauthenticate":"Opnieuw verifiëren","logout":"Uitloggen","add_account":"Account toevoegen"},"settings_notifications":{"error_web":"Meldingen worden niet ondersteund op internet","error_permissions":"Het aanvragen van machtigingen in mislukt. Heb je meldingen toegestaan?","bouncers_title":"Bouncers","bouncers_enabled":"Inschakelen","bouncers_distance_default":"Standaard afstand ({{unit}})","bouncers_distance_starred":"Gebruikersafstand met ster ({{unit}})","bouncers_override_distance":"Afstand ({{unit}})","bouncers_override_search":"Zoeken","bouncers_override_search_hint":"Je kunt zoeken op categorieën en individuele typen","bouncers_override_add":"Categorie/Type toevoegen","starred_users_title":"Gebruikers met ster","starred_users_search":"Zoeken","starred_users_add":"Gebruiker toevoegen","locations_title":"Locaties","locations_live_title":"Live locatie","locations_live_disabled":"Uitgeschakeld","locations_static_name":"Naam locatie","locations_static_done":"Klaar","locations_static_add":"Statische locatie toevoegen","other_title":"Anders","other_news_munzee":"Munzee Blog","other_units_title":"Eenheden","other_units_metric":"Metrische eenheden (km/m)","other_units_imperial":"Imperial eenheden (mi/ft)"},"bouncers":{"uncategorised":"Niet gecategoriseerd"},"calendar":{"dates":"ZMDWDVZ","qrewzees_on":"QRewZees: Aan","qrewzees_off":"QRewZees: Uit","egyptian_status":"Egyptisch: {{type}}","western_status":"Westers: {{type}}","chinese_status":"Chinese: {{types}}"},"open_source":{"title":"CuppaZee Open Source","description":"De Source code voor de CuppaZee App is beschikbaar op GitHub","source_code":"Source Code","packages":"CuppaZee publiseert 3 pakketten op NPM","packages_types":"@cuppazee/types - Een database van de meeste Munzee Typen","packages_icons":"@cuppazee/icons - Een database van de meeste Munzee Typen Iconen","packages_api":"@cuppazee/api - TypeScript defenities van de Munzee API","license":"{{license}} Licentie"},"user_bouncers":{"host":"Op {{name}} door {{creator}}","location":"{{town}}, {{country}} [{{times}}]","captures":"{{number}} Captured - Laatst gecaptured {{date}}","never":"Nooit","rest_a":"Even aan het uitrusten","rest_b":"Een vlucht aan het halen","rest_c":"Op de bus aan het wachten"},"welcome":{"facebook_title":"CuppaZee wordt niet ondersteund door de Facebook Browser","facebook_description":"Je kunt op het menupictogram <1 /> in de rechterbovenhoek drukken en vervolgens op \"Open in Browser\" om CuppaZee in een ondersteunende browser te bekijken.","messenger_title":"CuppaZee wordt niet ondersteund door de Messenger Browser","messenger_ios_description":"Je kunt op het menupictogram <1 /> in de rechterbovenhoek drukken en vervolgens op \"Open in Safari\" om CuppaZee in een ondersteunende browser te bekijken.","title":"Welkom","theme":"Kies een Thema uit","language":"Kies een taal","accounts":"Gebruikers toevoegen","add_account":"Gebruiker toevoegen","add_extra_account":"Nog een gebruiker toevoegen","continue":"Doorgaan naar Dashboard"}},
    "test": {"404":{"title":"🦝🦡🐘🐵🦏🐌 🦧🐀🐽 🐐🐜🦖🐄🐉","subtitle":"🦜🐡🐔🦐🦇 🦚🦂🦘🐨 🐂🐘🐙🐔🐸 🐎🦊 🦝🕷️ 🐎🦄🐵🐰🐓🦙 🦞🦔🦙🐞.","home":"🐡🐘🦅🦅🦏🦈 🐙🐩🐴🦖"},"pages":{"dashboard_dashboard":"🐸🐪🐗🐉🐛🐵🦐🐼🦜","user_profile":"🦕🐾🐅🦥🐄🐼🐜","user_activity":"🦧🦓🐅🐸🐔🦦🦍🦧","user_inventory":"🦒🐒🕊️🐽🦀🐇🕊️🦨🐴","user_zeeops":"🐕‍🦺🐳🐆🙊🐰🐔","user_clan_progress":"🐆🐥🐭🐗 🐌🦞🦡🐪🕊️🐏🦩🐜","user_bouncers":"🦖🦑🐌🦥🐦🦎🐺🐀","user_blast_checker":"🦓🦡🦐🐋🐿️ 🐇🐈🦉🦥🐲🐥🐃","user_qrew_checker":"🦒🐿️🐣🦁 🐛🐤🐑🐥🐤🦊🐬","user_universal_capper":"🦙🦧🕷️🐦🦘🦢🐝🐶🐦 🐵🦇🦘🦙🦄🦨","user_challenges":"🦔🦌🙉🐱🦔🐊🦔🦟🐃🐞","clan_requirements":"🐕‍🦺🦄🕊️🦋 🦢🦀🐾🕊️🦥🐣🐠🦥🦕🦦🦋🐇","tools_bouncers":"🦨🐌🐡🦗🐪🐳🦋🐂","tools_munzee_types":"🦇🐲🐘🦕🕷️🙊 🐞🐺🐲🦕🐫","tools_calendar":"🦟🦋🦒🐶🐃🐴🐶🦜","tools_evo_planner":"🦚🦕🦉 🦆🐍🐶🐾🐵🐊🐜","tools_search":"🐙🐓🐯🦂🐑🐮","settings_personalisation":"🐉🦛🦗🦍🐲🐨🐍🦃🐗🐦🙉🦒🐂🐫🐱","settings_notifications":"🐄🦁🐵🐖🦁🐅🦎🐐🐢🐺🦘🐠🦩","settings_accounts":"🐫🦏🐛🐖🦉🐡🦨🐝","settings_bookmarks":"🦃🐥🙉🦔🐌🙊🐥🐭🦚","tools_credits":"🦗🦇🐌🦧🐃🦓🐇","tools_open_source":"🦛🦑🦃🦈 🐃🦧🐾🐄🦡🐔","clan_bookmarks":"🐩🙈🐹🐈🐴🐹🐖🐐🐃🐂 🐞🐯🐮🐥🦇","settings":"🐠🐎🐒🦅🐷🐖🐽🐡","tools_donate":"🦀🐖🐹🐃🐾🐱"},"user_activity":{"overview_points":"{{count}} 🐪🦛🦄🦑🐕‍🦺","overview_points_plural":"{{count}} 🐛🦊🦢🐘🦜🐠","overview_captures":"{{count}} 🦧🦧🦓🐛🐙🦑🐶","overview_captures_plural":"{{count}} 🐭🐥🦥🐮🦞🦀🐶🦉","overview_deploys":"{{count}} 🐹🐶🦩🐕🐢🦝","overview_deploys_plural":"{{count}} 🦇🐕‍🦺🐜🐜🦗🐞🐑","overview_capons":"{{count}} 🐡🐨🐕‍🦺🦏🙊","overview_capons_plural":"{{count}} 🐎🦞🐪🐴🐋🐒","filter_save":"🐵🐘🦄🐄 🐷🐝🐙🐐🐈🐔🦒","filter_types":"🐔🦒🦥🐢🐒","filter_state":"🐂🦜🦒🐸🦜","filter_category":"🦘🦌🐗🐶🐬🐐🦥🐽","activity_capture":"🐂🐊🕊️ 🦋🐮🦡🦮🐸🐵🕷️🦆","activity_deploy":"🐇🐴🐒 🐤🐕🐁🐢🦞🐲🐨🦋","activity_capon":"{{user}} 🦃🦉🐞🐌🦚🦨🦮🐎","owned_by_user":"🦩🦕 {{user}}","owned_by_self":"🐛🐀 🦚🐸🐻","none":"🦑🐷🐧🐮"},"user_inventory":{"amount_undeployed":"{{count}} 🦩🦅🦙🐎🦈🦋🐠🦂🐆🐜","amount_undeployed_plural":"{{count}} 🐔🐟🐱🐡🐞🐀🐡🦏🦅🦇","amount_credits":"{{count}} 🐾🐴🐴🐞🦇🦌","amount_credits_plural":"{{count}} 🦆🐵🐀🐖🦈🙊🦗","history":"🐉🦒🐞🐠🦘🦨🦦","history_space_coast_geo_store":"🦎🦮🙊🦂🐑 🐧🦖🙈🐉🐝 🐉🐾🐭 🦎🦂🦨🦥🐛","history_freeze_tag_store":"🐯🦄🐑🐥🦃🐹 🦗🐦🐔 🐛🐐🐔🐅🦎","history_pimedus":"🦢🐏🦄🦧🐑🐁🐑 🕊️🐱🐫🐇🦓🦑🐱","history_magnetus":"🐿️🐔🐹🦧🐑🐜🐈🐟 🦏🦔🐹🦍🦥🐃🦍","history_prize_wheel":"🐵🐷🦑🐿️🐪 🦦🦌🐣🦜🦈 🐟🐅🙊🦓🐤🐶🦐","history_premium":"🐞🐑🦏🦔🐙🐍🐧 🐜🐊🐲🐤🐶🐥🦥","history_clan":"🐕‍🦺🦝🐙🦘🙉 {{level}} - {{month}} {{year}}","history_zeeops":"🐾🦉🐹🐊🕷️🦚 🦘🦓🐍🐌🐷🐑🐁","history_support":"🦌🦥🐔🦈🦆🦖 🐻🦥🐃🐯🐏🐪🦗","history_test":"🐯🐎🐯🦚"},"user_zeeops":{"collected":"🦇🦧🐰🦞🦩🦅🦅🐴🐛!"},"clan":{"requirements":"🐙🦙🐌🐣🐳🐘🐲🦨🐠🦜🙉🦟","clan_requirements":"🦘🐃🐍🐆 🦁🙈🙊🦞🐠🐨🐄🐉🐄🦢🕷️🦚","loading":"🐊🦩🐡🦉🐱🐀🙊","individual":"🦡🐨🐆🐃🦎🐋🐤🐱🦙🙈","group":"🐟🐕‍🦺🦛🐽🐖","level":"🐇🐺🕊️🙈🐮 {{level}}","individual_level":"🐅🦖🐐🐔🐟 🦥{{level}}","group_level":"🐇🙉🐮🐏🐸 🐀{{level}}","group_total":"🐣🐕🐿️🦩🦟 🦄🐰🐫🦛🦖","rewards":"🦄🦂🦟🐄🦞🦢🐍","clan_rewards":"🐃🐕🕊️🐡 🐑🦢🦜🦍🐅🐔🐸","share":"🐠🐆🦩🐀🦛","share_level":"🐒🦡🦒🐎🐑 🐔{{level}}"},"maps":{"location_fail":"🐼🐐🦓🐼🐆🦍 🐦🐡🦆🦊🦒🐐🐔🐍🐜🙈 🦢🦌🐹🐼🦅🐾🐣🐆"},"settings_common":{"save":"🦍🕷️🐙🐤","saved":"🐄🐹🐸🐎🐾🐃🐙🐲 🦈🐭🐮🦝🙈"},"settings_accounts":{"reauthenticate":"🦩🐀🦒🦟🦉🐿️🐿️🦘🦚🦮🐟🦚🐾🦘","logout":"🐥🦌🐾🐳🦀🐡","add_account":"🦚🦡🦩 🦈🕷️🐏🐊🦐🦇🦗"},"settings_notifications":{"error_web":"🐳🦁🐂🦐🦥🐞🐆🐄🐙🐭🐾🐮🦜 🕊️🐥🐕🐭'🐕‍🦺 🐧🐥🦟🐺🐫🐲🐓🦁🐍 🙈🦕 🐀🦔🐟","error_permissions":"🐈🐁🐑🐁🦑🦉🦝🐲🐼🐭 🐰🐴🐣🦞🐖🐨🦩🐶🦮🦎🐐 🐓🐂🐢🦜🐷🦢. 🐷🐆🦢 🦅🦂🐳 🐦🦖🦗🐯🐝 🐯🦟🦐🐙🦡🦈🙈🐄🦃🐀🦉🐥🦢?","bouncers_title":"🦓🦂🐂🐲🐺🐵🐴🦑","bouncers_enabled":"🦨🐕🦉🐙🐁🦩🐋","bouncers_distance_default":"🕷️🐢🐔🦨🐬🦄🐥 🐣🦃🐂🐔🐙🐅🐭🦘 ({{unit}})","bouncers_distance_starred":"🦔🐦🦕🐞🦝🦞🦋 🐾🦒🦐🐓 🐍🐔🕷️🦒🦞🐸🐇🐁 ({{unit}})","bouncers_override_distance":"🦏🦦🐍🐊🐠🐞🦂🦓 ({{unit}})","bouncers_override_search":"🐑🦊🐼🐠🐂🦏","bouncers_override_search_hint":"🐴🦑🦀 🐨🦑🦦 🐯🦚🐦🐝🐈🦂 🐓🦌🐔 🐋🦄🦧🦉🐰🦜🐴🐌🙈🦊 🐾🦈 🐹🐿️🐅🐭🐺🦆🦍🦦🐧🐑 🦓🐝🐆🦎🦈","bouncers_override_add":"🙊🦅🐿️ 🐡🐾🦜🐄🦘🦢🐩🐆/🐗🦘🐰🐢","starred_users_title":"🐈🦑🐍🦆🐎🐸🦔 🦉🐲🐧🐽🦊","starred_users_search":"🐙🙉🐜🐂🐓🦮","starred_users_add":"🐦🦢🐫 🕷️🦔🦦🐔","locations_title":"🦚🐆🐗🦂🐶🐽🦌🦔🦘","locations_live_title":"🦂🦀🐝🦧 🐞🐌🐽🙊🐃🦑🐡🦑","locations_live_disabled":"🐧🦚🦙🐺🐝🦓🐅🐱","locations_static_name":"🦔🐉🦌🐜🐯🦁🦃🦌 🐉🐳🐷🦨","locations_static_done":"🐰🦃🐗🐠","locations_static_add":"🐬🐣🐧 🦉🐏🦀🐳🐥🐵 🐢🐰🦉🐼🦔🐖🐍🐢","other_title":"🕷️🦈🐓🦚🐸","other_news_munzee":"🐖🐶🐒🦕🦢🐻 🐌🐄🐂🐹","other_units_title":"🦂🦕🐴🐢🐢","other_units_metric":"🐣🐦🐝🐃🦦🦓 🐏🦂🐈🐹🐽 (🐓🦨/🦟)","other_units_imperial":"🐐🐕🦕🐴🦚🐭🐕‍🦺🐆 🐤🦟🙊🦘🐫 (🦖🐫/🐏🦓)"},"bouncers":{"uncategorised":"🐀🐷🦖🦈🦃🦎🐪🦡🦆🦨🐈🦄🦚"},"calendar":{"dates":"🦥🐺🦑🐂🐈🦥🦮","qrewzees_on":"🐭🐡🦗🐕‍🦺🐄🦚🦈🐄: 🙉🐘","qrewzees_off":"🦂🦢🙈🐳🐁🐹🐔🦒: 🦢🦋🐓","egyptian_status":"🦜🦖🙉🦦🐞🐕🦚🐣: {{type}}","western_status":"🦮🦗🐎🐃🦇🐏🐼: {{type}}","chinese_status":"🐛🐽🐴🦋🦐🐪🦞: {{types}}"},"open_source":{"title":"🐻🐓🐣🦁🦨🐊🦇🐻 🐤🐺🐵🕷️ 🦮🐉🐸🐳🐷🐿️","description":"🦖🐛🕊️ 🐁🐈🕷️🦚🐠🐕 🦞🐔🦨🦩 🐙🦑🦔 🐢🐫🐛 🐞🐸🐄🐛🐟🐩🦛🐊 🦓🐴🦡 🐘🦇 🦝🐽🦍🐛🐖🐖🐒🐸🦮 🦕🙈 🐅🐶🐕‍🦺🐲🐇🐤","source_code":"🦧🐽🦂🐴🐫🙊 🐵🐓🐮🐊","packages":"🐕🐞🐇🐡🐥🐉🙈🐹 🦋🙉🐑🦡🐙🐦🐏🦟🦨 3 🦙🐸🐲🦃🐔🦀🦓🦁 🐛🐾 🦎🦌🐴","packages_types":"@🦆🐆🦙🦂🙉🦝🦍🐙/🐦🦎🐷🐣🦐 - 🐬 🐉🦄🐕🐨🐏🦐🦌🐥 🦃🦓 🐙🐢🐞🐛 🐓🐕‍🦺🦚🐹🐲🐓 🐾🐹🐧🐍🐒","packages_icons":"@🐽🐳🐀🐕🦢🐉🦡🦔/🐅🐦🦓🐘🐵 - 🦊 🦆🐋🐦🐇🐵🐈🦋🦌 🐯🦥 🦐🐇🐟🐠 🦨🐥🐙🐖🐋🦇 🦈🐎🐁🐳 🦒🐟🐄🐻🦥","packages_api":"@🐹🐧🐓🙈🦗🐳🐳🦇/🐖🐶🐼 - 🦥🐫🐧🐀🦌🐽🦕🦜🐡🦁 🐻🐿️🦮🐠🐅🐽🐭🐉🦮🕷️🐘 🦘🐛🐓 🐂🐍🦍 🐁🦚🐣🐕‍🦺🦥🐔 🦓🦜🦧","license":"{{license}} 🐠🦟🐻🐆🦕🐐🦉"},"user_bouncers":{"host":"🙊🦂 {{name}} 🐓🐊 {{creator}}","location":"{{town}}, {{country}} [{{times}}]","captures":"{{number}} 🦚🦀🦊🦕🐎🐍🐊🦇 - 🐢🦟🐽🐫 🐸🦝🐷🦖🦆🐎🐶🐅 {{date}}","never":"🐒🦥🦊🐝🦛","rest_a":"🦜🐇🐨🦊🦅🐛 🐸 🦝🐤🦑🦖","rest_b":"🐧🕊️🐍🦙🐛🐛🐻🦘 🐕‍🦺 🙈🦉🦦🐙🐠🐎","rest_c":"🦮🐴🐏🐹🐡🐅🐂 🐩🙈 🐹🦌🦙 🐋🐄🐯 🐞🐴🦛🐔"},"welcome":{"facebook_title":"🦆🐌🦮🐢🐴🐋🦟🦀 🦙🐷🐬'🙈 🦑🦌🦌🦑🐉🐺🐿️🐉🦮 🐶🦇 🦒🐑🐄 🐿️🐴🐯🦄🐿️🦕🦅🙊 🐝🐔🐏🐑🐉🐴🦐","facebook_description":"🦙🐼🕊️ 🦆🦏🐴 🐞🐡🐟🐗🐲 🦎🐆🦨 <1 /> 🦜🦈🐅🐵 🐯🐕🦧🐶 🐥🦁 🐴🦇🐡 🦩🐋🦉 🐁🦉🐶🦄🐷 🐝🦝🦙🐴🐖🦃 🐾🦒🐳 🐲🐊🐷🐿️🦇 \"🐗🦁🐖🐨 🐧🙉 🐓🐡🦞🐔🐁🐵🐺\" 🐜🦎🐗🐙🐱🦖 🐮🐴 🐓🦟🐔🐅 🦄🐓🐿️🐄🦝🦜🐭🐔 🐒🦢 🐞 🦅🐣🙉🦙🙊🐔🐽🐎🐷 🐡🐔🐾🐌🐃🐢🐡.","messenger_title":"🐬🐂🙊🐟🐴🐑🐆🐤 🐁🙈🦒'🐪 🐲🐊🦨🦜🐀🐅🦥🐈🙈 🙉🦄 🐏🐑🦮 🦝🐰🐌🦝🐊🦝🦧🐮🐑 🦕🦈🦜🐗🐧🐷🐍","messenger_ios_description":"🐾🦅🐈 🐮🙊🐏 🐐🐂🐊🐳🦓 🐜🦇🦜 <1 /> 🦔🐅🦙🦢 🐇🦘🐎🦀 🦝🐺 🐪🦎🦦 🐢🙊🐬🙉🐑🐸 🕊️🐳🐦🐉🐇 🐟🦡🐜🐑🐺🐌 🦗🦔🐊 🐿️🐄🐯🐈🐒 \"🐄🦑🐹🐠 🦥🦊 🦜🐟🐫🐼🐝🙉\" 🦮🦛🐽🐒🐸🦁 🦄🐜 🦎🐌🦆🦂 🐟🐳🦧🐓🦌🐡🐕‍🦺🐖 🐯🐋 🦍 🦏🦋🐖🐉🐬🐱🦚🦉🦓 🙈🐼🙈🐡🦈🐜🐇.","title":"🦀🐯🐭🐮🐝🦥🐪","theme":"🐂🐉🐁🐸 🦖 🐼🐳🦖🐒🦨","language":"🐒🐣🐞🦝🐗🦟 🐎🦚🐓🦁 🕷️🦂🦃🙊🐸🦩🐠🦑","accounts":"🐩🐺🐫 🐏🐳🐭🐬🐠🐄🦗🦑","add_account":"🐶🐀🕊️ 🦇🦍🐋🦁🐄🐠🐤","add_extra_account":"🦃🐤🐩 🙊🦀🐻🐞🐄🐪🐁 🦚🐫🙈🐬🐾🐕‍🦺🦜","continue":"🦮🐤🐰🐲🐫🦮🐄🐑 🐨🦛 🦛🦆🐑🐧🕷️🐇🐂🦧🐙"},"drawer":{"more_clans":"🦔🐬🦚🦩 🐪🦥🦨🐴🐏"},"search":{"search":"🐒🐌🙉🐑🐌🐭","type":"🐻🐭🐃🦔","category":"🐪🦓🦅🦇 🐳🦋🦉🦧🐳🦞🦨🦚","player":"🙈🐪🦙🦏🐬🦎","clan":"🐉🐄🐿️🐧"},"dashboard":{"clans":"🐇🦩🦥🦈🐒"},"tips":{"drawer_user_bookmarks":"🐪🦔🐓 🐷🦊🐈 🦗🐾🦉 🐓🐠🐷 🐍🐠🦮🐣🐪🐬 🦉🐲🐮🐕🐦 🐐🐿️🦅🦌 🦒🦧🦘🐕 🐶🙈🐯🐞🦇🐔🐏🐖🐤 🐃🦒 🐳🦟🦜 🐬🦩🦘🦩🕊️🐈🦉🐲","drawer_clan_bookmarks":"🦙🦙🦆 🦮🐡🐕‍🦺 🐣🐉🐋 🐣🐉🙉 🦅🐂🐄🦅🦖🙊 🐍🐾🙈🦋🐌 🐐🐏🐨🐝 🦎🦐🐾🐘 🐅🐽🦊🐰🐼🐴🦋🦘🦅 🙊🦢 🐈🦕🐠 🦋🐈🐺🦇🕷️🦕🦧🦆","clan_stats_customisation":"🐻🐲🐶🦈🐍 🐻🦇🐛 🐽 🐙🦉🙈 🐱🐣 🐑🐀🐾🐏🐊🦘🐿️ 🐿️🐀 🐈🦇🐍🦮 🦈🐔🐬🐬 🐢🐿️🐦🦈🕷️ 🐆🐐🐍🦈 🐤🐘🐦 🐱🦮 🙊🐍🐫 🦏🐍🦚🦌🐰🐁🐪🐱🐜🐢🦡🦗🐏🦆🐉 🐇🐟🐅🦮🦍🐙🐕‍🦺🐷","search_munzee_types":"🐡🐯 🐌🐓🐞🦞 🦍🐰 🙈🦉🐦🐕🐵🐀🐏🐿️🦓 🐉🐂🐖 🐲🐰🐖🐣🦩🐢🐰 🐖🦡🐒 🐶🦍🐁🐡🦂, 🐞🐒🐑 🐩🦎🕷️ 🐺🦟🐕‍🦺🦈 🐂🦉🐮🐘 🦥🐟 🦗🦢🐌🦌🐿️🐻 🦇🐕🐠🙊🦊 🐶🐪🦉🐸 🦎🦅 🦇🐮🐮🦥 🐔🐔🐲 🐄🐴🐄🕷️ 🐸🐎🐋🦍🐍 🐗🦦🦧🦑!","title":"🐔🦚🐎🦌'🐐 🙊 🐞🐯🙊🐁🐕 🐲🦊🐒!"}}
  }