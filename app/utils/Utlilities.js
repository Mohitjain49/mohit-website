/**
 * This function returns void only when Nuxt is ready for the website. It takes in a function as well.
 * @param {Function} callback The callback function that is triggered when Nuxt is ready.
 */
export async function onNuxtReadyAdvanced(callback = () => {}) {
    return new Promise((resolve, reject) => {
        try {
            onNuxtReady(() => {
                callback();
                resolve(null);
            });
        } catch(e) { reject(e); }
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
            await nextTick();
            await onNuxtReadyAdvanced();
        } catch(e) {}

        isMounted.value = true;
        callback();
    });

    // Returns a boolean that tracks if the component is mounted.
    return isMounted;
}

/**
 * This function awaits the Next Tick after the component is mounted before running a callback.
 * @param {Function} callback The callback function that is triggered.
 * @returns A reference boolean that can be used to tell the user that the component is mounted.
 */
export function onAfterMounted(callback = () => {}) {
    /** A boolean that tells the developer if the component is fully mounted. */
    const isMounted = shallowRef(false);

    onMounted(async() => {
        try { await nextTick(); } catch(e) {}
        isMounted.value = true;
        callback()
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