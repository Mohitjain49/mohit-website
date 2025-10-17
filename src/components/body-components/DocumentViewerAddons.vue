<template>
<button v-if="showLinkButton" @click="openShare()" class="pdf-doc-linkBtn" :title="('Get A Link For ' + titleEnd)">
    <FontAwesomeIcon icon="fa-link" />
</button>

<div v-if="!documentStore.docLoaded" class="pdf-doc-loadingCover">
    <div class="loading-spinner"></div>
</div>
</template>

<script setup>
const webData = useWebsiteDataStore();
const documentStore = useDocumentStore();
const { width: windowWidth } = useWindowSize();

const props = defineProps({
    shareLink: { type: String, default: "main" },
    titleEnd: { type: String, default: "" },
    linkButtonMinWidth: { type: Number, default: 0 },
    hideLinkButton: { type: Boolean, default: false },
});

const showLinkButton = computed(() => {
    return (!props.hideLinkButton && documentStore.docLoaded && windowWidth.value >= props.linkButtonMinWidth);
});

/**
 * This function opens the share popup.
 */
function openShare() {
    webData.setQRCodePopup(props.shareLink)
}
</script>

<style scoped>
.pdf-doc-linkBtn {
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: rgb(225, 225, 225);
    height: 40px;
    width: 40px;
    z-index: 50;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--website-light-text);
    border: 2px solid;
    border-radius: 15px;
    font-size: 22px;
    overflow: hidden;
    transition: box-shadow 0.2s, scale 0.2s;
}
.pdf-doc-linkBtn:hover {
    box-shadow: 0px 0px 10px 1px;
    scale: 1.1;
}

.pdf-doc-loadingCover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 50;
    background-color: rgba(0, 0, 0, 0.75);
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 600px) {
    .pdf-doc-linkBtn {
        width: 25px;
        height: 25px;
        font-size: 16px;
        border-radius: 8px;
    }
}
</style>