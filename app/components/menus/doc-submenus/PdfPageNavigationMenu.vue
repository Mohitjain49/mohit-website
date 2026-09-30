<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<!-- <WebCover v-if="(pdfNavMenuOpen && fullScreenStore.fullScreenSet)" /> -->
<Transition :name="webData.websiteMenuTransition">
    <div v-show="pdfNavMenuOpen" class="mohit-navMenu pdf-nav" id="mohit-docMenu-pdfNav" ref="pdfPageNavMenu">
        <MenuTop :show-doc-options-btn="true" />

        <RouterLink v-for="(page, index) in pdfNavigationCanvases"
            :to="(routePath + '#page_' + String(index + 1))"
            :id="('mohit-pdfNav-tab_page_' + String(index + 1))"
            @click="webData.closeNavMenu()" class="mohit-pdfNav-tab">

            <p :id="('mohit-pdfNav-tab_page_caption_' + String(index + 1))"> 
                {{ ('Page ' + String(index + 1)) }}
            </p>
        </RouterLink>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const router = useRouter();

const routePath = computed(() => { return router.currentRoute.value.path; });
const { pdfNavMenuOpen } = storeToRefs(webData);
const { pdfNavigationCanvases } = storeToRefs(useDocumentStore());

const pdfPageNavMenu = shallowRef(null);
useWebsiteMenuUtility(pdfPageNavMenu);

onMountedAdvanced(() => { appendCanvases(); });
watch(pdfNavigationCanvases, () => { appendCanvases(); })

/** This function appends the canvases generated for the PDF to this menu. */
function appendCanvases() {
    const canvases = pdfNavigationCanvases.value;
    const numPages = canvases.length;

    for(let i = 1; i <= numPages; i++) {
        const pageNumStr = String(i);
        const oldCanvasElement = document.getElementById("mohit-pdfNav-tab_page_canvas_" +  pageNumStr);
        if(oldCanvasElement != null) { oldCanvasElement.remove(); }

        const captionElement = document.getElementById("mohit-pdfNav-tab_page_caption_" + pageNumStr);
        if(captionElement != null) { captionElement.before(canvases[i - 1]); }
    }
}
</script>