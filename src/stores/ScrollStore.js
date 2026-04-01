import Lenis from "lenis";

/**
 * This store manages general scrolling events on my website.
 * @see {@link https://www.npmjs.com/package/lenis | Lenis Documentation}
 * @see {@link https://easings.net/en | Easing Functions}
 */
export const useScrollStore = defineStore("scroll-store", () => {
    /** @type {Lenis} This contains the Lenis object for autoscrolling. */
    var lenis = null;
    var animationFrame = null;

    const webpageHeight = ref(0);
    const mounted = ref(false);

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
     * This scrolls to the section the visitor requested using Lenis.
     * @param {String} id The element ID of the section.
     * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
     */
    function scrollToId(id = "start", offset = 0) {
        const target = document.getElementById(id);
        const initDuration = (Math.abs((target.getBoundingClientRect().top + window.scrollY) - window.scrollY) / 4000);
        const finalDuration = Math.max(0.75, Math.min(initDuration, 3));

        if(parseFloat(window.getComputedStyle(target).getPropertyValue('scroll-margin-top')) != 0) { offset = 0; }
        lenis.scrollTo((id.startsWith('#') ? id : ("#" + id)), { offset, duration: finalDuration, lock: true });
    }

    /** This easing function is used by Lenis to make cool animations. */
    function easeOutQuart(x = 0) { return (1 - Math.pow(1 - x, 4)); }

    return { mounted, mountScrollStore, scrollToId }
});

/**
 * This scrolls to the section the visitor requested.
 * @param {String} id The element ID of the section.
 * @param {Number} offset The offset from where the element exists. (Works like "scroll-padding-top").
 */
export function goToPageSection(id = "start", offset = 0) {
    useScrollStore().scrollToId(id, offset);
}

/** This function scrolls to the footer and applies the proper offset. */
export function goToFooter() {
    try { goToPageSection('footer', 50); } catch(e) {}
}