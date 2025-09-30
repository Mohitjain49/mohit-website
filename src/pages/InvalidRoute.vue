<template>
<main id="invalid" class="personal-web-body">
    <h1 class="gradient-text incomplete-title"> {{ PAGE_DESC }} </h1>
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
const PAGE_DESC = "404 - Page Not Found.";

useHead(getMeta("Mohit Jain | 404 Error", "404", PAGE_DESC));
onMounted(() => {
    initWebData();
    const path = router.currentRoute.value.path;

    if(path === "/contact-me" || path === "/contact-me/") { router.replace("/contact"); }
    if(path === "/exp" || path === "/exp/") { router.replace("/experience/"); }
    if(path === "/icon" || path === "/icon/") { router.replace("/icons"); }
    if(path === "/documents" || path === "/documents/") { router.replace("/#documents") }
});
</script>