<template>
<Transition name="fade-transition">
    <div v-if="(lineOptions.num != -1)" :style="lineOptions.style" id="mohit-line-options" class="mohit-script-lineOptions">
        <div class="mohit-script-lineOptions-top" ref="mohit-line-options-top">
            <h3> Line <span id="lineOptions-num" v-html="lineOptions.num"></span> </h3>
            <div class="mohit-script-lineOptions-topOpts">
                <button @click="scriptsStore.setLineOptions(-1)" :title="('Close Options For Line ' + lineOptions.num)">
                    <FontAwesomeIcon icon="fa-xmark" />
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
const scriptsStore = useScriptsStore();
const { lineOptions } = storeToRefs(scriptsStore);
</script>