import { StatzeePlayerDay } from "@cuppazee/api/statzee/player/day";
import dayjs from "dayjs";
import useCuppaZeeRequest from "./useCuppaZeeRequest";
import useMunzeeRequest from "./useMunzeeRequest";
import { useTeakens } from "./useToken";

export default function useActivity(user_id?: number, day?: string) {
  const teakens = useTeakens();
  const cuppazee = useCuppaZeeRequest<{ data: StatzeePlayerDay["response"]["data"] }>(
    "user/activity",
    {
      user_id,
      day: day ?? dayjs.mhqNow().format("YYYY-MM-DD"),
    },
    user_id !== undefined && (teakens.data[user_id ?? -1] || teakens.data["*"]) === undefined
  );
  const munzee = useMunzeeRequest(
    "statzee/player/day",
    {
      day: day ?? dayjs.mhqNow().format("YYYY-MM-DD"),
    },
    user_id !== undefined && (teakens.data[user_id ?? -1] || teakens.data["*"]) !== undefined,
    user_id
  );
  return teakens.data[user_id ?? -1] || teakens.data["*"] ? munzee : cuppazee;
}