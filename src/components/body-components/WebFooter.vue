<template>
<client-only>
    <nav id="footer" :class="footerClass">
        <div class="footer-body">
            <div class="footer-routes-column">
                <RouterLink to="/" class="footer-routes-header light" @click="scrollToTop('/')">
                    <client-only> <font-awesome-icon icon="fa-house" /> </client-only>
                    <span> Home Page </span>
                </RouterLink>

                <RouterLink v-for="tab in MAIN_ROUTES" :to="(tab.path + '/')"
                    :class="['footer-routes-opt', tab.extraClass]"
                    @click="scrollToTop(tab.path)">

                    <client-only> <font-awesome-icon :icon="tab.icon" /> </client-only>
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>

            <div class="footer-routes-column right">
                <RouterLink to="/contact" class="footer-routes-header" @click="scrollToTop('/contact')">
                    <client-only> <font-awesome-icon icon="fa-paper-plane" /> </client-only>
                    <span> Contact Me </span>
                </RouterLink>

                <a :href="SOCIALS[0].link" class="footer-routes-opt">
                    <client-only> <font-awesome-icon icon="fa-envelope" /> </client-only>
                    <span> {{ 'Email' }} </span>
                </a>
                <RouterLink v-for="tab in CONTACT_ROUTES" :to="tab.path" :class="['footer-routes-opt', tab.extraClass]">
                    <client-only> <font-awesome-icon :icon="tab.icon" /> </client-only>
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>

            <div class="footer-routes-column extras">
                <RouterLink to="/search" class="footer-routes-header" @click="scrollToTop('/search')">
                    <client-only> <font-awesome-icon icon="fa-magnifying-glass" /> </client-only>
                    <span> Search </span>
                </RouterLink>

                <RouterLink v-for="tab in EXTRA_ROUTES" :to="tab.path"
                    :class="['footer-routes-opt', tab.extraClass]"
                    @click="scrollToTop(tab.path)">

                    <client-only> <font-awesome-icon :icon="tab.icon" /> </client-only>
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>

            <div class="footer-routes-column extras right">
                <RouterLink to="/repository" class="footer-routes-header white">
                    <client-only> <font-awesome-icon icon="fa-code-branch" /> </client-only>
                    <span> Repository </span>
                </RouterLink>

                <RouterLink v-for="tab in REPO_ROUTES" :to="tab.path"
                    :class="['footer-routes-opt', tab.extraClass]"
                    @click="scrollToTop(tab.path)">

                    <client-only> <font-awesome-icon :icon="tab.icon" /> </client-only>
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>
        </div>

        <div class="footer-bottom">
            <RouterLink to="/copyright" class="copyright-statement">
                <client-only> <font-awesome-icon icon="fa-copyright" /> </client-only>
                <span> {{ COPYRIGHT_TEXT }} </span>
            </RouterLink>
        </div>
    </nav>
</client-only>
</template>

<script setup>
const COPYRIGHT_TEXT = ref("2025 Mohit Jain");
const route = useRoute();
onMounted(() => { COPYRIGHT_TEXT.value = (new Date().getFullYear() + " Mohit Jain"); });

const footerClass = computed(() => {
    const path = route.path;
    return ((path === "/contact" || path === "/contact/") ? 'contact' :
        ((-1 == MAIN_PAGE_STYLE_ROUTES.findIndex(item => item === path)) ? '' : 'main-page')
    );
})

/**
 * This scrolls to the top of the webpage if the user won't change routes.
 * @param {String} routeStr The route the button is attached to.
 */
function scrollToTop(routeStr = "/") {
    if(routeStr !== route.path && (routeStr + "/") !== route.path) { return; }
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

const MAIN_ROUTES = [
    { name: "My Skills", path: "/skills", icon: "fa-code", extraClass: "skills" },
    { name: "My Experience", path: "/experience", icon: "fa-file-code", extraClass: "" },
    { name: "My Projects", path: "/projects", icon: "fa-cubes", extraClass: "projects" },
    { name: "My Resume", path: "/resume", icon: "fa-file-lines", extraClass: "" },
    { name: "FCS Certification", path: FCS_CERTIFICATE_ROUTE, icon: "fa-school-flag", extraClass: "fulton" },
];

const CONTACT_ROUTES = [
    { name: "LinkedIn", path: "/linkedin", icon: "fa-brands fa-linkedin", extraClass: "linkedin" },
    { name: "Discord", path: "/discord", icon: "fa-brands fa-discord", extraClass: "discord" },
    { name: "GitHub", path: "/github", icon: "fa-brands fa-github", extraClass: "github" },
    { name: "GitLab", path: "/gitlab", icon: "fa-brands fa-gitlab", extraClass: "gitlab" },
];

const EXTRA_ROUTES = [
    { name: "QR Codes", path: "/qrcode", icon: "fa-qrcode", extraClass: "light" },
    { name: "My Icons", path: "/icons", icon: "fa-pen-fancy", extraClass: "skills" },
    { name: "Wake Lock", path: "/wakelock", icon: "fa-lock", extraClass: "wakelock" },
    { name: "Install Website", path: "/install", icon: "fa-download", extraClass: "" },
    { name: "Gamepad", path: "/gamepad", icon: "fa-gamepad", extraClass: "light" }
];

const REPO_ROUTES = [
    { name: "Code Sandbox", path: "/code", icon: "fa-square-pen", extraClass: "sandbox" },
    { name: "Commits", path: "/commits", icon: "fa-code-commit", extraClass: "github" },
    { name: "Google Mockup", path: "/google-mockup-assignment", icon: "fa-brands fa-google", extraClass: "google" },
];

const MAIN_PAGE_STYLE_ROUTES = ["/", "/search", "/search/", "/wakelock", "/wakelock/"];
</script>

<style scoped>
#footer {
    background-color: rgba(0, 0, 0, 0.95);
    width: 100%;
    height: 375px;
    border: none;
    padding-top: 25px;
}
#footer.main-page {
    border-top: 2px dashed var(--website-light-text);
    background-color: rgb(10, 10, 10);
}
#footer.contact {
    grid-column: span 2;
}

