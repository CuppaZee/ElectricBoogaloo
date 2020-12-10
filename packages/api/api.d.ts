import { OpsZeeopsStatus, OpsZeeopsTutorialsStatus } from './ops/zeeops';
import { User } from './user/main';
import { UserDeploys } from './user/deploys';
import { UserCapturesSpecial, UserCaptures } from './user/captures';
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