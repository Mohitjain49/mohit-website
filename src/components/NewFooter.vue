<template>
<div id="footer">
    <div class="footer-body">
        <div class="footer-routes-column">
            <RouterLink to="/" class="footer-routes-header light">
                <client-only> <font-awesome-icon icon="fa-house" /> </client-only>
                <span> Home Page </span>
            </RouterLink>

            <RouterLink to="/skills/" class="footer-routes-opt"> My Skills </RouterLink>
            <RouterLink to="/experience/" class="footer-routes-opt"> My Experience </RouterLink>
            <RouterLink to="/projects/" class="footer-routes-opt"> My Projects </RouterLink>
            <RouterLink to="/resume/" class="footer-routes-opt"> My Resume </RouterLink>
        </div>

        <div class="footer-routes-column">
            <RouterLink to="/contact" class="footer-routes-header">
                <client-only> <font-awesome-icon icon="fa-paper-plane" /> </client-only>
                <span> Contact Me </span>
            </RouterLink>

            <a :href="SOCIALS[0].link" class="footer-routes-opt"> Email </a>
            <RouterLink to="/linkedin" class="footer-routes-opt"> LinkedIn </RouterLink>
            <RouterLink to="/discord" class="footer-routes-opt"> Discord </RouterLink>
            <RouterLink to="/github" class="footer-routes-opt"> GitHub </RouterLink>
            <RouterLink to="/gitlab" class="footer-routes-opt"> GitLab </RouterLink>
        </div>

        <div class="footer-routes-column extras">
            <RouterLink to="/qrcode" class="footer-routes-header light">
                <client-only> <font-awesome-icon icon="fa-qrcode" /> </client-only>
                <span> QR Codes </span>
            </RouterLink>

            <RouterLink to="/icons" class="footer-routes-opt"> My Icons </RouterLink>
            <RouterLink to="/copyright" class="footer-routes-opt"> Copyright </RouterLink>
        </div>
    </div>

    <div class="footer-bottom">
        <RouterLink to="/copyright" class="copyright-statement">
            <client-only>
                <font-awesome-icon icon="fa-copyright"
                    class="copyright-mainIcon"
                    @click="goToCopyrightPage()"
                />
            </client-only>
            <span> {{ COPYRIGHT_TEXT }} </span>
        </RouterLink>
    </div>
</div>
</template>

<script setup>
const COPYRIGHT_TEXT = ref("2025 Mohit Jain");
const router = useRouter();

onMounted(() => { COPYRIGHT_TEXT.value = (new Date().getFullYear() + " Mohit Jain"); })

/**
 * This scrolls to the top of the webpage.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

/**
 * This function checks whether the user is on the home page.
 * If so, this function will scroll to the top of the page.
 */
function checkHomePage() {
    if(router.currentRoute.value.path === "/") { scrollToTop(); }
}

/**
 * This function checks whether the user is on the copyright page.
 * If so, an animation will be disabled.
 */
 function checkCopyrightPage() {
    const path = router.currentRoute.value.path;
    return (path === "/copyright" || path === "/copyright/")
}
</script>

<style scoped>
#footer {
    background-color: rgba(0, 0, 0, 0.95);
    width: 100%;
    height: 325px;
    border: none;
    padding-top: 25px;
}

.footer-body {
    position: relative;
    left: calc((100% - 700px) / 2);
    width: 700px;
    height: fit-content;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
    height: 260px;
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
    font-family: 'Lexend', sans-serif;
    font-size: 24px;
    font-weight: bold;
    border-bottom: var(--empty-border);
    transition: var(--default-transition);
    padding-bottom: 1px;
    margin-bottom: 15px;
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


.footer-routes-opt {
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-size: 20px;
    border-bottom: 2px dashed rgba(0, 0, 0, 0);
    transition: var(--default-transition);
    padding-bottom: 2px;
    margin-bottom: 10px;
    margin-left: 40px;
}
.footer-routes-opt:hover {
    border-color: var(--website-text);
}

@media (max-width: 825px) {
    #footer {
        height: 475px;
    }
    .footer-body {
        grid-template-columns: 1fr 1fr;
    }
}
@media (max-width: 700px) {
    .footer-body {
        left: 0px;
        width: 100%;
    }
}
@media (max-width: 525px) {
    .footer-routes-header {
        font-size: 20px;
        margin-left: 18px;
    }
    .footer-routes-column svg {
        display: none;
        font-size: 18px;
    }
    .footer-routes-opt {
        font-size: 15px;
        margin-left: 20px;
    }
}
</style>