.footer-body {
    position: relative;
    left: calc((100% - 1000px) / 2);
    width: 1000px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
.footer-bottom {
    width: 100%;
    height: 50px;
    justify-content: center;
    align-items: center;
    display: flex;
    text-align: center;
    padding-bottom: 15px;
}

.copyright-statement {
    width: fit-content;
    text-align: center;
    color: var(--blue-cobalt);
    font-size: 25px;
    font-family: 'Lexend', sans-serif;
    cursor: pointer;
    border-bottom: var(--empty-border);
    transition: var(--default-transition);
}
.copyright-statement svg {
    font-size: 23px;
    margin-right: 4px;
}
.copyright-statement:hover {
    border-color: var(--blue-cobalt);
}

.footer-routes-column {
    height: 300px;
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
}
.footer-routes-column.extras {
    height: fit-content;
    padding-bottom: 20px;
}

.footer-routes-header {
    color: var(--website-text);
    font-family: 'Roboto', sans-serif;
    font-size: 27px;
    font-weight: bold;
    border-bottom: var(--thin-empty-border);
    transition: var(--default-transition);
    padding-bottom: 1px;
    margin-bottom: 20px;
    margin-left: 40px;
}
.footer-routes-header svg {
    font-size: 22px;
    margin-bottom: 2px;
}
.footer-routes-header:hover {
    border-color: var(--website-text);
}

.footer-routes-header.light {
    color: var(--website-light-text);
}
.footer-routes-header.light:hover {
    border-color: var(--website-light-text);
}

.footer-routes-header.white {
    color: white;
}
.footer-routes-header.white:hover {
    border-color: white;
}


.footer-routes-opt {
    color: var(--website-text);
    font-family: 'Roboto', sans-serif;
    font-size: 19px;
    border-bottom: 1px dashed rgba(0, 0, 0, 0);
    transition: var(--default-transition);
    padding-bottom: 2px;
    margin-bottom: 10px;
    margin-left: 40px;
}
.footer-routes-opt:hover {
    border-color: var(--website-text);
}
.footer-routes-opt svg {
    width: 25px;
    margin-right: 8px;
}

.footer-routes-opt.light {
    color: var(--website-light-text);
}
.footer-routes-opt.light:hover {
    border-color: var(--website-light-text);
}

.footer-routes-opt.skills {
    color: var(--blue-two);
}
.footer-routes-opt.skills:hover {
    border-color: var(--blue-two);
}

.footer-routes-opt.projects {
    color: var(--globe-green);
}
.footer-routes-opt.projects:hover {
    border-color: var(--globe-green);
}

.footer-routes-opt.copyright {
    color: var(--blue-cobalt);
}
.footer-routes-opt.copyright:hover {
    border-color: var(--blue-cobalt);
}

.footer-routes-opt.wakelock {
    color: var(--vibrant-flame);
}
.footer-routes-opt.wakelock:hover {
    border-color: var(--vibrant-flame);
}

.footer-routes-opt.linkedin {
    color: #0072B1;
}
.footer-routes-opt.linkedin:hover {
    border-color: #0072B1;
}

.footer-routes-opt.discord {
    color: #5865F2;
}
.footer-routes-opt.discord:hover {
    border-color: #5865F2;
}

.footer-routes-opt.github {
    color: white;
}
.footer-routes-opt.github:hover {
    border-color: white;
}

.footer-routes-opt.gitlab {
    color: #E24329;
}
.footer-routes-opt.gitlab:hover {
    border-color: #E24329;
}

.footer-routes-opt.fulton {
    color: var(--fulton-green);
}
.footer-routes-opt.fulton:hover {
    border-color: var(--fulton-green);
}

.footer-routes-opt.sandbox {
    color: var(--lightning-yellow);
}
.footer-routes-opt.sandbox:hover {
    border-color: var(--lightning-yellow);
}

.footer-routes-opt.google {
    color: #4286F5;
}
.footer-routes-opt.google:hover {
    border-color: #4286F5;
}

@media (max-width: 1050px) {
    #footer {
        height: 625px;
    }
    #footer.contact {
        grid-column: span 1;
    }
    .footer-body {
        grid-template-columns: 1fr 1fr;
        left: 0px;
        width: 100%;
    }

    .footer-routes-column {
        width: 230px;
        position: relative;
        left: calc(100% - 250px)
    }
    .footer-routes-column.right {
        left: 20px;
    }
}
@media (max-width: 700px) {
    .footer-body {
        left: 0px;
        width: 100%;
    }
}
@media (max-width: 525px) {
    #footer {
        height: 515px;
    }
    #footer.contact {
        z-index: 20;
    }
    .footer-body {
        height: 450px;
        left: 0px;
        width: 100%;
    }
    .footer-bottom {
        padding-bottom: 10px;
    }
    .copyright-statement {
        font-size: 23px;
    }
    .copyright-statement svg {
        font-size: 21px;
    }

    .footer-routes-column {
        height: 260px;
        left: 0px;
        width: auto;
    }
    .footer-routes-column.right {
        left: 0px;
    }

    .footer-routes-header {
        font-size: 20px;
        margin-left: 18px;
        margin-bottom: 15px;
    }
    .footer-routes-header svg {
        font-size: 18px;
    }

    .footer-routes-opt {
        font-size: 14px;
        margin-left: 20px;
    }
    .footer-routes-opt svg {
        width: 15px;
        margin-right: 5px;
    }
}
</style>