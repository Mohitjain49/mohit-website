<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<Transition name="navMenu-transition">
    <div v-show="webData.scriptsMenuOpen" class="mohit-navMenu" id="mohit-scriptsMenu" ref="scriptsMenu">
        <div class="mohit-navMenu-top">
            <div class="mohit-navBar-icons left" style="margin-left: 15px;">
                <RouterLink to="/" class="mohit-navBar-banner" @click="(event) => { flashNavOpt(event, '/') }" title="Home Page" pulse-loop>
                    <img :src="mkj_text" draggable="false" />
                </RouterLink>
            </div>

            <div class="mohit-navBar-icons right" style="margin-right: 12px;">
                <button class="mohit-navBar-icon light" @click="webData.openQRCodePopup()" title="Share This Page With Someone Else!" pulse-loop>
                    <font-awesome-icon icon="fa-share-from-square" />
                </button>
                <button class="mohit-navBar-icon light" @click="webData.closeNavMenu()" title="Close Scripts Menu" pulse-loop>
                    <font-awesome-icon icon="fa-square-xmark" />
                </button>
            </div>
        </div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.downloadScript()" pulse-loop>
                <span> Download Code Script </span>
                <font-awesome-icon :icon="scriptsStore.downloadIcon"
                    :spin-pulse="scriptsStore.scriptDownloadStatus.pending"
                />
            </button>
        </div>
        <div v-if="scriptsStore.saveAsSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.saveScript()" pulse-loop>
                <span> Save Code Script </span>
                <font-awesome-icon :icon="scriptsStore.saveScriptIcon"
                    :spin-pulse="scriptsStore.scriptSaveStatus.pending"
                />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.copyScript()" pulse-loop>
                <span> Copy Raw Code Script </span>
                <font-awesome-icon :icon="scriptsStore.copyIcon"
                    :spin-pulse="scriptsStore.scriptCopyStatus.pending"
                />
            </button>
        </div>
        <div v-if="(scriptsStore.currentScriptLink != '')" class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="scriptsStore.currentScriptLink" target="_blank" class="mohit-navMenu-mainOpt" pulse-loop>
                <span> See Code On Github </span>
                <font-awesome-icon icon="fa-brands fa-github" />
            </a>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.toggleScriptFullScreen()" pulse-loop>
                <span> Maximize Script </span>
                <font-awesome-icon :icon="fullScreenStore.faIcon" />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0, 0)" pulse-loop>
                <span> Open Navigation Menu </span>
                <font-awesome-icon icon="fa-bars" />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="router.back()" pulse-loop>
                <span> Leave To Previous Page </span>
                <font-awesome-icon icon="fa-tent-arrow-turn-left" />
            </button>
        </div>
    </div>
</Transition>
</template>

<script setup>
import mkj_text from "/static-icons/Personal_Icon_Expanded_Rounded.png";
const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const scriptsStore = useScriptsStore();
const router = useRouter();

const scriptsMenu = shallowRef(null);
const scriptsMenuSwipe = useSwipe(scriptsMenu, { passive: true });
usePulseLoopAnimation(scriptsMenu);

// This tracks touch "swipe" events for the navigation menu so that the user can change the page if they swipe left or right.
watch(scriptsMenuSwipe.isSwiping, () => {
    if(!scriptsMenuSwipe.isSwiping.value) { return; }
    const direction = scriptsMenuSwipe.direction.value;

    if(direction === "right" && webData.scriptsMenuOpen) {
        webData.menuOpen = -1;
        triggerClickSound();
    } 
});
</script>