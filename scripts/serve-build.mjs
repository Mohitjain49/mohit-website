/* -------------------------------------------------------------------------------------
To use this script, run the following commands first:
"npm build" - creates production build, results in 404 without a build to serve.
To use a custom port, run "npm run serve -- --port {port goes here}"
------------------------------------------------------------------------------------- */

import http from "node:http";
import fs from "node:fs";
import handler from "serve-handler";
import { execSync } from 'node:child_process';

/** This array contains the arguments that can be passed in for this script. */
const args = process.argv.slice(2);
const PUBLIC_DIR = ".output/public";
const DEFAULT_PORT = 3007;

/** @type {http.Server} This holds the server instance that the script holds. */
var server = null;
var isShuttingDown = false;

/** This function gets the port the http server should use. */
function getPort() {
    const portArg = args.indexOf("--port");
    if(portArg == -1 || portArg >= (args.length - 1)) { return DEFAULT_PORT; }
    const potentialPort = parseInt(args[portArg + 1]);
    return (Number.isNaN(potentialPort) ? DEFAULT_PORT : potentialPort);
}

/**
 * This function properly shuts down the server.
 * @param {String} signal The signal used to end the script.
 */
function shutdownServer(signal) {
    if(isShuttingDown || !server) { return; }
    isShuttingDown = true;
    console.log(`\nReceived ${signal}. Closing server...`);

    const forceExitTimer = setTimeout(() => {
        console.error("Server did not close in time. Forcing exit.");
        process.exit(1);
    }, 5000);

    server.close((error) => {
        clearTimeout(forceExitTimer);

        if(error) {
            console.error("Error while closing server:", error);
            process.exit(1);
        } else {
            console.log("Server closed successfully.");
            process.exit(0);
        }
    });

    if(typeof server.closeIdleConnections === "function") { server.closeIdleConnections(); }
    if(typeof server.closeAllConnections === "function") { server.closeAllConnections(); }
}

/** This function runs the main JS for the script. */
function main() {
    const PORT = getPort();
    server = http.createServer((request, response) => {
        return handler(request, response, { public: PUBLIC_DIR });
    });

    process.on("SIGINT", () => shutdownServer("SIGINT"));
    process.on("SIGTERM", () => shutdownServer("SIGTERM"));

    server.listen(PORT, () => {
        const url = `http://localhost:${PORT}`;
        console.log(`Serving ${PUBLIC_DIR}`);
        console.log(`Server running at ${url}`);

        const platform = process.platform;
        const command = ((platform === "win32") ? "start" : ((platform === "darwin") ? "open" : "xdg-open"));
        execSync(command + " " + url);
    });
}

// Runs the main function.
main();