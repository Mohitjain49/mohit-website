<template>
<div id="copyright">
    <RouterLink to="/" class="copyright-side-container personal-text">
        <img class="personal-text-img" :src="personal_icon" draggable="false" />
    </RouterLink>

    <div class="copyright-statement">
        <font-awesome-icon icon="fa-copyright" />
        <span> {{ COPYRIGHT_TEXT }} </span>
    </div>

    <div class="copyright-side-container">
        <RouterLink to="/icon" class="scroll-topBtn center-flex-display" title="My Icons">
            <font-awesome-icon icon="fa-pen-fancy" />
        </RouterLink>
        <div class="scroll-topBtn center-flex-display" @click="scrollToTop()" title="Scroll To Start">
            <font-awesome-icon icon="fa-arrow-up" />
        </div>
    </div>
</div>
</template>

<script setup>
import personal_icon from "/Personal_Icon_Transparent.png";
const COPYRIGHT_TEXT = (new Date().getFullYear() + " Mohit Jain");

/**
 * This scrolls to the top of the webpage.
 */
function scrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
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

.copyright-side-container {
    width: 120px;
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
        width: 75px;
    }

    .personal-text-img {
        height: 18px;
    }
    .scroll-topBtn {
        width: 30px;
        height: 30px;
        font-size: 16px;
    }
}
</style>