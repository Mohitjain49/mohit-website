<template>
<div id="skills" class="skills-section">
    <div class="skills-main-textContainer" ref="skillsText">
        <div class="skills-main-header">
            <RouterLink to="/skills/" title="See My Skills" pulse-loop> My Skills </RouterLink>
        </div>
        <div class="skills-main-desc"> {{ SKILLS_PAGE_DESC }} </div>
    </div>

    <div v-for="entity in NEW_SKILL_ENTITIES" class="skills-entity-container" ref="cardRefs">
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
</template>

<script setup>
const skillsText = ref(null);
const cardRefs = ref([]);

useIntersectionObserver(skillsText, ([{ isIntersecting }]) => {
    setSkillsTransitions(isIntersecting);
});
useIntersectionObserver(cardRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        addNoteCardAnimation(observed.target, observed.isIntersecting);
    }
})

/**
 * This removes all transitions from all cards and widgets should visitors scroll away from the skills section.
 * It adds transitions to the description text upon entry.
 */
function setSkillsTransitions(isVisible = false) {
    if(isVisible && getMohitInnerWidth() > 450) {
        document.getElementsByClassName('skills-main-header').item(0)?.classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('skills-main-desc').item(0)?.classList.add("animate__animated", "animate__lightSpeedInRight");
        return;
    } else if(!isVisible) {
        document.getElementsByClassName('skills-main-header').item(0)?.classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('skills-main-desc').item(0)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
    }
}
</script>

<style scoped lang="scss">
.skills-section {
    background: transparent;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    width: 1200px;
    padding: 70px calc(50% - 600px);
}
.skills-main-textContainer {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
}

.skills-main-header {
    height: fit-content;
    width: 100%;
    padding-top: 0px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.skills-main-header a {
    height: fit-content;
    width: fit-content;
    font-size: 100px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--blue-cobalt);
    text-shadow:
        -1px -1px 0 var(--blue-zero), /* Top-left shadow */
        1px -1px 0 var(--blue-zero),  /* Top-right shadow */
        -1px 1px 0 var(--blue-zero),  /* Bottom-left shadow */
        1px 1px 0 var(--blue-zero);   /* Bottom-right shadow */
}

.skills-main-desc {
    font-size: 27px;
    font-family: 'Lexend', 'sans-serif';
    width: calc(100% - 30px);
    height: fit-content;
    padding: 20px 15px;
    margin-bottom: 0px;
    color: var(--blue-zero);
    text-align: center;
    line-height: 35px;
}
.skills-entity-container {
    height: 500px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@include dynamic-less-equal-width-rule(1200) {
    .skills-section {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 70px calc(50% - 400px);
    }
    .skills-main-textContainer {
        grid-column: span 2;
    }
}

@include dynamic-less-equal-width-rule(825) {
    .skills-section {
        grid-template-columns: 1fr;
        width: calc(100% - 20px);
        padding: 70px 10px;
    }
    .skills-entity-container {
        min-width: 0px;
        height: 500px;
    }

    .skills-main-textContainer {
        grid-column: span 1;
        width: 400px;
        position: relative;
        left: calc(50% - 200px);
    }
    .skills-main-header a {
        font-size: 75px;
    }
    .skills-main-desc {
        width: 100%;
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 0px;
        text-align: left;
    }
}
@include dynamic-less-equal-width-rule(500) {
    .skills-main-textContainer {
        width: 330px;
        position: relative;
        left: calc(50% - 165px);
    }
    .skills-main-desc {
        width: 330px;
    }
}

@include dynamic-less-equal-width-rule(375) {
    .skills-main-header a { font-size: 68px; }
}
</style>