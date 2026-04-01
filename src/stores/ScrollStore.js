import Lenis from "lenis";
import dayjs from "dayjs";

/**
 * This store manages general scrolling events on my website.
 * @see {@link https://www.npmjs.com/package/lenis | Lenis Documentation}
 * @see {@link https://easings.net/en | Easing Functions}
 */
export const useScrollStore = defineStore("scroll-store", () => {
    const router = useRouter();
    const fullScreenSet = getFullScreenSet();
    const mounted = ref(false);

    /** @type {Lenis} This contains the Lenis object for autoscrolling. */
    var lenis = null;
    var animationFrame = null;

    /** @type {dayjs.Dayjs} This represents the start time when the scrollTo function was successfully called. */
    var scrollStartTime = null;
    var calculateScrollInterval = null;

    const webpageHeight = ref(0);
    const scrollProgress = ref({ pct: 0, duration: 0, show: false });

    // If the height of the main element changed, lenis resizes itself.
    watch(webpageHeight, () => { if(mounted.value && lenis) { lenis.resize(); } });

    /** This function mounts the scroll store. */
    function mountScrollStore() {
        if(mounted.value) { return; }
        lenis = new Lenis({ autoRaf: true, easing: (x) => { return easeOutQuart(x); }, smoothWheel: false });

        /** This function runs every frame to see if there is any change to the scroll height. */
        const updateWebpageHeight = () => {
            try {
                webpageHeight.value = Math.max(document.body.scrollHeight,
                    document.documentElement.scrollHeight,
                    document.body.offsetHeight, 
                    document.documentElement.offsetHeight,
                    document.body.clientHeight, 
                    document.documentElement.clientHeight
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

    /**
     * This function scrolls to the section the visitor requested using Lenis.
     * @param {String} id The element ID of the section.
     * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
     * @param {Number} delay How much time to delay the scroll before starting it.
     */
    function scrollToId(id = "start", offset = 0, delay = 0) {
        if(!mounted.value) { return; }
        const target = document.getElementById(id);
        const initDuration = (Math.abs((target.getBoundingClientRect().top + window.scrollY) - window.scrollY) / 4000);
        const finalDuration = Math.max(0.75, Math.min(initDuration, 3));

        scrollProgress.value.duration = finalDuration;
        scrollStartTime = dayjs(new Date());

        if(parseFloat(window.getComputedStyle(target).getPropertyValue('scroll-margin-top')) != 0) { offset = 0; }
        sleep(delay).then(() => { lenis.scrollTo(target, {
            offset, duration: finalDuration, lock: true,
            onStart: () => { setScrollInterval(true); },
            onComplete: () => { setScrollInterval(false); }
        }); });
    }

    /**
     * This function scrolls to the top of the webpage using Lenis.
     * @param {Boolean} instant If true, this function skips the animation and instantly takes the user to the top.
     * @param {Number} delay How much time to delay the scroll before starting it.
     */
    function scrollToTop(instant = false, delay = 0) {
        if(instant) { window.scrollTo({ top: 0, left: 0, behavior: "instant" }); }
        if(!mounted.value || instant) { return; }
        const duration = Math.max(0.75, Math.min((window.scrollY / 4000), 3));

        scrollProgress.value.duration = duration;
        scrollStartTime = dayjs(new Date());

        sleep(delay).then(() => { lenis.scrollTo("top", {
            duration, lock: true,
            onStart: () => { setScrollInterval(true); },
            onComplete: () => { setScrollInterval(false); }
        }); });
    }

    /** This function handles auto scrolling for the gamepad. */
    function gamepadScrollToTop() {
        const routerObj = router.currentRoute.value;
        if(routerObj.hash !== "") { router.push(routerObj.path); }

        if(fullScreenSet.value) {
            document.fullscreenElement.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        } else {
            scrollToTop(false, 0);
        }
    }

    /**
     * This function sets the scroll calculation interval.
     * @param {Boolean} start If true, this function should start the interval, else it should stop it.
     */
    function setScrollInterval(start = true) {
        if(!start && calculateScrollInterval != null) {
            clearInterval(calculateScrollInterval);
            calculateScrollInterval = null;
            scrollProgress.value = { show: false, pct: 0, duration: 0 }
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

    return { mounted, scrollProgress, mountScrollStore, scrollToId, scrollToTop, gamepadScrollToTop }
});

/**
 * This scrolls to the section the visitor requested.
 * @param {String} id The element ID of the section.
 * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
 * @param {Number} delay How much time to delay the scroll before starting it.
 */
export function goToPageSection(id = "start", offset = 0, delay = 0) {
    useScrollStore().scrollToId(id, offset, delay);
}

/**
 * This function scrolls to the top of the webpage.
 * @param {Boolean} instant If true, this function skips the animation and instantly takes the user to the top.
 * @param {Number} delay How much time to delay the scroll before starting it.
 */
export function scrollToTop(instant = false, delay = 0) {
    useScrollStore().scrollToTop(instant, delay);
}

/** This function scrolls to the footer and applies the proper offset. */
export function goToFooter() {
    try { goToPageSection('footer', 50); } catch(e) {}
}