<template>
<div id="skills" class="skills-section" ref="skills">
    <div class="skills-main-header">
        <RouterLink to="/skills/" title="See My Skills"> My Skills </RouterLink>
    </div>
    <div class="skills-main-desc">
        Since 2021, I have successfully designed, developed, and deployed numerous websites, web applications, and projects 
        by utilizing multiple programming languages, frontend frameworks, web services, and modules.
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
const skills = ref(null);
const cardRefs = ref([]);

useIntersectionObserver(skills, ([{ isIntersecting }]) => {
    setSkillsTransitions(isIntersecting);
});
useIntersectionObserver(cardRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        addCardTransition(observed.target, observed.isIntersecting);
    }
})

/**
 * This removes all transitions from all cards and widgets should visitors scroll away from the skills section.
 * It adds transitions to the description text upon entry.
 */
function setSkillsTransitions(isVisible = false) {
    if(isVisible && window.innerWidth > 450) {
        document.getElementsByClassName('skills-main-header').item(0).classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('skills-main-desc').item(0).classList.add("animate__animated", "animate__lightSpeedInRight");
        return;
    } else if(!isVisible) {
        document.getElementsByClassName('skills-main-header').item(0).classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('skills-main-desc').item(0).classList.remove("animate__animated", "animate__lightSpeedInRight");
    }
}
</script>

<style scoped>
.skills-section {
    background: transparent;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    width: 1200px;
    padding: 80px calc(50% - 600px);
}

.skills-main-header {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
    padding-top: 50px;
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
    margin-bottom: 30px;
    grid-column: span 3;
    color: var(--blue-zero);
    text-align: center;
    line-height: 35px;
}
.skills-entity-container {
    height: 550px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 1200px) {
    .skills-section {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 0px calc(50% - 400px);
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 2;
    }
}

@media (max-width: 825px) {
    .skills-section {
        grid-template-columns: 1fr;
        width: calc(100% - 20px);
        padding: 0px 10px;
    }
    .skills-entity-container {
        min-width: 0px;
        height: 500px;
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 1;
    }

    .skills-main-header a {
        font-size: 75px;
    }
    .skills-main-desc {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 0px;
        text-align: left;
    }
}

@media (max-width: 370px) {
    .skills-main-header a {
        font-size: 68px;
    }
}
</style>