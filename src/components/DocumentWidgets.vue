<template>
<div :class="['document-widgets-container', (confirmBottomWidgets() ? 'bottom' : '')]">
    <button @click="docStore.downloadDoc()" :class="WIDGET_CLASSES" title="Download Document">
        <font-awesome-icon icon="fa-file-download" />
    </button>
    <button @click="reloadPage()" :class="WIDGET_CLASSES" title="Reload Page">
        <font-awesome-icon icon="fa-rotate-right" />
    </button>

    <template v-if="docStore.checkResumeRoute()">
        <RouterLink to="/resume" :class="WIDGET_CLASSES" title="Use Google Doc Viewer">
            <font-awesome-icon icon="fa-brands fa-google-drive" />
        </RouterLink>
        <RouterLink to="/resume/pdf" :class="WIDGET_CLASSES" title="Use Built-In PDF Viewer">
            <font-awesome-icon icon="fa-file-pdf" />
        </RouterLink>
        <RouterLink to="/resume/markdown" :class="WIDGET_CLASSES" title="Resume In Markdown Format">
            <font-awesome-icon icon="fa-brands fa-markdown" />
        </RouterLink>
    </template>

    <template v-if="!docStore.checkResumeRoute()">
        <RouterLink v-if="!docStore.checkPDFRoute()" :to="(FCS_CERTIFICATE_ROUTE + '/pdf')" :class="WIDGET_CLASSES" title="Use Built-In PDF Viewer">
            <font-awesome-icon icon="fa-file-pdf" />
        </RouterLink>
        <RouterLink v-if="docStore.checkPDFRoute()" :to="FCS_CERTIFICATE_ROUTE" :class="WIDGET_CLASSES" title="Use Google Doc Viewer">
            <font-awesome-icon icon="fa-brands fa-google-drive" />
        </RouterLink>
        <a :href="FCS_CERTIFICATE_LINKEDIN_POST" target="_blank" :class="WIDGET_CLASSES" title="See LinkedIn Post">
            <font-awesome-icon icon="fa-brands fa-linkedin" />
        </a>
        <a :href="FCS_CAREER_INTERNSHIP_LINK" target="_blank" :class="WIDGET_CLASSES" title="FCS Career Internship Program">
            <font-awesome-icon icon="fa-school-flag" />
        </a>
    </template>
</div>
</template>

<script setup>
const docStore = useDocumentStore();
const WIDGET_CLASSES = computed(() => {
    return ['document-widget', 'animate__animated', (confirmBottomWidgets() ? 'animate__fadeInUp' : 'animate__fadeInLeft')]
});

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });

/**
 * This function reloads the website.
 */
function reloadPage() {
    window.location.reload();
}

/**
 * This returns true if the document widgets should sit at the bottom of the page.
 */
function confirmBottomWidgets() {
    return (docStore.checkPDFRoute() || docStore.checkMarkdownRoute());
}
</script>

<style>
.document-widgets-container {
    position: fixed;
    top: 75px;
    left: 10px;
    height: fit-content;
    width: fit-content;
    z-index: 5;
}
.document-widgets-container.bottom {
    top: auto;
    bottom: 10px;
    left: calc(50% - 125px);
    width: 250px;
    display: flex;
    flex-direction: row;
    gap: 7px;
}

.document-widget {
    cursor: pointer;
    overflow: hidden;
    background-color: var(--website-text);
    width: 45px;
    height: 45px;
    margin-bottom: 5px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), height 0.2s, width 0.2s;
    color: rgba(0, 0, 0, 0.8);
    font-size: 22px;
}
.document-widget:hover {
    background-color: var(--website-light-text);
}

@media (max-width: 825px) {
    .document-widget {
        width: 32px;
        height: 32px;
        font-size: 17px;
    }
    .document-widgets-container.bottom .document-widget {
        width: 45px;
        height: 45px;
        font-size: 22px;
    }
}
@media (max-width: 360px) {
    .document-widget {
        display: none;
    }
}
</style>