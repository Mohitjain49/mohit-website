<template>
<div class="personal-web-body">
    <div class="copyright-body">
        <div class="copyright-body-header">
            <client-only> <font-awesome-icon icon="fa-copyright" /> </client-only>
            <span> {{ COPYRIGHT_TEXT }} </span>
        </div>
        <div class="copyright-body-date"> {{ RELEASE_DATE }} </div>

        <div class="copyright-body-desc">
            I'm glad you're here and hope you find inspiration in my work.
            Feel free to explore the site, take ideas, and use them to spark your own creativity.
            However, please don't directly copy my content, design, or code without my permission.
            <br> <br>
            If you would like to collaborate or discuss using any part of my work, 
            I'd love to hear from you! You'll find some links to contact me on the footer below.
        </div>
    </div>
    <WebFooter />
</div>
</template>

<script setup>
import now from '~build/time';
const COPYRIGHT_TEXT = ref("2025 Mohit Jain");
const RELEASE_DATE = ref("Last Release: May 28th, 2025");

onMounted(() => {
    initWebData();
    COPYRIGHT_TEXT.value = (new Date().getFullYear() + " Mohit Jain");
    
    RELEASE_DATE.value = "Last Release: " + new Date(now).toLocaleDateString("en-US", {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
    });
});
useHead(getMeta("Mohit Jain | Copyright Notice", "copyright",
    "A legal disclaimer for any vistors on my website."
));
</script>

<style scoped>
.copyright-body {
    height: fit-content;
    min-height: calc(100vh - 100px);
    width: calc(100% - 40px);
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.copyright-body-header {
    width: fit-content;
    height: fit-content;
    font-size: 60px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: var(--website-text)
}
.copyright-body-header svg {
    margin-right: 10px;
}

.copyright-body-date {
    width: fit-content;
    height: fit-content;
    font-size: 20px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: var(--website-text);
}
.copyright-body-desc {
    padding-top: 20px;
    width: 100%;
    height: fit-content;
    max-width: 700px;
    font-size: 25px;
    font-family: 'Montserrat', 'Roboto', sans-serif;
    color: var(--website-text);
}

@media (max-width: 600px) {
    .copyright-body-header {
        font-size: 40px;
    }
    .copyright-body-date {
        font-size: 14px;
    }
    .copyright-body-desc {
        font-size: 18px;
    }
}
@media (max-width: 450px) {
    .copyright-body-header {
        font-size: 32px;
    }
}
</style>