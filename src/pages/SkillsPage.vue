<template>
<client-only>
    <vue-particles id="particlests" :options="BLUE_BACKGROUND"></vue-particles>
</client-only>
<NavigationSkills />

<main id="skills-page" class="personal-web-body">
    <client-only>
        <div class="skills-body">
            <div style="color: rgba(0, 0, 0, 0)">H</div>
            <div id="vuejs" class="skills-category">
                <div class="skills-category-header vue" v-observe-visibility="setTitleTransition">
                    <img :src="vuejs_icon" draggable="false" style="margin-right: 0px;" />
                    <span> ue.js </span>
                </div>

                <div v-for="entity in VUEJS_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </div>

            <div id="frontend" class="skills-category">
                <div class="skills-category-header frontend" v-observe-visibility="setTitleTransition">
                    <font-awesome-icon icon="fa-brands fa-js" />
                    <span> Frontend </span>
                </div>

                <div v-for="entity in FRONTEND_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </div>

            <div id="aws" class="skills-category">
                <div class="skills-category-header aws" v-observe-visibility="setTitleTransition">
                    <img :src="aws_icon" draggable="false" />
                    <span> AWS </span>
                </div>

                <div v-for="entity in AWS_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </div>

            <div id="modules" class="skills-category">
                <div class="skills-category-header modules" v-observe-visibility="setTitleTransition">
                    <font-awesome-icon icon="fa-brands fa-node-js" />
                    <span> Modules </span>
                </div>

                <div v-for="entity in MODULES_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </div>

            <div id="languages" class="skills-category">
                <div class="skills-category-header languages" v-observe-visibility="setTitleTransition">
                    <font-awesome-icon icon="fa-laptop-code" />
                    <span> Languages </span>
                </div>

                <div v-for="entity in LANGUAGES_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </div>

            <div id="icons" class="skills-category">
                <div class="skills-category-header icons" v-observe-visibility="setTitleTransition">
                    <font-awesome-icon icon="fa-brands fa-font-awesome" />
                    <span> Icons </span>
                </div>

                <div v-for="entity in ICONS_SKILL_NOTES"
                    class="skills-entity-container"
                    v-observe-visibility="setCardTransition">

                    <SkillNote :link="entity.link"
                        :color="entity.color"
                        :desc="entity.desc"
                        :faIcon="entity.icon.faIcon"
                        :id="entity.icon.id"
                        :name="entity.name"
                        :size="entity.icon.size"
                    />
                </div>
            </div>
        </div>
    </client-only>

    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" class="linkBtn-blue" v-html="'Back to Home'"
            @mouseenter="webData.setHeartbeatAnimation"
            @mouseleave="webData.setHeartbeatAnimation"
        />
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import "@/styles/navpage.css";
import vuejs_icon from "@/assets/Vuejs_Icon.png";
import aws_icon from "@/assets/aws/AWS_Icon.png";

const webData = useWebsiteDataStore();
const route = useRoute();

onMounted(() => {
    webData.mountWebData();
    if(route.hash.substring(1) == "") { return; }
    nextTick(() => { webData.goToPageSection(route.hash.substring(1)); });
});

useHead(getMeta("Mohit Jain | My Skills", "skills/",
    "Since 2021, I have successfully designed, developed, and deployed numerous websites, " +
    "web applications, and projects by utilizing multiple programming languages, " +
    "frontend frameworks, web services, and modules."
));

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 */
function setCardTransition(isVisible, entry) {
    if(!isVisible) { return; }
    entry.target.classList.add("animate__animated", ((window.innerWidth > 825) ? "animate__zoomIn" : "animate__fadeIn"));
    setTimeout(() => { entry.target.classList.remove("animate__animated", "animate__zoomIn", "animate__fadeIn"); }, 1000);
}

/**
 * This adds a transition to a title as visitors scroll to it.
 */
 function setTitleTransition(isVisible, entry) {
    if(!isVisible) { return; }
    entry.target.classList.add("animate__animated", "animate__flipInX");
    setTimeout(() => { entry.target.classList.remove("animate__animated", "animate__flipInX"); }, 1000);
}
</script>

<style scoped>
#skills-page {
    background: transparent;
    padding-top: 0px;
    min-height: 100%;
}
.skills-body {
    height: fit-content;
    min-height: 100vh;
    width: 100%;
}

.skills-category {
    height: fit-content;
    width: 1200px;
    padding: 0px calc(50% - 600px);
    padding-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
}
.skills-category#vuejs {
    padding-top: 60px;
}

.skills-entity-container {
    height: 475px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.skills-category-header {
    width: 375px;
    height: fit-content;
    margin-left: 10px;
    margin-top: 100px;
    padding: 5px 0px;
    font-size: 50px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    grid-column: span 3;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 1);
    border: 2px solid white;
    border-radius: 20px;
}
.skills-category-header img, .skills-category-header svg {
    width: 50px;
    font-size: 50px;
    user-select: none;
    margin-right: 3px;
}

.skills-category-header.vue {
    color: #41B883;
    margin-top: 20px;
}
.skills-category-header.aws {
    color: #5468ff;
}
.skills-category-header.modules {
    color: #5C9E57;
}
.skills-category-header.icons {
    color: rgb(83, 141, 215);
}
.skills-category-header.languages {
    color: #E34E26;
}
.skills-category-header.frontend {
    color: #D3B62A;
}

@media (max-width: 1200px) {
    .skills-category {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 0px calc(50% - 400px);
        padding-bottom: 40px;
    }
    .skills-category-header {
        grid-column: span 2;
    }
}

@media (max-width: 825px) {
    .skills-category {
        grid-template-columns: 1fr;
        width: calc(100% - 20px);
        padding: 0px 10px;
        padding-bottom: 40px;
    }
    .skills-category-header {
        grid-column: span 1;
        margin-left: 10px;
        position: relative;
        left: calc((100% - 400px) / 2);
    }
    .skills-entity-container {
        min-width: 0px;
    }
}

@media (max-width: 450px) {
    .skills-category-header {
        width: 325px;
        left: calc((100% - 325px) / 2);
        font-size: 45px;
        margin-left: 0px;
    }
    .skills-category-header img, .skills-category-header svg {
        font-size: 45px;
        width: 45px;
    }
}
</style>