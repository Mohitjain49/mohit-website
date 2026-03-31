import deploy_code from "@scripts/deploy.mjs?raw";
import gamepad_store_utility_code from "@/stores/GamepadStore.js?raw";
import gamepad_component_code from "@/components/GamepadComponent.client.vue?raw";
import gamepad_events_code from "@/gamepad-events.js?raw";

/** This store specifically handles Code Scripts I include on my website. It has similar functions to the document store. */
export const useScriptsStore = defineStore("scripts-store", () => {
    /**
     * This stores basic object data for each of the scripts hosted on my website.
     */
    const scripts = [
        useHostedScript("/aws-deploy-script", deploy_code, "deploy", ".mjs", PERSONAL_DEPLOY_SCRIPT_LINK),
        useHostedScript("/gamepad/store-and-utility", gamepad_store_utility_code, "GamepadStore", ".js", GAMEPAD_STORE_FILE),
        useHostedScript("/gamepad/vuejs-component", gamepad_component_code, "GamepadComponent", ".client.vue", GAMEPAD_COMPONENT_FILE),
        useHostedScript("/gamepad/custom-events", gamepad_events_code, "gamepad-events", ".js", GAMEPAD_EVENTS_FILE)
    ];

    const router = useRouter();
    const webData = useWebsiteDataStore();
    const fullScreenStore = useFullScreenStore();

    const mounted = ref(false);
    const wrapCode = ref(false);
    const lineOptions = ref({ num: -1, style: { left: "0px", top: "0px" }, onTopRight: false, timeout: null, lastCopied: "" });

    const scriptDownloadStatus = ref({ pending: false, fresh: false, timeout: null });
    const scriptSaveStatus = ref({ pending: false, fresh: false, error: false, timeout: null });
    const scriptCopyStatus = ref({ pending: false, fresh: false, error: false, timeout: null });

    /** This calculates what script page the visitor is currently viewing. */
    const currentScriptRoute = computed(() => {
        const routePath = router.currentRoute.value.path;
        return scripts.findIndex((item) => { return item.checkPath(routePath); });
    });
    const saveAsSupported = computed(() => {
        return (!checkSSR() && window.isSecureContext && typeof window.showSaveFilePicker === 'function');
    });

    /** The GitHub Link of the script currently being displayed. */
    const currentScriptLink = computed(() => { return ((currentScriptRoute.value == -1) ? "" : scripts[currentScriptRoute.value].link) });
    const onScriptRoute = computed(() => { return (currentScriptRoute.value != -1); });
    const onDeployScriptRoute = computed(() => { return scripts[0].onRoute.value; });

    const downloadIcon = computed(() => {
        const downloadObj = scriptDownloadStatus.value;
        return (downloadObj.fresh ? "fa-check" : (downloadObj.pending ? "fa-spinner" : "fa-file-download"));
    });
    const saveScriptIcon = computed(() => {
        const saveObj = scriptSaveStatus.value;
        return (saveObj.error ? "fa-ban" : (saveObj.fresh ? "fa-check" : (saveObj.pending ? "fa-spinner" : "fa-floppy-disk")));
    });
    const copyIcon = computed(() => {
        const copyObj = scriptCopyStatus.value;
        return (copyObj.fresh ? "fa-check" : (copyObj.pending ? "fa-spinner" : "fa-copy"));
    });

    const wrapIcon = computed(() => { return (wrapCode.value ? "fa-align-left" : "fa-arrows-left-right-to-line"); });
    const wrapStatement = computed(() => { return (wrapCode.value ? "Let Code Overflow" : "Wrap Code"); });

    const copyCodeTextIcon = computed(() => {
        const lastCopied = lineOptions.value.lastCopied;
        return ((lineOptions.value.timeout == null) ? "fa-copy" : ((lastCopied === "error") ? 'fa-ban' : (lastCopied === "text") ? 'fa-check' : 'fa-copy'));
    });
    const copyCodePermalinkIcon = computed(() => {
        const lastCopied = lineOptions.value.lastCopied;
        return ((lineOptions.value.timeout == null) ? "fa-clone" : ((lastCopied === "error") ? 'fa-ban' : (lastCopied === "link") ? 'fa-check' : 'fa-clone'));
    });

    // This function sets the place of the line options menu to its default state when it is closed.
    watch(() => lineOptions.value.num, (newValue) => { if(newValue == -1) { setLineOptionsPlacement(false); } });

    /**
     * ---------------------------------------------------------------------------
     * These functions are for saving and using the scripts present on my website.
     * ---------------------------------------------------------------------------
     */

    /** This function downloads a script for the visitor to use. */
    function downloadScript() {
        scriptDownloadStatus.value.pending = true;
        const scriptFile = getCurrentScript();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(scriptFile.blob.value);
        link.download = (scriptFile.name + scriptFile.suffix);
    
        link.click();
        link.remove();

        scriptDownloadStatus.value.pending = false;
        scriptDownloadStatus.value.fresh = true;

        if(scriptDownloadStatus.value.timeout != null) { clearTimeout(scriptDownloadStatus.value.timeout); }
        scriptDownloadStatus.value.timeout = setTimeout(() => {
            scriptDownloadStatus.value.fresh = false;
            scriptDownloadStatus.value.timeout = null;
        }, 3000);
    }

    /** This function lets users copy a script. */
    async function copyScript() {
        scriptCopyStatus.value.pending = true;
        const scriptFile = getCurrentScript();

        await navigator.clipboard.writeText(scriptFile.code);
        scriptCopyStatus.value.pending = false;
        scriptCopyStatus.value.fresh = true;

        if(scriptCopyStatus.value.timeout != null) { clearTimeout(scriptCopyStatus.value.timeout); }
        scriptCopyStatus.value.timeout = setTimeout(() => {
            scriptCopyStatus.value.fresh = false;
            scriptCopyStatus.value.timeout = null;
        }, 3000);
    }

    /** This function opens a "Save File Picker" so the user can save my script at their preferred location. */
    async function saveScript() {
        if(!saveAsSupported.value) { return; }
        try {
            scriptSaveStatus.value.pending = true;
            const scriptFile = getCurrentScript();

            var typeObj = { description: "JS File", accept: { 'text/javascript': [scriptFile.suffix] } }
            if(!scriptFile.suffix.endsWith("js")) { typeObj = { description: "JS File", accept: { 'text/plain': [scriptFile.suffix] } } }
            const saveHandle = await window.showSaveFilePicker({ suggestedName: scriptFile.name, types: [typeObj] });

            const writable = await saveHandle.createWritable();
            await writable.write(scriptFile.blob.value);
            await writable.close();

            scriptSaveStatus.value.pending = false;
            scriptSaveStatus.value.fresh = true;

            if(scriptSaveStatus.value.timeout != null) { clearTimeout(scriptSaveStatus.value.timeout); }
            scriptSaveStatus.value.timeout = setTimeout(() => {
                scriptSaveStatus.value.fresh = false;
                scriptSaveStatus.value.timeout = null;
            }, 4000);
        } catch(err) {
            scriptSaveStatus.value.pending = false;
            scriptSaveStatus.value.error = true;

            if(scriptSaveStatus.value.timeout != null) { clearTimeout(scriptSaveStatus.value.timeout); }
            scriptSaveStatus.value.timeout = setTimeout(() => {
                scriptSaveStatus.value.error = false;
                scriptSaveStatus.value.timeout = null;
            }, 4000);
        }
    }

    /**
     * ------------------------------------------------------------------------------------
     * These functions are for initializing certain objects necessary for the script pages.
     * ------------------------------------------------------------------------------------
     */

    /**
     * This function mounts the scripts store so the website can properly use it.
     * It also sets a function for the window to open options for each line of code displayed.
     */
    function mountScriptsStore() {
        for(let i = 0; i < scripts.length; i++) { scripts[i].initBlob(); }
        window.openCodeLineOptions = (lineNum) => { setLineOptions(lineNum); }
        mounted.value = true;
    }

    /** This function mounts a page that hosts a script. */
    async function mountScriptPage() {
        webData.mountWebData();
        if(!onScriptRoute.value) { return; }

        try {
            await nextTick();
            await scripts[currentScriptRoute.value].initCodeScriptElement();

            const hashStr = router.currentRoute.value.hash.substring(1);
            if(hashStr !== "") { goToPageSection(hashStr, ((hashStr === "footer") ? 50 : 80)); }
        } catch(e) {
            window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
    }

    /** This function unmounts a page that hosts a script. */
    function unmountScriptPage() {
        document.body.style.overflowY = "";
        fullScreenStore.exitFullScreen();
    }

    /**
     * --------------------------------------------------------------------------------
     * These functions are extra functions used by both the store and the script pages.
     * --------------------------------------------------------------------------------
     */

    /** This function returns the script the website is currently using. */
    function getCurrentScript() {
        if(!onScriptRoute.value) { return null; }
        return scripts[currentScriptRoute.value];
    }

    /** This function sets the full screen for the element containing the document or script. */
    function toggleScriptFullScreen() {
        fullScreenStore.setFullScreen(document.getElementById('script-page'));
        webData.closeNavMenu();
    }

    /**
     * This function sets a boolean that determines whether the code should be wrapped or overflowing.
     * @param {Boolean | "toggle"} status The new status for wrapping code. If it is set to "toggle", then it just flips the value.
     * @param {Boolean} closeMenu If true, this will also close the navigation menu.
     */
    function setCodeWrapping(status = "toggle", closeMenu = false) {
        wrapCode.value = ((status === "toggle") ? !wrapCode.value : status);
        setWrapCodeStyles();

        if(!closeMenu) { return; }
        webData.bypassBodyClick();
        webData.closeNavMenu();
    }

    /** Based on the current status of the "wrapCode" boolean, this function sets the styles for wrapping the code text. */
    function setWrapCodeStyles() {
        const preElement = document.getElementById("mohit-scriptPage-code");
        if(preElement != null) {
            preElement.style.textWrap = (wrapCode.value ? "wrap" : "nowrap");
            preElement.style.overflowWrap = (wrapCode.value ? "break-word" : "normal");
        }
    }

    /**
     * This function sets the status of the line options menu.
     * @param {MouseEvent} event The event fired by clicking on the mouse.
     * @param {Number} lineNum The number of the line to be opened. -1 closes the options menu.
     */
    function setLineOptions(lineNum = -1) {
        if(lineNum == -1 || !lineNum) {
            lineOptions.value.num = -1;
        } else if(lineNum == lineOptions.value.num && lineOptions.value.onTopRight) {
            setLineOptionsPlacement(false);
        } else if(lineNum == lineOptions.value.num && !lineOptions.value.onTopRight) {
            lineOptions.value.num = -1;
        } else {
            const element = document.getElementById("L" + lineNum);
            lineOptions.value.num = lineNum;

            const rect = element.querySelector(".mohit-scriptPage-code-lineNum").getBoundingClientRect();
            const yNum = (((rect.top + 140) > window.innerHeight) ? (rect.top - 120) : (rect.top + rect.height) );
            lineOptions.value.style = { left: ((rect.left + rect.width) + "px"), top: (yNum + "px") }
        }
    }

    /**
     * This function sets a boolean that determines whether the code should be wrapped or overflowing.
     * @param {Boolean | "toggle"} status The new status for wrapping code. If it is set to "toggle", then it just flips the value.
     */
    function setLineOptionsPlacement(status = "toggle") {
        lineOptions.value.onTopRight = ((status === "toggle") ? !lineOptions.value.onTopRight : status)
    }

    /**
     * This function lets the user copy an attribute of a specific line.
     * @param {String} attribute The attribute to copy.
     */
    function copyLineAttribute(attribute = "text") {
        const element = document.getElementById("L" + lineOptions.value.num);
        if(element == null) { return; }

        navigator.clipboard.writeText(element.getAttribute("mohit-code-as-" + attribute)).then(() => {
            lineOptions.value.lastCopied = attribute;
            if(lineOptions.value.timeout != null) { clearTimeout(lineOptions.value.timeout); }
            lineOptions.value.timeout = setTimeout(() => { lineOptions.value.timeout = null; }, 3000);
        }).catch(() => {
            lineOptions.value.lastCopied = "error";
            if(lineOptions.value.timeout != null) { clearTimeout(lineOptions.value.timeout); }
            lineOptions.value.timeout = setTimeout(() => { lineOptions.value.timeout = null; }, 3000);
        });
    }

    /** This function opens the share popup for a line's permalink. */
    function shareLinePermalink() {
        const element = document.getElementById("L" + lineOptions.value.num);
        if(element != null) { webData.setQRCodePopup(element.getAttribute("mohit-code-as-link")); }
    }

    return { scripts, mounted, wrapCode, lineOptions, saveAsSupported, onScriptRoute, onDeployScriptRoute, currentScriptLink,
        scriptDownloadStatus, scriptCopyStatus, scriptSaveStatus, downloadIcon, saveScriptIcon, copyIcon,
        copyCodeTextIcon, copyCodePermalinkIcon, wrapIcon, wrapStatement,
        downloadScript, copyScript, saveScript, toggleScriptFullScreen, setCodeWrapping, setWrapCodeStyles, setLineOptions,
        mountScriptsStore, mountScriptPage, unmountScriptPage, copyLineAttribute, shareLinePermalink, setLineOptionsPlacement
    }
});

/**
 * This serves as a simple utility that contains all the necessary objects a hosted script needs for a script page.
 * @param {String} path The path in the website that displays this script.
 * @param {String} code The actual code that this script has.
 * @param {String} name The name of the file.
 * @param {".mjs" | ".js" | ".cjs" | ".vue" | ".client.vue"} suffix The suffix of the file.
 * @param {String} link A link where this file would be stored online. Most likely a GitHub Link.
 */
function useHostedScript(path = "", code = "", name = "", suffix = ".mjs", link = "") {
    /** @type {Ref<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = ref(null);
    const router = useRouter();

    const html = ref("<pre> <div class=\"loading-spinner\"></div> </pre>");
    const htmlLoaded = ref({ status: false, error: false, progress: 0 });

    const progressStr = computed(() => { return (String(htmlLoaded.value.progress) + "%"); });
    const onRoute = computed(() => { return checkPath(router.currentRoute.value.path); });

    /** This functions initializes the blob value for this hosted script. */
    function initBlob() {
        blob.value = new Blob([code], { type: "text/javascript" });
    }

    /**
     * This function checks whether the path associated with this hosted script is equivalent to another given path.
     * @param {String} pathname The path parameter.
     */
    function checkPath(pathname) {
        if(pathname.endsWith("/")) { pathname = pathname.substring(0, (pathname.length - 1)); }
        return (path === pathname || (path + "/") === pathname);
    }

    /**
     * This function returns a string consisting of HTML that can be displayed to a user. 
     */
    async function initCodeScriptElement() {
        if(htmlLoaded.value.status || htmlLoaded.value.error) { return; }
        try {
            const createHighlighterCore = (await import("shiki/dist/core.mjs")).createHighlighterCore;
            setLoadedProgress(20);

            const createOnigurumaEngine = (await import("shiki/dist/engine-oniguruma.mjs")).createOnigurumaEngine;
            setLoadedProgress(40);

            var lang = null;
            if(suffix.endsWith("js")) {
                lang = (await import("shiki/dist/langs/javascript.mjs"));
            } else if(suffix.endsWith("vue")) {
                lang = (await import("shiki/dist/langs/vue.mjs"));
            }
            setLoadedProgress(60);

            const themeVitesseBlack = (await import("shiki/dist/themes/vitesse-black.mjs"));
            setLoadedProgress(80);

            const highlighter = await createHighlighterCore({
                themes: [themeVitesseBlack], langs: [lang],
                engine: createOnigurumaEngine(import('shiki/wasm')) 
            });
            setLoadedProgress(99);

            await sleep(100);
            html.value = highlighter.codeToHtml(code, {
                theme: "vitesse-black",
                lang: (suffix.endsWith("js") ? "javascript" : "vue"),
                transformers: [{
                    pre(node) { node.properties.id = "mohit-scriptPage-code"; },
                    code(node) { node.properties.id = "mohit-scriptPage-code-inner"; },
                    line(node, lineNum) { transformCodeLine(this.addClassToHast, node, lineNum); }
                }]
            });
            htmlLoaded.value = { status: true, error: false, progress: 100 }
        } catch(e) {
            console.error(e);
            html.value = "<pre> <div class=\"loading-spinner\"></div> </pre>";
            htmlLoaded.value = { status: false, error: true, progress: htmlLoaded.value.progress }
        }
    }

    /**
     * This function sets the progress in creating the code script html.
     * @param {Number} num The new number (between 0 and 100) that represents the new progress status.
     */
    function setLoadedProgress(num) {
        htmlLoaded.value.progress = num;
    }

    /**
     * This function transforms how the HTML code for a line looks when fully rendered.
     * @param {Function} addClassToHast This function adds a class to the line. 
     * @param {import("../../node_modules/@types/hast/index").Element} node The line element itself.
     * @param {Number} lineNum The number of said line.
     */
    function transformCodeLine(addClassToHast, node, lineNum) {
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

    return { path, code, onRoute, name, suffix, link, blob, html, htmlLoaded, progressStr,
        initBlob, checkPath, initCodeScriptElement
    }
}