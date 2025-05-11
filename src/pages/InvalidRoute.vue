<template>
<div id="invalid" class="personal-web-body">
    <div class="gradient-text incomplete-title"> {{ PAGE_DESC }} </div>
    <div class="incomplete-subtitle"> {{ '' }} </div>
    
    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" v-html="'Go to Home'"
            @mouseenter="webData.setHeartbeatAnimation"
            @mouseleave="webData.setHeartbeatAnimation"
        />
    </div>
</div>
</template>

<script setup>
import "@/styles/navpage.css";
import { useHead } from '@unhead/vue';

const webData = useWebsiteDataStore();
const router = useRouter()
const PAGE_DESC = "404 - Page Not Found.";

useHead(getMeta("Mohit Jain | 404 Error", "404", PAGE_DESC));
onMounted(() => {
    webData.mountWebData();
    const path = router.currentRoute.value;

    if(path === "/contact-me" || path === "/contact-me/") { router.replace("/contact"); }
    if(path === "/exp" || path === "/exp/") { router.replace("/experience/"); }
});
</script>