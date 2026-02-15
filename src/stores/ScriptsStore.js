import deploy_code from "@scripts/deploy.mjs?raw";

/** This store specifically handles Code Scripts I include on my website. It has similar functions to the document store. */
export const useScriptsStore = defineStore("scripts-store", () => {
    /**
     * @type {Array<{ path: String, code: String, name: String, suffix: String, blob: Blob, link: String }>}
     * This stores basic object data for each of the scripts hosted on my website.
     */
    const scripts = [
        { path: "/aws-deploy-script", code: deploy_code, name: "deploy", suffix: ".mjs", blob: null, link: PERSONAL_DEPLOY_SCRIPT_LINK }
    ];

    const router = useRouter();
    const webData = useWebsiteDataStore();
    const fullScreenStore = useFullScreenStore();

    const mounted = ref(false);
    const deployScript = ref({ html: "<pre> <div class=\"loading-spinner\"></div> </pre>", loaded: false });

    const scriptDownloadStatus = ref({ pending: false, fresh: false, timeout: null });
    const scriptSaveStatus = ref({ pending: false, fresh: false, error: false, timeout: null });
    const scriptCopyStatus = ref({ pending: false, fresh: false, error: false, timeout: null });

    /** This calculates what script page the visitor is currently viewing. */
    const currentScriptRoute = computed(() => {
        const routePath = router.currentRoute.value.path;
        return scripts.findIndex((item) => {
            return ((item.path === routePath || (item.path + "/") === routePath));
        });
    });
    const saveAsSupported = computed(() => {
        return (!checkSSR() && window.isSecureContext && typeof window.showSaveFilePicker === 'function');
    });

    /** The GitHub Link of the script currently being displayed. */
    const currentScriptLink = computed(() => { return ((currentScriptRoute.value == -1) ? "" : scripts[currentScriptRoute.value].link) });
    const onScriptRoute = computed(() => { return (currentScriptRoute.value != -1); });
    const onDeployScriptRoute = computed(() => { return (currentScriptRoute.value == 0); });

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

    /**
     * ---------------------------------------------------------------------------
     * These functions are for saving and using the scripts present on my website.
     * ---------------------------------------------------------------------------
     */

    /** This function downloads a script for the visitor to use. */
    function downloadScript() {
        scriptDownloadStatus.value.pending = true;
        const documentFile = getCurrentScript();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(documentFile.blob);
        link.download = (documentFile.name + documentFile.suffix);
    
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
        const documentFile = getCurrentScript();

        await navigator.clipboard.writeText(documentFile.code);
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
            const documentFile = getCurrentScript();

            const saveHandle = await window.showSaveFilePicker({
                suggestedName: documentFile.name,
                types: [{ description: "JS File", accept: { 'text/javascript': [documentFile.suffix] } }]
            });

            const writable = await saveHandle.createWritable();
            await writable.write(documentFile.blob);
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

    /** This function mounts the scripts store so the application can use it. */
    function mountScriptsStore() {
        for(let i = 0; i < scripts.length; i++) {
            scripts[i].blob = new Blob([scripts[i].code], { type: "text/javascript" });
        }
        mounted.value = true;
    }

    /** This function mounts a page that hosts a script. */
    async function mountScriptPage() {
        webData.mountWebData();
        await nextTick();

        if(onDeployScriptRoute.value && !deployScript.value.loaded) {
            deployScript.value.html = await initCodeScriptElement(scripts[0].code);
            deployScript.value.loaded = true;
        }
    }

    /** This function unmounts a page that hosts a script. */
    function unmountScriptPage() {
        document.body.style.overflowY = "";
        fullScreenStore.exitFullScreen();
    }

    /**
     * This function returns a string consisting of HTML that can be displayed to a user. 
     * @param {String} code The code as a string.
     */
    async function initCodeScriptElement(code = "") {
        try {
            const createHighlighterCore = (await import("shiki/dist/core.mjs")).createHighlighterCore;
            const createOnigurumaEngine = (await import("shiki/dist/engine-oniguruma.mjs")).createOnigurumaEngine;
            const langJs = (await import("shiki/dist/langs/javascript.mjs"));
            const themeVitesseDark = (await import("shiki/dist/themes/vitesse-dark.mjs"));

            const highlighter = await createHighlighterCore({
                themes: [themeVitesseDark], langs: [langJs],
                engine: createOnigurumaEngine(import('shiki/wasm')) 
            });
            const finalValue = highlighter.codeToHtml(code, { lang: "javascript", theme: "vitesse-dark" });
            return finalValue;
        } catch(e) {
            console.error(e);
            return "<pre> <div class=\"loading-spinner\"></div> </pre>";
        }
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

    /**
     * This function sets the full screen for the element containing the document or script.
     */
    function toggleScriptFullScreen() {
        fullScreenStore.setFullScreen(document.getElementById('script-page'));
        webData.closeNavMenu();
    }

    return { mounted, saveAsSupported, deployScript, onScriptRoute, onDeployScriptRoute, currentScriptLink,
        scriptDownloadStatus, scriptCopyStatus, scriptSaveStatus, downloadIcon, saveScriptIcon, copyIcon,
        downloadScript, copyScript, saveScript, toggleScriptFullScreen,
        mountScriptsStore, mountScriptPage, unmountScriptPage
    }
});