import * as abaplint from "@abaplint/core";
import type { Request, Response } from "express";
import { addInfoEx } from "../lib/log-tail";
import { createSuccessResponseAny } from "./api-types";

const defaultConf = abaplint.Config.getDefault();
export type GetDefaultConfigOutput = abaplint.Config;

export function getDefaultConfig(): GetDefaultConfigOutput {
  return defaultConf;
}

export function defaultConfigHandler(_req: Request, res: Response): void {
  addInfoEx("default_config");
  res.json(createSuccessResponseAny(defaultConf));
}
