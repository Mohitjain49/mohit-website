<style scoped lang="scss">
@use "~/styles/navmenu";
</style>

<template>
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.compassMenuOpen" class="mohit-navMenu" id="mohit-compassMenu" ref="compassMenu">
        <MenuTop />

        <div v-for="section in routes" class="mohit-navMenu-opt" :style="getColorStyles(section.color)">
            <RouterLink class="mohit-navMenu-mainOpt" pulse-loop
                @click="webData.closeNavMenu()"
                :title="('Scroll To The ' + section.title + ' Section')"
                :to="getSectionLink(section.id)">

                <template v-if="section.title === 'iVue'">
                    <img :src="section.icon" draggable="false" />
                    <img :src="ivue_logo" draggable="false" class="ivue" />
                </template>
                <template v-else>
                    <font-awesome-icon v-if="section.faIcon" :icon="section.icon" />
                    <img v-else :src="section.icon" draggable="false" />
                    <span> {{ section.title }} </span>
                </template>
            </RouterLink>
        </div>
        <div v-if="webData.navFooterPresent" class="mohit-navMenu-opt">
            <RouterLink class="mohit-navMenu-mainOpt" :to="footerRoute" @click="webData.scrollToAndFromFooter()" pulse-loop>
                <font-awesome-icon :icon="(webData.webFooterVisibility ? 'fa-turn-up' : 'fa-book-open')" />
                <span> {{ (webData.webFooterVisibility ? 'Scroll To The Top' : 'See Webpages') }} </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(0)" pulse-loop>
                <font-awesome-icon icon="fa-bars" />
                <span> Open Navigation Menu </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="webData.closeNavMenu()" pulse-loop>
                <font-awesome-icon icon="fa-square-xmark" />
                <span> Close Menu </span>
            </button>
        </div>
    </div>
</Transition>
</template>

<script setup>
import ivue_logo from "~/assets/ivue/iVue_White_Text_Cropped.png";
const props = defineProps({ routes: { type: Array, default: [] } });

const router = useRouter();
const webData = useWebsiteDataStore();

const compassMenu = shallowRef(null);
usePulseLoopAnimation(compassMenu);
useWebsiteMenuUtility(compassMenu);

const topPath = useRoutePathWithQuery();
const routePath = computed(() => { return router.currentRoute.value.path; });
const footerRoute = computed(() => { return (topPath.value + (webData.webFooterVisibility ? '' :'#footer')); });

onMountedAdvanced(() => { webData.compassMenuAvailable = true; });
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
</script>