<template>
<button @click="docStore.downloadDoc()" :class="WIDGET_CLASSES" title="Download Document">
    <client-only> <font-awesome-icon icon="fa-download" /> </client-only>
</button>
<button @click="reloadPage()" :class="WIDGET_CLASSES" class="reload" title="Reload Page">
    <client-only> <font-awesome-icon icon="fa-rotate-right" /> </client-only>
</button>

<template v-if="checkResumePage()">
    <RouterLink v-if="checkRoute()" to="/resume/pdf" :class="WIDGET_CLASSES" class="nav" title="Use Built-In PDF Viewer">
        <client-only> <font-awesome-icon icon="fa-file-pdf" /> </client-only>
    </RouterLink>
    <RouterLink v-if="!checkRoute()" to="/resume" :class="WIDGET_CLASSES" class="nav" title="Use Google Doc Viewer">
        <client-only> <font-awesome-icon icon="fa-brands fa-google-drive" /> </client-only>
    </RouterLink>
</template>

<a v-if="!checkResumePage()" :href="FCS_CERTIFICATE_LINK" :class="WIDGET_CLASSES" class="nav" title="Use Built-In PDF Viewer">
    <client-only> <font-awesome-icon icon="fa-file-pdf" /> </client-only>
</a>
</template>

<script setup>
const route = useRoute();
const docStore = useDocumentStore();
const WIDGET_CLASSES = ['document-widget', 'animate__animated', 'animate__fadeInBottomRight'];

onMounted(() => { docStore.mountDocumentPage(); });
onBeforeUnmount(() => { docStore.unmountDocumentPage(); });

/**
 * This function reloads the website.
 */
function reloadPage() {
    window.location.reload();
}

/**
 * This function checks if the visitor is using the Google Doc Viewer or the Built-In PDF Viewer.
 */
function checkRoute() {
    return (route.path === "/resume" || route.path === "/resume/");
}

/**
 * This function checks if the page is a resume page or not.
 */
function checkResumePage() {
    return route.path.includes("resume");
}
</script>

<style>
.document-widget {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    top: 75px;
    left: 10px;
    background-color: var(--website-text);
    width: 45px;
    height: 45px;
    border-radius: 30px;
    z-index: 5;
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

.document-widget.reload {
    top: 125px;
}
.document-widget.nav {
    top: 175px;
}

@media (max-width: 825px) {
    .document-widget {
        width: 32px;
        height: 32px;
        font-size: 17px;
    }

    .document-widget.reload {
        top: 112px;
    }
    .document-widget.nav {
        top: 148px;
    }
}
@media (max-width: 360px) {
    .document-widget {
        display: none;
    }
}
</style>