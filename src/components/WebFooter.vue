<template>
<div id="copyright">
    <RouterLink to="/" @click="checkHomePage()" class="copyright-side-container personal-text">
        <img class="personal-text-img" :src="personal_icon" draggable="false" />
    </RouterLink>

    <div class="copyright-statement">
        <client-only>
            <font-awesome-icon icon="fa-copyright"
                class="copyright-mainIcon"
                @click="goToCopyrightPage()"
            />
        </client-only>
        <span> {{ COPYRIGHT_TEXT }} </span>
    </div>

    <div class="copyright-side-container">
        <div class="scroll-topBtn center-flex-display" @click="scrollToTop()" title="Scroll To Start">
            <client-only>
                <font-awesome-icon icon="fa-arrow-up" :flip="!checkCopyrightPage()" />
            </client-only>
        </div>
    </div>
</div>
</template>

<script setup>
import personal_icon from "/static-icons/Personal_Icon_Transparent.png";
import { useRouter } from "vue-router";

const COPYRIGHT_TEXT = (new Date().getFullYear() + " Mohit Jain");
const router = useRouter();

/**
 * This scrolls to the top of the webpage.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
}

/**
 * This function navigates visitors to the copyright page.
 */
function goToCopyrightPage() {
    router.push("/copyright");
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
    return (path === "/copyright" || path === "/copyright.")
}
</script>

<style scoped>
#copyright {
    background-color: black;
    width: 100%;
    height: 60px;
    color: var(--blue-cobalt);
    font-size: 20px;
    border: none;
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
#copyright span {
    font-size: 23px;
    font-family: 'Lexend', sans-serif;
    margin-left: 6px;
}

.copyright-mainIcon {
    cursor: pointer;
    transition: font-size 0.2s;
}
.copyright-mainIcon:hover {
    font-size: 29px;
}

.copyright-side-container {
    width: 100px;
    height: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    transition: var(--default-transition);
}
.copyright-side-container.personal-text:hover {
    cursor: pointer;
    background-color: rgba(255, 255, 255, 0.25);
}
.personal-text-img {
    height: 25px;
    user-select: none;
}

.scroll-topBtn {
    cursor: pointer;
    width: 40px;
    height: 40px;
    background-color: var(--blue-one);
    border-radius: 10px;
    transition: var(--default-transition);
    color: black;
    font-size: 20px;
    margin-left: 40px;
}
.scroll-topBtn:hover {
    background-color: var(--blue-three);
}

@media (max-width: 600px) {
    #copyright {
        font-size: 17px;
    }
    #copyright span {
        font-size: 20px;
    }
    .copyright-side-container {
        width: 70px;
    }

    .personal-text-img {
        height: 18px;
    }
    .scroll-topBtn {
        width: 35px;
        height: 35px;
        font-size: 18px;
        margin-left: 20px;
    }
}
</style>