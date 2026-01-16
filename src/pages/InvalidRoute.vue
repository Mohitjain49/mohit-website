<template>
<ParticlesBackground v-if="(backgroundType != -1)" :particlesOptions="((backgroundType == 0) ? INVALID_BACKGROUND : REDIRECT_BACKGROUND)" />
<main id="invalid" class="personal-web-body" :style="bodyBackground">
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

const PAGE_TITLE = ref("Mohit Jain | 404 Error");
const PAGE_DESC = ref("404 - Page Not Found");

const backgroundType = ref(-1);
const bodyBackground = computed(() => {
    return { background: ((backgroundType.value == -1) ? "var(--webpage-static-background)" : "transparent")}
});

const routePath = computed(() => { return router.currentRoute.value.path; });
const metaTags = computed(() => { return getMeta(PAGE_TITLE.value, "404", PAGE_DESC.value); });
useHead(metaTags);

onMounted(() => {
    // This section redirects to a particular page in the website if the user typed in a particular route.
    const internalRoute = INTERNAL_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(internalRoute != -1) {
        startRedirect(true);
        router.replace(INTERNAL_REDIRECTS[internalRoute].replacement);
    }

    // This section redirects to another website if the user typed in a particular route.
    const externalRoute = EXTERNAL_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(externalRoute != -1) {
        startRedirect(false);
        window.location.replace(EXTERNAL_REDIRECTS[externalRoute].replacement);
    }
    if(internalRoute == -1 && externalRoute == -1) { backgroundType.value = 0; }
});

/**
 * This function runs whenever the website starts redirecting the user to another page.
 * @param {Boolean} internal If true, this indicates that the page will start to redirect to an internal route.
 */
function startRedirect(internal = true) {
    PAGE_TITLE.value = "Mohit Jain | Redirecting...";
    PAGE_DESC.value = "Redirecting...";
    backgroundType.value = (internal ? -1 : 1);
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
    { routes: ["/version", "/v"], replacement: "/copyright/" },
    { routes: ["/documents"], replacement: "/#documents" },

    { routes: ["/documents/resume"], replacement: "/resume" },
    { routes: ["/documents/resume/qrcode"], replacement: "/resume/qrcode" },
    { routes: ["/documents/resume/markdown"], replacement: "/resume/markdown" },

    { routes: ["/documents/create-github-repo"], replacement: "/create-github-repo" },
    { routes: ["/documents" + FCS_CERTIFICATE_ROUTE], replacement: FCS_CERTIFICATE_ROUTE },
];

// This is a list of redirects to other websites.
const EXTERNAL_REDIRECTS = [
    { routes: ["/mnd"], replacement: MND_PROJECT_LINK },
    { routes: ["/pizza"], replacement: PIZZA_WEBSITE_LINK },
    { routes: ["/globe/**"], replacement: PERSONAL_GLOBE_LINK },

    { routes: ["/code", '/codesandbox', '/code-sandbox'], replacement: PERSONAL_WEBSITE_CODE_SANDBOX },
    { routes: ["/repo"], replacement: PERSONAL_WEBSITE_REPOSITORY_LINK },
    { routes: ["/deploy-script", "/documents/deploy-script"], replacement: PERSONAL_DEPLOY_SCRIPT_LINK },
    { routes: ["/documents/sitemap"], replacement: PERSONAL_SITEMAP_LINK },

    { routes: ['/wiv', '/worlds-ivue', "/ivue/world"], replacement: WORLDS_IVUE_LINK },
    { routes: ["/ivuemedia", "/ivue/media"], replacement: IVUE_MEDIA_WEBSITE_LINK },
    { routes: ["/ivuerobotics", "/ivue/robotics"], replacement: IVUE_ROBOTICS_WEBSITE_LINK },
    { routes: ["/floridaman"], replacement: FLORIDA_MAN_LINK },
    { routes: ["/sublo"], replacement: SUBLO_WEBSITE_LINK },
];
</script>