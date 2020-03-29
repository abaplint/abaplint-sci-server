import * as abaplint from "@abaplint/core";
import * as os from "os";

function osInfo(): string {
  return "load: " + os.loadavg() + "<br>" +
    "uptime: " + os.uptime() + "<br>" +
    "freemem: " + os.freemem() + "<br>" +
    "hostname: " + os.hostname() + "<br>" +
    "platform: " + os.platform() + "<br>" +
    "cpus: " + JSON.stringify(os.cpus()) + "<br>";
}

export function frontPage(info: string[]): string {
  return "abaplint: " + abaplint.Registry.abaplintVersion() + "<br>" +
    "<hr>" +
    osInfo() +
    "<hr>" +
    info.join("<br>");
}