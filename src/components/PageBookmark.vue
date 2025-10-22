<template>
<Transition name="mohit-bookmark-transition" appear>
    <RouterLink to="/gamepad" v-if="showGamepadBookmark()"
        :class="getGamepadBookmarkClasses()"
        :title="GAMEPAD_BOOKMARK_TITLE">

        <font-awesome-icon icon="fa-gamepad" />
    </RouterLink>
</Transition>

<Transition name="mohit-bookmark-transition" appear>
    <button v-if="webData.wakeLock.isActive" @click="webData.toggleWakeLock()"
        class="mohit-bookmark lock active"
        :title="WAKE_LOCK_BOOKMARK_TITLE">

        <font-awesome-icon icon="fa-lock" />
    </button>
</Transition>

<Transition name="mohit-sideRoute-left-transition" appear>
    <RouterLink v-if="showSideRoutes" class="mohit-sideRoute left" :to="prevRoute.path" :style="prevRoute.style">
        <FontAwesomeIcon :icon="prevRoute.faIcon" />
        <span v-html="prevRoute.title"></span>
    </RouterLink>
</Transition>

<Transition name="mohit-sideRoute-right-transition" appear>
    <RouterLink v-if="showSideRoutes" class="mohit-sideRoute right" :to="nextRoute.path" :style="nextRoute.style">
        <FontAwesomeIcon :icon="nextRoute.faIcon" />
        <span v-html="nextRoute.title"></span>
    </RouterLink>
</Transition>
</template>

<script setup>
const webData = useWebsiteDataStore();
const gamepadStore = useGamepadStore();
const router = useRouter();

const windowSwipe = useSwipe(window);
const visitorLeftPage = usePageLeave();
const visitorMouse = useMouse({ touch: false, initialValue: { x: 200, y: 200 } });

// This is a boolean that determines whether the route side buttons should be shown or not.
const showSideRoutes = computed(() => {
    if(visitorLeftPage.value || routeIndex.value == -1) { return false; }
    const x = visitorMouse.x.value;
    return (x < 75 || x > (window.innerWidth - 75));
});

// This tracks what main route the user is currently on.
const routeIndex = computed(() => {
    const routePath = router.currentRoute.value.path;
    return ROUTES.findIndex(item => (routePath === item.path || routePath + "/" === item.path));
});

// This gets the objects for the route side buttons.
const prevRoute = computed(() => { return ROUTES[(routeIndex.value < 1) ? (ROUTES.length - 1) : (routeIndex.value - 1)]; });
const nextRoute = computed(() => { return ROUTES[(routeIndex.value == (ROUTES.length - 1)) ? 0 : (routeIndex.value + 1)]; });

// This tracks touch "swipe" eventsso that the user can change the page if the swipe left or right.
watch(windowSwipe.isSwiping, () => {
    if(routeIndex.value == -1) { return; }
    const direction = windowSwipe.direction.value;
    const x = windowSwipe.coordsStart.x;

    if(direction === "left" && x > window.innerWidth - 75) {
        router.push(nextRoute.value.path);
        triggerClickSound();
    } else if(direction === "right" && x < 75) {
        router.push(prevRoute.value.path);
        triggerClickSound();
    }
});

/**
 * This returns the classes for the gamepad bookmark.
 */
function getGamepadBookmarkClasses() {
    return ['mohit-bookmark', 'gamepad', ((gamepadStore.gamepadConnected != -1) ? 'active' : '')]
}

/**
 * This returns whether or not the Gamepad Icon is good to show or not.
 */
function showGamepadBookmark() {
    return Boolean((typeof navigator !== 'undefined') && (typeof navigator.getGamepads === 'function'));
}

const GAMEPAD_BOOKMARK_TITLE = "Use your gamepad/video game controller on my website!";
const WAKE_LOCK_BOOKMARK_TITLE = "Screen Wake Lock Set. Click here to remove it.";

