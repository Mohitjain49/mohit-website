<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<!-- <WebCover v-if="(documentMetadataMenuOpen && fullScreenStore.fullScreenSet)" /> -->
<Transition :name="webData.websiteMenuTransition">
    <div v-show="documentMetadataMenuOpen" class="mohit-navMenu doc-metadata" id="mohit-metadata-docMenu" ref="docMetadataMenu">
        <MenuTop :show-doc-options-btn="true" />

        <template v-if="!pdfMetadata.parsingPdf.value && pdfMetadata.metadataReceived.value">
            <button v-for="field in METADATA_FIELDS_1" class="mohit-navMenu-info clickable"
                @click="setFocusedMetadata(true, field.header, field.content.value)"
                :title="('Show ' + field.header + ' Options')">

                <span v-html="(field.header + ':' + repeatTabs(field.tabs))"></span>
                <span class="content" v-html="field.content.value"></span>
            </button>
            <div class="mohit-navMenu-opt-break"></div>

            <button v-for="field in METADATA_FIELDS_2" class="mohit-navMenu-info clickable"
                @click="setFocusedMetadata(true, field.header, field.content.value)"
                :title="('Show ' + field.header + ' Options')">

                <span v-html="(field.header + ':' + repeatTabs(field.tabs))"></span>
                <span class="content" v-html="field.content.value"></span>
            </button>
            <div class="mohit-navMenu-opt-break"></div>

            <button v-for="field in METADATA_FIELDS_3" class="mohit-navMenu-info clickable"
                @click="setFocusedMetadata(true, field.header, field.content.value)"
                :title="('Show ' + field.header + ' Options')">

                <span v-html="(field.header + ':' + repeatTabs(field.tabs))"></span>
                <span class="content" v-html="field.content.value"></span>
            </button>
            <div v-if="focusedMetadata.show" class="mohit-navMenu-opt-break"></div>

            <div v-if="focusedMetadata.show" class="metadata-docMenu-focused">
                <div class="top-section">
                    <h3> {{ focusedMetadata.header }} </h3>
                    <div class="metadata-docMenu-focused-options">
                        <button class="copy" @click="copyMetadataField()" :title="('Copy ' + focusedMetadata.header)" pulse-loop>
                            <FontAwesomeIcon :icon="COPY_ACTION_ICONS[metadataCopyState]" />
                        </button>
                        <button @click="setFocusedMetadata(false)" :title="('Hide ' + focusedMetadata.header + ' Options')" pulse-loop>
                            <FontAwesomeIcon icon="fa-xmark" />
                        </button>
                    </div>
                </div>
                <p :style="{ 'font-size': focusedMetadata.fontSize }"> {{ focusedMetadata.content }} </p>
            </div>
        </template>

        <div class="metadata-docMenu-loadingBar" v-if="pdfMetadata.parsingPdf.value">
            <div class="inner" :style="('width:' + (metadataLoadingCount * 20) + '%')"></div>
        </div>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const { documentMetadataMenuOpen } = storeToRefs(webData);
const { docImagesSize } = storeToRefs(useDocumentStore());

const props = defineProps({ objectUrl: { type: String, default: "" }});
const computedUrl = computed(() => { return props.objectUrl; });

const pdfMetadata = usePdfMetadata(computedUrl);
const loadingInterval = useIntervalFn(() => { incrementLoadingCount(); }, 400, { immediate: true });
const docMetadataMenu = shallowRef(null);

usePulseLoopAnimation(docMetadataMenu);
useWebsiteMenuUtility(docMetadataMenu);

// This watcher closes the bottom section when the user closes or opens this website menu.
watch(documentMetadataMenuOpen, () => { setFocusedMetadata(false, "", ""); });

/** This manages the state of this menu's bottom section. */
const focusedMetadata = ref({ show: false, header: "", content: "", fontSize: "10px" });
const metadataLoadingCount = ref(0);
const metadataCopyState = shallowRef(0);
var metadataCopyTimeout = null;

/** This returns a number of tabs that are necessary for a field. */
function repeatTabs(num = 3) {
    if(num < 1) { return ""; }
    var init = '\t';
    for(let i = 1; i < num; i++) { init = (init + '\t'); }
    return init;
}

/**
 * This function sets the state of this menu's bottom section.
 * @param {Boolean} show Whether the section should be shown or not.
 * @param {String} header The header for the section.
 * @param {String} content The main content for the section.
 */
function setFocusedMetadata(show = false, header = "", content = "") {
    if(show && header === focusedMetadata.value.header && content === focusedMetadata.value.content) {
        focusedMetadata.value = { show: false, header: "", content: "" }
    } else {
        focusedMetadata.value = { show, header: (show ? header : ""), content: (show ? content : "") }
    }

    focusedMetadata.value.fontSize = (focusedMetadata.value.show ?
        (String(14 - (focusedMetadata.value.content.length / 10)) + "px") : "10px"
    );
    metadataCopyState.value = 0;
    if(metadataCopyTimeout == null) { return; }

    clearTimeout(metadataCopyTimeout);
    metadataCopyTimeout = null;
}

/** This function copies the QR Code Link currently visible. */
async function copyMetadataField() {
    if(metadataCopyState.value > 0) { return; }
    metadataCopyState.value = 1;

    try {
        await navigator.clipboard.writeText(focusedMetadata.value.content);
        metadataCopyState.value = 2; 
    } catch(e) {
        metadataCopyState.value = 3;
    } finally {
        if(metadataCopyTimeout != null) { clearTimeout(metadataCopyTimeout); }
        metadataCopyTimeout = setTimeout(() => {
            metadataCopyState.value = 0;
            metadataCopyTimeout = null;
        }, 2000); 
    }
}

/** This function increments the loading count. */
function incrementLoadingCount() {
    if(!pdfMetadata.parsingPdf.value) {
        loadingInterval.pause()
    } else if(metadataLoadingCount.value > 6) {
        metadataLoadingCount.value = 0;
    } else {
        metadataLoadingCount.value++;
    }
}

const METADATA_FIELDS_1 = [
    { header: 'Title', tabs: 3, content: pdfMetadata.title },
    { header: 'Author', tabs: 3, content: pdfMetadata.author },
    { header: 'Subject', tabs: 3, content: pdfMetadata.subject },
    { header: 'Keywords', tabs: 2, content: pdfMetadata.keywordsAsOne },
    { header: 'Created', tabs: 3, content: pdfMetadata.dateCreated },
    { header: 'Modified', tabs: 2, content: pdfMetadata.dateModified },
    { header: 'Application', tabs: 2, content: pdfMetadata.application }
];
const METADATA_FIELDS_2 = [
    { header: 'PDF Producer', tabs: 1, content: pdfMetadata.producer },
    { header: 'PDF Version', tabs: 2, content: pdfMetadata.pdfVersion },
    { header: 'Page Count', tabs: 2, content: pdfMetadata.pageCountAsString },
    { header: 'Page Size', tabs: 2, content: pdfMetadata.pageSize }
];
const METADATA_FIELDS_3 = [
    { header: 'File Size (Decimal)', tabs: 5, content: pdfMetadata.fileSize },
    { header: 'File Size (Binary)', tabs: 6, content: pdfMetadata.fileSizeBinary },
    { header: 'File Size (PNG)', tabs: 6, content: docImagesSize }
];

/** These are the icons needed for the copy action. */
const COPY_ACTION_ICONS = ["fa-copy", "fa-spinner", "fa-check", "fa-ban"];
</script>