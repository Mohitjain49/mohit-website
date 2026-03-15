<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<Transition name="navMenu-transition">
    <div v-show="webData.compassMenuOpen" class="mohit-navMenu" id="mohit-compassMenu" ref="compassMenu">
        <MenuTop />

        <div v-for="section in routes" class="mohit-navMenu-opt" :style="getColorStyles(section.color)">
            <RouterLink class="mohit-navMenu-mainOpt" pulse-loop
                @click="scrollToSection(section.id)"
                :title="('Scroll To The ' + section.title + ' Section')"
                :to="getSectionLink(section.id)">

                <span> {{ section.title }} </span>
                <font-awesome-icon v-if="section.faIcon" :icon="section.icon" />
                <img v-else :src="section.icon" draggable="false" />
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0)" pulse-loop>
                <span> Open Navigation Menu </span>
                <font-awesome-icon icon="fa-bars" />
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="webData.closeNavMenu()" pulse-loop>
                <span> Close Menu </span>
                <font-awesome-icon icon="fa-square-xmark" />
            </button>
        </div>
    </div>
</Transition>
</template>

<script setup>
const props = defineProps({ routes: { type: Array, default: [] } });
const route = useRoute();
const webData = useWebsiteDataStore();

const compassMenu = shallowRef(null);
const compassMenuSwipe = useSwipe(compassMenu, { passive: true });
usePulseLoopAnimation(compassMenu);

// This tracks touch "swipe" events for the navigation menu so that the user can change the page if they swipe left or right.
watch(compassMenuSwipe.isSwiping, () => {
    if(!compassMenuSwipe.isSwiping.value) { return; }
    const direction = compassMenuSwipe.direction.value;

    if(direction === "right" && webData.compassMenuOpen) {
        webData.menuOpen = -1;
        triggerClickSound();
    } 
});

onMounted(() => { nextTick(() => { webData.compassMenuAvailable = true; }); });
onBeforeUnmount(() => { webData.compassMenuAvailable = false; });

/**
 * This function makes a route for the main section.
 * @param {String} id The ID of the main element in the section.
 */
function getSectionLink(id) {
    const routePath = route.path;
    const suffix = ("/#" + id);
    return (routePath.endsWith("/") ? (routePath.substring(0, routePath.length - 1) + suffix) : (routePath + suffix));
}

/** This function scrolls to a section on the page. */
function scrollToSection(id) {
    goToPageSection(id)
    webData.closeNavMenu();
}
</script>