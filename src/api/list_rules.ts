import type { Request, Response } from "express";
import * as abaplint from "@abaplint/core";
import { addInfoEx } from "../lib/log-tail";
import { createSuccessResponseAny } from "./api-types";

export function listRules(_req: Request, res: Response): void {

  const json: {key: string, title: string}[] = [];

  const sorted = abaplint.ArtifactsRules.getRules().sort((a, b) => {
    return a.getMetadata().key.localeCompare(b.getMetadata().key); });

  for (const r of sorted) {
    const meta = r.getMetadata();
    json.push({
      key: meta.key,
      title: meta.title
    });
  }

  addInfoEx("listRules");
  res.json(createSuccessResponseAny(json));
}
