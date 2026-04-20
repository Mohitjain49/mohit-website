import { execSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import readline from 'node:readline/promises';

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
};

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

/** This function is the core of the file and handles all the upgrade requirements. */
async function main() {
    try {
        // This section handles asking for and dependencies to reject for the next step.
        runCommand('npx npm-check-updates');
        const rejectDeps = await rl.question('Do you want to exclude any dependencies from being updated? (y/n): ');
        const rejectDepsBool = (rejectDeps.toLowerCase() === "y" || rejectDeps.toLowerCase() === "yes");

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
        if(rejectDepsCommandOption !== "") { runCommand('npx npm-check-updates' + rejectDepsCommandOption); }
        const updateDeps = await rl.question('Do you want to update the dependencies? (y/n): ');
        const updateDepsBool = (updateDeps.toLowerCase() === "y" || updateDeps.toLowerCase() === "yes");

        if(updateDepsBool) {
            runCommand('npx npm-check-updates --upgrade' + rejectDepsCommandOption);
            console.log("✅ Dependencies Ready To Install!\n\n")
        } else {
            console.log("🛑 Will Not Update Dependencies.\n\n");
        }

        // This section handles updating the Version Number.
        const updateVersion = await rl.question('Do you want to update Your Website\'s version number? (y/n): ');
        const updateVersionBool = (updateVersion.toLowerCase() === "y" || updateVersion.toLowerCase() === "yes");

        if(updateVersionBool) {
            const versionPattern = /^\d+\.\d+\.\d+$/;
            var versionType = await rl.question('Please Enter the Version Number Here (M.m.p): ');

            while(!versionPattern.test(versionType) && versionType != "patch" && versionType != "minor" && versionType != "major") {
                versionType = await rl.question('Invalid Input. Please Try Again (M.m.p): ');
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

        // This section handles recreating node_modules and package-lock.json.
        const confirmInstall = await rl.question('Confirm Install Dependencies? (y/n): ');
        const confirmInstallBool = (confirmInstall.toLowerCase() === "y" || confirmInstall.toLowerCase() === "yes");
        
        if(confirmInstallBool) {
            const packageLockSpinner = createSpinner("Deleting package-lock.json...");
            await rm("./package-lock.json", { recursive: true, force: true });
            packageLockSpinner.succeed("Deleted package-lock.json.");

            const dataSpinner = createSpinner("Deleting the \".data\" folder...");
            await rm("./.data", { recursive: true, force: true });
            dataSpinner.succeed("Deleted the \".data\" folder.");

            const nuxtSpinner = createSpinner("Deleting the \".nuxt\" folder...");
            await rm("./.nuxt", { recursive: true, force: true });
            nuxtSpinner.succeed("Deleted the \".nuxt\" folder.");

            const outputSpinner = createSpinner("Deleting the \".output\" folder...");
            await rm("./.output", { recursive: true, force: true });
            outputSpinner.succeed("Deleted the \".output\" folder.");

            const distSpinner = createSpinner("Deleting the \"dist\" folder...");
            await rm("./dist", { recursive: true, force: true });
            distSpinner.succeed("Deleted the \"dist\" folder.");

            const nodeModulesSpinner = createSpinner("Deleting the \"node_modules\" folder...");
            await rm("./node_modules", { recursive: true, force: true });
            nodeModulesSpinner.succeed("Deleted the \"node_modules\" folder.");

            // Installs all dependencies again.
            runCommand("npm install");
        } else {
            console.log("🛑 Will Not Reinstall dependencies.\n\n");
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