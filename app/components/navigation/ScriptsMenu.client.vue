<style scoped>
@import "~/styles/navmenu.css";
</style>

<template>
<Transition name="navMenu-transition">
    <div v-show="webData.scriptsMenuOpen" class="mohit-navMenu" id="mohit-scriptsMenu" ref="scriptsMenu">
        <MenuTop />

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

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--vibrant-flame)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.setCodeWrapping('toggle', true)" pulse-loop>
                <span> {{ scriptsStore.wrapStatement }} </span>
                <font-awesome-icon :icon="scriptsStore.wrapIcon" />
            </button>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="scriptsStore.toggleScriptFullScreen()" pulse-loop>
                <span> Maximize Script </span>
                <font-awesome-icon :icon="fullScreenStore.faIcon" />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0)" pulse-loop>
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
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('#83D0DA')">
            <a :href="SHIKI_LINK" target="_blank" class="mohit-navMenu-mainOpt" :title="SHIKI_TITLE" pulse-loop>
                <span> Shiki </span>
                <img :src="shiki_icon" draggable="false" />
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

const SHIKI_TITLE = "This page uses the Shiki dependency to render and display my documents on this website. Click here to see more about Shiki.";
</script>