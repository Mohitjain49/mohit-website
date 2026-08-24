<template>
<ParticlesBackground v-if="(backgroundType != -1)" :particlesOptions="((backgroundType == 0) ? INVALID_BACKGROUND : REDIRECT_BACKGROUND)" />
<main id="invalid" class="personal-web-body" ref="invalid-page-ref" :style="bodyBackground">
    <h1 class="incomplete-title"> {{ PAGE_DESC }} </h1>
    
    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" pulse-loop> Go To Home Page </RouterLink>
    </div>
</main>
</template>

<script setup>
const router = useRouter();
const webData = useWebsiteDataStore();
const pageRef = useTemplateRef('invalid-page-ref');

const PAGE_TITLE = ref("Mohit Jain | 404 Error");
const PAGE_DESC = ref("404 - Page Not Found");

const backgroundType = ref(-1);
const bodyBackground = computed(() => {
    return { background: ((backgroundType.value == -1) ? "var(--webpage-static-background)" : "transparent") }
});

const routePath = computed(() => { return router.currentRoute.value.path; });
const metaTags = computed(() => { return getMeta(PAGE_TITLE.value, "404", PAGE_DESC.value, "rgb(248, 206, 171)"); });
useHead(metaTags);

usePulseLoopAnimation(pageRef);
onMountedAdvanced(() => {
    // console.log(router.getRoutes());
    webData.closeNavMenu();

    // This section redirects to a particular page in the website if the user typed in a particular route.
    const internalRoute = INTERNAL_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(internalRoute != -1) {
        startRedirect(true);
        router.replace(INTERNAL_REDIRECTS[internalRoute].replacement);
        return;
    }

    // This section redirects to a particular page in the website if the user typed in a particular route.
    const internalFileRoute = INTERNAL_FILE_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(internalFileRoute != -1) {
        startRedirect(false);
        window.location.replace(window.location.origin + "/" + INTERNAL_FILE_REDIRECTS[internalFileRoute].replacement);
        return;
    }

    // This section redirects to another website if the user typed in a particular route.
    const externalRoute = EXTERNAL_REDIRECTS.findIndex(item => checkRedirectRoute(item.routes));
    if(externalRoute != -1) {
        startRedirect(false);
        window.location.replace(EXTERNAL_REDIRECTS[externalRoute].replacement);
        return;
    }

    // Sets the background to a 404 background if a redirect is not occuring.
    if(internalRoute == -1 && internalFileRoute == -1 && externalRoute == -1) { backgroundType.value = 0; }
});

/**
 * This function runs whenever the website starts redirecting the user to another page.
 * @param {Boolean} internal If true, this indicates that the page will start to redirect to an internal route.
 */
function startRedirect(internal = true) {
    PAGE_TITLE.value = "Mohit Jain | Redirecting...";
    PAGE_DESC.value = "Redirecting...";
    backgroundType.value = (internal ? -1 : 1);
    webData.openShareOnMount = true;
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

/** This is a list of redirects to other webpages within this website. */
const INTERNAL_REDIRECTS = [
    { routes: ["/mohit-website/**"], replacement: "/" },
    { routes: ["/contact-me"], replacement: "/contact" },
    { routes: ["/exp"], replacement: "/experience/" },
    { routes: ["/icon", "/static-icons"], replacement: "/icons" },
    { routes: ["/version", "/v"], replacement: "/copyright/" },
    { routes: ["/share/**", "/qrcode/**"], replacement: "/?qrdata=main" },

    { routes: ["/documents", "/library/documents"], replacement: "/library/#documents" },
    { routes: ["/scripts", "/library/scripts", "/library/code"], replacement: "/library/#scripts" },
    { routes: ["/files/**"], replacement: "/library/" },
    { routes: ["/ivue/my-role", "/worldsivue/my-role", "/wiv/my-role"], replacement: "/#ivue" },
    { routes: ["/webpages/**", "/footer/**"], replacement: "/#footer" },

    { routes: ["/documents/resume"], replacement: "/resume/" },
    { routes: ["/documents/resume/markdown"], replacement: "/resume/markdown" },
    { routes: ["/documents/create-github-repo"], replacement: "/create-github-repo" },

    { routes: ["/gamepad/store", "/gamepad/utility", "/scripts/gamepad/**"], replacement: "/gamepad/store-and-utility" },
    { routes: ["/gamepad/component", "/gamepad/vue.js-component"], replacement: "/gamepad/vuejs-component" },
    { routes: ["/gamepad/events"], replacement: "/gamepad/custom-events" },

    { routes: ["/documents/aws-deploy-script", "/deploy-script/**"], replacement: "/aws-deploy-script" },
    { routes: ["/google-mockup/directions/**"], replacement: "/google-mockup/#directions" },
    { routes: ["/code-reader"], replacement: "/code-scanner" }
];

/** This is a list to certain files in the website like "license.txt". */
const INTERNAL_FILE_REDIRECTS = [
    { routes: ["/license/**"], replacement: "license.txt" },
    { routes: ["/sitemap/**"], replacement: "sitemap.xml" },
    { routes: ["/favicon/**"], replacement: "favicon.ico" }
];

/** This is a list of redirects to other websites. */
const EXTERNAL_REDIRECTS = [
    { routes: ["/mnd"], replacement: MND_PROJECT_LINK },
    { routes: ["/pizza"], replacement: PIZZA_WEBSITE_LINK },
    { routes: ["/globe/**"], replacement: PERSONAL_GLOBE_LINK },

    { routes: ["/tictactoe/**", "/tic-tac-toe/**"], replacement: TICTACTOE_PROJECT_LINK },
    { routes: ["/repo", "/code"], replacement: PERSONAL_WEBSITE_REPOSITORY_LINK },

    { routes: ['/wiv', '/worlds-ivue', "/ivue/world"], replacement: WORLDS_IVUE_LINK },
    { routes: ["/ivuemedia", "/ivue/media"], replacement: IVUE_MEDIA_WEBSITE_LINK },
    { routes: ["/ivuerobotics", "/ivue/robotics"], replacement: IVUE_ROBOTICS_WEBSITE_LINK },
    { routes: ["/floridaman"], replacement: FLORIDA_MAN_LINK },
    { routes: ["/sublo"], replacement: SUBLO_WEBSITE_LINK },
];
</script>

<style lang="scss">
.personal-web-body#invalid {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: calc(100% - 40px);
    height: calc(var(--true-100vh, 100vh) - 70px);
    padding: 0px 20px;
    padding-top: 60px;
    background: transparent;
}
.incomplete-title {
    font-size: 60px;
    padding: 10px;
    border-radius: 15px;
    border: 1px solid;
    width: fit-content;
    height: fit-content;
    margin-bottom: 5px;
    text-align: center;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
    text-shadow: 0px 0px 5px var(--website-dark-text);
    background-color: rgba(248, 206, 171, 0.9);
}

@include dynamic-less-equal-width-rule(600) {
    .incomplete-title { font-size: 42px; }
}
</style>