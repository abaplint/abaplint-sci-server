import * as express from "express";
import {checkObject} from "./check_object";
import {frontPage} from "./front_page";

const info: string[] = [];

function addInfo(s: string): void {
  info.push(s);
  if (info.length > 10) {
    info.shift();
  }
}

const app = express();
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: false}));

app.get("/", function (_req, res) {
  res.send(frontPage(info));
});

app.post("/api/v1/check_file", function (req, res) {
  const result = checkObject(req.body);
  addInfo("check_file, " +
    result.object.objectType + " " +
    result.object.objectName + ", " +
    result.issues.length + " issues, " +
    new Date() + ", " +
     req.socket.bytesRead + " bytes");
  res.json(result);
});

app.post("/api/v1/ping", function (_req, res) {
  addInfo("ping, " + new Date());
  res.json({value: "abap is forevah!"});
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/get_default_configuration",
// app.post("/api/v1/pretty_print",

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listening on port " + port);
});
