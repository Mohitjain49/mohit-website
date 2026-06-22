import * as fs from 'fs';
import { resolve, join } from 'path';
import prettyBytes from 'pretty-bytes';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

/** This function adds the tag representing the .xsl file to the Sitemap to give the Sitemap a cleaner look. */
function editSitemapXsl() {
    const outDir = resolve('.output/public');
    const sitemapPath = join(outDir, '__sitemap__/style.xsl');

    if(fs.existsSync(sitemapPath)) {
        const original = fs.readFileSync(sitemapPath, 'utf8');
        const ICON_LINK = "https://www.mohit-jain.com/static-icons/Personal_Icon_Expanded_Rounded.png";

        const newContent = original.replace(/<title(?:\s+[^>]*)?>(.*?)<\/title>/gis,
            "<title>Mohit Jain | XML Sitemap</title>\n" +
            "\t\t<link rel=\"icon\" href=\"" + ICON_LINK + "\" />"
        );

        fs.writeFileSync(sitemapPath, newContent, 'utf8');
        console.log('✅ Successfully modified \"__sitemap__/style.xsl\"!');
    } else {
        console.warn(`⚠️ sitemap.xml not found at ${sitemapPath}`);
    }
}

/** This function creates a simple file that records when the website was last built. */
function createBuildInfoFile() {
    const path = resolve("build-info.json");
    const outDir = resolve('.output/public');
    fs.rmSync(path, { force: true, recursive: true });

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const localNow = dayjs();
    const utcNow = dayjs().utc();

    /** @type {Array<String>} An Array of strings representing all the file paths in the build output. */
    const allFiles = fs.readdirSync(outDir, { recursive: true });
    var totalBuildSizeInBytes = 0;

    for(let i = 0; i < allFiles.length; i++) {
        const filename = allFiles[i].replaceAll("\\", "/");
        const filePath = join(outDir, filename);
        const fileStats = fs.statSync(filePath);
        if(fileStats.isFile()) { totalBuildSizeInBytes += fileStats.size; }
    }

    /** The JSON Object that makes up the build information. */
    const jsonObj = {
        now_local: localNow.format(),
        now_utc: utcNow.format(),
        size_decimal: prettyBytes(totalBuildSizeInBytes),
        size_binary: prettyBytes(totalBuildSizeInBytes, { binary: true })
    }

    fs.writeFileSync(path, JSON.stringify(jsonObj, null, 4), 'utf8');
    console.log('✅ Successfully created \"build-info.json\"!');
}

/** This function runs when an error occurred in any postbuild function. */
function onError(e) {
    console.error(e);
    process.exit(1);
}

/** This runs all postbuild functions. */
function main() {
    console.log("\n\n");
    try { editSitemapXsl(); } catch(e) { onError(e); }
    try { createBuildInfoFile(); } catch(e) { onError(e); }
    console.log("\n\n🏁 Website Build Complete!");
}

// Runs the Main Function.
main();