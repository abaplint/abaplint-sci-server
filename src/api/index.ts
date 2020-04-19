import * as express from "express";
import {checkObject} from "./check_object";
import { addInfoEx } from "../lib/log-tail";

const router = express.Router();

router.use(express.json({limit: "50mb"}));
router.use(express.urlencoded({limit: "50mb", extended: false}));

router.post("/ping", (_req, res) => {
  addInfoEx("ping");
  res.json({ success: true, payload: "abap is forevah!" });
});

router.post("/check_file", (req, res) => {
  // TODO validate request
  // TODO define response type ?
  // TODO capture exceptions, return json with error
  const hrstart = process.hrtime();
  const result = checkObject(req.body);
  const hrend = process.hrtime(hrstart);
  addInfoEx([
    "check_file",
    result.object.objectType,
    result.object.objectName,
    `${result.issues.length} issues`,
    `${req.socket.bytesRead} bytes`,
    `${(hrend[0] * 1000 + hrend[1] / 1000000).toFixed()} ms`,
  ]);
  res.json(result);
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/get_default_configuration",
// app.post("/api/v1/pretty_print",

router.all("*", (req, res) => {
  addInfoEx("unexpected API call: " + req.originalUrl);
  res.status(404).json({ success: false, error: { message: "Wrong API call" } });
});

export default router;
