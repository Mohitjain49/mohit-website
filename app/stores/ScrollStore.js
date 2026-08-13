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
    const styleStore = useStyleStore();

    const fullScreenSet = getFullScreenSet();
    const { cssToWindowHeightRatio } = useMohitWindowSize();
    const mounted = ref(false);

    /** @type {Lenis} This contains the Lenis object for autoscrolling. */
    var lenis = null;
    var animationFrame = null;

    /** @type {dayjs.Dayjs} This represents the start time when the scrollTo function was successfully called. */
    var scrollStartTime = null;
    var calculateScrollInterval = null;
    var cancelScrollTimeout = null;
    var hideScrollProgressTimeout = null;

    const webpageHeight = ref(0);
    const scrollProgress = ref({ pct: 0, duration: 0, show: false, targetElement: null });
    const isAutoScrolling = computed(() => { return scrollProgress.value.show; });

    // If the height of the main element changed, lenis resizes itself.
    watch(webpageHeight, () => { if(mounted.value && lenis) { lenis.resize(); } });

    // As the user switches between full screen mode and a normal mode, this makes sure that the lenis instance is properly set.
    watch(fullScreenSet, () => { sleep(10).then(() => { setLenisInstance(); }); });

    // This sets a timeout to remotely cancel the autoscroll after 5 seconds to prevent errors in the website.
    watch(isAutoScrolling, (newValue) => {
        if(cancelScrollTimeout != null) { clearTimeout(cancelScrollTimeout); }
        if(!newValue) { return; }

        cancelScrollTimeout = setTimeout(() => {
            clearInterval(calculateScrollInterval);
            calculateScrollInterval = null;
            cancelScrollTimeout = null;
            scrollProgress.value = { show: false, pct: 0, duration: 0, targetElement: null }
        }, 5000);
    });

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
        lenis = null;
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
        lenis.on("scroll", (lenisInstance) => { onLenisScroll(lenisInstance, "default"); });
    }

    /**
     * This function runs everytime a lenis instance occurs.
     * @param {Lenis} lenisInstance The current instance of Lenis.
     * @param {"default" | "no-scroll"} customEventType The event type
     */
    function onLenisScroll(lenisInstance, customEventType = "default") {
        if(webData.websiteMenuMode == 0 || customEventType === "no-scroll") { webData.closeNavMenu(); }
        scriptsStore.setLineOptions(-1);
    }

    /**
     * This function scrolls to the section the visitor requested using Lenis.
     * @param {String} id The element ID of the section. Make sure it doesn't start with a "#" character.
     * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
     * @param {Number} delay How much time to delay the scroll before starting it.
     */
    async function scrollToId(id = "start", offset = 0, delay = 0) {
        return new Promise((resolve, reject) => {
            if(!verifyAutoscroll()) { reject("Autoscroll Unavailable."); }
            const target = document.getElementById(id);
            if(target == null) { reject("Element with id \"" + id + "\" does not exist."); }

            const scrollY = (fullScreenSet.value ? document.fullscreenElement.scrollTop : window.scrollY);
            const targetY = (target.getBoundingClientRect().top + scrollY);

            if(Math.abs(scrollY - targetY) < 1) {
                onLenisScroll(lenis, "no-scroll");
                resolve("Scroll Complete!");
                return;
            }

            const initDuration = (Math.abs(targetY - scrollY) / 4000);
            const finalDuration = Math.max(0.75, Math.min((initDuration * cssToWindowHeightRatio.value), 3));

            scrollProgress.value.targetElement = target;
            scrollProgress.value.duration = finalDuration;
            scrollStartTime = dayjs(new Date());

            if(parseFloat(window.getComputedStyle(target).getPropertyValue('scroll-margin-top')) != 0) { offset = 0; }
            sleep(delay + finalDuration + 1000).then(() => { resolve("timed out."); });

            sleep(delay).then(() => { lenis.scrollTo(target, {
                offset, duration: finalDuration, lock: true,
                onStart: () => { setScrollInterval(0); },
                onComplete: () => { setScrollInterval(1); resolve("Scroll Complete!"); }
            }); });
        });
    }

    /**
     * This function scrolls to the top of the webpage using Lenis.
     * @param {Boolean} instant If true, this function skips the animation and instantly takes the user to the top.
     * @param {Number} delay How much time to delay the scroll before starting it.
     */
    async function scrollToTop(instant = false, delay = 0) {
        return new Promise((resolve, reject) => {
            if(!verifyAutoscroll()) { reject("Autoscroll Unavailable"); }
            const scrollY = (fullScreenSet.value ? document.fullscreenElement.scrollTop : window.scrollY);

            if(scrollY < 1) {
                onLenisScroll(lenis, "no-scroll");
                resolve("Scroll Complete!");
                return;
            }

            const duration = Math.max(0.75, Math.min(((scrollY / 4000) * cssToWindowHeightRatio.value), 3));
            scrollProgress.value.duration = duration;
            scrollStartTime = dayjs(new Date());

            sleep(delay).then(() => { lenis.scrollTo("top", {
                duration, lock: true, immediate: instant,
                onStart: () => { setScrollInterval(0); },
                onComplete: () => { setScrollInterval(1); resolve("Scroll Complete!"); }
            }); });
            sleep(delay + duration + 1000).then(() => { resolve("timed out."); });
        });
    }

    /**
     * This function lets the user autoscroll to a defined target passed in by the user.
     * @param {Number} targetY The distance from the top the user should scroll from.
     */
    async function scrollToTarget(targetY = 0) {
        return new Promise((resolve, reject) => {
            if(!verifyAutoscroll()) { reject("Autoscroll Unavailable."); }
            const scrollY = (fullScreenSet.value ? document.fullscreenElement.scrollTop : window.scrollY);

            if(Math.abs(scrollY - targetY) < 1) {
                onLenisScroll(lenis, "no-scroll");
                resolve("Scroll Complete!");
                return;
            }

            const initDuration = (Math.abs(targetY - scrollY) / 4000);
            const finalDuration = Math.max(0.75, Math.min((initDuration), 3));

            scrollProgress.value.targetElement = null;
            scrollProgress.value.duration = finalDuration;
            scrollStartTime = dayjs(new Date());

            sleep(finalDuration + 1000).then(() => { resolve("timed out."); });
            lenis.scrollTo(targetY, {
                duration: finalDuration, lock: true,
                onStart: () => { setScrollInterval(0); },
                onComplete: () => { setScrollInterval(1); resolve("Scroll Complete!"); }
            });
        });
    }

    /** This function handles auto scrolling for the gamepad. */
    async function gamepadScrollToTop() {
        if(!verifyAutoscroll()) { return; }
        const routerObj = router.currentRoute.value;
        if(routerObj.hash !== "") { router.push(routerObj.path); }

        webData.closeNavMenu();
        await scrollToTop(false, 10);
    }

    /**
     * This function scrolls by adding an increment to the current scroll.
     * @param {Number} increment The increment scroll.
     */
    function scrollByIncrement(increment) {
        if(!verifyAutoscroll() || styleStore.hideOverflow) { return; }
        lenis.scrollTo(lenis.scroll + increment, { immediate: true, force: true });
        webData.closeNavMenu();
    }

    /** This function returns a Boolean that if true confirms that the website is ready for an autoscroll. */
    function verifyAutoscroll() { return (mounted.value && !isAutoScrolling.value && lenis); }

    /** This function cancels any ongoing autoscroll. */
    function cancelAutoscroll() {
        if(lenis == null) { return; }
        if(calculateScrollInterval != null) { clearInterval(calculateScrollInterval); }
        if(hideScrollProgressTimeout != null) { clearTimeout(hideScrollProgressTimeout); }
        
        scrollProgress.value = { show: false, pct: 0, duration: 0, targetElement: null };
        calculateScrollInterval = null;
        hideScrollProgressTimeout = null;

        lenis.stop();
        lenis.start();
    }

    /**
     * This function sets the scroll calculation interval.
     * @param {0 | 1 | 2} start If true, this function should start the interval, else it should stop it.
     */
    function setScrollInterval(start = 0) {
        if(start > 0 && calculateScrollInterval != null) {
            clearInterval(calculateScrollInterval);
            if(hideScrollProgressTimeout != null) { clearTimeout(hideScrollProgressTimeout); }

            calculateScrollInterval = null;
            scrollProgress.value.pct = 150;

            hideScrollProgressTimeout = setTimeout(() => {
                scrollProgress.value = { show: false, pct: 0, duration: 0, targetElement: null };
                hideScrollProgressTimeout = null;
            }, 250);
        } else if(start == 0 && calculateScrollInterval == null) {
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
        mountScrollStore, unmountScrollStore, cancelAutoscroll,
        scrollToId, scrollToTop, scrollToTarget, scrollByIncrement, gamepadScrollToTop
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

/**
 * This function lets the user autoscroll to a defined target passed in by the user.
 * @param {Number} targetY The distance from the top the user should scroll from.
 */
export async function scrollToTarget(targetY = 0) {
    return useScrollStore().scrollToTarget(targetY);
}