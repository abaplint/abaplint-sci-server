import * as abaplint from "@abaplint/core";

const defaultConf = abaplint.Config.getDefault();
export type GetDefaultConfigOutput = abaplint.Config;

export function getDefaultConfig(): GetDefaultConfigOutput {
  return defaultConf;
}