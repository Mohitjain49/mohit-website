<template>
<div v-if="link === '#'" class="skills-note no-link"
    @mouseenter="setPulseLoopAnimation"
    @mouseleave="setPulseLoopAnimation">

    <div class="skills-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="skills-note-body" :style="{ color: color }">
        <div class="skills-note-header"> {{ name }} </div>
        <div class="skills-note-desc"> {{ desc }} </div>
    </div>
</div>

<a v-else-if="isExternalLink" :href="link" target="_blank" class="skills-note"
    @mouseenter="setPulseLoopAnimation"
    @mouseleave="setPulseLoopAnimation">

    <div class="skills-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="skills-note-body" :style="{ color: color }">
        <div class="skills-note-header"> {{ name }} </div>
        <div class="skills-note-desc"> {{ desc }} </div>
    </div>
</a>

<button v-else-if="link === 'mohit-qrcode-button'" class="skills-note"
    title="Create a QR Code for this page."
    @click="webData.setQRCodePopup(true)"
    @mouseenter="setPulseLoopAnimation"
    @mouseleave="setPulseLoopAnimation">

    <div class="skills-note-image">
        <font-awesome-icon :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="skills-note-body" :style="{ color: color }">
        <div class="skills-note-header"> {{ name }} </div>
        <div class="skills-note-desc"> {{ desc }} </div>
    </div>
</button>

<RouterLink v-else :to="link" class="skills-note"
    @mouseenter="setPulseLoopAnimation"
    @mouseleave="setPulseLoopAnimation">

    <div class="skills-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="skills-note-body" :style="{ color: color }">
        <div class="skills-note-header"> {{ name }} </div>
        <div class="skills-note-desc"> {{ desc }} </div>
    </div>
</RouterLink>
</template>

<script setup>
const props = defineProps({
    link: { type: String, default: "#" },
    faIcon: { type: Boolean, default: true },
    color: { type: String, default: "var(--website-text)" },
    name: { type: String, default: "JavaScript" },
    desc: { type: String, default: "" },
    size: { type: String, default: "105" },
    id: { type: String, default: "fa-circle-info" }
});

const webData = useWebsiteDataStore();
const isExternalLink = computed(() => {
    const link = props.link;
    return (link.includes("https://") || link.includes("http://"));
});

/**
 * This function returns a style object for an Font Awesome icon on here.
 */
function getFAIconStyle() {
    return { color: props.color, fontSize: (props.size + "px") }
}
</script>

<style scoped>
.skills-note {
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

.skills-note:hover {
    border-color: var(--website-text);
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.25);
}
.skills-note.no-link {
    cursor: default;
}

.skills-note-image {
    height: 147px;
    width: 100%;
    border-bottom: 3px solid var(--website-light-text);
    background-color: var(--silver-light);
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
}
.skills-note:hover .skills-note-image {
    border-color: var(--website-text);
}
.skills-note-image svg, .skills-note-image img {
    user-select: none;
}

.skills-note-body {
    height: calc(100% - 160px);
    width: calc(100% - 20px);
    padding: 10px 10px 0px;
    text-align: left;
    font-family: 'Lexend', sans-serif;
}
.skills-note-body.more-info {
    color: var(--website-light-text);
    transition: var(--default-transition);
}
.skills-note:hover .skills-note-body.more-info {
    color: var(--website-text);
}

.skills-note-moreInfo-icon {
    color: var(--website-light-text);
    transition: var(--default-transition);
    font-size: 110px;
}
.skills-note:hover .skills-note-image .skills-note-moreInfo-icon {
    color: var(--website-text);
}

.skills-note-header {
    font-size: 35px;
    color: inherit;
    margin-bottom: 12px;
}
.skills-note-desc {
    font-size: 16px;
    color: inherit;
}

@media (max-width: 450px) {
    .skills-note {
        width: 325px;
    }
}
</style>