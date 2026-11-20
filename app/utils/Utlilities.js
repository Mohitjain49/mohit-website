/**
 * This function awaits the Next Tick after the component is mounted before running a callback.
 * @param {Function} callback The callback function that is triggered.
 */
export function onAfterMounted(callback = () => {}) {
    onMounted(() => { nextTick(() => { callback(); }); });
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
        var searchParams = new URLSearchParams(rawRouteQuery.value);

        // If the user is on a hosted document webpage, this deletes two position related query parameters from the URL.
        if(documentStore.onDocumentRoute) {
            if(searchParams.has("page")) { searchParams.delete("page"); }
            if(searchParams.has("y")) { searchParams.delete("y"); }
        }

        // This sets the query end string so it can be included in the parsed path.
        queryEnd.value = searchParams.toString();
    }

    updateQueryEnd();
    watch(rawRouteQuery, () => { updateQueryEnd(); }, { deep: true });
    return path;
}