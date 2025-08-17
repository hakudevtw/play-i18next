import { DEFAULT_NS } from "@/i18n/settings";
import Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: typeof DEFAULT_NS;
    resources: Resources;
  }
}
