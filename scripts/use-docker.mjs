import { exec, execSync } from "node:child_process";
import readline from "node:readline";
import os from "node:os";

/** This array contains the arguments that can be passed in for this script. */
const args = process.argv.slice(2);

const DOCKER_IMAGE = "mohit_website";
const DOCKER_CONTAINER = "mohit_website_main_docker_container";
const PORT_URL = "http://localhost:5000";

const DOCKER_BUILD_COMMAND = ("docker build -t " + DOCKER_IMAGE + " .");
const DOCKER_START_COMMAND = ("docker run --env-file .env -p 5000:5000 --name " + DOCKER_CONTAINER + " " + DOCKER_IMAGE);
const DOCKER_STOP_COMMAND = ("docker stop " + DOCKER_CONTAINER);
const DOCKER_REMOVE_COMMAND = ("docker rm " + DOCKER_CONTAINER);

readline.emitKeypressEvents(process.stdin);
if(process.stdin.isTTY) { process.stdin.setRawMode(true); }

/**
 * This function is ran if an error occurs.
 * @param {import("node:child_process").ExecException} error The error itself. 
 */
function onError(error) {
    console.error(error);
    process.exit(1);
}

/** This function runs the main logic for this script. */
function main() {
    var dockerBuilt = false;

    // This figures out if the docker instance needs to be built.
    try {
        if(-1 != args.findIndex((item) => { return (item === "--force-build"); })) { throw new Error("FORCE_DOCKER_BUILD"); }
        dockerBuilt = (execSync(`docker images -q ${DOCKER_IMAGE}`, { encoding: 'utf8' }).trim().length > 0);
    } catch(err) {
        if(err.message !== "FORCE_DOCKER_BUILD") {
            console.error(err);
            console.log("\n\n");
        }
        dockerBuilt = false;
    }

    // This builds the docker instance if necessary.
    if(!dockerBuilt) {
        try {
            execSync(DOCKER_BUILD_COMMAND, { stdio: "inherit" });
        } catch(err) {
            onError(err);
        }
    }

    // This runs the docker instance.
    const platform = os.platform();
    const openBrowserCommand = (platform === "darwin" ? 'open' : (platform === "win32" ? 'start' : 'xdg-open'));

    const startProcess = exec(DOCKER_START_COMMAND);
    setTimeout(() => { execSync(openBrowserCommand + " " + PORT_URL); }, 1000);

    startProcess.stdout.pipe(process.stdout);
    startProcess.stderr.pipe(process.stderr);
    startProcess.on("error", (err) => { onError(err); });

    process.stdin.resume();
    process.stdin.on("keypress", (chunk = "", key) => {
        /** @type {String} The name of the key that was pressed. */
        const name = key.name;
        if(key.name !== "c" || !key.ctrl) { return; }

        // Shuts down the docker instance.
        console.log("\n\nGracefully shutting down Docker container...");
        const stopProcess = exec(DOCKER_STOP_COMMAND);
        stopProcess.on("error", (err) => { onError(err); });

        stopProcess.on("close", async() => {
            await new Promise((resolve, reject) => setTimeout(() => { resolve("Timeout complete."); }, 250));
            const rmProcess = exec(DOCKER_REMOVE_COMMAND, (err) => {
                if(err) { onError(err); }
                console.log("Docker Container Shut Down!");
                process.stdout.write('\r\n');
                process.exit(0);
            });
        });
    });
}

// Runs the main function.
main();