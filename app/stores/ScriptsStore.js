import deploy_code from "@scripts/deploy.mjs?raw";
import upgrade_code from "@scripts/upgrade.mjs?raw";
import use_docker_code from "@scripts/use-docker.mjs?raw";

import my_unix_shell from "@scripts/c/mysh.c?raw";
import my_threadpool from "@scripts/c/threadpool.c?raw";
import prettyBytes from "pretty-bytes";

export const SCRIPT_DOWNLOAD_BASE_ICON = "fa-file-download";
export const SCRIPT_SAVE_BASE_ICON = "fa-floppy-disk";
export const SCRIPT_COPY_BASE_ICON = "fa-copy";
export const SCRIPT_PERMALINK_COPY_BASE_ICON = "fa-clone";

const SCRIPT_DOWNLOAD_ACTION_TITLES = ["Download Code Script", "Downloading Code Script...", "Code Script Downloaded!", "Error While Downloading Code Script."];
const SCRIPT_SAVE_ACTION_TITLES = ["Save Code Script", "Saving Code Script...", "Code Script Saved!", "Error While Saving Code Script.", "Save Timed Out.", "Save Canceled."];
const SCRIPT_COPY_ACTION_TITLES = ["Copy Raw Code Script", "Copying Raw Code Script...", "Raw Code Script Copied!", "Error While Copying Raw Code Script."];

