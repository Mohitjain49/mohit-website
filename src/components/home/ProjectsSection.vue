<template>
<div id="projects" class="projects-section" v-observe-visibility="setProjectsTransitions">
    <div class="projects-main-header">My Projects</div>
    <div class="projects-main-desc">
        While my best work is with iVue's websites and applications, 
        I made a few personal projects over the years for various events and classes at College.
    </div>

    <div v-for="(entity, index) in PROJECT_ENTITIES" class="projects-note-container"
        v-observe-visibility="(isVisible) => addCardTransition(isVisible, index)">

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
/**
 * This adds a transition to a card/widget as visitors scroll to it.
 * @param {Number} index The index of the card.
 */
function addCardTransition(isVisible, index = 0) {
    if(!isVisible) { return; }
    let skillCard = document.getElementsByClassName("projects-note-container").item(index);
    skillCard.classList.add("animate__animated", ((window.innerWidth > 450) ? "animate__zoomIn" : "animate__fadeIn"));
}

/**
 * This removes all transitions from all cards and widgets should visitors scroll away from the projects section.
 * It adds transitions to the description text upon entry.
 */
function setProjectsTransitions(isVisible) {
    if(isVisible && window.innerWidth > 450) {
        document.getElementsByClassName('projects-main-header').item(0).classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('projects-main-desc').item(0).classList.add("animate__animated", "animate__lightSpeedInRight");
        return;
    } else if(!isVisible) {
        document.getElementsByClassName('projects-main-header').item(0).classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('projects-main-desc').item(0).classList.remove("animate__animated", "animate__lightSpeedInRight");

        const skillCards = document.getElementsByClassName("projects-note-container");
        for(let i = 0; i < skillCards.length; i++) {
            skillCards.item(i).classList.remove("animate__animated", "animate__zoomIn", "animate__fadeIn");
        }
    }
}
</script>

<style scoped>
.projects-section {
    background: transparent;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    min-height: calc(100% - var(--top-bar-height));
    width: 1200px;
    padding: 80px calc(50% - 600px);
}

.projects-main-header {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
    padding-top: 50px;
    text-align: center;
    font-size: 100px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--globe-green-opaque);
    text-shadow:
        -1px -1px 0 var(--silver-light), /* Top-left shadow */
        1px -1px 0 var(--silver-light),  /* Top-right shadow */
        -1px 1px 0 var(--silver-light),  /* Bottom-left shadow */
        1px 1px 0 var(--silver-light);   /* Bottom-right shadow */
}
.projects-main-desc {
    font-size: 27px;
    font-family: 'Lexend', 'sans-serif';
    width: calc(100% - 30px);
    height: fit-content;
    padding: 20px 15px;
    margin-bottom: 30px;
    grid-column: span 3;
    color: var(--globe-green-opaque);
    text-align: center;
    line-height: 35px;
}

.projects-note-container {
    height: 550px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 1200px) {
    .projects-section {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 0px calc(50% - 400px);
        padding-bottom: 50px;
    }
    .projects-main-header, .projects-main-desc {
        grid-column: span 2;
    }
}

@media (max-width: 825px) {
    .projects-section {
        grid-template-columns: 1fr;
        width: calc(100% - 20px);
        padding: 0px 10px;
        padding-bottom: 50px;
    }
    .projects-note-container {
        min-width: 0px;
        height: 500px;
    }
    .projects-main-header, .projects-main-desc {
        grid-column: span 1;
    }

    .projects-main-header {
        font-size: 75px;
    }
    .projects-main-desc {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 0px;
        text-align: left;
    }
}

@media (max-width: 500px) {
    .projects-main-header {
        font-size: 52px;
    }
}
</style>