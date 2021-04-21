import { useState, useEffect } from "react";
import { useUserBookmarks } from "../../hooks/useBookmarks";
import { useTeakens } from "../../hooks/useToken";

export default function useUsernameSelect() {
  const teakens = useTeakens();
  const [users] = useUserBookmarks();
  const [username, setUsername] = useState(
    users?.find(i => teakens.data[i.user_id])?.username || "-- Select a User --"
  );
  useEffect(() => {
    if (username === "-- Select a User --" && users?.length > 0 && teakens.loaded) {
      setUsername(users.find(i => teakens.data[i.user_id])?.username || "-- Select a User --");
    }
  }, [users, teakens]);
  return [
    username === "-- Select a User --" ? undefined : username,
    {
      value: username || "",
      onValueChange: (value: string) => setUsername(value),
      options: Object.entries(teakens.data).map(i => ({
        value: i[1].username,
        label: i[1].username,
      })),
    },
  ] as const;
}
