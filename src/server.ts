import * as express from "express";
import * as abaplint from "abaplint";
import * as os from "os";
import { checkObject } from "./check_object";

const app = express();
app.use(express.json());
app.use (express.urlencoded({extended: false}));

app.get("/", function (_req, res) {

  const response = "abaplint: " + abaplint.Registry.abaplintVersion() + "<br>" +
    "<hr>" +
    "load: " + os.loadavg() + "<br>" +
    "uptime: " + os.uptime() + "<br>" +
    "freemem: " + os.freemem() + "<br>" +
    "hostname: " + os.hostname() + "<br>" +
    "platform: " + os.platform() + "<br>" +
    "cpus: " + JSON.stringify(os.cpus()) + "<br>";
  res.send(response);
});

app.post("/api/v1/check_file", function (req, res) {
  res.send(JSON.stringify(checkObject(req.body), null, 2));
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/default_configuration",
// app.post("/api/v1/pretty_print",
// app.post("/api/v1/ping",

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listening on port " + port);
});