import * as express from "express";
import { createErrorResponse } from "./api-types";
import { addInfoEx } from "../lib/log-tail";

import { checkFileHandler } from "./check_file";
import { defaultConfigHandler } from "./lint_config";
import { pingHandler } from "./ping";
import { listRules } from "./list_rules";

const router = express.Router();

router.use(express.json({limit: "50mb"}));
router.use(express.urlencoded({limit: "50mb", extended: false}));

router.get("/ping", pingHandler);
router.get("/list_rules", listRules);
router.get("/default_config", defaultConfigHandler);
router.post("/check_file", checkFileHandler);

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
