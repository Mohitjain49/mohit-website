<style scoped>
@import "@/styles/navmenu.css";
</style>

<template>
<Transition name="navMenu-transition">
    <div v-show="webData.compassMenuOpen" class="mohit-navMenu" id="mohit-compassMenu" ref="compassMenu">
        <MenuTop />

        <div v-for="section in routes" class="mohit-navMenu-opt" :style="getColorStyles(section.color)">
            <RouterLink class="mohit-navMenu-mainOpt" pulse-loop
                @click="scrollToSection(section.id, section.offset)"
                :title="('Scroll To The ' + section.title + ' Section')"
                :to="getSectionLink(section.id)">

                <template v-if="section.title === 'iVue'">
                    <img :src="ivue_logo" draggable="false" class="ivue" />
                    <img :src="section.icon" draggable="false" />
                </template>
                <template v-else>
                    <span> {{ section.title }} </span>
                    <font-awesome-icon v-if="section.faIcon" :icon="section.icon" />
                    <img v-else :src="section.icon" draggable="false" />
                </template>
            </RouterLink>
        </div>
        <div v-if="webData.navFooterPresent" class="mohit-navMenu-opt">
            <RouterLink class="mohit-navMenu-mainOpt" :to="footerRoute" @click="webData.scrollToAndFromFooter()" pulse-loop>
                <span> {{ (webData.webFooterVisibility ? 'Scroll To The Top' : 'See Webpages') }} </span>
                <font-awesome-icon :icon="(webData.webFooterVisibility ? 'fa-turn-up' : 'fa-book-open')" />
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
import ivue_logo from "@/assets/ivue/iVue_White_Text_Cropped.png";
const props = defineProps({ routes: { type: Array, default: [] } });

const router = useRouter();
const webData = useWebsiteDataStore();

const compassMenu = shallowRef(null);
useSwipeToCloseMenu(compassMenu);
usePulseLoopAnimation(compassMenu);

const routePath = computed(() => { return router.currentRoute.value.path; });
const footerRoute = computed(() => { return { path: routePath.value, hash: (webData.webFooterVisibility ? '' :'#footer') } });

onMounted(() => { nextTick(() => { webData.compassMenuAvailable = true; }); });
onBeforeUnmount(() => { webData.compassMenuAvailable = false; });

/**
 * This function makes a route for the main section.
 * @param {String} id The ID of the main element in the section.
 */
function getSectionLink(id) {
    const routerPath = routePath.value;
    const suffix = ("/#" + id);
    return (routerPath.endsWith("/") ? (routerPath.substring(0, routerPath.length - 1) + suffix) : (routerPath + suffix));
}

/** This function scrolls to a section on the page. */
function scrollToSection(id, offset) {
    goToPageSection(id, offset);
    webData.closeNavMenu();
}
</script>