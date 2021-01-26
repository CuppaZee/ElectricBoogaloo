import { OpsZeeopsStatus, OpsZeeopsTutorialsStatus } from './ops/zeeops';
import { User } from './user/main';
import { UserDeploys } from './user/deploys';
import { UserUndeploys, UserUndeploysCount } from './user/undeploys';
import { UserArchived } from './user/archived';
import { UserCapturesSpecial, UserCaptures } from './user/captures';
import { UserCredits, UserCreditsHistory } from './user/credits';
import { UserBoostersActive, UserBoostersCredits } from './user/boosters';
import { UserFind } from './user/find';
import { StatzeePlayerDay } from './statzee/player/day';
import { StatzeePlayerCaptures, StatzeePlayerCapturesTypes } from './statzee/player/captures';
import { StatzeePlayerDeploys, StatzeePlayerDeploysTypes } from './statzee/player/deploys';
import { ClanV2 } from './clan/main';
import { ClanV2List, ClanV2Search, ClanV2Random } from './clan/list';
import { ClanV2Leaderboard } from './clan/leaderboard';
import { ClanV2Requirements } from './clan/requirements';
import { ClanV2Challenges } from './clan/challenges';
import { Munzee } from './munzee/main';
import { MunzeeHascaptured } from './munzee/hascaptured';
import { MunzeeSpecials, MunzeeSpecialsBouncers, MunzeeSpecialsFlat, MunzeeSpecialsMythological, MunzeeSpecialsPouchCreatures, MunzeeSpecialsRetired } from './munzee/specials';
import { MapBoundingboxV4 } from './map/v4';
import { Endpoint } from './common';

export type Endpoints = {
  "ops/zeeops/status": OpsZeeopsStatus;
  "ops/zeeops/tutorials/status": OpsZeeopsTutorialsStatus;
  user: User;
  "user/captures": UserCaptures;
  "user/captures/special": UserCapturesSpecial;
  "user/deploys": UserDeploys;
  "user/undeploys": UserUndeploys;
  "user/undeploys/count": UserUndeploysCount;
  "user/archived": UserArchived;
  "user/find": UserFind;
  "user/credits": UserCredits;
  "user/credits/history": UserCreditsHistory;
  "user/boosters/active": UserBoostersActive;
  "user/boosters/credits": UserBoostersCredits;
  munzee: Munzee;
  "munzee/hascaptured": MunzeeHascaptured;
  "munzee/specials": MunzeeSpecials;
  "munzee/specials/mythological": MunzeeSpecialsMythological;
  "munzee/specials/pouchcreatures": MunzeeSpecialsPouchCreatures;
  "munzee/specials/retired": MunzeeSpecialsRetired;
  "munzee/specials/flat": MunzeeSpecialsFlat;
  "munzee/specials/bouncers": MunzeeSpecialsBouncers;
  "statzee/player/day": StatzeePlayerDay;
  "statzee/player/captures": StatzeePlayerCaptures;
  "statzee/player/captures/types": StatzeePlayerCapturesTypes;
  "statzee/player/deploys": StatzeePlayerDeploys;
  "statzee/player/deploys/types": StatzeePlayerDeploysTypes;
  "clan/v2": ClanV2;
  "clan/v2/list": ClanV2List;
  "clan/v2/search": ClanV2Search;
  "clan/v2/random": ClanV2Random;
  "clan/v2/leaderboard": ClanV2Leaderboard;
  "clan/v2/requirements": ClanV2Requirements;
  "clan/v2/challenges/{game_id}": ClanV2Challenges;
  "map/boundingbox/v4": MapBoundingboxV4;
};

export interface FetchRequest<
  Path extends keyof Endpoints,
  RouteDef extends Endpoint = Endpoints[Path]
  > {
  endpoint?: Path
  params?: RouteDef["request"]["params"]
}

export type FetchResponse<
  Path extends keyof Endpoints,
  RouteDef extends Endpoint = Endpoints[Path]
  > = RouteDef["response"]