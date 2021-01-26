import { NativeModules } from "react-native";
const { SharedStorage } = NativeModules;
interface SharedStorageInterface {
  set(key: string, value: string): void;
  get(key: string, defaultValue: string): Promise<string>;
}
export default SharedStorage as SharedStorageInterface;