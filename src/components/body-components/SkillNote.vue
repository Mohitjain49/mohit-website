<template>
<div v-if="link === '#'" class="skills-note no-link">
    <div class="skills-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="skills-note-body" :style="{ color: color }">
        <div class="skills-note-header"> {{ name }} </div>
        <div class="skills-note-desc"> {{ desc }} </div>
    </div>
</div>

<a v-else :href="link" target="_blank" class="skills-note">
    <div class="skills-note-image">
        <img v-if="!faIcon" :src="id" :width="size" draggable="false" />
        <font-awesome-icon v-else :icon="id" :style="getFAIconStyle()" />
    </div>
    <div class="skills-note-body" :style="{ color: color }">
        <div class="skills-note-header"> {{ name }} </div>
        <div class="skills-note-desc"> {{ desc }} </div>
    </div>
</a>
</template>

<script setup>
import "@/styles/note.css";
const props = defineProps({
    link: { type: String, default: "#" },
    faIcon: { type: Boolean, default: true },
    color: { type: String, default: "var(--website-text)" },
    name: { type: String, default: "JavaScript" },
    desc: { type: String, default: "" },
    size: { type: String, default: "105" },
    id: { type: String, default: "fa-circle-info" }
});

/**
 * This function returns a style object for an Font Awesome icon on here.
 */
function getFAIconStyle() {
    return { color: props.color, fontSize: (props.size + "px") }
}
</script>