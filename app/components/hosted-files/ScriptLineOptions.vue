<template>
<Transition name="fade-transition">
    <div v-if="(lineOptionsNum != -1)" :style="lineOptions.style" id="mohit-line-options" class="mohit-script-lineOptions">
        <div class="mohit-script-lineOptions-top" ref="mohit-line-options-top">
            <h3> Line <span id="lineOptions-num" v-html="lineOptionsNum"></span> </h3>
            <div class="mohit-script-lineOptions-topOpts">
                <button class="web-menu" @click="openScriptsMenu()" ref="options-open-web-menu-btn" title="Open Scripts Menu">
                    <FontAwesomeIcon icon="fa-file-export" :jello="animateWebMenuButton" />
                </button>
                <button @click="closeLineOptionsMenu()" ref="options-close-btn" :title="('Close Options For Line ' + lineOptionsNum)">
                    <FontAwesomeIcon icon="fa-xmark" :jello="animateCloseButton" />
                </button>
            </div>
        </div>
        <button @click="scriptsStore.copyLineAttribute('text')">
            <span> Copy Text </span> <FontAwesomeIcon :icon="scriptsStore.copyCodeTextIcon" />
        </button>
        <button @click="scriptsStore.copyLineAttribute('link')">
            <span> Copy Permalink </span> <FontAwesomeIcon :icon="scriptsStore.copyCodePermalinkIcon" />
        </button>
        <button class="share" @click="scriptsStore.shareLinePermalink()">
            <span> Share Permalink </span> <FontAwesomeIcon icon="fa-share-from-square" />
        </button>
    </div>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const scriptsStore = useScriptsStore();
const { lineOptions } = storeToRefs(scriptsStore);

const closeButton = useTemplateRef('options-close-btn');
const webMenuButton = useTemplateRef('options-open-web-menu-btn');
const hoverOnCloseButton = useElementHover(closeButton);
const hoverOnWebMenuButton = useElementHover(webMenuButton);

const lineOptionsNum = computed(() => { return lineOptions.value.num; });
const animateCloseButton = ref(false);
const animateWebMenuButton = ref(false);

watch(hoverOnCloseButton, (newValue) => { animateCloseButton.value = newValue; });
watch(hoverOnWebMenuButton, (newValue) => { animateWebMenuButton.value = newValue; });
watch(lineOptionsNum, () => { stopButtonAnimations(); });

/** This function opens the scripts menu. */
function openScriptsMenu() {
    closeLineOptionsMenu();
    webData.bypassBodyClick();
    webData.setMenuOpen(SCRIPTS_MENU, false);
}

/** This function closes the line options menu. */
function closeLineOptionsMenu() {
    stopButtonAnimations();
    scriptsStore.setLineOptions(-1);
}

/** This function stops animations for all buttons in this menu. */
function stopButtonAnimations() {
    animateCloseButton.value = false;
    animateWebMenuButton.value = false;
}
</script>