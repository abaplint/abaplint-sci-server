import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import { renderFrontPage } from "./api/front_page";
import api from "./api";
import { addInfoEx } from "./lib/log-tail";
import * as path from "path";
import * as favicon from "serve-favicon";

const app  = express();

if (process.env.NODE_ENV !== "test") {
  // app.use(cors());
  app.use(helmet());
  app.use(morgan("common"));
}

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.get("/", (_req, res) => res.send(renderFrontPage()));
app.get("/healthz", (_req, res) => res.send("OK"));
app.use("/api/v1", api);
app.use("*", (req, res) => {
  addInfoEx("unexpected request: " + req.originalUrl);
  res.status(404).send("forbidden");
});

export default app;
