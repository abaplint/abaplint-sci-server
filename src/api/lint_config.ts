import * as abaplint from "@abaplint/core";

export interface GetDefaultConfigOutput {
  config: abaplint.Config;
}

const defaultConf: GetDefaultConfigOutput = {
  config: abaplint.Config.getDefault()
};

export function getDefaultConfig(): GetDefaultConfigOutput {
  return defaultConf;
}