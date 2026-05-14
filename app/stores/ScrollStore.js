import Lenis from "lenis";
import dayjs from "dayjs";

/**
 * This store manages general scrolling events on my website.
 * @see {@link https://www.npmjs.com/package/lenis | Lenis Documentation}
 * @see {@link https://easings.net/en | Easing Functions}
 */
export const useScrollStore = defineStore("scroll-store", () => {
    const router = useRouter();
    const webData = useWebsiteDataStore();
    const scriptsStore = useScriptsStore();

    const fullScreenSet = getFullScreenSet();
    const zoomFactor = getCurrentZoomFactor();
    const mounted = ref(false);

    /** @type {Lenis} This contains the Lenis object for autoscrolling. */
    var lenis = null;
    var animationFrame = null;

    /** @type {dayjs.Dayjs} This represents the start time when the scrollTo function was successfully called. */
    var scrollStartTime = null;
    var calculateScrollInterval = null;

    const webpageHeight = ref(0);
    const scrollProgress = ref({ pct: 0, duration: 0, show: false, targetElement: null });
    const isAutoScrolling = computed(() => { return scrollProgress.value.show; });

    // If the height of the main element changed, lenis resizes itself.
    watch(webpageHeight, () => { if(mounted.value && lenis) { lenis.resize(); } });

    // As the user switches between full screen mode and a normal mode, this makes sure that the lenis instance is properly set.
    watch(fullScreenSet, () => { sleep(10).then(() => { setLenisInstance(); }); });

    /** This function mounts the scroll store. */
    function mountScrollStore() {
        if(mounted.value) { return; }
        setLenisInstance();

        /** This function runs every frame to see if there is any change to the scroll height. */
        const updateWebpageHeight = () => {
            try {
                webpageHeight.value = Math.max(document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight, 
                    document.documentElement.offsetHeight,
                    document.body.clientHeight, 
                    document.documentElement.clientHeight,
                    (fullScreenSet.value ? document.fullscreenElement.scrollHeight : 0)
                );
            } catch(e) {
                webpageHeight.value = 0;
            } finally {
                animationFrame = requestAnimationFrame(() => { updateWebpageHeight(); });
            }
        }

        animationFrame = requestAnimationFrame(() => { updateWebpageHeight(); });
        mounted.value = true;
    }

    /** This function unmounts the scroll store. */
    function unmountScrollStore() {
        if(!mounted.value) { return; }
        if(animationFrame != null) { cancelAnimationFrame(animationFrame); }
        lenis.destroy();
        mounted.value = false;
    }

    /** This function sets the lenis instance based on the full screen status. */
    function setLenisInstance() {
        if(lenis != null) { lenis.destroy(); }
        if(fullScreenSet.value) {
            lenis = new Lenis({ wrapper: document.fullscreenElement, autoRaf: true, easing: (x) => { return easeOutQuart(x); }, smoothWheel: false });
            lenis.resize();
            setScrollEL();
        } else {
            lenis = new Lenis({ wrapper: window, autoRaf: true, easing: (x) => { return easeOutQuart(x); }, smoothWheel: false });
            lenis.resize();
            setScrollEL();
        }
    }

    /** This function sets the Lenis scroll event listener. */
    function setScrollEL() {
        if(lenis == null) { return; }
        lenis.on("scroll", (lenisInstance) => {
            if(webData.websiteMenuMode == 0) { webData.closeNavMenu(); }
            scriptsStore.setLineOptions(-1);
        });
    }

    /**
     * This function scrolls to the section the visitor requested using Lenis.
     * @param {String} id The element ID of the section. Make sure it doesn't start with a "#" character.
     * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
     * @param {Number} delay How much time to delay the scroll before starting it.
     */
    async function scrollToId(id = "start", offset = 0, delay = 0) {
        if(isAutoScrolling.value) { return; }
        return new Promise((resolve, reject) => {
            if(!mounted.value) { reject("Website Not Loaded Yet."); }
            const target = document.getElementById(id);
            if(target == null) { reject("Element with id \"\""); }

            const initDuration = (Math.abs((target.getBoundingClientRect().top + window.scrollY) - window.scrollY) / 4000);
            const finalDuration = Math.max(0.75, Math.min((initDuration / zoomFactor.value), 3));

            scrollProgress.value.targetElement = target;
            scrollProgress.value.duration = finalDuration;
            scrollStartTime = dayjs(new Date());

            if(parseFloat(window.getComputedStyle(target).getPropertyValue('scroll-margin-top')) != 0) { offset = 0; }
            sleep(delay).then(() => { lenis.scrollTo(target, {
                offset, duration: finalDuration, lock: true,
                onStart: () => { setScrollInterval(true); },
                onComplete: () => { setScrollInterval(false); resolve("Scroll Complete!"); }
            }); });
        });
    }

    /**
     * This function scrolls to the top of the webpage using Lenis.
     * @param {Boolean} instant If true, this function skips the animation and instantly takes the user to the top.
     * @param {Number} delay How much time to delay the scroll before starting it.
     */
    function scrollToTop(instant = false, delay = 0) {
        if(isAutoScrolling.value) { return; }
        return new Promise((resolve, reject) => {
            if(!mounted.value) { reject("Website Not Loaded Yet."); }
            const duration = Math.max(0.75, Math.min((window.scrollY / (4000 * zoomFactor.value)), 3));

            scrollProgress.value.duration = duration;
            scrollStartTime = dayjs(new Date());

            sleep(delay).then(() => { lenis.scrollTo("top", {
                duration, lock: true, immediate: instant,
                onStart: () => { setScrollInterval(true); },
                onComplete: () => { setScrollInterval(false); resolve("Scroll Complete!"); }
            }); });
        });
    }

    /**
     * This function scrolls by adding an increment to the current scroll.
     * @param {Number} increment The increment scroll.
     */
    function scrollByIncrement(increment) {
        if(isAutoScrolling.value) { return; }
        lenis.scrollTo(lenis.scroll + increment, { immediate: true, force: true });
    }

    /** This function handles auto scrolling for the gamepad. */
    function gamepadScrollToTop() {
        if(isAutoScrolling.value) { return; }
        const routerObj = router.currentRoute.value;
        if(routerObj.hash !== "") { router.push(routerObj.path); }
        scrollToTop(false, 10);
    }

    /**
     * This function sets the scroll calculation interval.
     * @param {Boolean} start If true, this function should start the interval, else it should stop it.
     */
    function setScrollInterval(start = true) {
        if(!start && calculateScrollInterval != null) {
            clearInterval(calculateScrollInterval);
            calculateScrollInterval = null;
            scrollProgress.value = { show: false, pct: 0, duration: 0, targetElement: null }
        } else if(start && calculateScrollInterval == null) {
            calculateScrollInterval = setInterval(() => { calculateScrollProgress(); }, 10);
            scrollProgress.value.show = true;
        }
    }

    /** This function calculates the progress of the "scrollToId" function. */
    function calculateScrollProgress() {
        if(scrollStartTime == null) { return; }
        const currentTime = dayjs(new Date());
        const msDiff = currentTime.diff(scrollStartTime, 'ms');
        scrollProgress.value.pct = (Math.min(1000, (msDiff / scrollProgress.value.duration)) / 10).toFixed(1);
    }

    /** This easing function is used by Lenis to make cool animations. */
    function easeOutQuart(x = 0) { return (1 - Math.pow(1 - x, 4)); }

    return { mounted, scrollProgress, isAutoScrolling,
        mountScrollStore, unmountScrollStore, scrollToId, scrollToTop, scrollByIncrement,
        gamepadScrollToTop
    }
});

/**
 * This scrolls to the section the visitor requested.
 * @param {String} id The element ID of the section.
 * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
 * @param {Number} delay How much time to delay the scroll before starting it.
 */
export async function goToPageSection(id = "start", offset = 0, delay = 0) {
    return useScrollStore().scrollToId(id, offset, delay);
}

/**
 * This function scrolls to the top of the webpage.
 * @param {Boolean} instant If true, this function skips the animation and instantly takes the user to the top.
 * @param {Number} delay How much time to delay the scroll before starting it.
 */
export async function scrollToTop(instant = false, delay = 0) {
    return useScrollStore().scrollToTop(instant, delay);
}

/** This function scrolls to the footer and applies the proper offset. */
export function goToFooter() {
    try { goToPageSection('footer', 50); } catch(e) {}
}

/** This function returns a computed object that determines if the website is auto scrolling or not. */
export function getAutoScrollingStatus() {
    const { isAutoScrolling } = storeToRefs(useScrollStore());
    return computed(() => { return isAutoScrolling.value; });
}