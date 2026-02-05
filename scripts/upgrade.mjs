import { execSync } from 'child_process';
import { readFile, writeFile } from 'fs/promises';

// Get version type (default to 'patch')
const versionType = (process.argv[2] || 'patch');

/**
 * This function runs an NPM Command.
 * @param {String} command The NPM command to run.
 */
function runCommand(command) {
    console.log("Running Command \"" + command + "\"...");
    execSync(command, { stdio: 'inherit' });
    console.log("\n\n");
};

/** This function is the core of the file and handles all the upgrade requirements. */
async function main() {
    try {
        runCommand('npx npm-check-updates -u');
        runCommand(`npm version ${versionType} --no-git-tag-version --allow-same-version`);
        runCommand('npm install');

        console.log("Updating PWA Cache ID...");
        const packageData = JSON.parse(await readFile('./package.json', 'utf-8'));
        const content = await readFile("./vite.config.js", 'utf8');

        const newVersion = packageData.version;
        const updatedContent = content.replace(/v\d+\.\d+\.\d+-\$\{Date\.now\(\)\}/, `v${newVersion}-\${Date.now()}`);

        await writeFile("./vite.config.js", updatedContent, 'utf8');
        console.log(`✅ Successfully bumped version to v${newVersion} and updated packages!`);
    } catch(error) {
        console.error(error);
        console.error('\n❌ Update failed. Check the errors above.');
        process.exit(1);
    }
}

// Runs the main function.
await main();