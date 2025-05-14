<template>
<button @click="downloadResume()" :class="WIDGET_CLASSES" title="Download My Resume">
    <client-only> <font-awesome-icon icon="fa-download" /> </client-only>
</button>
<button @click="reloadPage()" :class="WIDGET_CLASSES" class="reload" title="Reload Page">
    <client-only> <font-awesome-icon icon="fa-rotate-right" /> </client-only>
</button>

<RouterLink v-if="checkRoute()" to="/resume/pdf" :class="WIDGET_CLASSES" class="nav" title="Use Built-In PDF Viewer">
    <client-only> <font-awesome-icon icon="fa-file-pdf" /> </client-only>
</RouterLink>
<RouterLink v-if="!checkRoute()" to="/resume" :class="WIDGET_CLASSES" class="nav" title="Use Google Doc Viewer">
    <client-only> <font-awesome-icon icon="fa-brands fa-google-drive" /> </client-only>
</RouterLink>
</template>

<script setup>
const route = useRoute();
const WIDGET_CLASSES = ['resume-widget', 'animate__animated', 'animate__fadeInBottomRight'];

onMounted(() => {
    initWebData();
    nextTick().then(() => {
        hideVerticalOverflow();
        window.addEventListener("resize", hideVerticalOverflow);
    })
});
onBeforeUnmount(() => {
    document.body.style.overflowY = "";
    window.removeEventListener("resize", hideVerticalOverflow);
});

/**
 * This function hides the body's vertical overflow.
 */
function hideVerticalOverflow() {
    document.body.style.overflowY = "hidden";
}

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
</script>

<style>
.resume-widget {
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
.resume-widget:hover {
    background-color: var(--website-light-text);
}

.resume-widget.reload {
    top: 125px;
}
.resume-widget.nav {
    top: 175px;
}

@media (max-width: 825px) {
    .resume-widget {
        width: 32px;
        height: 32px;
        font-size: 17px;
    }

    .resume-widget.reload {
        top: 112px;
    }
    .resume-widget.nav {
        top: 148px;
    }
}
@media (max-width: 360px) {
    .resume-widget {
        display: none;
    }
}
</style>