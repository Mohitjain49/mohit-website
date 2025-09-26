<template>
<ParticlesBackground :particlesOptions="COPYRIGHT_BACKGROUND" />
<main class="personal-web-body transparent">
    <div class="copyright-body-exterior">
        <div class="copyright-body">
            <h1 class="copyright-body-header">
                <font-awesome-icon icon="fa-copyright" />
                <span> {{ COPYRIGHT_TEXT }} </span>
            </h1>
            <h2 class="copyright-body-subheader"> {{ PROJECT_VERSION }} </h2>
            <h2 class="copyright-body-subheader"> {{ RELEASE_DATE }} </h2>

            <div class="copyright-body-desc">
                I'm glad you're here and hope you find inspiration in my work.
                Feel free to explore the site, take ideas, and use them to spark your own creativity.
                However, please don't directly copy my content, design, or code without my permission.
                <br> <br>
                If you would like to collaborate or discuss using any part of my work, 
                I'd love to hear from you! You'll find some links to contact me on the footer 
                <span style="text-decoration: underline;">
                    <RouterLink to="/copyright#footer" @click="webData.goToPageSection('footer')">below.</RouterLink>
                </span>
            </div>
        </div>
    </div>
    <WebFooter />
</main>

<button class="copyright-reloadWidget animate__animated animate__fadeInUp" @click="reloadPage()" title="Reload Page">
    <FontAwesomeIcon icon="fa-rotate-right" />
</button>
</template>

<script setup>
import now from '~build/time';
import { version } from "~build/package";

const webData = useWebsiteDataStore();
const COPYRIGHT_TEXT = ref("2025 Mohit Jain");
const RELEASE_DATE = ref("Last Release: July 10, 2025");
const PROJECT_VERSION = ref("Version " + version);

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
.copyright-body-exterior {
    height: fit-content;
    min-height: calc(100vh - 100px);
    padding: 20px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.copyright-body {
    height: fit-content;
    width: fit-content;
    margin: 0px auto;
    padding: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: black;
    color: var(--website-light-text);
    border-radius: 25px;
}

.copyright-body-header {
    width: fit-content;
    height: fit-content;
    font-size: 60px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: inherit;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 10px;
}

.copyright-body-subheader {
    width: fit-content;
    height: fit-content;
    font-size: 20px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: inherit;
}
.copyright-body-desc {
    padding-top: 20px;
    width: 100%;
    height: fit-content;
    max-width: 700px;
    font-size: 25px;
    font-family: 'Montserrat', 'Roboto', sans-serif;
    color: inherit;
}

.copyright-reloadWidget {
    position: fixed;
    bottom: 15px;
    right: 15px;
    cursor: pointer;
    overflow: hidden;
    background-color: var(--website-text);
    width: 50px;
    height: 50px;
    border-radius: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    transition: var(--default-transition), height 0.2s, width 0.2s;
    color: rgba(0, 0, 0, 0.8);
    font-size: 22px;
    z-index: 5;
}
.copyright-reloadWidget:hover {
    background-color: var(--website-light-text);
}

@media (max-width: 680px) {
    .copyright-body-header {
        font-size: 40px;
    }
}
@media (max-width: 600px) {
    .copyright-body-header {
        font-size: 28px;
    }
    .copyright-body-subheader {
        font-size: 12px;
    }
    .copyright-body-desc {
        font-size: 16px;
    }
}
@media (max-width: 450px) {
    .copyright-body-header {
        font-size: 24px;
        gap: 3px;
    }
}
</style>