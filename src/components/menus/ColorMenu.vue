<template>
    <div :class="(globePage ? GLOBE_MENU_CLASSES : NAV_BAR_CLASSES)">
        <div v-for="preset in webData.colorHandler.COLOR_PRESETS"
            class="navBar-dropdown-opt-container center-flex-display"
            :style="{ 'background': preset.navBarBackground }"
            @click="callSetColor(preset.name)">

            <div :class="[preset.cmClass, 'center-flex-display']"
                v-html="preset.name">
            </div>
        </div>
    </div>
</template>

<script setup>
import "../../styles/dropdowns.css";
import { useWebsiteDataStore } from "../../stores/WebsiteData.js";
import { useGlobeStore } from "../../stores/GlobeStore.js";

const webData = useWebsiteDataStore();
const globeStore = useGlobeStore();
const props = defineProps({ globePage: Boolean })

const NAV_BAR_CLASSES = ["navBar-dropdown", "color-nav-dropdown"];
const GLOBE_MENU_CLASSES = ["globe-menu"];

/**
 * This calls the "setColor" function.
 * @param {String} colorName The name of the color preset.
 */
const callSetColor = (colorName) => {
    webData.colorHandler.setColor(colorName);
    globeStore.setPointImage(); 
}
</script>