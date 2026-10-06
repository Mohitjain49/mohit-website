/** This returns an object similar to "useWindowSize", but it records the css layout over the inner layout dimensions. */
export function useMohitWindowSize() {
    const styleStoreRefs = storeToRefs(useStyleStore());
    const width = computed(() => { return styleStoreRefs.cssViewportWidth.value });
    const height = computed(() => { return styleStoreRefs.cssViewportHeight.value });

    const cssToWindowWidthRatio = computed(() => { return styleStoreRefs.cssToWindowWidthRatio.value });
    const cssToWindowHeightRatio = computed(() => { return styleStoreRefs.cssToWindowHeightRatio.value });
    return { width, height, cssToWindowWidthRatio, cssToWindowHeightRatio }
}

/**
 * This function returns how much an element has scrolled from its starting point to its end both horizontally and vertically.
 * @param {String} elementId The id of the element.
 */
export function useScrollPercentage(elementId = "") {
    const horizontal = ref({ main: 0, inView: 0 });
    const vertical = ref({ main: 0, inView: 0 });

    /** A simple object that can be used by vertical custom scrollbars. */
    const vScrollbarStyle = computed(() => {
        const topNum = ((vertical.value.inView >= 100) ? 0 : ((vertical.value.main / 100) * (100 - vertical.value.inView)));
        return { height: (vertical.value.inView + "%"), top: (topNum + "%") }
    });
    /** A simple object that can be used by horizontal custom scrollbars. */
    const hScrollbarStyle = computed(() => {
        const leftNum = ((horizontal.value.inView >= 100) ? 0 : ((horizontal.value.main / 100) * (100 - horizontal.value.inView)));
        return { width: (horizontal.value.inView + "%"), left: (leftNum + "%") }
    });

    /** This function calculates both the horizontal and vertical percentages. */
    function calculate() {
        if(!document || !document.getElementById) { return; }
        const element = document.getElementById(elementId);
        if(element == null) { return; }

        // This section calculates how far the user scrolled from the top of the element.
        vertical.value.main = (element.scrollTop / (element.scrollHeight - element.clientHeight));
        horizontal.value.main = (element.scrollLeft / (element.scrollWidth - element.clientWidth));

        // This section simplifies the calculations into "clean" numbers for other JS code.
        vertical.value.main = (Number.isNaN(vertical.value.main) ? 100 : (Math.round(vertical.value.main * 10000) / 100));
        horizontal.value.main = (Number.isNaN(horizontal.value.main) ? 100 : (Math.round(horizontal.value.main * 10000) / 100));

        // This calculates what percentage of the element is viewable on the viewport.
        vertical.value.inView = (Math.round((element.clientHeight / element.scrollHeight) * 10000) / 100);
        horizontal.value.inView = (Math.round((element.clientWidth / element.scrollWidth) * 10000) / 100);
        return { horizontal: horizontal.value, vertical: vertical.value }
    }

    useRafFn(() => { calculate(); }, { immediate: true, fpsLimit: 30, once: false });
    return { horizontal, vertical, vScrollbarStyle, hScrollbarStyle, calculate }
}

/**
 * This function returns void only when Nuxt is ready for the website. It takes in a function as well.
 * @param {Function} callback The callback function that is triggered when Nuxt is ready.
 */
export async function onNuxtReadyAdvanced(callback = () => {}) {
    return new Promise((resolve, reject) => {
        try {
            onNuxtReady(() => { callback(); });
            onNuxtReady(() => { resolve(null); });
        } catch(e) {
            reject(e);
        }
    })
}

/**
 * This function awaits the Next Tick and for Nuxt to be ready before running the callback function.
 * @param {Function} callback The callback function that is triggered.
 * @returns A reference boolean that can be used to tell the user that the component is mounted.
 */
export function onMountedAdvanced(callback = () => {}) {
    /** A boolean that tells the developer if the component is fully mounted. */
    const isMounted = shallowRef(false);

    onMounted(async() => {
        try {
            await onNuxtReadyAdvanced();
            await nextTick();
        } catch(e) {}

        isMounted.value = true;
        callback();
    });

    // Returns a boolean that tracks if the component is mounted.
    return isMounted;
}

/** This function returns a computed instance of the route path with the query string. */
export function useRoutePathWithQuery() {
    const documentStore = useDocumentStore();
    const router = useRouter();

    const rawRoutePath = computed(() => { return router.currentRoute.value.path; });
    const rawRouteQuery = computed(() => { return router.currentRoute.value.query; });
    const queryEnd = ref("");

    /** This is the final parsed path returned for the website to use. */
    const path = computed(() => { return (rawRoutePath.value + ((queryEnd.value.length <= 0) ? "" : ("?" + queryEnd.value))); });

    /** This function updates the Query End parameter. */
    function updateQueryEnd() {
        if(!documentStore.onDocumentRoute) {
            const searchParamsStr = new URLSearchParams(rawRouteQuery.value).toString();
            queryEnd.value = searchParamsStr;
            return searchParamsStr;
        } else {
            var searchParams = new URLSearchParams(rawRouteQuery.value);
            if(searchParams.has("page")) { searchParams.delete("page"); }
            if(searchParams.has("y")) { searchParams.delete("y"); }

            const searchParamsStr = searchParams.toString();
            queryEnd.value = searchParamsStr;
            return searchParamsStr;
        }
    }

    updateQueryEnd();
    watch(rawRouteQuery, () => { updateQueryEnd(); }, { deep: true });
    return path;
}