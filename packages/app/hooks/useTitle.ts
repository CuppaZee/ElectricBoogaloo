import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect } from "react";

export default function useTitle(title: string) {
  const nav = useNavigation();
  const pageOpen = useIsFocused();
  useEffect(() => {
    if(pageOpen) {
      nav.setOptions({title, headerTitle: title.replace(/☕ /g, "")});
    }
  }, [nav, pageOpen, title])
  return;
};