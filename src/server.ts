import * as express from "express";
import {checkObject} from "./check_object";
import {frontPage} from "./front_page";

const info: string[] = [];

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", function (_req, res) {
  res.send(frontPage(info));
});

app.post("/api/v1/check_file", function (req, res) {
  info.push("check_file " + new Date());
  res.json(checkObject(req.body));
});

app.post("/api/v1/ping", function (_req, res) {
  info.push("ping " + new Date());
  res.json({value: "abap is forevah!"});
});

// app.post("/api/v1/check_configuration",
// app.post("/api/v1/get_default_configuration",
// app.post("/api/v1/pretty_print",

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listening on port " + port);
});