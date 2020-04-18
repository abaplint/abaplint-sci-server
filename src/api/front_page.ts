import * as abaplint from "@abaplint/core";
import * as os from "os";
import { getLogTail } from "../lib/log-tail";

function osInfo(): string {
  return "load: " + os.loadavg() + "<br>" +
    "uptime: " + os.uptime() + "<br>" +
    "freemem: " + os.freemem() + "<br>" +
    "hostname: " + os.hostname() + "<br>" +
    "platform: " + os.platform() + "<br>" +
    "cpus: " + JSON.stringify(os.cpus()) + "<br>";
}

function renderLogTail(): string {
  if (process.env.ALB_SUPPRESS_FRONPAGE_LOG === "1") {
    return "";
  } else {
    const info = getLogTail();
    return info.join("<br>");
  }
}

export function renderFrontPage(): string {
  return `<!DOCTYPE html>
<html>
  <head>
    <title>abaplint backend</title>
  </head>
  <body>
    <p>abaplint: ${abaplint.Registry.abaplintVersion()}</p>
    <hr>
    ${osInfo()}
    <hr>
    ${renderLogTail()}
  </body>
</html>
`;
}
