import * as dotenv from "dotenv";
dotenv.config();
import { Command } from "commander";
import { version } from "../package.json";
init();

function init() {
  const commander = new Command();
  commander.version(version);
  commander.option("-v, --verbose", "verbose log output");
  commander.option("-p, --port <port>", "listen at port");
  commander.parse();

  // agrs enjoys the priority
  const opts = commander.opts();
  if (opts.port) {
    process.env.PORT = opts.port;
  }
  if (opts.verbose) {
    process.env.VERBOSE = "1";
  }
}
