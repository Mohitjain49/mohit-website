<template>
<Transition name="fade-transition">
    <div v-if="(lineOptions.num != -1)" :style="menuPosition" id="mohit-line-options" class="mohit-script-lineOptions">
        <div class="mohit-script-lineOptions-top" ref="mohit-line-options-top">
            <h3> {{ ('Line ' + lineOptions.num) }} </h3>
            <div class="mohit-script-lineOptions-topOpts">
                <button class="white" @click="scriptsStore.setLineOptionsPlacement('toggle')" :title="menuPositionTitle">
                    <FontAwesomeIcon :icon="(moveToTopRight ? 'fa-arrow-down' : 'fa-border-top-left')" :rotation="90" />
                </button>
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
const fullScreenSet = getFullScreenSet();

const moveToTopRight = computed(() => { return lineOptions.value.onTopRight; });
const menuNextToNumber = computed(() => { return !moveToTopRight.value; });

const menuPosition = computed(() => { return (menuNextToNumber.value ? lineOptions.value.style :
    { left: ((window.innerWidth - 225 + (fullScreenSet.value ? 10 : 0)) + "px"), top: (fullScreenSet.value ? "10px" : "60px") }
); });
const menuPositionTitle = computed(() => { return (menuNextToNumber.value ? "Move Popup To Top-Right." : "Move Popup Next To Code"); });
</script>