import * as express from "express";
import * as morgan from "morgan";
import * as helmet from "helmet";
import { frontPage } from "./front_page";
import api from "./api";

const app  = express();

// const info: string[] = [];

// function addInfo(s: string): void {
//   info.push(s);
//   if (info.length > 10) {
//     info.shift();
//   }
// }

if (process.env.NODE_ENV !== "test") {
  // app.use(cors());
  app.use(helmet());
  app.use(morgan("common"));
}

app.get("/", (_req, res) => res.send(frontPage([])));
app.get("/healthz", (_req, res) => res.send("FAIL"));
app.use("/api/v1", api);
app.use("*", (_req, res) => res.status(404).send("forbidden") );

export default app;
