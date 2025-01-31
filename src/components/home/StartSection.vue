<template>
<div id="start"></div>
<div class="start-section">
    <div class="start-section-half">
        <div class="start-section-title">Mohit Jain</div>
        <div class="start-section-subtitle">
            <span><a :href="MAIN_IVUE_WEBSITE_LINK">iVue</a></span>'s Lead Software Developer
        </div>
        <div class="start-section-subtitle">
            Co-creator of <span><a :href="WORLDS_IVUE_LINK">Worlds iVue</a></span>
        </div>

        <div class="start-contacts">
            <div class="start-contacts-row top">
                <RouterLink to="/contact" class="start-contacts-btn start-contacts-mainBtn">
                    <font-awesome-icon icon="fa-paper-plane" />
                    <span>My Contact Info</span>
                </RouterLink>
            </div>
            <div class="start-contacts-row bottom">
                <a v-for="contact in SOCIALS" :href="contact.link"
                    class="start-contacts-btn"
                    :style="{ 'color': contact.color, 'border-color': contact.color }">

                    <font-awesome-icon :icon="contact.linkIcon" />
                    <span> {{ contact.name }} </span>
                </a>
            </div>
        </div>
    </div>

    <div class="start-section-half headshot-side">
        <img :src="headshot" class="start-section-headshot" />
    </div>
</div>
</template>

<script setup>
import headshot from "@/assets/Mohit_Headshot.jpeg";
import { SOCIALS, MAIN_IVUE_WEBSITE_LINK, WORLDS_IVUE_LINK } from "@/stores/Objects.js";
</script>

<style scoped>
#start {
    width: 100%;
    height: 50px;
}
.start-section {
    height: calc(var(--body-height));
    min-height: 700px;
    width: 100%;
    background: var(--webpage-static-background);
    color: var(--website-text);
    display: grid;
    grid-template-columns: 60% 40%;
}

.start-section-half {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Lexend', 'sans-serif';
}
.start-section-headshot {
    width: 80%;
    max-width: 575px;
}

.start-section-title {
    position: relative;
    font-size: 90px;
    font-weight: bold;
    color: var(--website-text);
    width: fit-content;
}

.start-section-subtitle {
    width: fit-content;
    font-size: 19px;
    color: var(--website-text);
}
.start-section-subtitle a {
    text-decoration: underline;
}

.start-section-desc {
    width: fit-content;
    max-width: 700px;
    font-size: 22px;
    color: var(--website-text);
    text-align: left;
    margin-top: 20px;
}

.start-contacts {
    margin-top: 30px;
    width: 700px;
    height: 250px;
    border: 2px solid var(--website-text);
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.8);
}
.start-contacts-row {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}

.start-contacts-row.top {
    height: 125px;
}
.start-contacts-row.bottom {
    height: 125px;
}

.start-contacts-btn {
    cursor: pointer;
    text-decoration: none;
    color: var(--website-text);
    font-size: 18px;
    font-weight: bold;
    margin-top: 2px;
    padding: 10px;
    border-radius: 5px;
    border: 2px solid var(--website-text);
    transition: var(--default-transition);
}
.start-contacts-btn:hover {
    background-color: rgba(255, 255, 255, 0.1);
}
.start-contacts-btn svg {
    margin-right: 5px;
}

.start-contacts-mainBtn {
    padding: 15px;
    font-size: 24px;
}
.start-contacts-mainBtn svg {
    position: relative;
    bottom: 2px;
}

@media (max-width: 1225px) {
    .start-section {
        grid-template-columns: 1fr;
    }
    .start-section-half.headshot-side {
        display: none;
    }
}
@media (max-width: 775px) {
    .start-section {
        height: fit-content;
        min-height: 750px;
    }
    .start-contacts {
        height: 290px;
        width: 400px;
    }
    .start-contacts-row.bottom {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    .start-contacts-btn {
        position: relative;
        left: calc((100% - 153px) / 2);
        width: 135px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .start-contacts-mainBtn {
        left: 0;
        width: auto;
    }
}
@media (max-width: 600px) {
    .start-section-title {
        font-size: 60px;
    }
    .start-contacts {
        height: 450px;
        width: 315px;
    }

    .start-contacts-row.bottom {
        grid-template-columns: 1fr;
    }
    .start-contacts-btn {
        margin-bottom: 25px;
    }
    .start-contacts-mainBtn {
        margin-bottom: 0px;
    }
}
</style>