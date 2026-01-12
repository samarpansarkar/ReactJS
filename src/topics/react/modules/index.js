import { coreHooks } from "./core";
import { advancedHooks } from "./advanced";
import { concurrentHooks } from "./concurrent";
import { patterns } from "./patterns";

const STUDY_SECTIONS = [
  ...coreHooks,
  ...advancedHooks,
  ...concurrentHooks,
  ...patterns,
];

export default STUDY_SECTIONS;
