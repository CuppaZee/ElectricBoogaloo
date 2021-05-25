import { OpsZeeopsStatus, OpsZeeopsTutorialsStatus } from "./ops/zeeops";
import { User } from "./user/main";
import { UserDeploys, UserDeploysMap } from "./user/deploys";
import { UserUndeploys, UserUndeploysCount } from "./user/undeploys";
import { UserArchived } from "./user/archived";
import { UserCapturesSpecial, UserCaptures } from "./user/captures";
import { UserCredits, UserCreditsHistory } from "./user/credits";
import { UserBoostersActive, UserBoostersCredits } from "./user/boosters";
import { UserFind } from "./user/find";
import { StatzeePlayerDay } from "./statzee/player/day";
import { StatzeePlayerCaptures, StatzeePlayerCapturesTypes } from "./statzee/player/captures";
import { StatzeePlayerDeploys, StatzeePlayerDeploysTypes } from "./statzee/player/deploys";
import { ClanV2 } from "./clan/main";
import { ClanV2List, ClanV2Search, ClanV2Random } from "./clan/list";
import { ClanV2Leaderboard } from "./clan/leaderboard";
import { ClanV2Requirements } from "./clan/requirements";
import { ClanV2Challenges } from "./clan/challenges";
import { Munzee } from "./munzee/main";
import { MunzeeHascaptured } from "./munzee/hascaptured";
import {
  MunzeeSpecials,
  MunzeeSpecialsBouncers,
  MunzeeSpecialsFlat,
  MunzeeSpecialsMythological,
  MunzeeSpecialsPouchCreatures,
  MunzeeSpecialsRetired,
} from "./munzee/specials";
import { MapBoundingboxV4 } from "./map/v4";
import { AssetsNews } from "./assets/news";
import { Endpoint } from "./common";
import { UserSpecials } from "./user/specials";
import { UserCubimals } from "./user/cubimals";
import { QRates } from "./user/qrates";

export type Endpoints = {
  "assets/news": AssetsNews;
  "clan/v2": ClanV2;
  "clan/v2/challenges/{game_id}": ClanV2Challenges;
  "clan/v2/leaderboard": ClanV2Leaderboard;
  "clan/v2/list": ClanV2List;
  "clan/v2/random": ClanV2Random;
  "clan/v2/requirements": ClanV2Requirements;
  "clan/v2/search": ClanV2Search;
  "map/boundingbox/v4": MapBoundingboxV4;
  munzee: Munzee;
  "munzee/hascaptured": MunzeeHascaptured;
  "munzee/specials": MunzeeSpecials;
  "munzee/specials/bouncers": MunzeeSpecialsBouncers;
  "munzee/specials/flat": MunzeeSpecialsFlat;
  "munzee/specials/mythological": MunzeeSpecialsMythological;
  "munzee/specials/pouchcreatures": MunzeeSpecialsPouchCreatures;
  "munzee/specials/retired": MunzeeSpecialsRetired;
  "ops/zeeops/status": OpsZeeopsStatus;
  "ops/zeeops/tutorials/status": OpsZeeopsTutorialsStatus;
  "statzee/player/captures": StatzeePlayerCaptures;
  "statzee/player/captures/types": StatzeePlayerCapturesTypes;
  "statzee/player/day": StatzeePlayerDay;
  "statzee/player/deploys": StatzeePlayerDeploys;
  "statzee/player/deploys/types": StatzeePlayerDeploysTypes;
  user: User;
  "user/archived": UserArchived;
  "user/boosters/active": UserBoostersActive;
  "user/boosters/credits": UserBoostersCredits;
  "user/captures": UserCaptures;
  "user/captures/special": UserCapturesSpecial;
  "user/credits": UserCredits;
  "user/credits/history": UserCreditsHistory;
  "user/deploys": UserDeploys;
  "user/deploys/map": UserDeploysMap;
  "user/find": UserFind;
  "user/specials": UserSpecials;
  "user/undeploys": UserUndeploys;
  "user/undeploys/count": UserUndeploysCount;
  "user/cubimals": UserCubimals;
  "qrates": QRates;
};

export interface FetchRequest<
  Path extends keyof Endpoints,
  RouteDef extends Endpoint = Endpoints[Path]
> {
  endpoint?: Path;
  params?: RouteDef["request"]["params"];
}

export type FetchResponse<
  Path extends keyof Endpoints,
  RouteDef extends Endpoint = Endpoints[Path]
> = RouteDef["response"];
