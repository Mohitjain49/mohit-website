<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<WebCover v-if="(webData.documentMetadataMenuOpen && fullScreenStore.fullScreenSet)" />
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.documentMetadataMenuOpen" class="mohit-navMenu" id="mohit-metadata-docMenu" ref="docMetadataMenu">
        <MenuTop />
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();

const props = defineProps({ objectUrl: { type: String, default: "" }});
const computedUrl = computed(() => { return props.objectUrl; });
const pdfMetadata = usePdfMetadata(computedUrl);
</script>