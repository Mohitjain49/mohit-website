<template>
<div id="experience"></div>
<div class="experience-section">
    <div class="experience-section-column">
        <div class="experience-section-title">My Experience</div>
        <div class="experience-section-desc">
            Since starting at iVue in 2023, I took resposibility for creating Worlds iVue, 
            building new versions of iVue's company websites, and more recently managing
            our use of AWS Services.
        </div>
        <div class="experience-section-routeBtn-container">
            <RouterLink to="/experience" class="experience-section-routeBtn"> Read More </RouterLink>
        </div>
    </div>

    <div class="experience-section-column">
        <div class="experience-phone">

        </div>
    </div>
</div>
</template>

<script setup>
import { WORLDS_IVUE_LINK, MAIN_IVUE_WEBSITE_LINK } from "@/stores/Objects.js";
import wivIcon from "@/assets/ivue/Worlds_iVue_Icon.png";
import ivueText from "@/assets/ivue/iVue_Black_Text.png";
import subloIcon from "@/assets/sublo/Sublo_Blue_Transparent.png";
</script>

<style scoped>
#experience {
    height: 50px;
    width: 100%;
    background: linear-gradient(to top, rgb(248, 206, 171) 0%, var(--blue-two) 100%);
}
.experience-section {
    height: var(--body-height);
    min-height: 700px;
    display: grid;
    grid-template-columns: 60% 40% ;
}

.experience-section-column {
    height: 100%;
    width: calc(100% - 30px);
    padding: 0px 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.experience-section-title {
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    font-size: 75px;
    width: fit-content;
    text-align: center;
}
.experience-section-desc {
    color: var(--website-text);
    font-family: 'Lexend', sans-serif;
    font-size: 22px;
    width: fit-content;
    max-width: 680px;
    text-align: center;
    padding: 5px 0px 10px 0px;
}

.experience-section-routeBtn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 75px;
    width: 100%;
}
.experience-section-routeBtn {
    width: fit-content;
    padding: 10px;
    font-size: 26px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--website-text);
    border: 2px solid var(--website-text);
    border-radius: 15px;
    transition: var(--default-transition);
}
.experience-section-routeBtn:hover {
    background-color: var(--dark-translucent-background);
}

.experience-phone {
    width: 375px;
    height: 700px;
    border: 2px solid #adadad;
    border-radius: 20px;
}

@media (max-width: 1175px) {
    .experience-section {
        grid-template-columns: 1fr;
        height: fit-content;
    }
    .experience-section-column {
        height: fit-content;
        padding: 20px 15px;
    }
    .experience-section-title {
        padding-top: 10px;
    }
}

@media (max-width: 600px) {
    .experience-section {
        min-height: 0px;
    }
    .experience-section-title {
        font-size: 55px;
    }
    .experience-section-desc {
        font-size: 17px;
    }
    .experience-phone {
        width: 325px;
        height: 600px;
    }
}
</style>