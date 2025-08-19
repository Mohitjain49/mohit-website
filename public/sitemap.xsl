<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
    <xsl:output method="html" encoding="UTF-8" indent="yes"/>

    <xsl:template match="/">
        <html>
            <head>
                <title>Sitemap For Mohit Jain's Website</title>
                <style>
                    body {
                        font-family: system-ui, sans-serif;
                        background: #f9fafb;
                        color: #111827;
                        margin: 2rem;
                    }
                    h1 {
                        font-size: 1.75rem;
                        margin-bottom: 1rem;
                        color: #1f2937;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
                        border-radius: 0.5rem;
                        overflow: hidden;
                    }
                    th, td {
                        padding: 0.75rem 1rem;
                        border-bottom: 1px solid #e5e7eb;
                        text-align: left;
                    }
                    th {
                        background: #f3f4f6;
                        font-weight: 600;
                        color: #374151;
                    }
                    tr:hover td {
                        background: #f9fafb;
                    }
                    a {
                        color: #2563eb;
                        text-decoration: none;
                    }
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <h1>XML Sitemap</h1>
                <table>
                    <thead>
                        <tr>
                            <th>URLs In Sitemap</th>
                            <th>Last Modified</th>
                        </tr>
                    </thead>
                    <tbody>
                        <xsl:for-each select="s:urlset/s:url">
                        <tr>
                            <td><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
                            <td><xsl:value-of select="substring-before(s:lastmod, 'T')"/></td>
                        </tr>
                        </xsl:for-each>
                    </tbody>
                </table>
            </body>
        </html>
    </xsl:template>
</xsl:stylesheet>