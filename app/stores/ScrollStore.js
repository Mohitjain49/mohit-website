import Lenis from "lenis";
import dayjs from "dayjs";

/**
 * This store manages general scrolling events on my website.
 * @see {@link https://www.npmjs.com/package/lenis | Lenis Documentation}
 * @see {@link https://easings.net/en | Easing Functions}
 */
export const useScrollStore = defineStore("scroll-store", () => {
    const AUTOSCROLL_DURATION_MINIMUM = 0.75;
    const AUTOSCROLL_DURATION_MAXIMUM = 3.00;
    const SLEEP_MS_BEFORE_SCROLL_CALL = 20;

    const webData = useWebsiteDataStore();
    const scriptsStore = useScriptsStore();
    const documentStore = useDocumentStore();
    const styleStore = useStyleStore();

    const fullScreenSet = getFullScreenSet();
    const mounted = ref(false);
    const isScrolling = ref(false);

    /** @type {Lenis} This contains the Lenis object for autoscrolling. */
    var lenis = null;
    var animationFrame = null;
    var fullScreenChangeTimeout = null;

    /** @type {dayjs.Dayjs} This represents the start time when the scrollTo function was successfully called. */
    var scrollStartTime = null;
    var calculateScrollInterval = null;
    var cancelScrollTimeout = null;
    var hideScrollProgressTimeout = null;

    const webpageHeight = ref(0);
    const scrollProgress = ref({ show: false, pct: 0, duration: 0 });
    const isAutoScrolling = computed(() => { return scrollProgress.value.show; });

    // If the height of the main element changed, lenis resizes itself.
    watch(webpageHeight, () => { if(mounted.value && lenis) { lenis.resize(); } });

    // This sets a timeout to remotely cancel the autoscroll after 5 seconds to prevent errors in the website.
    watch(isAutoScrolling, (newValue) => {
        if(cancelScrollTimeout != null) { clearTimeout(cancelScrollTimeout); }
        if(!newValue) { return; }

        cancelScrollTimeout = setTimeout(() => {
            clearInterval(calculateScrollInterval);
            calculateScrollInterval = null;
            cancelScrollTimeout = null;
            scrollProgress.value = { show: false, pct: 0, duration: 0 }
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
        fullScreenChangeTimeout = null;
        if(!import.meta.client) { return; }

        const newWrapper = (fullScreenSet.value ? document.fullscreenElement : window);
        if(!newWrapper) { return; }

        cancelAutoscroll();
        if(lenis != null) { lenis.destroy(); }

        lenis = new Lenis({ wrapper: newWrapper, autoRaf: true, easing: (x) => { return easeOutQuart(x); }, smoothWheel: false });
        lenis.resize();
        lenis.on("scroll", (lenisInstance) => { onLenisScroll(lenisInstance, "default"); });
    }

    /** This function runs for the scroll store when the full screen status is changed for the website. */
    function onLenisFullScreenChange() {
        if(fullScreenChangeTimeout != null) { clearTimeout(fullScreenChangeTimeout); }
        fullScreenChangeTimeout = setTimeout(() => { setLenisInstance(); }, 25);
    }

    /**
     * This function runs everytime a lenis instance occurs.
     * @param {Lenis} lenisInstance The current instance of Lenis.
     * @param {"default" | "no-scroll"} customEventType The event type
     */
    function onLenisScroll(lenisInstance, customEventType = "default") {
        if(webData.websiteMenuMode == 0 || customEventType === "no-scroll") { webData.closeNavMenu(); }
        scriptsStore.closeLineOptions();
        documentStore.setContextMenuPageNumber(0);
        isScrolling.value = lenis.isScrolling;
    }

    /**
     * This function lets another function wait for the Scroll Store to mount before performing its tasks.
     * @param {Number} timeout The amount of time in milliseconds to wait before throwing out a timeout error.
     */
    async function waitForMounted(timeout = 10000) {
        await new Promise(async (resolve, reject) => {
            if(lenis && mounted.value) { resolve(null); }
            var msPassed = 0;

            while(msPassed < timeout && !(mounted.value && lenis)) {
                await sleep(50);
                msPassed += 50;
            }

            if(mounted.value && lenis) {
                resolve(null);
            } else {
                reject(new Error("Timeout Error"));
            }
        });
    }

    /**
     * This function scrolls to the section the visitor requested using Lenis.
     * @param {String} id The element ID of the section. Make sure it doesn't start with a "#" character.
     */
    async function scrollToId(id = "start") {
        return new Promise((resolve, reject) => {
            if(!verifyAutoscroll()) { reject("Autoscroll Unavailable."); }
            const target = document.getElementById(id);
            if(target == null) { reject("Element with id \"" + id + "\" does not exist."); }

            const scrollY = getScrollY();
            const targetY = (target.getBoundingClientRect().top + scrollY);

            if(Math.abs(scrollY - targetY) < 1) {
                onLenisScroll(lenis, "no-scroll");
                resolve("Scroll Complete!");
                return;
            }

            var offset = 0;
            const finalDuration = clampAndSetScrollDuration((Math.abs(targetY - scrollY) / 4000) * styleStore.cssToWindowHeightRatio);
            const addedScrollMargin = parseFloat(window.getComputedStyle(target).getPropertyValue('scroll-margin-top'));

            if(!isNaN(addedScrollMargin) && addedScrollMargin != 0) {
                offset = (addedScrollMargin - (addedScrollMargin / styleStore.cssToWindowHeightRatio));
            }

            sleep((finalDuration * 1000) + 1000 + SLEEP_MS_BEFORE_SCROLL_CALL).then(() => { resolve("timed out."); });
            sleep(SLEEP_MS_BEFORE_SCROLL_CALL).then(() => {
                lenis.scrollTo(target, {
                    offset, duration: finalDuration, lock: true,
                    onStart: () => { setScrollInterval(0); },
                    onComplete: () => { setScrollInterval(1); resolve("Scroll Complete!"); },
                });
            })
        });
    }

    /**
     * This function scrolls to the top of the webpage using Lenis.
     * @param {Boolean} instant If true, this function skips the animation and instantly takes the user to the top.
     */
    async function scrollToTop(instant = false) {
        return new Promise((resolve, reject) => {
            if(!verifyAutoscroll()) { reject("Autoscroll Unavailable"); }
            const scrollY = getScrollY();

            if(scrollY < 1) {
                onLenisScroll(lenis, "no-scroll");
                resolve("Scroll Complete!");
                return;
            }

            const duration = clampAndSetScrollDuration((scrollY / 4000) * styleStore.cssToWindowHeightRatio);
            sleep((duration * 1000) + 1000 + SLEEP_MS_BEFORE_SCROLL_CALL).then(() => { resolve("timed out."); });

            sleep(SLEEP_MS_BEFORE_SCROLL_CALL).then(() => {
                lenis.scrollTo("top", {
                    duration, lock: true, immediate: instant,
                    onStart: () => { setScrollInterval(0); },
                    onComplete: () => { setScrollInterval(1); resolve("Scroll Complete!"); }
                });
            });
        });
    }

    /**
     * This function lets the user autoscroll to a defined target passed in by the user.
     * @param {Number} targetY The distance from the top the user should scroll from.
     */
    async function scrollToTarget(targetY = 0) {
        return new Promise((resolve, reject) => {
            if(!verifyAutoscroll()) { reject("Autoscroll Unavailable."); }
            const scrollY = getScrollY();

            if(Math.abs(scrollY - targetY) < 1) {
                onLenisScroll(lenis, "no-scroll");
                resolve("Scroll Complete!");
                return;
            }

            const finalDuration = clampAndSetScrollDuration(Math.abs(targetY - scrollY) / 4000);
            sleep((finalDuration * 1000) + 1000 + SLEEP_MS_BEFORE_SCROLL_CALL).then(() => { resolve("timed out."); });

            sleep(SLEEP_MS_BEFORE_SCROLL_CALL).then(() => {
                lenis.scrollTo(targetY, {
                    duration: finalDuration, lock: true,
                    onStart: () => { setScrollInterval(0); },
                    onComplete: () => { setScrollInterval(1); resolve("Scroll Complete!"); }
                });
            });
        });
    }

    /**
     * This function scrolls by adding an increment to the current scroll.
     * @param {Number} increment The increment scroll.
     * @param {Boolean} smooth If true, the increment scroll will be very smooth.
     */
    function scrollByIncrement(increment, smooth = false) {
        if(!verifyAutoscroll() || styleStore.hideOverflow) { return; }
        lenis.scrollTo((lenis.scroll + increment),
            { immediate: !smooth, force: true, easing: (time) => { return time; }, duration: 0.15 }
        );
        webData.closeNavMenu();
    }

    /** This function returns a Boolean that if true confirms that the website is ready for an autoscroll. */
    function verifyAutoscroll() { return (mounted.value && !isAutoScrolling.value && Boolean(lenis)); }

    /** This function cancels any ongoing autoscroll. */
    function cancelAutoscroll() {
        if(lenis == null) { return; }
        if(calculateScrollInterval != null) { clearInterval(calculateScrollInterval); }
        if(hideScrollProgressTimeout != null) { clearTimeout(hideScrollProgressTimeout); }
        
        scrollProgress.value = { show: false, pct: 0, duration: 0 };
        calculateScrollInterval = null;
        hideScrollProgressTimeout = null;

        lenis.stop();
        lenis.start();
    }

    /** This function returns a promise that resolves when the auto scroll is finished. */
    async function waitForAutoScroll() {
        return new Promise(async (resolve, reject) => {
            if(!isAutoScrolling.value) { resolve(0); }
            var secondsPassed = 0;

            while(isAutoScrolling.value) {
                await sleep(50);
                secondsPassed += 0.05;
            }

            // This resolves how long the promise needed to wait before resolving.
            resolve(secondsPassed);
        })
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
                scrollProgress.value = { show: false, pct: 0, duration: 0 };
                hideScrollProgressTimeout = null;
            }, 250);
        } else if(start == 0 && calculateScrollInterval == null) {
            scrollStartTime = dayjs(new Date());
            calculateScrollInterval = setInterval(() => { calculateScrollProgress(); }, 10);
            scrollProgress.value.show = true;
        }
    }

    /** This function calculates the progress of the "scrollToId" function. */
    function calculateScrollProgress() {
        if(scrollStartTime == null) { return; }
        const currentTime = dayjs(new Date());
        const msDiff = currentTime.diff(scrollStartTime, 'ms');
        scrollProgress.value.pct = roundNumber((Math.min(1000, (msDiff / scrollProgress.value.duration)) / 10), 2);
    }

    /**
     * This function clamps, sets, and returns the new autoscroll duration for a new autoscroll call.
     * @param {Number} initDuration The new, raw autoscroll duration.
     */
    function clampAndSetScrollDuration(initDuration = AUTOSCROLL_DURATION_MINIMUM) {
        const finalDuration = roundNumber(clampNumber(initDuration, AUTOSCROLL_DURATION_MINIMUM, AUTOSCROLL_DURATION_MAXIMUM), 2);
        scrollProgress.value.duration = finalDuration;
        return finalDuration;
    }

    /** This easing function is used by Lenis to make cool animations. */
    function easeOutQuart(x = 0) { return (1 - Math.pow(1 - x, 4)); }

    return { mounted, scrollProgress, isAutoScrolling, isScrolling,
        mountScrollStore, unmountScrollStore, cancelAutoscroll,
        waitForAutoScroll, waitForMounted, onLenisFullScreenChange,
        scrollToId, scrollToTop, scrollToTarget, scrollByIncrement
    }
});

/** This function returns a promise that resolves when the auto scroll is finished. */
export async function waitForAutoScroll() { return useScrollStore().waitForAutoScroll(); }