/** This store specifically handles Code Scripts I include on my website. It has similar functions to the document store. */
export const useScriptsStore = defineStore("scripts-store", () => {
    const SCRIPT_HTML_ID = "mohit-scriptPage-code";
    const SCRIPT_LINE_BUTTON_CLASS = "mohit-scriptPage-code-lineNum-innerButton";

    /** This stores basic object data for each of the scripts hosted on my website. */
    const scripts = [
        useHostedScript("/aws-deploy-script", deploy_code, "deploy", ".mjs", PERSONAL_DEPLOY_SCRIPT_LINK),
        useHostedScript("/unix-shell", my_unix_shell, "mysh", ".c", PERSONAL_UNIX_SHELL_LINK),
        useHostedScript("/upgrade-script", upgrade_code, "upgrade", ".mjs", PERSONAL_UPGRADE_SCRIPT_LINK),
        useHostedScript("/threadpool", my_threadpool, "threadpool", ".c", PERSONAL_THREADPOOL_LINK),
        useHostedScript("/use-docker-script", use_docker_code, "use-docker", ".mjs", PERSONAL_USE_DOCKER_SCRIPT_LINK),
    ];

    /** @type {AbortController} This abort controller manages the event listeners for a script page. */
    var scriptAbortController = null;
    var codeLineCopyTimeout = null;

    const router = useRouter();
    const webData = useWebsiteDataStore();
    const fullScreenStore = useFullScreenStore();
    const styleStore = useStyleStore();
    const scrollStore = useScrollStore();

    const mounted = ref(false);
    const wrapCode = ref(false);
    const fsStateChanging = ref(false);
    const maxLinesInScript = ref(Number.MAX_SAFE_INTEGER);

    /** This manages the status of the line options menu. */
    const lineOptions = ref({ num: -1, oldNum: -1, timeout: null, copyStatus: 0, lastCopied: "", extraClass: "below-num" });

    const scriptDownloadStatus = ref(0);
    const scriptSaveStatus = ref(0);
    const scriptCopyStatus = ref(0);

    /** This calculates what script page the visitor is currently viewing. */
    const currentScriptRoute = computed(() => {
        const routePath = router.currentRoute.value.path;
        return scripts.findIndex((item) => { return item.checkPath(routePath); });
    });

    const onScriptRoute = computed(() => { return (currentScriptRoute.value != -1); });
    const scriptBlobCreated = computed(() => { return (onScriptRoute.value ? scripts[currentScriptRoute.value].blobCreated.value : false); });
    const currentScriptFileSize = computed(() => { return (onScriptRoute.value ? scripts[currentScriptRoute.value].fileSize.value : ""); });
    const currentScriptLink = computed(() => { return (onScriptRoute.value ? scripts[currentScriptRoute.value].link : ""); });

    const downloadTitle = computed(() => {
        const downloadInt = scriptDownloadStatus.value;
        return (SCRIPT_DOWNLOAD_ACTION_TITLES[downloadInt] + ((downloadInt == 0) ? " (" + currentScriptFileSize.value + ")" : ""));
    });
    const saveScriptTitle = computed(() => {
        const saveInt = scriptSaveStatus.value;
        return (SCRIPT_SAVE_ACTION_TITLES[saveInt] + ((saveInt == 0) ? " (" + currentScriptFileSize.value + ")" : ""));
    });

    const copyTitle = computed(() => { return (SCRIPT_COPY_ACTION_TITLES[scriptCopyStatus.value] ?? ""); });
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
        if(scriptDownloadStatus.value != 0) { return; }
        scriptDownloadStatus.value = 1;

        try {
            const scriptFile = getCurrentScript();
            if(!scriptFile) { throw new Error("Script Does Not Exist!"); }

            const link = document.createElement('a');
            link.href = URL.createObjectURL(scriptFile.blob.value);
            link.download = (scriptFile.name + scriptFile.suffix);
        
            link.click();
            link.remove();
            scriptDownloadStatus.value = 2;
        } catch(e) {
            scriptDownloadStatus.value = 3;
        } finally {
            setTimeout(() => { scriptDownloadStatus.value = 0; }, 3000);
        }
    }

    /** This function lets users copy a script. */
    async function copyScript() {
        if(scriptCopyStatus.value != 0) { return; }
        scriptCopyStatus.value = 1;

        try {
            const scriptFile = getCurrentScript();
            if(!scriptFile) { throw new Error("Script Does Not Exist!"); }

            await navigator.clipboard.writeText(scriptFile.code);
            scriptCopyStatus.value = 2;
        } catch(e) {
            scriptCopyStatus.value = 3;
        } finally {
            setTimeout(() => { scriptCopyStatus.value = 0; }, 3000);
        }
    }

    /** This function opens a "Save File Picker" so the user can save my script at their preferred location. */
    async function saveScript() {
        if(!webData.saveAsSupported || scriptSaveStatus.value != 0) { return; }
        scriptSaveStatus.value = 1;

        try {
            const scriptFile = getCurrentScript();
            if(!scriptFile) { throw new Error("Script Does Not Exist!"); }

            const saveHandle = await window.showSaveFilePicker({
                suggestedName: scriptFile.name,
                types: [
                    (scriptFile.jsScript ?
                        { description: "JS File", accept: { 'text/javascript': [scriptFile.suffix] }} :
                        { description: "Code File", accept: { 'text/plain': [scriptFile.suffix] }}
                    ),
                    { description: "Text File", accept: { 'text/plain': ['.txt'] } }
                ]
            });

            const blob = (saveHandle.name.endsWith('txt') ? scriptFile.textBlob.value : scriptFile.blob.value);
            const writable = await saveHandle.createWritable();

            await writable.write(blob);
            await writable.close();
            scriptSaveStatus.value = 2;
        } catch(err) {
            /** @type {Error} The error made by canceling the save. */
            const newErr = err;
            scriptSaveStatus.value = ((newErr.name && newErr.name === "AbortError") ? 5 : 3);
        } finally {
            setTimeout(() => { scriptSaveStatus.value = 0; }, 3000);
        }
    }

    /**
     * This function should run every time the user presses a key on their keyboard while on a Script Page.
     * @param {KeyboardEvent} event The Keyboard Event.
     */
    function onScriptPageKeydown(event) {
        try {
            if(!event || !event.ctrlKey || event.repeat || !event.key || webData.showSharePopup) { return; }
            const keyLetter = event.key.toLowerCase();

            if(keyLetter === "c") {
                const selection = window.getSelection();
                const activeElement = document.activeElement;

                if(Boolean(activeElement) && activeElement.closest("." + SCRIPT_LINE_BUTTON_CLASS)) { return; }
                if(selection && selection.toString().trim().length > 0) { return; }

                event.preventDefault();
                if(checkLineNumber(lineOptions.value.num)) {
                    copyLineAttribute(event.altKey ? "link" : "text");
                } else {
                    waitForAutoScroll().then(() => { webData.setMenuOpen(SCRIPTS_MENU, false); });
                    copyScript();
                }
            } else if(keyLetter === "s") {
                event.preventDefault();
                waitForAutoScroll().then(() => { webData.setMenuOpen(SCRIPTS_MENU, false); });

                if(webData.saveAsSupported && (event.shiftKey || event.altKey)) {
                    saveScript();
                } else {
                    downloadScript();
                }
            }
        } catch(e) {
            if(import.meta.dev) { console.error(e); }
        }
    }

    /** This function returns the script the website is currently using. */
    function getCurrentScript() {
        if(!onScriptRoute.value) { return null; }
        return scripts[currentScriptRoute.value];
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
        mounted.value = true;
    }

    /**
     * This function mounts a page that hosts a script.
     * @param {Number} numLinesInScript This is the number of lines in the script.
     */
    async function mountScriptPage(numLinesInScript = Number.MAX_SAFE_INTEGER) {
        if(!onScriptRoute.value) { return; }
        maxLinesInScript.value = numLinesInScript;

        const hashStr = router.currentRoute.value.hash.substring(1);
        manageLineNumberFocus(parseInt(hashStr.substring(1), 10), -1, 0);

        setScriptAbortController(true);
        window.addEventListener("keydown",
            (event) => { onScriptPageKeydown(event); },
            { signal: scriptAbortController.signal, capture: true }
        );
        await setLineNumberEventListeners();
    }

    /** This function unmounts a page that hosts a script. */
    function unmountScriptPage() {
        fullScreenStore.exitFullScreen();
        setScriptAbortController(false);
        maxLinesInScript.value = Number.MAX_SAFE_INTEGER;
    }

    /**
     * This function sets the script abort controller.
     * @param {Boolean} status The new status of the abort controller.
     */
    function setScriptAbortController(status = false) {
        if(!import.meta.client) { return; }
        if(scriptAbortController != null) { scriptAbortController.abort(); }
        scriptAbortController = (status ? new AbortController() : null);
    }

    /** This function sets fresh event listeners for the script line numbers. */
    async function setLineNumberEventListeners() {
        try {
            await new Promise(async (resolve, reject) => {
                if(eventsAborted()) { return reject("Process Aborted"); }

                /** @type {HTMLCollectionOf<HTMLButtonElement>} This is the new website for  */
                const lineButtons = document.getElementsByClassName(SCRIPT_LINE_BUTTON_CLASS);
                const numLineButtons = lineButtons.length;
                const signal = scriptAbortController.signal;

                for(let i = 0; i < numLineButtons; i++) {
                    if(eventsAborted()) { return reject("Process Aborted"); }
                    const element = lineButtons.item(i);
                    if(!element) { continue; }

                    const lineNum = Number(element.getAttribute("line-number"));
                    if(isNaN(lineNum)) { continue; }

                    element.addEventListener("click", (event) => { openLineOptionsMenu(event, lineNum); }, { signal });
                    element.addEventListener("contextmenu", (event) => { openLineOptionsMenu(event, lineNum); }, { signal });
                    element.addEventListener("keydown", (event) => { onLineNumberKeydown(event, lineNum); }, { signal });
                }

                // This resolves the promise when all the event listeners are added.
                return resolve("Process Completed.");
            });
        } catch(e) {
            if(import.meta.dev && e !== "Process Aborted") { console.error(e); }
        }
    }

    /**
     * This function opens the script line options menu for a specific line of code.
     * Note that this must be used only by the line numbers to the left of the script's code itself.
     * @param {PointerEvent} event The event from clicking the button.
     * @param {Number} lineNum The number of the line in the code file.
     */
    function openLineOptionsMenu(event = null, lineNum = 0) {
        // console.log(event);
        if(!event || (event.pointerId == -1) || !event.type || !lineNum || !(event instanceof PointerEvent)) { return; }

        if(event.type.toLowerCase() === "contextmenu") {
            if(!event.ctrlKey) {
                event.preventDefault();
                triggerClickSound();
                setLineOptions(lineNum);
            }
        } else if(event.ctrlKey) {
            closeLineOptions();
            router.push(router.currentRoute.value.path + "#L" + String(lineNum));
        } else if(event.shiftKey) {
            closeLineOptions();
            shareLinePermalink(lineNum);
        } else {
            setLineOptions(lineNum);
        }
    }

    /**
     * This function runs when the user presses down a key while focused on a Script Line Number.
     * @param {KeyboardEvent} event The event from clicking the button.
     * @param {Number} lineNum The number of the line in the code file.
     */
    function onLineNumberKeydown(event = null, lineNum = 0) {
        if(!event || !event.key || !lineNum) { return; }
        const key = event.key.toLowerCase();
        const ctrlKey = event.ctrlKey;

        if(key === "enter" && !event.repeat) {
            setLineOptions(lineNum);
            triggerClickSound();
        } else if((key === "arrowup" || key === "w") && !ctrlKey) {
            event.preventDefault();
            focusOnLineNumberButton(lineNum - 1);
        } else if((key === "arrowdown" || key === "s") && !ctrlKey) {
            event.preventDefault();
            focusOnLineNumberButton(lineNum + 1);
        } else if(key === "c" && ctrlKey) {
            const selection = window.getSelection();
            if(selection && selection.toString().trim().length > 0) { return; }
            
            event.preventDefault();
            closeLineOptions();

            waitForAutoScroll().then(() => {
                setLineOptions(lineNum);
                copyLineAttribute(event.altKey ? "link" : "text");
                triggerClickSound();
            });
        }
    }

    /** This checks if the script abort controller's "abort()" function was called or not. */
    function eventsAborted() { if((scriptAbortController == null) ? true : scriptAbortController.signal.aborted); }

    /**
     * -------------------------------------------------------------------------------
     * These functions are used to set and record the status of the line options menu.
     * -------------------------------------------------------------------------------
     */

    /**
     * This function sets the status of the line options menu.
     * @param {Number} lineNum The number of the line to be opened. -1 closes the options menu.
     * @param {Boolean} noStylesChange If true, this function will not run the "placeLineOptionsOnCode" function.
     */
    async function setLineOptions(lineNum = -1, noStylesChange = false) {
        if(lineNum == -1 || !lineNum || lineOptions.value.num == lineNum) {
            closeLineOptions();
        } else {
            lineOptions.value.oldNum = lineOptions.value.num;
            lineOptions.value.num = lineNum;
            if(!noStylesChange) { placeLineOptionsOnCode(lineNum); }
            manageLineNumberFocus(lineNum, lineOptions.value.oldNum, 1);
        }
    }

    /** This function closes the line options. */
    function closeLineOptions() {
        lineOptions.value.oldNum = lineOptions.value.num;
        lineOptions.value.num = -1;
        manageLineNumberFocus(-1, lineOptions.value.oldNum, 1);
    }

    /**
     * This function sets the specific coords for where the popup should be on the code.
     * @param {Number} lineNum The Line number.
     */
    function placeLineOptionsOnCode(lineNum = -1) {
        const element = getLineElement(lineNum);
        if(element == null) { return; }

        const rect = element.querySelector(".mohit-scriptPage-code-lineNum")?.getBoundingClientRect();
        if(!rect) { return; }

        const heightRatio = styleStore.cssToWindowHeightRatio;
        const lineOptionsPosition = ((rect.top + (170 / heightRatio)) * heightRatio);
        const optionsAboveViewport = (lineOptionsPosition > styleStore.cssViewportHeight);

        const preElement = document.getElementById(SCRIPT_HTML_ID);
        var optionsAbovePre = false

        if(Boolean(preElement)) {
            const preElementBottomRect = ((preElement.getBoundingClientRect().bottom - 10) * heightRatio);
            optionsAbovePre = (lineOptionsPosition > preElementBottomRect);
            
            if(preElementBottomRect < 325) {
                closeLineOptions();
                scrollStore.scrollByIncrement(((-325 + preElementBottomRect) / heightRatio), false);
                sleep(100).then(() => { setLineOptions(lineNum, true); });
            }
        }

        // Based on the numbers above, this will determine if the line options menu appears above or below the line of code.
        lineOptions.value.extraClass = ((optionsAboveViewport || optionsAbovePre) ? "above-num" : "below-num");
    }

    /**
     * This function lets the user copy an attribute of a specific line.
     * @param {"text" | "link"} attribute The attribute to copy.
     */
    async function copyLineAttribute(attribute = "text") {
        if(lineOptions.value.copyStatus == 1) { return; }
        if(codeLineCopyTimeout != null) { clearTimeout(codeLineCopyTimeout); }
        codeLineCopyTimeout = null;
        
        try {
            if(attribute !== "text" && attribute !== "link") { throw new Error("Invalid Attribute"); }
            lineOptions.value.lastCopied = attribute;
            lineOptions.value.copyStatus = 1;

            const element = getLineElement(lineOptions.value.num);
            if(element == null) { throw new Error("Element Not Found"); }

            await navigator.clipboard.writeText(element.getAttribute("mohit-code-as-" + attribute));
            lineOptions.value.copyStatus = 2;
        } catch(e) {
            lineOptions.value.copyStatus = 3;
        } finally {
            if(codeLineCopyTimeout != null) { clearTimeout(codeLineCopyTimeout); }
            codeLineCopyTimeout = setTimeout(() => {
                lineOptions.value.copyStatus = 0;
                codeLineCopyTimeout = null;
            }, 3000);
        }
    }

    /**
     * This function opens the share popup for a line's permalink.
     * @param {Number} lineNum The number of the line to share. If invalid, uses the number for the line options menu instead.
     */
    function shareLinePermalink(lineNum = 0) {
        if(!checkLineNumber(lineNum)) { lineNum = lineOptions.value.num; }
        const element = getLineElement(lineNum);
        if(element != null) { webData.setQRCodePopup(element.getAttribute("mohit-code-as-link")); }
    }

    /**
     * --------------------------------------------------------------------------------
     * These functions are extra functions used by both the store and the script pages.
     * --------------------------------------------------------------------------------
     */

    /** This function sets the full screen for the element containing the document or script. */
    async function toggleScriptFullScreen() {
        if(!import.meta.client || fsStateChanging.value) { return; }
        const element = document.getElementById("script-page");
        if(!element) { return; }

        fsStateChanging.value = true;
        webData.bypassBodyClick();
        await fullScreenStore.setFullScreen(element);

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
        if(Number.isNaN(newLine) || !Number.isInteger(newLine)) { newLine = -1; }
        if(Number.isNaN(oldLine) || !Number.isInteger(oldLine)) { oldLine = -1; }

        const CLASS_NAME = (styleSet == 0 ? "num-highlight" : "num-highlight-optionsOpen");
        if(checkLineNumber(oldLine)) { getLineElement(oldLine)?.classList.remove(CLASS_NAME); }
        if(checkLineNumber(newLine)) { getLineElement(newLine)?.classList.add(CLASS_NAME); }
    }

    /**
     * This function focuses on a button for the line number.
     * @param {Number} lineNum The line number to focus on.
     */
    function focusOnLineNumberButton(lineNum) {
        if(!checkLineNumber(lineNum)) { return; }
        const buttonElement = (getLineElement(lineNum)?.querySelector("." + SCRIPT_LINE_BUTTON_CLASS) ?? null);
        if(buttonElement && ('focus' in buttonElement)) { buttonElement.focus({ preventScroll: false, focusVisible: true }); }
    }

    /**
     * This function checks if a number is a valid line number in the script being displayed.
     * @param {Number} lineNum The number to check.
     */
    function checkLineNumber(lineNum = 0) {
        return (lineNum >= 1 && lineNum <= maxLinesInScript.value && Number.isInteger(lineNum));
    }

     /**
     * This function returns the Element representing the line of code in the script webpage.
     * @param {Number} lineNum The number to use.
     */
    function getLineElement(lineNum = 0) {
        return (checkLineNumber(lineNum) ? document.getElementById("L" + String(lineNum)) : null);
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
        const preElement = document.getElementById(SCRIPT_HTML_ID);
        if(Boolean(preElement)) {
            preElement.style.textWrap = (wrapCode.value ? "wrap" : "nowrap");
            preElement.style.overflowWrap = (wrapCode.value ? "break-word" : "normal");
        }
    }

    return { scripts, mounted, wrapCode, lineOptions, maxLinesInScript, onScriptRoute, scriptBlobCreated,
        scriptDownloadStatus, scriptSaveStatus, scriptCopyStatus, downloadTitle, saveScriptTitle, copyTitle,
        currentScriptLink, copyCodeTextIcon, copyCodePermalinkIcon, wrapIcon, wrapStatement,
        downloadScript, copyScript, saveScript, onScriptPageKeydown, toggleScriptFullScreen, checkLineNumber,
        setCodeWrapping, setWrapCodeStyles, setLineOptions, closeLineOptions, placeLineOptionsOnCode,
        mountScriptsStore, mountScriptPage, unmountScriptPage, copyLineAttribute, shareLinePermalink
    }
});

