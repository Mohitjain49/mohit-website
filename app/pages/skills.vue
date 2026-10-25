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

// This defines the Page's SEO Tags.
useHead(getMeta("Mohit Jain | My Skills", "skills/", SKILLS_PAGE_DESC, "#0047AB"));
</script>

<template>
<ParticlesBackground :particlesOptions="BLUE_BACKGROUND" />
<CompassMenu :routes="SKILLS_COMPASS" />
<CompassWidget :htmlClass="'blue'" />

<main id="skills-page" class="personal-web-body">
    <div class="skills-body">
        <div id="vuejs" class="skills-category">
            <div class="skills-category-header vue" :ref="(el) => { titleRefs[0] = el; }">
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
            <div class="skills-category-header frontend" :ref="(el) => { titleRefs[1] = el; }">
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
            <div class="skills-category-header aws" :ref="(el) => { titleRefs[2] = el; }">
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
            <div class="skills-category-header google" :ref="(el) => { titleRefs[3] = el; }">
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

        <div id="platforms" class="skills-category">
            <div class="skills-category-header platforms" :ref="(el) => { titleRefs[4] = el; }">
                <font-awesome-icon icon="fa-code-compare" />
                <span> Platforms </span>
            </div>

            <div v-for="entity in PLATFORMS_SKILL_NOTES" class="skills-entity-container" ref="cardRefs">
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
            <div class="skills-category-header modules" :ref="(el) => { titleRefs[5] = el; }">
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
            <div class="skills-category-header languages" :ref="(el) => { titleRefs[6] = el; }">
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
            <div class="skills-category-header icons" :ref="(el) => { titleRefs[7] = el; }">
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
    <WebFooter />
</main>
</template>

<style lang="scss">
@use "~/styles/navpage";
</style>

<style scoped lang="scss">
#skills-page {
    background: transparent;
    padding-top: 0px;
    min-height: 100%;
    --skills-columns: min(5,
        round(down, calc((var(--true-100vw-safe) - 35px) / 400px))
    );
}
.skills-body {
    height: fit-content;
    min-height: var(--true-100vh-safe);
    width: 100%;
    margin-bottom: 40px;
}

.skills-category {
    height: fit-content;
    width: calc(var(--skills-columns) * 400px);
    margin: 0px auto;
    padding-bottom: 40px;
    display: grid;
    grid-template-columns: repeat(var(--skills-columns), 1fr);
}
.skills-category#vuejs {
    padding-top: 75px;
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
    width: get-bounded-fluid-width(375px, 315px, 450px);
    height: fit-content;
    margin-left: 10px;
    margin-top: 100px;
    padding: 5px 0px;
    font-size: 50px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    grid-column: span var(--skills-columns);
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 1);
    border: 2px solid white;
    border-radius: 20px;
    user-select: none;
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
.skills-category-header.platforms {
    color: #F58A27;
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

@include dynamic-less-equal-width-rule-scopedBlock(825) {
    .skills-category {
        grid-template-columns: 1fr;
        width: calc(100% - 20px);
        padding: 0px 10px;
        margin: 0px;
        padding-bottom: 40px;
    }
    .skills-category-header {
        grid-column: span 1;
        margin: 0px auto;
        margin-top: 100px;
    }

    .skills-category-header.vue { margin-top: 20px; }
    .skills-entity-container { min-width: 0px; }
}

@include dynamic-less-equal-width-rule-scopedBlock(450) {
    .skills-category-header {
        margin: 0px auto;
        margin-top: 100px;
        font-size: 45px;
    }
    .skills-category-header img, .skills-category-header svg {
        font-size: 45px;
        width: 45px;
    }
    .skills-category-header.vue {
        margin-top: 20px;
    }
}
</style>