<template>
<div :class="['document-widgets-container', (docStore.checkMarkdownRoute() ? 'markdown' : '')]">
    <button @click="docStore.downloadDoc()" :class="WIDGET_CLASSES" title="Download Document">
        <client-only> <font-awesome-icon icon="fa-file-download" /> </client-only>
    </button>
    <button @click="reloadPage()" :class="WIDGET_CLASSES" title="Reload Page">
        <client-only> <font-awesome-icon icon="fa-rotate-right" /> </client-only>
    </button>

    <template v-if="route.path.includes('resume')">
        <RouterLink v-if="!docStore.checkPDFRoute()" to="/resume/pdf" :class="WIDGET_CLASSES" title="Use Built-In PDF Viewer">
            <client-only> <font-awesome-icon icon="fa-file-pdf" /> </client-only>
        </RouterLink>
        <RouterLink v-if="docStore.checkPDFRoute()" to="/resume" :class="WIDGET_CLASSES" title="Use Google Doc Viewer">
            <client-only> <font-awesome-icon icon="fa-brands fa-google-drive" /> </client-only>
        </RouterLink>
        <RouterLink to="/resume/markdown" :class="WIDGET_CLASSES" title="Resume In Markdown Format">
            <client-only> <font-awesome-icon icon="fa-brands fa-markdown" /> </client-only>
        </RouterLink>
    </template>

    <template v-if="!route.path.includes('resume')">
        <RouterLink v-if="!docStore.checkPDFRoute()" :to="(FCS_CERTIFICATE_ROUTE + '/pdf')" :class="WIDGET_CLASSES" title="Use Built-In PDF Viewer">
            <client-only> <font-awesome-icon icon="fa-file-pdf" /> </client-only>
        </RouterLink>
        <RouterLink v-if="docStore.checkPDFRoute()" :to="FCS_CERTIFICATE_ROUTE" :class="WIDGET_CLASSES" title="Use Google Doc Viewer">
            <client-only> <font-awesome-icon icon="fa-brands fa-google-drive" /> </client-only>
        </RouterLink>
        <a :href="FCS_CERTIFICATE_LINKEDIN_POST" target="_blank" :class="WIDGET_CLASSES" title="See LinkedIn Post">
            <client-only> <font-awesome-icon icon="fa-brands fa-linkedin" /> </client-only>
        </a>
        <a :href="FCS_CAREER_INTERNSHIP_LINK" target="_blank" :class="WIDGET_CLASSES" title="FCS Career Internship Program">
            <client-only> <font-awesome-icon icon="fa-school-flag" /> </client-only>
        </a>
    </template>
</div>
</template>

<script setup>
const route = useRoute();
const docStore = useDocumentStore();

const WIDGET_CLASSES = computed(() => {
    return ['document-widget', 'animate__animated', (docStore.checkMarkdownRoute() ? 'animate__fadeInUp' : 'animate__fadeInBottomRight')]
});

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });

/**
 * This function reloads the website.
 */
function reloadPage() {
    window.location.reload();
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
.document-widgets-container.markdown {
    top: auto;
    bottom: 10px;
    left: calc(50% - 100px);
    width: 200px;
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
    .document-widgets-container.markdown .document-widget {
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