import dayjs from "dayjs";
import { UserActivityData } from "../components/Activity/Data";
import useCuppaZeeRequest from "./useCuppaZeeRequest";
import useMunzeeRequest from "./useMunzeeRequest";
import { useTeakens } from "./useToken";

export default function useActivity(user_id?: number, day?: string) {
  const teakens = useTeakens();
  const cuppazee = useCuppaZeeRequest<{ data: UserActivityData }>(
    "user/activity",
    {
      user_id,
      day: day ?? dayjs().tz("America/Chicago").format("YYYY-MM-DD"),
    },
    user_id !== undefined && (teakens.data[user_id ?? -1] || teakens.data["*"]) === undefined
  );
  const munzee = useMunzeeRequest(
    "statzee/player/day",
    {
      day: day ?? dayjs().tz("America/Chicago").format("YYYY-MM-DD"),
    },
    user_id !== undefined && (teakens.data[user_id ?? -1] || teakens.data["*"]) !== undefined,
    user_id
  );
  return teakens.data[user_id ?? -1] || teakens.data["*"] ? munzee : cuppazee;
}