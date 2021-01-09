import { useCallback, useState } from "react";
import { LayoutChangeEvent } from "react-native";

export default function useComponentSize(): [
  { width: number; height: number } | null,
  (event: LayoutChangeEvent) => void
] {
  const [size, setSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
}