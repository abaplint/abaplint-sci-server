import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import { renderFrontPage } from "./api/front_page";
import api from "./api";
import { addInfoEx } from "./lib/log-tail";
import * as path from "path";
import * as favicon from "serve-favicon";
import * as abaplint from "@abaplint/core";

const app  = express();

if (process.env.NODE_ENV !== "test") {
  // app.use(cors());
  app.use(helmet());
  if (process.env.VERBOSE === "1") {
    app.use(morgan(function (tokens, req, res): string {
      const log = [
        [
          tokens.method(req, res),
          tokens.url(req, res),
          tokens.status(req, res),
        ].join(" "),
        [
          " ",
          `in: ${tokens.res(req, res, "content-length") || "-"},`,
          `out: ${tokens.req(req, res, "content-length") || "-"},`,
          `time: ${tokens["response-time"](req, res)} ms`,
        ].join(" "),
      ];
      if (req && req.originalUrl === "/api/v1/check_file" && req.body && req.body.object) {
        log.push([" ", "obj:", req.body.object.objectType, req.body.object.objectName].join(" "));
      }
      return log.join("\n");
    }));
  } else {
    app.use(morgan(":method :url :status :res[content-length] - :response-time ms"));
  }
}

// add abaplint version as header field to all replies
app.use(function(_req, res, next) {
  res.setHeader("x-abaplint-version", abaplint.Registry.abaplintVersion());
  next();
});

app.use(favicon(path.join(__dirname, "..", "public", "favicon.ico")));
app.get("/", (_req, res) => res.send(renderFrontPage()));
app.get("/healthz", (_req, res) => res.send("OK"));
app.use("/api/v1", api);
app.use("*", (req, res) => {
  addInfoEx("unexpected request: " + req.originalUrl);
  res.status(404).send("forbidden");
});

export default app;
