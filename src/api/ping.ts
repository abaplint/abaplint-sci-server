import type { Request, Response } from "express";
import { Registry } from "@abaplint/core";
const { abaplintVersion } = Registry;
import { addInfoEx } from "../lib/log-tail";
import { createSuccessStringResponse } from "./api-types";

export function pingHandler(_req: Request, res: Response): void {
  addInfoEx("ping");
  res.json(createSuccessStringResponse(`Server is OK, abaplint version = ${abaplintVersion()}`));
}
