<template>
<ParticlesBackground :particlesOptions="COPYRIGHT_BACKGROUND" />
<main id="copyright-page" class="personal-web-body">
    <div class="copyright-body-exterior">
        <div class="copyright-body" ref="copyright-main-body">
            <h1 class="copyright-body-header">
                <font-awesome-icon icon="fa-copyright" />
                <span> {{ COPYRIGHT_TEXT }} </span>
            </h1>

            <h2 class="copyright-body-subheader version"> {{ PROJECT_VERSION }} </h2>
            <h2 class="copyright-body-subheader"> {{ RELEASE_DATE }} </h2>
            <h2 class="copyright-body-subheader small"> {{ RELEASE_TIME }} </h2>

            <div class="copyright-body-desc">
                I'm glad you're here and hope you find inspiration in my work. Feel free to explore the site, 
                take ideas, and use them to spark your own creativity. However, please abide by the 
                <span style="text-decoration: underline;">
                    <a :href="LICENSE_LINK" target="_self">license</a>
                </span>
                associated with this website if you plan to use my code for your own work.
                <br> <br>
                If you would like to collaborate or discuss using any part of my work, 
                I'd love to hear from you! You'll find some links to contact me in the footer 
                <span style="text-decoration: underline;">
                    <RouterLink :to="footerLink">below.</RouterLink>
                </span>
            </div>

            <div class="copyright-topBar">
                <div class="copyright-topBar-side left">
                    <button @click="installStore.resetWebsiteVersion()" class="copyright-topBar-btn" title="Update Website" v-pulse-loop>
                        <FontAwesomeIcon icon="fa-rotate" :spin="installStore.swUpdating" />
                    </button>
                    <a :href="PERSONAL_WEBSITE_COMMITS_LINK" class="copyright-topBar-btn updateLog" title="Update Log" v-pulse-loop>
                        <FontAwesomeIcon icon="fa-brands fa-git-alt" />
                    </a>
                </div>
                <div class="copyright-topBar-side right">
                    <RouterLink :to="footerLink" class="copyright-topBar-btn webpages" title="See Webpages" v-pulse-loop>
                        <FontAwesomeIcon icon="fa-book-open" />
                    </RouterLink>
                    <a :href="LICENSE_LINK" target="license-mohit-website" class="copyright-topBar-btn white" title="See License" v-pulse-loop>
                        <FontAwesomeIcon icon="fa-brands fa-creative-commons" />
                    </a>
                </div>
            </div>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
const router = useRouter();
const installStore = useInstallStore();
const { $websiteBuild } = useNuxtApp();

const reactiveMeta = useReactiveMeta("Mohit Jain | Copyright Notice", "copyright",
    "A legal disclaimer for any vistors on my website.", "rgb(248, 206, 171)"
);

useHead(reactiveMeta.metaObjectRef);
const routePath = computed(() => { return router.currentRoute.value.path; });
const footerLink = computed(() => { return (routePath.value + '#footer'); });

const LICENSE_LINK = useState("license-link", () => { return PERSONAL_LICENSE_LINK; });
const COPYRIGHT_TEXT = useState("copyright-text", () => { return ($websiteBuild.coprightYear + " Mohit Jain"); });
const RELEASE_DATE = useState("release-date", () => { return ("Released On: " + $websiteBuild.releaseDate); });
const RELEASE_TIME = useState("release-time", () => { return ("(" + $websiteBuild.releaseTime + ")"); });
const PROJECT_VERSION = useState("project-version", () => { return ("Version " + $websiteBuild.version); });

// Updates the Website Date Information when the website is mounted.
onMountedAdvanced(() => {
    LICENSE_LINK.value = (window.location.origin + "/license.txt");
    COPYRIGHT_TEXT.value = ($websiteBuild.coprightYear + " Mohit Jain");
    RELEASE_DATE.value = ("Released On: " + $websiteBuild.releaseDate);
    RELEASE_TIME.value = ("(" + $websiteBuild.releaseTime + ")");
    PROJECT_VERSION.value = ("Version " + $websiteBuild.version);
});
</script>

<style scoped lang="scss">
.personal-web-body#copyright-page {
    background: transparent;
}

.copyright-body-exterior {
    height: fit-content;
    min-height: calc(var(--true-100vh, 100vh) - 115px);
    padding: 30px 20px;
    width: calc(100% - 40px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.copyright-body {
    position: relative;
    height: fit-content;
    width: fit-content;
    margin: 0px auto;
    padding: 40px;
    padding-top: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: black;
    color: var(--website-light-text);
    border: 1px solid white;
    border-radius: 12px;
    box-shadow: 0px 0px 20px 5px black;
    overflow: hidden;
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
    margin-top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
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
.copyright-body-desc.license {
    max-width: 1100px;
}

.copyright-body-subheader.small {
    font-size: 14px;
    margin-top: 0px;
}
.copyright-body-subheader.version {
    color: var(--lightning-yellow);
    text-decoration: underline;
}

.copyright-topBar {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 35px;
    border-bottom: 1px solid white;
    background-color: rgba(255, 255, 255, 0.25);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
}
.copyright-topBar-side {
    height: 100%;
    width: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    gap: 5px;
}

.copyright-topBar-side.right { margin-right: 5px; }
.copyright-topBar-side.left { margin-left: 5px; }

.copyright-topBar-btn {
    background-color: var(--dark-background);
    border: 2px solid var(--website-text);
    color: var(--website-text);
    height: 22px;
    width: 22px;
    border-radius: 50%;
    overflow: hidden;
    z-index: 5;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: var(--default-transition), scale 0.2s;
}
.copyright-topBar-btn:hover {
    scale: 1.05;
}

.copyright-topBar-btn.updateLog {
    color: #F05133;
    border-color: #F05133;
}
.copyright-topBar-btn.white {
    color: white;
    border-color: white;
}

.copyright-topBar-btn svg {
    height: 10px;
    width: 10px;
}
.copyright-topBar-btn.webpages svg {
    height: 12px;
    width: 12px;
}
.copyright-topBar-btn.updateLog svg, .copyright-topBar-btn.white svg {
    height: 14px;
    width: 14px;
}

@include dynamic-less-equal-width-rule(680) {
    .copyright-body-header { font-size: 40px; }
}
@include dynamic-less-equal-width-rule(600) {
    .copyright-body-header { font-size: 28px; }
    .copyright-body-subheader { font-size: 12px; }
    .copyright-body-desc { font-size: 16px; }
    .copyright-body-subheader.small { font-size: 9px; }
}
@include dynamic-less-equal-width-rule(450) {
    .copyright-body-header {
        font-size: 24px;
        gap: 3px;
    }
}
</style>