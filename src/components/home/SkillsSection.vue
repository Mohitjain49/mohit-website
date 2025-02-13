<template>
<div id="skills"></div>
<div class="skills-section" v-observe-visibility="removeCardTransitions">
    <div class="skills-main-header">My Skills</div>
    <div class="skills-main-desc">
        Since 2021, I have successfully designed, developed, and deployed numerous websites, web applications, and projects 
        by utilizing multiple programming languages, frontend frameworks, web services, and modules.
    </div>

    <div v-for="(entity, index) in SKILL_ENTITIES" class="skills-entity-container">
        <div v-if="entity.link === '#'" class="skills-entity no-link"
            v-observe-visibility="(isVisible) => addCardTransition(isVisible, index)">

            <div class="skills-entity-image">
                <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
                <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
            </div>
            <div class="skills-entity-body" :style="{ color: entity.color }">
                <div class="skills-entity-header"> {{ entity.name }} </div>
                <div class="skills-entity-desc"> {{ entity.desc }} </div>
            </div>
        </div>
        
        <a v-else :href="entity.link" target="_blank" class="skills-entity"
            v-observe-visibility="(isVisible) => addCardTransition(isVisible, index)">

            <div class="skills-entity-image">
                <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
                <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
            </div>
            <div class="skills-entity-body" :style="{ color: entity.color }">
                <div class="skills-entity-header"> {{ entity.name }} </div>
                <div class="skills-entity-desc"> {{ entity.desc }} </div>
            </div>
        </a>
    </div>
</div>
</template>

<script setup>
import { SKILL_ENTITIES } from '@/stores/Objects.js';

/**
 * This function returns a style object for an Font Awesome icon on here.
 * @param entity The object for the skills entity.
 */
function getFAIconStyle(entity) {
    return { color: entity.color, fontSize: entity.icon.size }
}

/**
 * This adds a transition to the card as visitors scroll to it.
 * @param {Number} index The index of the card.
 */
function addCardTransition(isVisible, index = 0) {
    let skillCard = document.getElementsByClassName("skills-entity").item(index);
    if(isVisible) { skillCard.classList.add("animate__animated", "animate__zoomIn"); }
}

/**
 * This removes all transitions from all card should visitors scroll away from the skills section.
 */
function removeCardTransitions(isVisible) {
    if(isVisible) { return; }
    const skillCards = document.getElementsByClassName("skills-entity");

    for(let i = 0; i < skillCards.length; i++) {
        skillCards.item(i).classList.remove("animate__animated", "animate__zoomIn");
    }
}
</script>

<style scoped>
#skills {
    height: 50px;
    width: 100%;
    background: linear-gradient(to bottom, rgb(248, 206, 171) 0%, var(--blue-zero) 100%);
}
.skills-section {
    background: var(--blue-zero);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    min-height: calc(100% - var(--top-bar-height));
    width: 1200px;
    padding: 0px calc(50% - 600px);
    padding-bottom: 20px !important;
}

.skills-main-header {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
    padding-top: 25px;
    text-align: center;
    font-size: 90px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--blue-cobalt);
}
.skills-main-desc {
    font-size: 22px;
    font-family: 'Lexend', 'sans-serif';
    width: calc(100% - 30px);
    height: fit-content;
    padding: 0px 15px;
    padding-top: 10px;
    grid-column: span 3;
    color: var(--blue-cobalt);
    text-align: center;
}

.skills-entity-container {
    height: 475px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.skills-entity {
    height: 400px;
    width: 360px;
    border: 3px solid var(--website-light-text);
    border-radius: 20px;
    overflow: hidden;
    transition: var(--default-transition);
    background-color: white;
    box-shadow: 0px 0px 3px 3px rgba(126, 90, 0, 0.25);
    --animate-duration: 0.6s;
    --animate-delay: 0.1s;
}

.skills-entity:hover {
    border-color: var(--website-text);
    box-shadow: 0px 0px 10px 10px rgba(126, 90, 0, 0.25);
}
.skills-entity.no-link {
    cursor: default;
}

.skills-entity-image {
    height: 147px;
    width: 100%;
    border-bottom: 3px solid var(--website-light-text);
    background-color: var(--silver-light);
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
}
.skills-entity:hover .skills-entity-image {
    border-color: var(--website-text);
}
.skills-entity-image svg, .skills-entity-image img {
    user-select: none;
}

.skills-entity-body {
    height: calc(100% - 160px);
    width: calc(100% - 20px);
    padding: 10px 10px 0px;
    text-align: left;
    font-family: 'Lexend', sans-serif;
}
.skills-entity-header {
    font-size: 35px;
    color: inherit;
    margin-bottom: 12px;
}
.skills-entity-desc {
    font-size: 16px;
    color: inherit;
}

@media (min-width: 1625px) {
    .skills-section {
        grid-template-columns: repeat(4, 1fr);
        width: 1600px;
        padding: 0px calc(50% - 800px);
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 4;
    }
}
@media (min-width: 2025px) {
    .skills-section {
        grid-template-columns: repeat(5, 1fr);
        width: 2000px;
        padding: 0px calc(50% - 1000px);
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 5;
    }
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
        grid-template-columns: repeat(1, 1fr);
        width: 400px;
        padding: 0px calc(50% - 200px);
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 1;
    }
}

@media (max-width: 430px) {
    .skills-section {
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
        padding: 0px;
    }
    .skills-main-header {
        font-size: 75px;
    }
    .skills-main-desc {
        font-size: 20px;
    }

    .skills-entity-container {
        min-width: 0px;
        height: 500px;
    }
    .skills-entity {
        height: 425px;
        width: 320px;
    }
}
</style>