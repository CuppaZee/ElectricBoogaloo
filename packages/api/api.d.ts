import { OpsZeeopsStatus, OpsZeeopsTutorialsStatus } from './ops/zeeops';
import { User } from './user/main';
import { UserDeploys } from './user/deploys';
import { UserCapturesSpecial, UserCaptures } from './user/captures';
import { StatzeePlayerDay } from './statzee/player/day';
import { ClanV2 } from './clan/main';
import { ClanV2List, ClanV2Search, ClanV2Random } from './clan/list';
import { ClanV2Leaderboard } from './clan/leaderboard';
import { ClanV2Requirements } from './clan/requirements';
import { MunzeeSpecials, MunzeeSpecialsBouncers, MunzeeSpecialsFlat, MunzeeSpecialsMythological, MunzeeSpecialsPouchCreatures, MunzeeSpecialsRetired } from './munzee/specials';
import { Endpoint } from './common';

export type Endpoints = {
  "ops/zeeops/status": OpsZeeopsStatus;
  "ops/zeeops/tutorials/status": OpsZeeopsTutorialsStatus;
  "user": User;
  "user/captures": UserCaptures;
  "user/captures/special": UserCapturesSpecial;
  "user/deploys": UserDeploys;
  "munzee/specials": MunzeeSpecials;
  "munzee/specials/mythological": MunzeeSpecialsMythological;
  "munzee/specials/pouchcreatures": MunzeeSpecialsPouchCreatures;
  "munzee/specials/retired": MunzeeSpecialsRetired;
  "munzee/specials/flat": MunzeeSpecialsFlat;
  "munzee/specials/bouncers": MunzeeSpecialsBouncers;
  "statzee/player/day": StatzeePlayerDay;
  "clan/v2": ClanV2;
  "clan/v2/list": ClanV2List;
  "clan/v2/search": ClanV2Search;
  "clan/v2/random": ClanV2Random;
  "clan/v2/leaderboard": ClanV2Leaderboard;
  "clan/v2/requirements": ClanV2Requirements;
}

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