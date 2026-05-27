const fs = require('fs');
const path = require('path');
const { globSync } = require('glob');

/** This fetches every .vue and .scss file except for the dynamic scss rules file. */
const targetFiles = globSync('**/*.{vue,scss}', {
    ignore: ['**/node_modules/**', '**/*_dynamicrules.scss', '**/.nuxt/**']
});

describe('CSS Architecture Guardrails', () => {
    // This makes sure that there is at least one .vue or .scss file to scan.
    it('should find files to scan', () => { expect(targetFiles.length).toBeGreaterThan(0); });

    // This tests each file to ensure that there are no @media queries in any fetched file.
    test.each(targetFiles)('File "%s" should not contain standard @media queries or improper style tags.', (filePath) => {
        const fullPath = path.resolve(filePath);
        const fileContent = fs.readFileSync(fullPath, 'utf8');

        const mediaQueryRegex = /@media\b/i;
        const styleTagRegex = /<style(?:\s+scoped)?\s*>/i;

        const hasMediaQuery = mediaQueryRegex.test(fileContent);
        const hasStyleTag = styleTagRegex.test(fileContent);
        expect(hasMediaQuery || hasStyleTag).toBe(false);
    });
});