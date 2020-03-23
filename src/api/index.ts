import * as express from "express";
import {checkObject} from "./check_object";

const router = express.Router();

router.use(express.json({limit: "50mb"}));
router.use(express.urlencoded({limit: "50mb", extended: false}));

router.post("/ping", (_req, res) => {
  // addInfo("ping, " + new Date());
  res.json({ success: true, payload: "abap is forevah!" });
});

router.post("/check_file", (req, res) => {
  // TODO validate request
  // TODO define response type ?
  const result = checkObject(req.body);
  // addInfo("check_file, " +
  //   result.object.objectType + " " +
  //   result.object.objectName + ", " +
  //   result.issues.length + " issues, " +
  //   new Date() + ", " +
  //    req.socket.bytesRead + " bytes");
  res.json(result);
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/get_default_configuration",
// app.post("/api/v1/pretty_print",

router.all("*", (_req, res) => {
  return res.status(404).json({ success: false, error: { message: "Wrong API call" } });
});

export default router;
