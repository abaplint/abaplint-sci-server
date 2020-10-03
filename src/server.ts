#!/usr/bin/env node
import "./envargs"; // must be topmost
import app from "./app";
import type { Server } from "http";

const port = process.env.PORT || 3000;
let server: Server | null = null;

function shutdown(server: Server | null, code = 0): void {
  if (server) {
    server.close((err) => {
      if (err) {
        console.error(err);
        code = 1;
      }
      process.exit(code);
    });
  } else {
    process.exit(code);
  }
}

// quit on ctrl-c when running docker in terminal
process.on("SIGINT", () => {
  console.log("Got SIGINT. Graceful shutdown.", new Date().toISOString());
  shutdown(server);
});

// quit properly on docker stop
process.on("SIGTERM", () => {
  console.log("Got SIGTERM. Graceful shutdown.", new Date().toISOString());
  shutdown(server);
});

process.on("unhandledRejection", (reason) => {
  console.log("CRASH! unhandledRejection:", reason);
  shutdown(server, 1);
});

server = app.listen(port, () => {
  console.log("listening on port: " + port);
});
