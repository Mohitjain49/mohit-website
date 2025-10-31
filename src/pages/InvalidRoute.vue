<template>
<ParticlesBackground v-if="showBackground" :particlesOptions="INVALID_BACKGROUND" />
<main id="invalid" class="personal-web-body">
    <h1 class="incomplete-title"> {{ PAGE_DESC }} </h1>
    <!-- <div class="incomplete-subtitle"> {{ '' }} </div> -->
    
    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" v-html="'Go to Home'"
            @pointerenter="setHeartbeatAnimation"
            @mouseleave="setHeartbeatAnimation"
        />
    </div>
</main>
</template>

<script setup>
import "@/styles/navpage.css";
const router = useRouter();

const PAGE_DESC = ref("404 - Page Not Found");
const showBackground = ref(true);

const routePath = computed(() => { return router.currentRoute.value.path; });
useHead(getMeta("Mohit Jain | 404 Error", "404", PAGE_DESC.value));

onMounted(() => {
    // This section redirects to a particular page in the website if the user typed in a particular route.
    const internalRoute = INTERNAL_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(internalRoute != -1) {
        startRedirect();
        router.replace(INTERNAL_REDIRECTS[internalRoute].replacement);
    }

    // This section redirects to another website if the user typed in a particular route.
    const externalRoute = EXTERNAL_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(externalRoute != -1) {
        startRedirect();
        window.location.replace(EXTERNAL_REDIRECTS[externalRoute].replacement);
    }
});

/**
 * This function runs whenever the website starts redirecting the user to another page.
 */
function startRedirect() {
    PAGE_DESC.value = "Redirecting...";
    showBackground.value = false;
}

/**
 * This function returns whether the given routes contains the path recorded by the router.
 * @param {Array<String>} routes The given array of routes.
 */
function checkRedirectRoute(routes = [""]) {
    return (-1 != routes.findIndex((givenRoute) => {
        if(givenRoute.endsWith("/**")) {
            const parsedRoute = givenRoute.substring(0, (givenRoute.length - 3));
            return (parsedRoute === routePath.value || routePath.value.startsWith(parsedRoute + "/"))
        } else {
            return (givenRoute === routePath.value || (givenRoute + "/") === routePath.value)
        }
    }));
}

// This is a list of redirects to other webpages within this website.
const INTERNAL_REDIRECTS = [
    { routes: ["/mohit-website/**"], replacement: "/" },
    { routes: ["/contact-me"], replacement: "/contact" },
    { routes: ["/exp"], replacement: "/experience/" },
    { routes: ["/icon", "/static-icons"], replacement: "/icons" },
    { routes: ["/documents"], replacement: "/#documents" },
];

// This is a list of redirects to other websites.
const EXTERNAL_REDIRECTS = [
    { routes: ["/mnd"], replacement: MND_PROJECT_LINK },
    { routes: ["/pizza"], replacement: PIZZA_WEBSITE_LINK },
    { routes: ["/globe/**"], replacement: PERSONAL_GLOBE_LINK },

    { routes: ["/code", '/codesandbox', '/code-sandbox'], replacement: PERSONAL_WEBSITE_CODE_SANDBOX },
    { routes: ["/repo"], replacement: PERSONAL_WEBSITE_REPOSITORY_LINK },
    { routes: ["/deploy-script"], replacement: PERSONAL_DEPLOY_SCRIPT_LINK },

    { routes: ['/wiv', '/worlds-ivue', "/ivue/world"], replacement: WORLDS_IVUE_LINK },
    { routes: ["/ivuemedia", "/ivue/media"], replacement: IVUE_MEDIA_WEBSITE_LINK },
    { routes: ["/ivuerobotics", "/ivue/robotics"], replacement: IVUE_ROBOTICS_WEBSITE_LINK },
    { routes: ["/floridaman"], replacement: FLORIDA_MAN_LINK },
    { routes: ["/sublo"], replacement: SUBLO_WEBSITE_LINK },
];
</script>