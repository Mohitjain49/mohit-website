<template>
<div :class="getCircleClasses()" @click="toggleMenuExpanded()" title="Navigate This Page">
    <font-awesome-icon v-if="!menuExpanded" icon="fa-bars" class="home-nav-barsIcon" :beat="iconBeating" />

    <template v-if="menuExpanded">
        <RouterLink to="/#start" @click="goToHomeSection('start')" :class="getCircleOptClasses()"> Start </RouterLink>
        <RouterLink to="/#skills" @click="goToHomeSection('skills')" :class="getCircleOptClasses()"> Skills </RouterLink>
        <RouterLink to="/#experience" @click="goToHomeSection('experience')" :class="getCircleOptClasses()"> Experience </RouterLink>
        <div class="close" :class="getCircleOptClasses()"> Close </div>
    </template>
</div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
const menuExpanded = ref(false);
const iconBeating = ref(true);

/**
 * This lets the icon "beat" for 5 seconds before stopping it.
 */
onMounted(() => {
    setTimeout(() => { iconBeating.value = false; }, 5000);
})

/**
 * This function toggles the status of this menu.
 */
function toggleMenuExpanded() {
    menuExpanded.value = !menuExpanded.value;
    iconBeating.value = false;
}

/**
 * This scrolls to the section the visitor requested.
 * @param {String} id The element ID of the section.
 */
function goToHomeSection(id = "start") {
    const top = (document.getElementById(id).getBoundingClientRect().y + window.scrollY);
    window.scrollTo({ top: top, left: 0, behavior: "smooth" });
}

/**
 * This function returns the classes for the main element.
 */
function getCircleClasses() {
    return ['home-nav', (menuExpanded.value ? 'home-nav-expanded' : '')];
}

/**
 * This function returns the classes for the option elements.
 */
function getCircleOptClasses() {
    return ['home-nav-opt', (menuExpanded.value ? '' : 'hidden')];
}
</script>

<style>
.home-nav {
    position: fixed;
    cursor: pointer;
    overflow: hidden;
    top: 60px;
    left: 10px;
    background-color: var(--website-text);
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
.home-nav:hover {
    background-color: var(--website-light-text);
}

.home-nav.home-nav-expanded {
    height: 183px;
    width: 200px;
    border-radius: 15px;
    background-color: var(--website-text);
}
.home-nav-barsIcon {
    color: rgba(0, 0, 0, 0.8);
    font-size: 22px;
}

.home-nav-opt {
    color: rgba(0, 0, 0, 0.8);
    font-family: "Lexend", "Roboto", sans-serif;
    font-size: 18px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 45px;
    width: 100%;
    border-bottom: 1px solid rgba(0, 0, 0, 0.8);
    transition: var(--default-transition), font-size 0.2s;
}
.home-nav-opt:hover {
    background-color: var(--website-light-text);
}

.home-nav-opt.hidden {
    font-size: 1px;
}
.home-nav-opt.close {
    border-bottom: none;
}
</style>