const ROUTES = [
    { path: "/", faIcon: "fa-house", title: "Home<br>Page", style: { color: "var(--website-text)", backgroundColor: "#000000", fontSize: "8px", lineHeight: "9px" } },
    { path: "/skills/", faIcon: "fa-code", title: "Skills", style: { color: "var(--blue-zero)", backgroundColor: "var(--blue-cobalt)" } },
    { path: "/experience/", faIcon: "fa-file-code", title: "Experience", style: { color: "var(--website-text)", backgroundColor: "black", fontSize: "8px" } },
    { path: "/projects/", faIcon: "fa-cubes", title: "Projects", style: { color: "var(--globe-green-light)", backgroundColor: "var(--globe-green-opaque)" } },
    { path: "/resume/", faIcon: "fa-file-lines", title: "Resume", style: { color: "var(--blue-two)", backgroundColor: "black" } },
    { path: "/features/", faIcon: "fa-bolt-lightning", title: "Features", style: { color: "var(--lightning-yellow)", backgroundColor: "black" } },
    { path: "/contact/", faIcon: "fa-paper-plane", title: "Contact", style: { color: "var(--website-dark-text)", backgroundColor: "var(--webpage-static-background)" } }
];
</script>

<style scoped>
.mohit-bookmark {
    position: fixed;
    top: 0;
    left: 10px;
    height: 50px;
    width: 30px;
    background-color: var(--blue-one);
    color: black;
    z-index: 514;
    display: flex;
    justify-content: center;
    align-items: center;
    clip-path: polygon(
        0 0,
        100% 0,
        100% 100%,
        100% 100%,
        50% 70%,
        40% 75%,
        0 100%
    );
}
.mohit-bookmark svg {
    font-size: 19px;
    margin-bottom: 15px;
}

.mohit-bookmark.active {
    background: linear-gradient(to right, black 0%, var(--vibrant-flame) 10%, var(--vibrant-flame) 90%, black 100%);
    color: white;
}
.mohit-bookmark.gamepad.active svg {
    font-size: 16px;
}

.mohit-bookmark.lock {
    left: auto;
    right: 10px;
}

.mohit-sideRoute {
    position: fixed;
    left: 10px;
    top: calc(50% - 25px);
    background-color: black;
    height: 55px;
    width: 55px;
    border: 2px dotted;
    border-radius: 20%;
    z-index: 9000;
    font-size: 10px;
    transition: scale 0.2s, box-shadow 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    overflow: hidden;
}
.mohit-sideRoute:hover {
    scale: 1.1;
    box-shadow: 0px 0px 10px 1px;
}

.mohit-sideRoute svg {
    font-size: 22px;
    margin-top: 1px;
    margin-bottom: 4px;
}
.mohit-sideRoute span {
    font-size: inherit;
    font-family: 'Lexend', sans-serif;
    text-align: center;
    font-weight: bold;
    line-height: inherit;
    letter-spacing: 0.6px;
}

.mohit-sideRoute.left {
    right: auto;
    left: 10px;
}
.mohit-sideRoute.right {
    left: auto;
    right: 10px;
}

@media (max-width: 450px) {
    .mohit-sideRoute {
        display: none;
    }
    .mohit-bookmark {
        width: 20px;
        height: 50px;
    }
    .mohit-bookmark svg {
        font-size: 15px;
    }

    .mohit-bookmark.gamepad svg {
        font-size: 13px;
    }
    .mohit-bookmark.gamepad.active svg {
        font-size: 11px;
    }
}
@media (max-width: 350px) {
    .mohit-bookmark {
        position: absolute;
    }
}

.mohit-bookmark-transition-enter-active, .mohit-bookmark-transition-leave-active {
    transition: top 0.5s;
}
.mohit-bookmark-transition-enter-from, .mohit-bookmark-transition-leave-to {
    top: -50px;
}
.mohit-bookmark-transition-enter-to, .mohit-bookmark-transition-leave-from {
    top: 0px;
}

.mohit-sideRoute-left-transition-enter-active, .mohit-sideRoute-left-transition-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.mohit-sideRoute-left-transition-enter-from, .mohit-sideRoute-left-transition-leave-to {
    transform: translateX(-70px);
    opacity: 0;
}
.mohit-sideRoute-left-transition-enter-to, .mohit-sideRoute-left-transition-leave-from {
    transform: translateX(0px);
    opacity: 1;
}

.mohit-sideRoute-right-transition-enter-active, .mohit-sideRoute-right-transition-leave-active {
    transition: transform 0.5s, opacity 0.5s;
}
.mohit-sideRoute-right-transition-enter-from, .mohit-sideRoute-right-transition-leave-to {
    transform: translateX(70px);
    opacity: 0;
}
.mohit-sideRoute-right-transition-enter-to, .mohit-sideRoute-right-transition-leave-from {
    transform: translateX(0px);
    opacity: 1;
}
</style>