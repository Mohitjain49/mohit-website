const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

/** This fetches every .vue and .scss file except for the dynamic scss rules file. */
const targetFiles = globSync('./app/**/*.{vue,js}');

describe('No Console Logs', () => {
    // This makes sure that there is at least one .vue or .js file to scan.
    it('should find files to scan', () => { expect(targetFiles.length).toBeGreaterThan(0); });

    // This tests each file to ensure that there are no "console.log" calls in any fetched file.
    // Console logs wrapped in "dev only" if statements or commented out are exempt.
    test.each(targetFiles)('File "%s" should not contain "console.log" in any JS or Vue.js file.', (filePath) => {
        const fullPath = path.resolve(filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf8');

        const consoleLogRegex = /console\.log\(.*?\)/g;
        const devConsoleLogRegex = /if\s*\(\s*import\.meta\.env\.DEV\s*\)\s*\{\s*console\.log\([\s\S]*?\);?\s*\}/g;
        const commentedConsoleLogRegex = /\/\/\s*console\.log\([\s\S]*?\);?/g;

        const consoleLogs = fileContent.match(consoleLogRegex);
        const devConsoleLogs = fileContent.match(devConsoleLogRegex);
        const commentConsoleLogs = fileContent.match(commentedConsoleLogRegex);

        const numConsoleLogs = ((consoleLogs == null) ? 0 : consoleLogs.length);
        const numDevConsoleLogs = ((devConsoleLogs == null) ? 0 : devConsoleLogs.length);
        const numCommentConsoleLogs = ((commentConsoleLogs == null) ? 0 : commentConsoleLogs.length);
        expect(numConsoleLogs == (numDevConsoleLogs + numCommentConsoleLogs)).toBe(true);
    });
});