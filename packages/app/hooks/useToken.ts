import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { atom, useAtom } from "jotai";

const getToken = async (teaken: string, user_id: number) => {
  const response = await fetch(
    `https://server.beta.cuppazee.app/auth/get/v2?teaken=${encodeURIComponent(
      teaken
    )}&user_id=${encodeURIComponent(user_id)}`
  );
  // TODO: Error Handling
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

export default function useToken(user_id?: number) {
  const [teakens, setTeakens] = useAtom(teakensAtom);
  useEffect(() => {
    if (!teakens.loaded) {
      AsyncStorage.getItem("CUPPAZEE_TEAKENS").then((data) =>{
        console.log('Teakens',data);
        setTeakens({
          data: JSON.parse(data || "{}"),
          loaded: true,
        })
      }
      );
    }
  }, [teakens.loaded]);
  return useQuery(
    ["token", teakens.data[user_id ?? Object.keys(teakens.data)[0]]?.teaken, user_id],
    () =>
      getToken(
        teakens.data[user_id ?? Object.keys(teakens.data)[0]].teaken,
        Number(user_id ?? Object.keys(teakens.data)[0])
      ),
    {
      enabled:
        teakens.data[user_id ?? Object.keys(teakens.data)[0]] !== undefined,
    }
  );
}
