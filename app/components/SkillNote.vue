<template>
<div v-if="(link === '#')" class="mohit-note no-link" v-pulse-loop>
    <div class="mohit-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="mohit-note-body" :style="{ color: color }">
        <div class="mohit-note-header"> {{ name }} </div>
        <div class="mohit-note-desc"> {{ desc }} </div>
    </div>
</div>

<a v-else-if="isExternalLink" :href="link" target="_blank" class="mohit-note" v-pulse-loop>
    <div class="mohit-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="mohit-note-body" :style="{ color: color }">
        <div class="mohit-note-header"> {{ name }} </div>
        <div class="mohit-note-desc"> {{ desc }} </div>
    </div>
</a>

<button v-else-if="(link === 'mohit-qrcode-button')" class="mohit-note" v-pulse-loop
    title="Create a QR Code for this page."
    @click="webData.openQRCodePopup()">

    <div class="mohit-note-image">
        <font-awesome-icon :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="mohit-note-body" :style="{ color: color }">
        <div class="mohit-note-header"> {{ name }} </div>
        <div class="mohit-note-desc"> {{ desc }} </div>
    </div>
</button>

<RouterLink v-else :to="link" class="mohit-note" v-pulse-loop>
    <div class="mohit-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="mohit-note-body" :style="{ color: color }">
        <div class="mohit-note-header"> {{ name }} </div>
        <div class="mohit-note-desc"> {{ desc }} </div>
    </div>
</RouterLink>
</template>

<script setup>
const webData = useWebsiteDataStore();
const props = defineProps({
    link: { type: String, default: "#" },
    faIcon: { type: Boolean, default: true },
    color: { type: String, default: "var(--website-text)" },
    name: { type: String, default: "JavaScript" },
    desc: { type: String, default: "" },
    size: { type: String, default: "105" },
    id: { type: String, default: "fa-circle-info" }
});

/** This tells the component if the link leads to an external website or not. */
const isExternalLink = computed(() => {
    const link = props.link;
    return (link.includes("https://") || link.includes("http://"));
});

/** This function returns a style object for an Font Awesome icon on here. */
function getFAIconStyle() { return { color: props.color, fontSize: (props.size + "px") }}
</script>

<style scoped lang="scss">
.mohit-note-container {
    display: contents !important;
}
.mohit-note {
    height: 400px;
    width: 360px;
    border: 3px solid var(--website-light-text);
    border-radius: 20px;
    overflow: hidden;
    transition: var(--default-transition);
    background-color: white;
    box-shadow: 0px 0px 3px 3px rgba(255, 255, 255, 0.25);
    --animate-duration: 0.7s;
}

.mohit-note:hover {
    border-color: var(--website-text);
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.25);
}
.mohit-note.no-link {
    cursor: default;
}

.mohit-note-image {
    height: 147px;
    width: 100%;
    border-bottom: 3px solid var(--website-light-text);
    background-color: var(--silver-light);
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
}
.mohit-note:hover .mohit-note-image {
    border-color: var(--website-text);
}
.mohit-note-image svg, .mohit-note-image img {
    user-select: none;
}

.mohit-note-body {
    height: calc(100% - 160px);
    width: calc(100% - 20px);
    padding: 10px 10px 0px;
    text-align: left;
    font-family: 'Roboto', sans-serif;
}
.mohit-note-body.more-info {
    color: var(--website-light-text);
    transition: var(--default-transition);
}
.mohit-note:hover .mohit-note-body.more-info {
    color: var(--website-text);
}

.mohit-note-moreInfo-icon {
    color: var(--website-light-text);
    transition: var(--default-transition);
    font-size: 110px;
}
.mohit-note:hover .mohit-note-image .mohit-note-moreInfo-icon {
    color: var(--website-text);
}

.mohit-note-header {
    font-size: 35px;
    color: inherit;
    margin-bottom: 12px;
    font-weight: bold;
    font-family: 'Lexend', sans-serif;
}
.mohit-note-desc {
    font-size: 16px;
    color: inherit;
}

@include dynamic-less-equal-width-rule(450) {
    .mohit-note { width: 325px; }
}
</style>