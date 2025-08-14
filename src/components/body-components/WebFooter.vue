<template>
<client-only>
    <nav id="footer" :class="footerClass">
        <div class="footer-body">
            <div class="footer-routes-column">
                <RouterLink to="/" class="footer-routes-header light" @click="scrollToTop('/')">
                    <font-awesome-icon icon="fa-house" />
                    <span> Home Page </span>
                </RouterLink>

                <RouterLink v-for="tab in MAIN_ROUTES" :to="(tab.path + '/')"
                    :style="{ 'color': tab.color }"
                    class="footer-routes-opt"
                    @click="scrollToTop(tab.path)">

                    <font-awesome-icon :icon="tab.icon" />
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>

            <div class="footer-routes-column right">
                <RouterLink to="/contact" class="footer-routes-header" @click="scrollToTop('/contact')">
                    <font-awesome-icon icon="fa-paper-plane" />
                    <span> Contact Me </span>
                </RouterLink>

                <a :href="SOCIALS[0].link" class="footer-routes-opt">
                   <font-awesome-icon icon="fa-envelope" />
                    <span> {{ 'Email' }} </span>
                </a>
                <RouterLink v-for="tab in CONTACT_ROUTES" :to="tab.path" class="footer-routes-opt" :style="{ 'color': tab.color }">
                    <font-awesome-icon :icon="tab.icon" />
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>

            <div class="footer-routes-column extras">
                <RouterLink to="/qrcode" class="footer-routes-header light" @click="scrollToTop('/qrcode')">
                    <font-awesome-icon icon="fa-qrcode" />
                    <span> QR Codes </span>
                </RouterLink>

                <RouterLink v-for="tab in EXTRA_ROUTES" :to="tab.path"
                    :style="{ 'color': tab.color }"
                    class="footer-routes-opt"
                    @click="scrollToTop(tab.path)">

                    <font-awesome-icon :icon="tab.icon" />
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>

            <div class="footer-routes-column extras right">
                <RouterLink to="/repository" class="footer-routes-header white">
                    <font-awesome-icon icon="fa-code-branch" />
                    <span> Repository </span>
                </RouterLink>

                <RouterLink v-for="tab in REPO_ROUTES" :to="tab.path"
                    :style="{ 'color': tab.color }"
                    class="footer-routes-opt"
                    @click="scrollToTop(tab.path)">

                    <font-awesome-icon :icon="tab.icon" />
                    <span> {{ tab.name }} </span>
                </RouterLink>
            </div>
        </div>

        <div class="footer-bottom">
            <RouterLink to="/copyright" class="copyright-statement">
                <font-awesome-icon icon="fa-copyright" />
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
    return ((-1 == MAIN_PAGE_STYLE_ROUTES.findIndex(item => item === path)) ? '' : 'main-page');
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
    { name: "My Skills", path: "/skills", icon: "fa-code", color: "var(--blue-two)" },
    { name: "My Experience", path: "/experience", icon: "fa-file-code", color: "var(--website-text)" },
    { name: "My Projects", path: "/projects", icon: "fa-cubes", color: "var(--globe-green)" },
    { name: "My Resume", path: "/resume", icon: "fa-file-lines", color: "var(--website-text)" },
    { name: "FCS Certification", path: FCS_CERTIFICATE_ROUTE, icon: "fa-school-flag", color: "var(--fulton-green)" },
];

const CONTACT_ROUTES = [
    { name: "LinkedIn", path: "/linkedin", icon: "fa-brands fa-linkedin", color: "#0072B1" },
    { name: "Discord", path: "/discord", icon: "fa-brands fa-discord", color: "#5865F2" },
    { name: "GitHub", path: "/github", icon: "fa-brands fa-github", color: "white" },
    { name: "Steam", path: "/steam", icon: "fa-brands fa-steam", color: "#167eb1" },
];

const EXTRA_ROUTES = [
    { name: "My Icons", path: "/icons", icon: "fa-pen-fancy", color: "var(--blue-two)" },
    { name: "Wake Lock", path: "/wakelock", icon: "fa-lock", color: "var(--vibrant-flame)" },
    { name: "Install Website", path: "/install", icon: "fa-download", color: "var(--website-text)" },
    { name: "Gamepad", path: "/gamepad", icon: "fa-gamepad", color: "var(--website-light-text)" },
    { name: "Google Mockup", path: "/google-mockup-assignment", icon: "fa-brands fa-google", color: "#4286F5" },
];

const REPO_ROUTES = [
    { name: "Code Sandbox", path: "/code", icon: "fa-square-pen", color: "var(--lightning-yellow)" },
    { name: "Commits", path: "/commits", icon: "fa-code-commit", color: "white" }
];

const MAIN_PAGE_STYLE_ROUTES = ["/", "/wakelock", "/wakelock/"];
</script>

<style scoped>
#footer {
    background-color: rgba(0, 0, 0, 0.95);
    width: 100%;
    height: 375px;
    border: none;
    padding-top: 25px;
    z-index: 20;
}
#footer.main-page {
    border-top: 2px dashed var(--website-light-text);
    background-color: rgb(10, 10, 10);
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
    border-color: inherit;
}

.footer-routes-header.light {
    color: var(--website-light-text);
}
.footer-routes-header.white {
    color: white;
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
    border-color: inherit;
}
.footer-routes-opt svg {
    width: 25px;
    margin-right: 8px;
}

@media (max-width: 1050px) {
    #footer {
        height: 625px;
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