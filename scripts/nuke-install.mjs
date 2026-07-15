import { execSync } from 'node:child_process';
import { readFile, writeFile, rm } from 'node:fs/promises';
import readline from 'node:readline/promises';

/** This array contains the arguments that can be passed in for this script. */
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
}

/**
 * This function checks to see if an argument exists in the "args" array and returns the result.
 * @param {String} mainArg The argument passed into the command.
 */
function checkForArg(mainArg = "") {
    return (args.findIndex(item => item === mainArg) != -1)
}

/** This function is the core of the file and handles all the upgrade requirements. */
async function main() {
    try {
        // This section handles asking the user to confirm their choice.
        var confirmBool = (checkForArg("--force") ? true : null);
        const confirmQuestion = 'Do you want to continue? (y/n): ';

        if(confirmBool == null) {
            runCommand('npx npm-check-updates');
            console.log("\n\n");
            const confirm = await rl.question(confirmQuestion);
            confirmBool = (confirm.toLowerCase() === "y" || confirm.toLowerCase() === "yes");
        } else {
            console.log(confirmQuestion + (confirmBool ? 'yes' : 'no'));
        }

        if(confirmBool) {
            console.log("✅ Will Perform Nuke Install.\n\n");
            runCommand("npm run upgrade -- --skip-exclude-deps --skip-update-deps --skip-update-version --install-deps --update-git-hooks");
            process.exit(0);
        } else {
            console.log("🛑 Will Not Perform Nuke Install.");
            process.exit(0);
        }
    } catch(error) {
        console.error(error);
        console.error('\n❌ Update failed. Check the errors above.');
        process.exit(1);
    }
}

// Runs the main function.
await main();