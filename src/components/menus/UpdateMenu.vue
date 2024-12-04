<template>
<div class="update-menu">
    <h1 class="update-menu-title center-flex-display">Updates</h1>
    <div v-for="(update, index) in Updates" class="update-menu-tab-container">
        <div style="height: 30px; width: 100%"></div>
        <div class="update-menu-tab">
            <div class="update-menu-tab-main">
                <h3 class="update-menu-tab-header" @click="navigateToUpdate(update.versionPath)">
                    {{ 'Version ' + update.version }}<br>
                    <p style="font-size: 16px;"> {{'Released ' + update.releaseDate }} </p>
                </h3>
                <font-awesome-icon class="update-menu-tab-arrow" @click="setTabExpanded(index)"
                    :icon="(tabsExpanded[index] ? 'fa-file-arrow-up' : 'fa-file-arrow-down')"
                    :title="(tabsExpanded[index] ? 'Hide Topics' : 'Show Topics')"
                />
            </div>

            <ul v-if="tabsExpanded[index]" class="update-menu-topics-list">
                <li v-for="topic in update.topics" class="update-menu-topic"
                    @click="navigateToUpdateTopic(update.versionPath, topic.elementId)"
                    v-html="topic.name">
                </li>
            </ul>
        </div>
    </div>
    <div class="update-menu-tab-container">
        <div style="height: 30px; width: 100%"></div>
    </div>
</div>
</template>

<script setup>
import "../../styles/update.css";
import { Updates } from '../../stores/Updates.js';

import { ref } from "vue";
import { useWebsiteDataStore } from "@/stores/WebsiteData";

const webData = useWebsiteDataStore();
const tabsExpanded = ref(
    new Array(Updates.length).fill(true, 0, Updates.length)
);

/**
 * This sets whether a specific tab is expanded or not given an index.
 * @param {Number} index the index of the tab to expand.
 */
function setTabExpanded(index = 0) {
    tabsExpanded.value[index] = !tabsExpanded.value[index];
}

/**
 * This navigates to the update indicated by the path.
 * @param {String} versionPath The version path to navigate to.
 */
function navigateToUpdate(versionPath = "home") {
    webData.routeHandler.navigateToUpdate(versionPath);
}

/**
 * This navigates to the specific topi the user wants more info on.
 * @param {String} updatePath The update that contains the topic.
 * @param {String} id The id of the main element for this. 
 */
function navigateToUpdateTopic(updatePath = "1-1-0", id = "") {
    webData.routeHandler.navigateToUpdateTopic(updatePath, id);
}
</script>