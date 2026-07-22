const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

/** This is every image file in the app folder. */
const assetFiles = globSync('./app/**/*.{png,jpg,jpeg,svg,webp,avif,gif}');

/** This is every file in the app folder except for the image files. */
const targetFiles = globSync('./app/**/*.{vue,js,ts,scss}');

describe('No Unused Assets', () => {
    // This makes sure that there are files to go through.
    it('should find files to scan', () => { expect(assetFiles.length).toBeGreaterThan(0); });
    it('should find files to scan', () => { expect(targetFiles.length).toBeGreaterThan(0); });

    // This tests each file to ensure that there are no @media queries in any fetched file.
    test.each(assetFiles)('File "%s" should be used by at least one target file.', (filePath) => {
        const assetBasename = path.basename(filePath);
        var assetUsedCount = 0;

        for(let i = 0; i < targetFiles.length; i++) {
            const resolvedTargetPath = path.resolve(targetFiles[i]);
            const targetFileContent = fs.readFileSync(resolvedTargetPath, 'utf8');
            if(targetFileContent.includes(assetBasename)) { assetUsedCount++; }
        }
        
        const assetUsed = (assetUsedCount > 0);
        expect(assetUsed).toBe(true);
    });
});