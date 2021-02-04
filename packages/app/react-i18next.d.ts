import {TranslationFormat} from "./lang/data";

declare module "react-i18next" {
  type DefaultResources = TranslationFormat;
  interface Resources extends DefaultResources {}
}
