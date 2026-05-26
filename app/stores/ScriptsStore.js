import deploy_code from "@scripts/deploy.mjs?raw";
import upgrade_code from "@scripts/upgrade.mjs?raw";

import my_unix_shell from "@scripts/c/mysh.c?raw";
import my_threadpool from "@scripts/c/threadpool.c?raw";

import gamepad_store_utility_code from "~/stores/GamepadStore.js?raw";
import gamepad_component_code from "~/components/GamepadComponent.client.vue?raw";
import gamepad_events_code from "~/gamepad-events.js?raw";

/** This store specifically handles Code Scripts I include on my website. It has similar functions to the document store. */
export const useScriptsStore = defineStore("scripts-store", () => {
    /** This stores basic object data for each of the scripts hosted on my website. */
    const scripts = [
        useHostedScript("/aws-deploy-script", deploy_code, "deploy", ".mjs", PERSONAL_DEPLOY_SCRIPT_LINK),
        useHostedScript("/gamepad/store-and-utility", gamepad_store_utility_code, "GamepadStore", ".js", GAMEPAD_STORE_FILE),
        useHostedScript("/gamepad/vuejs-component", gamepad_component_code, "GamepadComponent", ".client.vue", GAMEPAD_COMPONENT_FILE),
        useHostedScript("/gamepad/custom-events", gamepad_events_code, "gamepad-events", ".js", GAMEPAD_EVENTS_FILE),
        useHostedScript("/unix-shell", my_unix_shell, "mysh", ".c", PERSONAL_UNIX_SHELL_LINK),
        useHostedScript("/upgrade-script", upgrade_code, "upgrade", ".mjs", PERSONAL_UPGRADE_SCRIPT_LINK),
        useHostedScript("/threadpool", my_threadpool, "threadpool", ".c", PERSONAL_THREADPOOL_LINK),
    ];

    const router = useRouter();
    const webData = useWebsiteDataStore();
    const fullScreenStore = useFullScreenStore();
    const { cssToWindowWidthRatio, cssToWindowHeightRatio } = useMohitWindowSize();

    const mounted = ref(false);
    const wrapCode = ref(false);
    const fsStateChanging = ref(false);
    const lineOptions = ref({ num: -1, oldNum: -1, style: { left: "0px", top: "0px", borderRadius: "10px 10px 10px 10px" }, timeout: null, lastCopied: "" });

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

    const onScriptRoute = computed(() => { return (currentScriptRoute.value != -1); });
    const onDeployScriptRoute = computed(() => { return scripts[0].onRoute.value; });
    const onGamepadScriptRoute = computed(() => { return (currentScriptLink.value >= 1 || currentScriptLink.value <= 3); });

    /** The GitHub Link of the script currently being displayed. */
    const currentScriptLink = computed(() => { return (onScriptRoute.value ? scripts[currentScriptRoute.value].link : ""); });
    const scriptLoading = computed(() => { return (onScriptRoute.value ? (scripts[currentScriptRoute.value].htmlLoaded.value == 1) : false); });
    const scriptNumLines = computed(() => { return (onScriptRoute.value ? scripts[currentScriptRoute.value].numLines.value : 0); });

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

    // This function sets the Line that is focused on based on the URL Hash.
    watch(() => router.currentRoute.value.hash, (newValue, oldValue) => {
        if(!onScriptRoute.value) { return; }
        manageLineNumberFocus(parseInt(newValue.substring(2), 10), parseInt(oldValue.substring(2), 10), 0);
    });

    /**
     * ---------------------------------------------------------------------------
     * These functions are for saving and using the scripts present on my website.
     * ---------------------------------------------------------------------------
     */

    /** This function downloads a script for the visitor to use. */
    function downloadScript() {
        if(scriptDownloadStatus.value.pending) { return; }
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
        if(scriptCopyStatus.value.pending) { return; }
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
        if(!saveAsSupported.value || scriptSaveStatus.value.pending) { return; }
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
            await sleep(10);

            const hashStr = router.currentRoute.value.hash.substring(1);
            manageLineNumberFocus(parseInt(hashStr.substring(1), 10), -1, 0);
            if(hashStr !== "") { goToPageSection(hashStr, ((hashStr === "footer") ? 50 : 80), 0); }
        } catch(e) {
            scrollToTop(true, 0);
        }
    }

    /** This function unmounts a page that hosts a script. */
    function unmountScriptPage() {
        fullScreenStore.exitFullScreen();
    }

    /**
     * -------------------------------------------------------------------------------
     * These functions are used to set and record the status of the line options menu.
     * -------------------------------------------------------------------------------
     */

    /**
     * This function sets the status of the line options menu.
     * @param {MouseEvent} event The event fired by clicking on the mouse.
     * @param {Number} lineNum The number of the line to be opened. -1 closes the options menu.
     */
    function setLineOptions(lineNum = -1) {
        if(lineNum == -1 || !lineNum || lineOptions.value.num == lineNum) {
            lineOptions.value.oldNum = lineOptions.value.num;
            lineOptions.value.num = -1;
            manageLineNumberFocus(-1, lineOptions.value.oldNum, 1)
        } else {
            lineOptions.value.oldNum = lineOptions.value.num;
            lineOptions.value.num = lineNum;
            placeLineOptionsOnCode(lineNum);
            manageLineNumberFocus(lineNum, lineOptions.value.oldNum, 1)
        }
    }

    /**
     * This function sets the specific coords for where the popup should be on the code.
     * @param {Number} lineNum The Line number.
     */
    async function placeLineOptionsOnCode(lineNum = -1) {
        const element = document.getElementById("L" + lineNum);
        if(element == null) { return; }

        const mainRect = element.getBoundingClientRect();
        const vertInView = (mainRect.top <= getMohitInnerHeight()) && ((mainRect.top + mainRect.height) >= 60);
        if(!vertInView) { await scrollToLine(lineNum); }

        const rect = element.querySelector(".mohit-scriptPage-code-lineNum").getBoundingClientRect();
        const optionsAboveLine = (((rect.top * cssToWindowHeightRatio.value) + 140) > getMohitInnerHeight());

        const yNum = ((optionsAboveLine ? (rect.top * cssToWindowHeightRatio.value - 122) : ((rect.top + rect.height + 2)  * cssToWindowHeightRatio.value)));
        const borderRadius = (optionsAboveLine ? "10px 10px 10px 0px" : "0px 10px 10px 10px")
        lineOptions.value.style = { left: (((rect.left + rect.width + 4)  * cssToWindowWidthRatio.value) + "px"), top: (yNum + "px"), borderRadius }
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

    /**
     * This function scrolls to any particular line of code specified by the user.
     * @param {Number} lineNum The Line number. The default value is the number the line options is open for.
     */
    async function scrollToLine(lineNum = lineOptions.value.num) {
        await goToPageSection(("L" + lineNum), (fullScreenStore.fullScreenSet ? 30 : 80), 0)
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
    async function toggleScriptFullScreen() {
        if(fsStateChanging.value) { return; }
        fsStateChanging.value = true;

        webData.bypassBodyClick();
        await fullScreenStore.setFullScreen(document.getElementById('script-page'));

        await sleep(50);
        await nextTick();
        await sleep(50);

        webData.closeNavMenu();
        fsStateChanging.value = false;
    }

    /**
     * This function sets the class for line numbers based on which one is focused on.
     * Line numbers are focused on if the hash in the url is "#L"[LINE_NUMBER].
     * @param {Number} newLine The new line that is focused on.
     * @param {Number} oldLine The old line that was focused on.
     * @param {0 | 1} styleSet The style set that should be applied to the class.
     */
    function manageLineNumberFocus(newLine = -1, oldLine = -1, styleSet = 0) {
        const CLASS_NAME = (styleSet == 0 ? "num-highlight" : "num-highlight-optionsOpen");
        const numCodeLines = scriptNumLines.value;
        
        if(Number.isNaN(newLine) || !Number.isInteger(newLine)) { newLine = -1; }
        if(Number.isNaN(oldLine) || !Number.isInteger(oldLine)) { oldLine = -1; }

        if(oldLine > 0 && oldLine <= numCodeLines) { document.getElementById("L" + oldLine)?.classList.remove(CLASS_NAME); }
        if(newLine > 0 && newLine <= numCodeLines) { document.getElementById("L" + newLine)?.classList.add(CLASS_NAME); }
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

    return { scripts, mounted, wrapCode, lineOptions, saveAsSupported, onScriptRoute, onDeployScriptRoute, onGamepadScriptRoute,
        currentScriptLink, scriptLoading, scriptNumLines, scriptDownloadStatus, scriptCopyStatus, scriptSaveStatus, downloadIcon, saveScriptIcon, copyIcon,
        copyCodeTextIcon, copyCodePermalinkIcon, wrapIcon, wrapStatement,
        downloadScript, copyScript, saveScript, toggleScriptFullScreen, setCodeWrapping, setWrapCodeStyles, setLineOptions, scrollToLine,
        mountScriptsStore, mountScriptPage, unmountScriptPage, copyLineAttribute, shareLinePermalink, placeLineOptionsOnCode
    }
});

/**
 * This serves as a simple utility that contains all the necessary objects a hosted script needs for a script page.
 * @param {String} path The path in the website that displays this script.
 * @param {String} code The actual code that this script has.
 * @param {String} name The name of the file.
 * @param {".mjs" | ".js" | ".cjs" | ".vue" | ".client.vue" | ".c"} suffix The suffix of the file.
 * @param {String} link A link where this file would be stored online. Most likely a GitHub Link.
 */
function useHostedScript(path = "", code = "", name = "", suffix = ".mjs", link = "") {
    path = (path.endsWith("/") ? path.substring(0, (path.length - 1)) : path);

    /** @type {Ref<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = ref(null);
    const router = useRouter();

    const htmlLoaded = ref(0);
    const numLines = ref(0);

    const html = ref("<pre> <div class=\"loading-spinner\"></div> </pre>");
    const onRoute = computed(() => { return checkPath(router.currentRoute.value.path); });

    /** This functions initializes the blob value for this hosted script. */
    function initBlob() { blob.value = new Blob([code], { type: "text/javascript" }); }

    /**
     * This function checks whether the path associated with this hosted script is equivalent to another given path.
     * @param {String} pathname The path parameter.
     */
    function checkPath(pathname) {
        if(pathname.endsWith("/")) { pathname = pathname.substring(0, (pathname.length - 1)); }
        return (path === pathname || (path + "/") === pathname);
    }

    /** This function manages creating a string consisting of HTML that can be displayed to a user. */
    async function initCodeScriptElement() {
        if(htmlLoaded.value != 0) { return; }
        htmlLoaded.value = 1;

        const { success, html: htmlResult, numLines: numCodeLines } = await renderCodeScript(code, suffix, path);
        htmlLoaded.value = (success ? 2 : 3);
        html.value = htmlResult;
        numLines.value = numCodeLines;
    }

    return { path, code, onRoute, name, suffix, link, blob, html, htmlLoaded, numLines,
        initBlob, checkPath, initCodeScriptElement
    }
}