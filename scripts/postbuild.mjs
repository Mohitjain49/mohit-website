import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, join } from 'path';
import * as cheerio from 'cheerio';

/** This function adds the tag representing the .xsl file to the Sitemap to give the Sitemap a cleaner look. */
function addSitemapXsl() {
    const outDir = resolve('dist');
    const sitemapPath = join(outDir, 'sitemap.xml');
    const xslHref = '/sitemap.xsl';

    if(existsSync(sitemapPath)) {
        const original = readFileSync(sitemapPath, 'utf8');
        const xmlDecl = '<?xml version="1.0" encoding="UTF-8"?>';

        let newContent = null;
        if (original.startsWith(xmlDecl)) {
            newContent = (`${xmlDecl}\n<?xml-stylesheet type="text/xsl" href="${xslHref}"?>\n` + original.slice(xmlDecl.length).trimStart());
        } else {
            newContent = (`<?xml-stylesheet type="text/xsl" href="${xslHref}"?>\n` + original);
        }

        writeFileSync(sitemapPath, newContent, 'utf8');
        console.log('✅ sitemap.xml updated with XSL reference');
    } else {
        console.warn(`⚠️ sitemap.xml not found at ${sitemapPath}`);
    }
}

/** This function adds Icon tags to the bundle visualizer .html files. */
function addIconTagsToBundleVisualizers() {
    const htmlFilePaths = [
        resolve('bundle-visualizer/csr.html'),
        resolve('bundle-visualizer/ssr.html')
    ];

    for(let i = 0; i < htmlFilePaths.length; i++) {
        const filePath = htmlFilePaths[i];
        if(!existsSync(filePath)) { continue; }

        const html = readFileSync(filePath, 'utf8');
        const $ = cheerio.load(html);

        $('head').append('<link rel="icon" href="https://www.mohit-jain.com/static-icons/Personal_Icon_Expanded_Rounded.png">');
        writeFileSync(filePath, $.html(), 'utf8');
        console.log("✅ Successfully updated " + ((i == 0) ? "Client" : "Server") + " Bundle Visualizer");
    }
}

/** This function runs when an error occurred in either function. */
function onError(e) {
    console.error(e);
    process.exit(1);
}

/** This runs all postbuild functions. */
function main() {
    console.log("\n\n");
    try { addSitemapXsl(); } catch(e) { onError(e); }
    try { addIconTagsToBundleVisualizers(); } catch(e) { onError(e); }
    console.log("🏁 Postbuild Complete!\n\n");
}

// Runs the Main Function.
main();