import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { atom, useAtom } from "jotai";
import baseURL from "../baseURL";

const getToken = async (teaken: string, user_id: number) => {
  const response = await fetch(
    `${baseURL}/auth/get/v2?teaken=${encodeURIComponent(
      teaken
    )}&user_id=${encodeURIComponent(user_id)}`
  );
  if (!response.ok) {
    throw new Error("Expired");
  }
  // TODO: FROM value
  return await response.json();
};

export type TeakenData = {
  teaken: string;
  username: string;
};

export const teakensAtom = atom<{
  data: {
    [user_id: string]: TeakenData;
  };
  loaded: boolean;
}>({
  data: {},
  loaded: false,
});

export function useTeakens() {
  const [teakens, setTeakens] = useAtom(teakensAtom);
  useEffect(() => {
    if (!teakens.loaded) {
      AsyncStorage.getItem("CUPPAZEE_TEAKENS").then((data) => {
        setTeakens({
          data: JSON.parse(data || "{}"),
          loaded: true,
        });
      });
    }
  }, [teakens.loaded]);
  return teakens;
}

export default function useToken(user_id?: number) {
  const [teakens, setTeakens] = useAtom(teakensAtom);
  useEffect(() => {
    if (!teakens.loaded) {
      AsyncStorage.getItem("CUPPAZEE_TEAKENS").then((data) => {
        setTeakens({
          data: JSON.parse(data || "{}"),
          loaded: true,
        });
      });
    }
  }, [teakens.loaded]);
  const teaken =
    teakens.data[user_id ?? Object.keys(teakens.data)[0]]?.teaken ??
    teakens.data["*"]?.teaken;
  const data = useQuery(
    ["token", teaken, Number(user_id ?? Object.keys(teakens.data)[0])],
    () => getToken(teaken, Number(user_id ?? Object.keys(teakens.data)[0])),
    {
      enabled: teaken !== undefined,
    }
  );
  return {
    status: (teakens.loaded && teaken) ? (data.isSuccess ? "valid" : (data.isLoading ? "loading" : "expired")) : (teakens.loaded ? "missing" : "loading"),
    user_id: user_id ?? Object.keys(teakens.data)[0],
    token: data.data?.data,
  };
}
