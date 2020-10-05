import type { Request, Response } from "express";
import { createSuccessResponseAny } from "./api-types";
import { checkObject } from "../lib/check_object";
import { addInfoEx } from "../lib/log-tail";

export function checkFileHandler(req: Request, res: Response): void {
  // TODO validate request
  let hrstart, result, hrend;
  try {
    hrstart = process.hrtime();
    result = checkObject(req.body);
    hrend = process.hrtime(hrstart);
  } catch (err) {
    err.message = "[abaplint] " + err.message;
    throw err;
  }

  addInfoEx([
    "check_file",
    result.object.objectType,
    result.object.objectName,
    `${result.issues.length} issues`,
    `${req.socket.bytesRead} bytes`,
    `${(hrend[0] * 1000 + hrend[1] / 1000000).toFixed()} ms`,
  ]);
  res.json(createSuccessResponseAny(result));
}
