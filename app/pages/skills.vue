<template>
<ParticlesBackground :particlesOptions="BLUE_BACKGROUND" />
<CompassMenu :routes="SKILLS_COMPASS" />
<CompassWidget :htmlClass="'blue'" />

<main id="skills-page" class="personal-web-body">
    <div class="skills-body">
        <client-only> <div style="color: rgba(0, 0, 0, 0)">H</div> </client-only>
        <div id="vuejs" class="skills-category">
            <div class="skills-category-header vue" :ref="(el) => {titleRefs[0] = el}">
                <img :src="vuejs_icon" draggable="false" style="margin-right: 0px;" />
                <span> ue.js </span>
            </div>

            <div v-for="entity in VUEJS_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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
            <div class="skills-category-header frontend" :ref="(el) => {titleRefs[1] = el}">
                <font-awesome-icon icon="fa-brands fa-js" />
                <span> Frontend </span>
            </div>

            <div v-for="entity in FRONTEND_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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
            <div class="skills-category-header aws" :ref="(el) => {titleRefs[2] = el}">
                <img :src="aws_icon" draggable="false" />
                <span> AWS </span>
            </div>

            <div v-for="entity in AWS_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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

        <div id="google" class="skills-category">
            <div class="skills-category-header google" :ref="(el) => {titleRefs[3] = el}">
                <font-awesome-icon icon="fa-brands fa-google" />
                <span> oogle </span>
            </div>

            <div v-for="entity in GOOGLE_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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
            <div class="skills-category-header modules" :ref="(el) => {titleRefs[4] = el}">
                <font-awesome-icon icon="fa-brands fa-node-js" />
                <span> Modules </span>
            </div>

            <div v-for="entity in MODULES_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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
            <div class="skills-category-header languages" :ref="(el) => {titleRefs[5] = el}">
                <font-awesome-icon icon="fa-laptop-code" />
                <span> Languages </span>
            </div>

            <div v-for="entity in LANGUAGES_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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
            <div class="skills-category-header icons" :ref="(el) => {titleRefs[6] = el}">
                <font-awesome-icon icon="fa-brands fa-font-awesome" />
                <span> Icons </span>
            </div>

            <div v-for="entity in ICONS_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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

    <div class="main-sector-bottom-linkBtn" style="padding-bottom: 30px;">
        <RouterLink to="/" class="linkBtn-blue" @pointerenter="setPulseLoopAnimation" @mouseleave="setPulseLoopAnimation">
            Back To Home
        </RouterLink>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import vuejs_icon from "~/assets/Vuejs_Icon.png";
import aws_icon from "~/assets/aws/AWS_Icon.png";

const titleRefs = ref([]);
const cardRefs = ref([]);

useIntersectionObserver(titleRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        setFlipInXAnimation(observed.target, observed.isIntersecting);
    }
});
useIntersectionObserver(cardRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        addNoteCardAnimation(observed.target, observed.isIntersecting);
    }
});

onMountedAdvanced(() => { initWebData(); });
useHead(getMeta("Mohit Jain | My Skills", "skills/",
    "Since 2021, I have successfully designed, developed, and deployed numerous websites, " +
    "web applications, and projects by utilizing multiple programming languages, " +
    "frontend frameworks, web services, and modules.",
    "#0047AB"
));
</script>

<style scoped lang="scss">
@use "~/styles/navpage";

#skills-page {
    background: transparent;
    padding-top: 0px;
    min-height: 100%;
}
.skills-body {
    height: fit-content;
    min-height: var(--true-100vh, 100vh);
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
.skills-category-header.google {
    color: #4c8bf5;
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

@include dynamic-less-equal-width-rule(1200) {
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

@include dynamic-less-equal-width-rule(825) {
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

@include dynamic-less-equal-width-rule(450) {
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