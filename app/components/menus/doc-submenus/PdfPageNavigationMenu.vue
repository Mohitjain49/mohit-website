<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<!-- <WebCover v-if="(pdfNavMenuOpen && fullScreenStore.fullScreenSet)" /> -->
<Transition :name="webData.websiteMenuTransition">
    <div v-show="pdfNavMenuOpen" class="mohit-navMenu pdf-nav" id="mohit-docMenu-pdfNav" ref="pdfPageNavMenu">
        <MenuTop :show-doc-options-btn="true" />

        <RouterLink v-for="(page, index) in docImageUrls"
            :to="(routePath + '#page_' + String(index + 1))"
            @click="webData.closeNavMenu()" class="mohit-pdfNav-tab">

            <img :src="page" draggable="false" style="width: 200px" />
            <p> {{ ('Page ' + String(index + 1)) }} </p>
        </RouterLink>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const router = useRouter();

const routePath = computed(() => { return router.currentRoute.value.path; });
const { pdfNavMenuOpen } = storeToRefs(webData);
const { docImageUrls } = storeToRefs(useDocumentStore());

const pdfPageNavMenu = shallowRef(null);
useWebsiteMenuUtility(pdfPageNavMenu);
</script>