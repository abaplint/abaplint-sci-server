import * as express from "express";
import { checkObject, CheckObjectOutput } from "./check_object";
import { getDefaultConfig, GetDefaultConfigOutput } from "./lint_config";
import { addInfoEx } from "../lib/log-tail";
import { pingHandler } from "./ping";
import {
  createErrorResponse,
  createSuccessResponse,
} from "./api-types";
import { listRules } from "./list_rules";

const router = express.Router();

router.use(express.json({limit: "50mb"}));
router.use(express.urlencoded({limit: "50mb", extended: false}));

router.get("/ping", pingHandler);
router.get("/list_rules", listRules);

router.get("/default_config", (_,res) => {
  addInfoEx("default_config");
  const defaultConfig = getDefaultConfig();
  res.json(createSuccessResponse<GetDefaultConfigOutput>(defaultConfig));
});

router.post("/check_file", (req, res) => {
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
  res.json(createSuccessResponse<CheckObjectOutput>(result));
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/pretty_print",

router.all("*", (req, res) => {
  addInfoEx("unexpected API call: " + req.originalUrl);
  res.status(404).json(createErrorResponse("Wrong API call"));
});

router.use((err: Error, _req: express.Request, res: express.Response, next: express.NextFunction) => {
  res.status(500).json(createErrorResponse(err.message));
  next(err);
});

export default router;
