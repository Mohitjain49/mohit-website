<style scoped>
@import "~/styles/navmenu.css";
</style>

<template>
<div class="webpage-cover" v-if="(webData.scriptsMenuOpen && fullScreenStore.fullScreenSet)"></div>
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.scriptsMenuOpen" class="mohit-navMenu" id="mohit-scriptsMenu" ref="scriptsMenu">
        <MenuTop />

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.downloadScript()" pulse-loop>
                <font-awesome-icon :icon="scriptsStore.downloadIcon"
                    :spin-pulse="scriptsStore.scriptDownloadStatus.pending"
                />
                <span> Download Code Script </span>
            </button>
        </div>
        <div v-if="scriptsStore.saveAsSupported" class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-three)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.saveScript()" pulse-loop>
                <font-awesome-icon :icon="scriptsStore.saveScriptIcon"
                    :spin-pulse="scriptsStore.scriptSaveStatus.pending"
                />
                <span> Save Code Script </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--blue-one)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.copyScript()" pulse-loop>
                <font-awesome-icon :icon="scriptsStore.copyIcon"
                    :spin-pulse="scriptsStore.scriptCopyStatus.pending"
                />
                <span> Copy Raw Code Script </span>
            </button>
        </div>
        <div v-if="(scriptsStore.currentScriptLink != '')" class="mohit-navMenu-opt" :style="getColorStyles('white')">
            <a :href="scriptsStore.currentScriptLink" target="_blank" class="mohit-navMenu-mainOpt" pulse-loop>
                <font-awesome-icon icon="fa-brands fa-github" />
                <span> See Code On Github </span>
            </a>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.setCodeWrapping('toggle', true)" pulse-loop>
                <font-awesome-icon :icon="scriptsStore.wrapIcon" />
                <span> {{ scriptsStore.wrapStatement }} </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt">
            <RouterLink :to="routePath" class="mohit-navMenu-mainOpt" @click="scrollToTop(false, 0)" pulse-loop>
                <font-awesome-icon icon="fa-turn-up" />
                <span> Scroll To The Top </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.toggleScriptFullScreen()" pulse-loop>
                <font-awesome-icon :icon="fullScreenStore.faIcon" />
                <span> {{ (fullScreenStore.fullScreenSet ? 'Minimize Script' : 'Maximize Script') }} </span>
            </button>
        </div>
        <div v-if="!fullScreenStore.fullScreenSet" class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0)" pulse-loop>
                <font-awesome-icon icon="fa-bars" />
                <span> Open Navigation Menu </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="router.back()" pulse-loop>
                <font-awesome-icon icon="fa-tent-arrow-turn-left" />
                <span> Leave To Previous Page </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('#83D0DA')">
            <a :href="SHIKI_LINK" target="_blank" class="mohit-navMenu-mainOpt" :title="SHIKI_TITLE" pulse-loop>
                <img :src="shiki_icon" draggable="false" />
                <span> Shiki </span>
            </a>
        </div>
    </div>
</Transition>
</template>

<script setup>
import shiki_icon from "~/assets/Shiki_logo.svg";
const SHIKI_LINK = "https://shiki.style/";

const webData = useWebsiteDataStore();
const fullScreenStore = useFullScreenStore();
const scriptsStore = useScriptsStore();
const router = useRouter();

const scriptsMenu = shallowRef(null);
useSwipeToCloseMenu(scriptsMenu);
usePulseLoopAnimation(scriptsMenu);

const routePath = computed(() => { return router.currentRoute.value.path; });
const SHIKI_TITLE = "This page uses the Shiki dependency to render and display my documents on this website. Click here to see more about Shiki.";
</script>