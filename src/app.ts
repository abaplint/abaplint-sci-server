import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import { frontPage } from "./front_page";
import api from "./api";
import { addInfoEx } from "./lib/log-tail";

const app  = express();

if (process.env.NODE_ENV !== "test") {
  // app.use(cors());
  app.use(helmet());
  app.use(morgan("common"));
}

app.get("/", (_req, res) => res.send(frontPage()));
app.get("/healthz", (_req, res) => res.send("OK"));
app.use("/api/v1", api);
app.use("*", (req, res) => {
  addInfoEx("unexpected request: " + req.originalUrl);
  res.status(404).send("forbidden");
});

export default app;
