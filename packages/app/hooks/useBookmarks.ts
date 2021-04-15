import useSetting, { atom, Setting } from "./useSetting";

export type ClanBookmark = {
  clan_id: number;
  name: string;
  tagline: string;
};

export type UserBookmark = {
  user_id: string;
  username: string;
};

export const ClanBookmarksAtom = atom<Setting<ClanBookmark[]>>({
  data: [],
  loaded: false,
  key: "CLAN_BOOKMARKS",
});

export const UserBookmarksAtom = atom<Setting<UserBookmark[]>>({
  data: [],
  loaded: false,
  key: "USER_BOOKMARKS",
});

export function useUserBookmarks() {
  return useSetting(UserBookmarksAtom);
}

export function useClanBookmarks() {
  return useSetting(ClanBookmarksAtom);
}
