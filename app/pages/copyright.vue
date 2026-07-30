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

            <div v-if="!showLicense" class="copyright-body-desc">
                I'm glad you're here and hope you find inspiration in my work. Feel free to explore the site, 
                take ideas, and use them to spark your own creativity. However, please abide by the 
                <span style="text-decoration: underline;">
                    <RouterLink :to="licenseLink" target="mohit-jain-web-license">MIT License</RouterLink>
                </span>
                associated with this website if you plan to use my code for your own work.
                <br> <br>
                If you would like to collaborate or discuss using any part of my work, 
                I'd love to hear from you! You'll find some links to contact me in the footer 
                <span style="text-decoration: underline;">
                    <RouterLink :to="footerLink">below.</RouterLink>
                </span>
            </div>
            <div v-if="showLicense" class="copyright-body-desc license">
                Permission is hereby granted, free of charge, to any person obtaining a copy
                of this software and associated documentation files (the "Software"), to deal
                in the Software without restriction, including without limitation the rights
                to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                copies of the Software, and to permit persons to whom the Software is
                furnished to do so, subject to the following conditions:
                <br> <br>
                The above copyright notice and this permission notice shall be included in all
                copies or substantial portions of the Software.
                <br> <br>
                THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                SOFTWARE.
            </div>

            <div class="copyright-topBar">
                <div class="copyright-topBar-side left">
                    <RouterLink :to="(showLicense ? routePath : licenseLink)" class="copyright-topBar-btn" pulse-loop
                        :style="getColorStyles('var(--website-light-text)')"
                        :title="(showLicense ? 'Back To Main Statement' : 'See License')">

                        <FontAwesomeIcon :icon="(showLicense ? 'fa-arrow-left' : 'fa-scale-balanced')" />
                    </RouterLink>
                </div>
                <div class="copyright-topBar-side right">
                    <button @click="installStore.resetWebsiteVersion()" class="copyright-topBar-btn" title="Update Website" pulse-loop>
                        <FontAwesomeIcon icon="fa-rotate" :spin="installStore.swUpdating" />
                    </button>
                    <a :href="PERSONAL_WEBSITE_COMMITS_LINK" class="copyright-topBar-btn updateLog" title="Update Log" pulse-loop>
                        <FontAwesomeIcon icon="fa-brands fa-git-alt" />
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
const copyrightBodyRef = useTemplateRef('copyright-main-body');

const COPYRIGHT_NOTICE_TITLE = "Mohit Jain | Copyright Notice";
const LICENSE_PAGE_TITLE = "Mohit Jain | Website Code License";

const reactiveMeta = useReactiveMeta(COPYRIGHT_NOTICE_TITLE, "copyright",
    "A legal disclaimer for any vistors on my website.", "rgb(248, 206, 171)"
);

const showLicense = computed(() => { return (router.currentRoute.value.query.showLicense === "true"); });
const routePath = computed(() => { return router.currentRoute.value.path; });
const licenseLink = computed(() => { return (routePath.value + '?showLicense=true'); });
const footerLink = computed(() => { return (routePath.value + '#footer'); });

const COPYRIGHT_TEXT = useState("copyright-text", () => { return ($websiteBuild.coprightYear + " Mohit Jain"); });
const RELEASE_DATE = useState("release-date", () => { return ("Released On: " + $websiteBuild.releaseDate); });
const RELEASE_TIME = useState("release-time", () => { return ("(" + $websiteBuild.releaseTime + ")"); });
const PROJECT_VERSION = useState("project-version", () => { return ("Version " + $websiteBuild.version); });

useHead(reactiveMeta.metaObjectRef);
usePulseLoopAnimation(copyrightBodyRef);

// Updates the Website Date Information when the website is mounted.
onMountedAdvanced(() => {
    setPageTitle(showLicense.value);
    COPYRIGHT_TEXT.value = ($websiteBuild.coprightYear + " Mohit Jain");
    RELEASE_DATE.value = ("Released On: " + $websiteBuild.releaseDate);
    RELEASE_TIME.value = ("(" + $websiteBuild.releaseTime + ")");
    PROJECT_VERSION.value = ("Version " + $websiteBuild.version);
});

// This changes the document title when the user changes between the main statement and the license.
watch(showLicense, (newValue) => { setPageTitle(newValue); });

/** This sets the page title based on when the user changes between the License and Main Statement. */
function setPageTitle(newValue = false) {
    reactiveMeta.changeTitle(newValue ? LICENSE_PAGE_TITLE : COPYRIGHT_NOTICE_TITLE);
}
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
    font-size: 10px;
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
    font-size: 14px;
}

@include dynamic-less-equal-width-rule(680) {
    .copyright-body-header {
        font-size: 40px;
    }
}
@include dynamic-less-equal-width-rule(600) {
    .copyright-body-header {
        font-size: 28px;
    }
    .copyright-body-subheader {
        font-size: 12px;
    }
    .copyright-body-desc {
        font-size: 16px;
    }
    .copyright-body-subheader.small {
        font-size: 9px;
    }
}
@include dynamic-less-equal-width-rule(450) {
    .copyright-body-header {
        font-size: 24px;
        gap: 3px;
    }
}
</style>