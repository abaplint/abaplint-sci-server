import * as express from "express";
import * as abaplint from "abaplint";
import { checkObject } from "./check_object";

const app = express();
app.use(express.json());
app.use (express.urlencoded({extended: false}));

app.get("/", function (_req, res) {
  res.send("abaplint: " + abaplint.Registry.abaplintVersion());
});

app.post("/api/v1/check_file", function (req, res) {
  res.send(JSON.stringify(checkObject(req.body), null, 2));
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/default_configuration",
// app.post("/api/v1/pretty_print",

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listening on port " + port);
});