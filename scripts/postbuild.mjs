import { existsSync, readFileSync, writeFileSync } from 'fs'
import { resolve, join } from 'path'

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