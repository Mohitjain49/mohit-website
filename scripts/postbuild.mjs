import { existsSync, readFileSync, writeFileSync, rmSync } from 'fs';
import { resolve, join } from 'path';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js';

/** This function adds the tag representing the .xsl file to the Sitemap to give the Sitemap a cleaner look. */
function editSitemapXsl() {
    const outDir = resolve('.output/public');
    const sitemapPath = join(outDir, '__sitemap__/style.xsl');

    if(existsSync(sitemapPath)) {
        const original = readFileSync(sitemapPath, 'utf8');
        const ICON_LINK = "https://www.mohit-jain.com/static-icons/Personal_Icon_Expanded_Rounded.png";

        const newContent = original.replace(/<title(?:\s+[^>]*)?>(.*?)<\/title>/gis,
            "<title>Mohit Jain | XML Sitemap</title>\n" +
            "\t\t<link rel=\"icon\" href=\"" + ICON_LINK + "\" />"
        );

        writeFileSync(sitemapPath, newContent, 'utf8');
        console.log('✅ Successfully modified sitemap.xsl!');
    } else {
        console.warn(`⚠️ sitemap.xml not found at ${sitemapPath}`);
    }
}

/** This function creates a simple file that records when the website was last built. */
function createBuildInfoFile() {
    const path = resolve("build-info.json");
    rmSync(path, { force: true, recursive: true });

    dayjs.extend(utc);
    dayjs.extend(timezone);

    const localNow = dayjs();
    const utcNow = dayjs().utc();
    const jsonObj = { now: localNow.format(), utc: utcNow.format() }

    writeFileSync(path, JSON.stringify(jsonObj, null, 4), 'utf8');
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
    console.log("🏁 Postbuild Complete!\n\n");
}

// Runs the Main Function.
main();