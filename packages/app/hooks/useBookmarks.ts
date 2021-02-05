import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { atom, useAtom } from "jotai";

export type ClanBookmark = {
  clan_id: number;
  name: string;
  tagline: string;
};

export type UserBookmark = {
  user_id: string;
  username: string;
};

export const clanBookmarksAtom = atom<{
  data: ClanBookmark[];
  loaded: boolean;
}>({
  data: [],
  loaded: false,
});

export const userBookmarksAtom = atom<{
  data: UserBookmark[];
  loaded: boolean;
}>({
  data: [],
  loaded: false,
});

export function useUserBookmarks() {
  const [user, setUser] = useAtom(userBookmarksAtom);
  useEffect(() => {
    if (!user.loaded) {
      AsyncStorage.getItem("USER_BOOKMARKS").then((data) => {
        setUser({
          data: JSON.parse(
            data ||
              `[]`
          ),
          loaded: true,
        });
      });
    }
  }, [user.loaded]);
  return [user.loaded ? user.data : [], setUser] as const;
}

export function useClanBookmarks() {
  const [clan, setClan] = useAtom(clanBookmarksAtom);
  useEffect(() => {
    if (!clan.loaded) {
      AsyncStorage.getItem("CLAN_BOOKMARKS").then((data) => {
        setClan({
          data: JSON.parse(data || "[]"),
          loaded: true,
        });
      });
    }
  }, [clan.loaded]);
  return [clan.loaded ? clan.data : null, setClan] as const;
}