/**
 * This serves as a simple utility that contains all the necessary objects a hosted script needs for a script page.
 * @param {String} path The path in the website that displays this script.
 * @param {String} code The actual code that this script has.
 * @param {String} name The name of the file.
 * @param {".mjs" | ".js" | ".cjs" | ".c"} suffix The suffix of the file.
 * @param {String} link A link where this file would be stored online. Most likely a GitHub Link.
 */
function useHostedScript(path = "", code = "", name = "", suffix = ".mjs", link = "") {
    path = (path.endsWith("/") ? path.substring(0, (path.length - 1)) : path);
    const router = useRouter();

    /** @type {import("vue").ShallowRef<Blob>} This Blob represents the raw data of the file passed in. */
    const blob = shallowRef(null);
    const blobCreated = ref(false);

    /** @type {import("vue").ShallowRef<Blob>} This Blob represents the raw data of the file passed in using the text/plain mime type. */
    const textBlob = ref(null);
    const jsScript = suffix.endsWith("js");

    const fileSize = computed(() => { return (blobCreated.value ? prettyBytes(blob.value.size, { binary: true }) : ""); });
    const onRoute = computed(() => { return checkPath(router.currentRoute.value.path); });

    /** This functions initializes the blob value for this hosted script. */
    function initBlob() {
        blob.value = new Blob([code], { type: (jsScript ? "text/javascript" : "text/plain") });
        textBlob.value = new Blob([code], { type: "text/plain" });
        blobCreated.value = true;
    }

    /**
     * This function checks whether the path associated with this hosted script is equivalent to another given path.
     * @param {String} pathname The path parameter.
     */
    function checkPath(pathname) {
        if(pathname.endsWith("/")) { pathname = pathname.substring(0, (pathname.length - 1)); }
        return (path === pathname || (path + "/") === pathname);
    }

    return { path, code, onRoute, name, suffix, jsScript,
        link, blob, textBlob, blobCreated, fileSize,
        initBlob, checkPath
    }
}