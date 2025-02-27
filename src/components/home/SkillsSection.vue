<template>
<div id="skills" class="skills-section" v-observe-visibility="setSkillsTransitions">
    <div class="skills-main-header">My Skills</div>
    <div class="skills-main-desc">
        Since 2021, I have successfully designed, developed, and deployed numerous websites, web applications, and projects 
        by utilizing multiple programming languages, frontend frameworks, web services, and modules.
    </div>

    <div v-for="(entity, index) in SKILL_ENTITIES" class="skills-entity-container large"
        v-observe-visibility="(isVisible) => addCardTransition(isVisible, index)">

        <div v-if="entity.link === '#'" class="skills-entity no-link">
            <div class="skills-entity-image">
                <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
                <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
            </div>
            <div class="skills-entity-body" :style="{ color: entity.color }">
                <div class="skills-entity-header"> {{ entity.name }} </div>
                <div class="skills-entity-desc"> {{ entity.desc }} </div>
            </div>
        </div>
        
        <a v-else-if="entity.link !== '/skills'" :href="entity.link" target="_blank" class="skills-entity">
            <div class="skills-entity-image">
                <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
                <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
            </div>
            <div class="skills-entity-body" :style="{ color: entity.color }">
                <div class="skills-entity-header"> {{ entity.name }} </div>
                <div class="skills-entity-desc"> {{ entity.desc }} </div>
            </div>
        </a>

        <RouterLink v-else :to="entity.link" class="skills-entity">
            <div class="skills-entity-image">
                <font-awesome-icon :icon="entity.icon.id" class="skills-entity-moreInfo-icon" />
            </div>
            <div class="skills-entity-body more-info">
                <div class="skills-entity-header"> {{ entity.name }} </div>
                <div class="skills-entity-desc"> {{ entity.desc }} </div>
            </div>
        </RouterLink>
    </div>

    <div v-for="(entity, index) in SKILL_ENTITIES" class="skills-entity-container small"
        v-observe-visibility="(isVisible) => addCardTransition(isVisible, index)">

        <div v-if="entity.link === '#'" class="skills-widget no-link">
            <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
            <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
        </div>
        
        <a v-else-if="entity.link !== '/skills'" :href="entity.link" target="_blank" class="skills-widget">
            <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
            <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
        </a>

        <RouterLink v-else :to="entity.link" class="skills-widget">
            <font-awesome-icon :icon="entity.icon.id" class="skills-entity-moreInfo-icon"/>
        </RouterLink>
    </div>
</div>
</template>

<script setup>
import { SKILL_ENTITIES } from '@/stores/Objects.js';
import { RouterLink } from 'vue-router';

/**
 * This function returns a style object for an Font Awesome icon on here.
 * @param entity The object for the skills entity.
 */
function getFAIconStyle(entity) {
    return { color: entity.color, fontSize: entity.icon.size }
}

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 * @param {Number} index The index of the card.
 */
function addCardTransition(isVisible, index = 0) {
    if(!isVisible) { return; }
    const classNames = ("skills-entity-container " + ((window.innerWidth > 825) ? "large" : "small"));

    let skillCard = document.getElementsByClassName(classNames).item(index);
    skillCard.classList.add("animate__animated", "animate__zoomIn");
}

/**
 * This removes all transitions from all cards and widgets should visitors scroll away from the skills section.
 * It adds transitions to the description text upon entry.
 */
function setSkillsTransitions(isVisible) {
    if(isVisible && window.innerWidth > 375) {
        document.getElementsByClassName('skills-main-header').item(0).classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('skills-main-desc').item(0).classList.add("animate__animated", "animate__lightSpeedInRight");
        return;
    } else if(!isVisible) {
        document.getElementsByClassName('skills-main-header').item(0).classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('skills-main-desc').item(0).classList.remove("animate__animated", "animate__lightSpeedInRight");

        const skillCards = document.getElementsByClassName("skills-entity-container");
        for(let i = 0; i < skillCards.length; i++) {
            skillCards.item(i).classList.remove("animate__animated", "animate__zoomIn");
        }
    }
}
</script>

<style scoped>
.skills-section {
    background: transparent;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    min-height: calc(100% - var(--top-bar-height));
    width: 1200px;
    padding: 80px calc(50% - 600px);
}

.skills-main-header {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
    padding-top: 50px;
    text-align: center;
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
.skills-entity {
    height: 400px;
    width: 360px;
    border: 3px solid var(--website-light-text);
    border-radius: 20px;
    overflow: hidden;
    transition: var(--default-transition);
    background-color: white;
    box-shadow: 0px 0px 3px 3px rgba(255, 255, 255, 0.25);
    --animate-duration: 0.7s;
}

.skills-entity:hover {
    border-color: var(--website-text);
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.25);
}
.skills-entity.no-link {
    cursor: default;
}
.skills-entity-container.small {
    height: 225px;
    width: 100%;
    min-width: 0px;
    justify-content: center;
    align-items: center;
    display: none;
}

.skills-widget {
    height: 175px;
    width: 175px;
    border: 3px solid var(--website-light-text);
    border-radius: 25px;
    background-color: var(--silver-light);
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
    --animate-duration: 0.7s;
    transform: scale(0.75);
}
.skills-widget:hover {
    border-color: var(--website-text);
    box-shadow: 0px 0px 10px 10px rgba(255, 255, 255, 0.25);
}
.skills-widget.no-link {
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
.skills-entity-body.more-info {
    color: var(--website-light-text);
    transition: var(--default-transition);
}
.skills-entity:hover .skills-entity-body.more-info {
    color: var(--website-text);
}

.skills-entity-moreInfo-icon {
    color: var(--website-light-text);
    transition: var(--default-transition);
    font-size: 110px;
}
.skills-entity:hover .skills-entity-image .skills-entity-moreInfo-icon {
    color: var(--website-text);
}
.skills-widget:hover .skills-entity-moreInfo-icon {
    color: var(--website-text);
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
        grid-template-columns: repeat(3, 1fr);
        width: calc(100% - 20px);
        padding: 0px 10px;
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 3;
    }

    .skills-entity-container.large {
        display: none;
    }
    .skills-entity-container.small {
        display: flex;
    }

    .skills-main-header {
        font-size: 75px;
    }
    .skills-main-desc {
        font-size: 20px;
        line-height: 28px;
    }
}

@media (max-width: 550px) {
    .skills-main-header {
        font-size: 68px;
    }
    .skills-main-desc {
        font-size: 17px;
    }

    .skills-section {
        grid-template-columns: repeat(2, 1fr);
    }
    .skills-main-header, .skills-main-desc {
        grid-column: span 2;
    }
}
</style>