/**
 * This function returns a string consisting of HTML that can be displayed to a user.
 * @param {String} code This is the actual code that should be rendered into HTML.
 * @param {".mjs" | ".js" | ".cjs" | ".vue" | ".client.vue" | ".c"} suffix The suffix of the code file.
 * @param {String} path The path of the webpage.
 */
export async function renderCodeScript(code = "", suffix = "", path) {
    try {
        const createHighlighterCore = (await import("shiki/dist/core.mjs")).createHighlighterCore;
        const createOnigurumaEngine = (await import("shiki/dist/engine-oniguruma.mjs")).createOnigurumaEngine;

        var numLines = 0;
        var lang = null;
        var highlightLang = "";

        if(suffix.endsWith("js")) {
            lang = (await import("shiki/dist/langs/javascript.mjs"));
            highlightLang = "javascript";
        } else if(suffix.endsWith("vue")) {
            lang = (await import("shiki/dist/langs/vue.mjs"));
            highlightLang = "vue";
        } else if(suffix.endsWith("c")) {
            lang = (await import("shiki/dist/langs/c.mjs"));
            highlightLang = "c";
        } else {
            throw new Error("Internal Error: File Suffix Not Recognized.");
        }

        const themeMaterialOcean = (await import("shiki/dist/themes/material-theme-ocean.mjs"));
        const highlighter = await createHighlighterCore({
            themes: [themeMaterialOcean], langs: [lang],
            engine: createOnigurumaEngine(await import('shiki/wasm')) 
        });

        const html = highlighter.codeToHtml(code, {
            theme: "material-theme-ocean",
            lang: highlightLang,
            transformers: [{
                pre(node) { node.properties.id = "mohit-scriptPage-code"; },
                code(node) { node.properties.id = "mohit-scriptPage-code-inner"; },
                line(node, lineNum) {
                    transformCodeLine(this.addClassToHast, node, lineNum, path);
                    if(numLines < lineNum) { numLines = lineNum; }
                }
            }]
        });
        return { success: true, html, numLines }
    } catch(e) {
        console.error(e);
        return { success: false, html: "<pre> <div class=\"loading-spinner\"></div> </pre>", numLines: 0 }
    }
}

/**
 * This function transforms how the HTML code for a line looks when fully rendered.
 * @param {Function} addClassToHast This function adds a class to the line. 
 * @param {import("../../node_modules/@types/hast/index").Element} node The line element itself.
 * @param {Number} lineNum The number of said line.
 */
function transformCodeLine(addClassToHast, node, lineNum, path) {
    addClassToHast(node, "mohit-scriptPage-code-line");
    const originalChildren = node.children;
    const lineAsText = extractTextFromLine(originalChildren);

    node.properties['id'] = ("L" + String(lineNum));
    node.properties['mohit-code-as-text'] = lineAsText;
    node.properties['mohit-code-as-link'] = (PERSONAL_WEBSITE_LINK + path.substring(1) + "/#L" + String(lineNum));

    node.children = [{
        type: 'element',
        tagName: 'span',
        properties: { className: 'mohit-scriptPage-code-line-content', },
        children: originalChildren
    }]

    node.children.unshift({
        type: "element",
        tagName: "div",
        properties: { className: "mohit-scriptPage-code-lineNum" },
        children: [{
            type: "element",
            tagName: "button",
            properties: {
                onclick: "window.openCodeLineOptions(" + String(lineNum) + ")",
                title: "See Options for Line " + lineNum + " Of This Code Script."
            },
            children: [{ type: "text", value: String(lineNum) }]
        }]
    });
}

/**
 * This recursive function extracts all the text from a line and returns a string
 * @param {Array<import("../../node_modules/@types/hast/index").ElementContent>} children The children of the node.
 */
function extractTextFromLine(children) {
    return children.map((child) => {
        if(child.type === "text") { return child.value; }
        else if(child.children) { return extractTextFromLine(child.children); }
        else { return ""; }
    }).join("");
}