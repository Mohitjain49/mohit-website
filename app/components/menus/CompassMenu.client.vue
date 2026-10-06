<template>
<Transition :name="webData.websiteMenuTransition">
    <div v-show="webData.compassMenuOpen" class="mohit-navMenu" id="mohit-compassMenu" v-web-menu>
        <MenuTop />

        <div v-for="section in routes" class="mohit-navMenu-opt" :style="getColorStyles(section.color)">
            <RouterLink :to="(routePath + '#' + section.id)" v-pulse-loop
                :title="('Scroll To The ' + section.title + ' Section')"
                :class="['mohit-navMenu-mainOpt', (currentHashEquals(section.id) ? 'focused' : '')]">

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
            <RouterLink class="mohit-navMenu-mainOpt" :to="footerRoute" @click="webData.scrollToAndFromFooter()" v-pulse-loop>
                <font-awesome-icon :icon="(webData.webFooterVisibility ? 'fa-turn-up' : 'fa-book-open')" />
                <span> {{ (webData.webFooterVisibility ? 'Scroll To The Top' : 'See Webpages') }} </span>
            </RouterLink>
        </div>
        <div class="mohit-navMenu-opt-break"></div>

        <div class="mohit-navMenu-opt" :style="getColorStyles('var(--website-light-text)')">
            <button class="mohit-navMenu-mainOpt" @click="webData.setMenuOpen(NAVIGATION_MENU)" v-pulse-loop>
                <font-awesome-icon icon="fa-bars" />
                <span> Open Navigation Menu </span>
            </button>
        </div>
        <div class="mohit-navMenu-opt" :style="getColorStyles('red')">
            <button class="mohit-navMenu-mainOpt" @click="webData.closeNavMenu()" v-pulse-loop>
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

const topPath = useRoutePathWithQuery();
const routePath = computed(() => { return router.currentRoute.value.path; });
const routeHash = computed(() => { return router.currentRoute.value.hash; });
const footerRoute = computed(() => { return (topPath.value + (webData.webFooterVisibility ? '' :'#footer')); });

/** This is a computed function that can be used to see if a route's hash is equal to where the option will direct it to. */
const currentHashEquals = computed(() => { return (id = "") => { return (("#" + id) === routeHash.value); }});

onMountedAdvanced(() => { webData.compassMenuAvailable = true; });
onBeforeUnmount(() => { webData.compassMenuAvailable = false; });
</script>