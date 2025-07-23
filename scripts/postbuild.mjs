import { replaceInFile, replaceInFileSync } from 'replace-in-file'

const results = await replaceInFile({
    files: 'dist/assets/app-*.js',
    from: /require\(["']@fortawesome\/fontawesome-svg-core\/package\.json["']\)/g,
    to: '({ version: "7.0.0" })',
});

console.log('Modified files:', results);