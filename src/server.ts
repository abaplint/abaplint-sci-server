import * as express from "express";
import * as abaplint from "abaplint";

const app = express();

app.get("/", function (_req, res) {
  res.send("abaplint: " + abaplint.Registry.abaplintVersion());
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("listening on port " + port);
});