<template>
<ParticlesBackground v-if="showBackground" :particlesOptions="INVALID_BACKGROUND" />
<main id="invalid" class="personal-web-body">
    <h1 class="incomplete-title"> {{ PAGE_DESC }} </h1>
    <!-- <div class="incomplete-subtitle"> {{ '' }} </div> -->
    
    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" v-html="'Go to Home'"
            @mouseenter="setHeartbeatAnimation"
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

useHead(getMeta("Mohit Jain | 404", "404", PAGE_DESC.value));
onMounted(() => {
    initWebData();
    const path = router.currentRoute.value.path;

    const interalRoute = INTERNAL_REDIRECTS.findIndex(item => (path === item.route || path === (item.route + "/")));
    if(interalRoute != -1) {
        PAGE_DESC.value = "Redirecting...";
        showBackground.value = false;
        router.replace(INTERNAL_REDIRECTS[interalRoute].replacement);
    }
});

// This is a list of redirects to other webpages within this website.
const INTERNAL_REDIRECTS = [
    { route: "/contact-me", replacement: "/contact" },
    { route: "/exp", replacement: "/experience/" },
    { route: "/icon", replacement: "/icons" },
    { route: "/static-icons", replacement: "/icons" },
    { route: "/documents", replacement: "/#documents" }
];
</script>