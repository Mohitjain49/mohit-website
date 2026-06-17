import { exec, execSync } from "node:child_process";
import readline from "node:readline";
import os from "node:os";

/** This array contains the arguments that can be passed in for this script. */
const args = process.argv.slice(2);

const PORT_NUM = "5700";
const PORT_URL = ("http://localhost:" + PORT_NUM);

const DOCKER_IMAGE = "mohit_website";
const DOCKER_CONTAINER = "mohit_website_main_docker_container";
const DOCKER_START_ARGS = ("--env-file .env --env PORT=" + PORT_NUM + " --env HOST=0.0.0.0 -p " + PORT_NUM + ":" + PORT_NUM);

const DOCKER_BUILD_COMMAND = ("docker build -t " + DOCKER_IMAGE + " .");
const DOCKER_START_COMMAND = ("docker run " + DOCKER_START_ARGS + " --name " + DOCKER_CONTAINER + " " + DOCKER_IMAGE);
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
    var dockerBuildCommandComplete = false;

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
    dockerBuildCommandComplete = true;
    console.log("Starting Docker Instance...");

    const platform = os.platform();
    const openBrowserCommand = (platform === "darwin" ? 'open' : (platform === "win32" ? 'start' : 'xdg-open'));

    const startProcess = exec(DOCKER_START_COMMAND);
    setTimeout(() => { execSync(openBrowserCommand + " " + PORT_URL); }, 1000);

    startProcess.stdout.pipe(process.stdout);
    startProcess.stderr.pipe(process.stderr);
    startProcess.on("error", (err) => { onError(err); });

    process.stdin.resume();
    process.on("SIGINT", () => {
        if(!dockerBuildCommandComplete) { return; }
        try {
            console.log("\n\nGracefully shutting down Docker container...");
            execSync(DOCKER_STOP_COMMAND, { stdio: 'inherit' });
            execSync(DOCKER_REMOVE_COMMAND, { stdio: 'inherit' });

            console.log("Docker Container Shut Down!");
            process.exit(0);
        } catch(err) {
            onError(err);
        }
    });

    process.stdin.on("keypress", (chunk = "", key) => {
        if(!dockerBuildCommandComplete) { return; }
        if((key.name !== "c" || !key.ctrl) && key.name !== "q") { return; }

        // Shuts down the docker instance.
        try {
            console.log("\n\nGracefully shutting down Docker container...");
            execSync(DOCKER_STOP_COMMAND, { stdio: 'inherit' });
            execSync(DOCKER_REMOVE_COMMAND, { stdio: 'inherit' });

            console.log("Docker Container Shut Down!");
            process.exit(0);
        } catch(err) {
            onError(err);
        }
    });
}

// Runs the main function.
main();