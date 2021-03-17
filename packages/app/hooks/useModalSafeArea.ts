import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function useModalSafeArea() {
  const safeArea = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  return {
    height: dimensions.height - safeArea.top - safeArea.bottom - 16,
    width: dimensions.width - safeArea.left - safeArea.right - 16,
    marginTop: safeArea.top + 8,
    marginBottom: safeArea.bottom + 8,
    marginLeft: safeArea.left + 8,
    marginRight: safeArea.right + 8,
  };
}
