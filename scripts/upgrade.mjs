import { execSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import readline from 'node:readline/promises';

/** This function contains the arguments taht can be passed in for this script. */
const args = process.argv.slice(2);

/** This records user input in the terminal so users can choose options as they progress through the function. */
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * This function runs an NPM Command.
 * @param {String} command The NPM command to run.
 */
function runCommand(command) {
    console.log("Running Command \"" + command + "\"...");
    execSync(command, { stdio: 'inherit' });
    console.log("\n\n");
}

/**
 * This function checks to see if an argument exists in the "args" array and returns the result.
 * @param {String} mainArg The argument passed into the command.
 */
function checkForArg(mainArg = "") {
    return (args.findIndex(item => item === mainArg) != -1)
}

/**
 * This function returns a spinner to show while the script is running to mimic loading.
 * @param {String} text The text to display while the spinner is running.
 */
function createSpinner(text) {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    process.stdout.write("\u001B[?25l");

    const timer = setInterval(() => {
        const frame = frames[i = ++i % frames.length];
        process.stdout.write(`\r${frame} ${text}`);
    }, 80);

    return { succeed(endText) {
        clearInterval(timer);
        process.stdout.write(`\r✅ ${endText}\n`);
        process.stdout.write("\u001B[?25h");
    }}
}

/**
 * This function removes a file or directory from this project.
 * @param {String} path The path to the file or directory.
 * @param {Boolean} directory If true, the path leads to a directory.
 */
async function removeFileOrDirectory(path = "", directory = false) {
    const innerRmMessage = (directory ? ("the \"" + path + "\" folder") : ("\"" + path + "\""));
    const removeSpinner = createSpinner("Deleting " + innerRmMessage + "...");
    await rm(path, { recursive: true, force: true });
    removeSpinner.succeed("Deleted " + innerRmMessage + "!");
}

/** This function is the core of the file and handles all the upgrade requirements. */
async function main() {
    try {
        // This section handles asking for and dependencies to reject for the next step.
        var rejectDepsBool = (checkForArg("--exclude-deps") ? true : (checkForArg("--skip-exclude-deps") ? false : null));
        const rejectDepsQuestion = 'Do you want to exclude any dependencies from being updated? (y/n): ';

        if(rejectDepsBool == null) {
            runCommand('npx npm-check-updates');
            const rejectDeps = await rl.question(rejectDepsQuestion);
            rejectDepsBool = (rejectDeps.toLowerCase() === "y" || rejectDeps.toLowerCase() === "yes");
        } else {
            console.log(rejectDepsQuestion + (rejectDepsBool ? 'yes' : 'no'));
        }

        /** @type {Array<String>} An array that stores all the dependencies to not update. */
        const rejectDepsArray = [];

        if(rejectDepsBool) {
            var rejectDepsInput = "";
            while(rejectDepsInput != "_stop_" && rejectDepsInput != "_no_") {
                rejectDepsInput = await rl.question('Type in the name of a package, or the string \"_stop_\" if you would like to stop: ');
                if(rejectDepsInput != "_stop_" && rejectDepsInput != "_no_") { rejectDepsArray.push(rejectDepsInput.toLowerCase()); }
            }
            console.log("✅ Packages Recorded.\n\n")
        } else {
            console.log("🛑 Will Not Ignore Any Dependencies.\n\n");
        }

        var rejectDepsCommandOption = "";
        if(rejectDepsArray.length > 0) {
            rejectDepsCommandOption = " --reject ";
            rejectDepsArray.forEach((item) => { rejectDepsCommandOption += (item + ","); });
            rejectDepsCommandOption = rejectDepsCommandOption.substring(0, rejectDepsCommandOption.length - 1);
        }

        // This section handles updating the current dependencies on the Vue.js project.
        var updateDepsBool = (checkForArg("--update-deps") ? true : checkForArg("--skip-update-deps") ? false : null);
        const updateDepsQuestion = 'Do you want to update the dependencies? (y/n): ';

        if(updateDepsBool == null) {
            if(rejectDepsCommandOption !== "") { runCommand('npx npm-check-updates' + rejectDepsCommandOption); }
            const updateDeps = await rl.question(updateDepsQuestion);
            updateDepsBool = (updateDeps.toLowerCase() === "y" || updateDeps.toLowerCase() === "yes");
        } else {
            console.log(updateDepsQuestion + (updateDepsBool ? 'yes' : 'no'));
        }

        if(updateDepsBool) {
            runCommand('npx npm-check-updates --upgrade' + rejectDepsCommandOption);
            console.log("✅ Dependencies Ready To Install!\n\n")
        } else {
            console.log("🛑 Will Not Update Dependencies.\n\n");
        }

        // This section handles updating the Version Number.
        var updateVersionBool = (checkForArg("--update-version") ? true : (checkForArg("--skip-update-version") ? false : null));
        const updateVersionQuestion = 'Do you want to update Your Website\'s version number? (y/n): ';

        if(updateVersionBool == null) {
            const updateVersion = await rl.question(updateVersionQuestion);
            updateVersionBool = (updateVersion.toLowerCase() === "y" || updateVersion.toLowerCase() === "yes");
        } else {
            console.log(updateVersionQuestion + (updateVersionBool ? 'yes' : 'no'));
        }

        if(updateVersionBool) {
            const versionPattern = /^\d+\.\d+\.\d+$/;
            var versionType = await rl.question('Please Enter the Version Number Here (M.m.p): ');

            while(!versionPattern.test(versionType) && versionType != "patch" && versionType != "minor" && versionType != "major" && versionType != "same") {
                versionType = await rl.question('Invalid Input. Please Try Again (M.m.p): ');
            }
            if(versionType === "same") {
                versionType = JSON.parse(await readFile('./package.json', 'utf-8')).version;
            }

            // This uses the "npm version" command to update the project version.
            runCommand(`npm version ${versionType} --no-git-tag-version --allow-same-version`);
            const packageData = JSON.parse(await readFile('./package.json', 'utf-8'));

            // Updates the version.json file.
            const versionJsonSpinner = createSpinner("Updating version.json...");
            const newVersion = packageData.version;

            await writeFile("./public/version.json", JSON.stringify({ version: newVersion }), 'utf8');
            versionJsonSpinner.succeed("Updated version.json!!");

            // Updates the vite.config.js file.
            const viteConfigSpinner = createSpinner("Updating pwa.config.ts...");
            const content = await readFile("./pwa.config.ts", 'utf8');
            const updatedContent = content.replace(/v\d+\.\d+\.\d+-\$\{Date\.now\(\)\}/, `v${newVersion}-\${Date.now()}`);

            await writeFile("./pwa.config.ts", updatedContent, 'utf8');
            viteConfigSpinner.succeed("Updated PWA Config File!!");
            console.log("\n\n");
        } else {
            // A message to show if the user declined.
            console.log("🛑 Will Not Update Version Number.\n\n");
        }

        // This section handles recreating node_modules and package-lock.json with a fresh dependency install.
        var confirmInstallBool = (checkForArg("--install-deps") ? true : (checkForArg("--skip-install-deps") ? false : null));
        const confirmInstallQuestion = 'Confirm Install Dependencies? (y/n): ';

        if(confirmInstallBool == null) {
            const confirmInstall = await rl.question(confirmInstallQuestion);
            confirmInstallBool = (confirmInstall.toLowerCase() === "y" || confirmInstall.toLowerCase() === "yes");
        } else {
            console.log(confirmInstallQuestion + (confirmInstallBool ? 'yes' : 'no'));
        }
        
        if(confirmInstallBool) {
            const TO_BE_REMOVED = [
                { path: "./package-lock.json", directory: false },
                { path: "./build-info.json", directory: false },
                { path: "./.data", directory: true },
                { path: "./.nuxt", directory: true },
                { path: "./.output", directory: true },
                { path: "./dist", directory: true },
                { path: "./node_modules", directory: true },
            ];

            for(let i = 0; i < TO_BE_REMOVED.length; i++) {
                const itemToBeRemoved = TO_BE_REMOVED[i];
                await removeFileOrDirectory(itemToBeRemoved.path, itemToBeRemoved.directory);
            }

            // Installs all dependencies again.
            console.log("\n\n");
            runCommand("npm install");
        } else {
            console.log("🛑 Will Not Reinstall dependencies.\n\n");
        }

        // This section handles updating the Git Hooks.
        var updateGitHooksBool = (checkForArg("--update-git-hooks") ? true : (checkForArg("--skip-update-git-hooks") ? false : null));
        const updateGitHooksQuestion = 'Update Git Hooks (y/n): ';

        if(updateGitHooksBool == null) {
            const updateGitHooks = await rl.question(updateGitHooksQuestion);
            updateGitHooksBool = (updateGitHooks.toLowerCase() === "y" || updateGitHooks.toLowerCase() === "yes");
        } else {
            console.log(updateGitHooksQuestion + (updateGitHooksBool ? 'yes' : 'no'));
        }

        if(updateGitHooksBool) {
            runCommand('npm run update-git-hooks');
            console.log("✅ Updated Git Hooks!")
        } else {
            console.log("🛑 Will Not Update Git Hooks.\n\n");
        }

        // This section marks the end of the upgrade script and ends the process.
        console.log("🏁 Processes Ended Successfully.");
        process.exit(0);
    } catch(error) {
        console.error(error);
        console.error('\n❌ Update failed. Check the errors above.');
        process.exit(1);
    }
}

// Runs the main function.
await main();