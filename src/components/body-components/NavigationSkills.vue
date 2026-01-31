<template>
<div :class="mainCircleClasses">
    <button @click="setMenuExpanded('toggle')" v-if="!menuExpanded" class="skills-nav-barsIcon" title="Navigate This Page">
        <font-awesome-icon icon="fa-compass" :beat="iconBeating" />
    </button>

    <template v-if="menuExpanded">
        <RouterLink v-for="section in SKILLS_SECTIONS" :class="circleOptClasses"
            :title="('Scroll To The ' + section.title + ' Section')"
            :to="('/skills/#' + section.id)"
            @click="goToNavSection(section.id)"
            :style="{ 'color': section.color }"
            v-html="section.title">
        </RouterLink>
        <button @click="setMenuExpanded('toggle')" class="close" :class="circleOptClasses"> Close </button>
    </template>
</div>
</template>

<script setup>
const menuExpanded = ref(false);
const iconBeating = ref(true);

const circleOptClasses = computed(() => { return ['skills-nav-opt', (menuExpanded.value ? '' : 'hidden')]; });
const mainCircleClasses = computed(() => {
    return ['skills-nav', (menuExpanded.value ? 'skills-nav-expanded' : ''), 'animate__animated', 'animate__fadeInUp'];
});

/**
 * This lets the icon "beat" for 5 seconds before stopping it.
 * It also helps ensure any swipe events let any outside events like scrolling occur at the same time.
 */
onMounted(() => {
    setTimeout(() => { iconBeating.value = false; }, 5000);
});

/**
 * This function toggles the status of this menu.
 * @param {Boolean | "toggle"} status The new status of the menu, or "toggle" if it needs to be toggled.
 */
function setMenuExpanded(status = "toggle") {
    menuExpanded.value = ((status === "toggle") ? !menuExpanded.value : status);
    if(menuExpanded.value) { iconBeating.value = false; }
}

/**
 * This function directs a visitor to the requested skills section, then closes the widget menu.
 * @param {String} id The ID of the skills section.
 */
function goToNavSection(id = "vuejs") {
    if(!menuExpanded.value) { return; }
    goToPageSection(id);
    setMenuExpanded('toggle');
}

const SKILLS_SECTIONS = [
    { title: "Vue.js", id: "vuejs", color: "#41B883" },
    { title: "Frontend", id: "frontend", color: "#D3B62A" },
    { title: "AWS", id: "aws", color: "#5468ff" },
    { title: "Google", id: "google", color: "#4c8bf5" },
    { title: "Modules", id: "modules", color: "#5C9E57" },
    { title: "Languages", id: "languages", color: "#E34E26" },
    { title: "Icons", id: "icons", color: "rgb(83, 141, 215)" }
];
</script>

<style scoped>
.skills-nav {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    bottom: 15px;
    left: 15px;
    background-color: black;
    border: 2px solid var(--blue-one);
    height: 50px;
    width: 50px;
    border-radius: 30px;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), height 0.2s, width 0.2s;
}
.skills-nav:hover {
    background-color: var(--dark-background);
}

.skills-nav.skills-nav-expanded {
    height: 320px;
    width: 175px;
    border-radius: 15px;
    background-color: black;
    box-shadow: 0px 0px 10px 3px black;
}
.skills-nav-barsIcon {
    color: var(--blue-one);
    font-size: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.skills-nav-opt {
    color: var(--blue-one);
    font-family: "Lexend", "Roboto", sans-serif;
    font-size: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 40px;
    width: 100%;
    border-bottom: 1px solid rgba(159, 191, 255, 0.75);
    transition: var(--default-transition), font-size 0.2s;
}
.skills-nav-opt:hover {
    background-color: var(--dark-background);
}

.skills-nav-opt.hidden {
    font-size: 1px;
}
.skills-nav-opt.close {
    border-bottom: none;
}

@media (max-width: 800px) {
    .skills-nav {
        bottom: 10px;
        left: 10px;
    }
}
</style>