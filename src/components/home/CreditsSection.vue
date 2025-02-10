<template>
<div id="credits"></div>
<div class="credits-section">
    <div class="credits-main-header">Credits</div>
    <div class="credits-main-desc">
        I use many libraries and web services to add onto my website's visual appeal and overall functionality.
    </div>

    <div v-for="entity in CREDIT_ENTITIES" class="credits-entity-container">
        <a :href="entity.link" target="_blank" class="credits-entity">
            <div class="credits-entity-image">
                <font-awesome-icon v-if="entity.icon.faIcon" :icon="entity.icon.id" :style="getFAIconStyle(entity)" />
                <img v-if="!entity.icon.faIcon" :src="entity.icon.id" :width="entity.icon.width" draggable="false" />
            </div>
            <div class="credits-entity-body" :style="{ color: entity.color }">
                <div class="credits-entity-header"> {{ entity.name }} </div>
                <div class="credits-entity-desc"> {{ entity.desc }} </div>
            </div>
        </a>
    </div>
</div>
</template>

<script setup>
import { CREDIT_ENTITIES } from '@/stores/Objects.js';

/**
 * This function returns a style object for an Font Awesome icon on here.
 * @param entity The object for the credits entity.
 */
function getFAIconStyle(entity) {
    return { color: entity.color, fontSize: entity.icon.size }
}
</script>

<style scoped>
#credits {
    height: 50px;
    width: 100%;
    background: linear-gradient(to bottom, rgb(248, 206, 171) 0%, var(--blue-zero) 100%);
}
.credits-section {
    background: var(--blue-zero);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 1200px;
    padding: 0px calc(50% - 600px);
}

.credits-main-header {
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
.credits-main-desc {
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

.credits-entity-container {
    height: 475px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.credits-entity {
    height: 400px;
    width: 360px;
    border: 3px solid var(--website-light-text);
    border-radius: 20px;
    overflow: hidden;
    transition: var(--default-transition);
    background-color: white;
}
.credits-entity:hover {
    border-color: var(--website-text);
}

.credits-entity-image {
    height: 147px;
    width: 100%;
    border-bottom: 3px solid var(--website-light-text);
    background-color: var(--silver-light);
    transition: var(--default-transition);
    display: flex;
    justify-content: center;
    align-items: center;
}
.credits-entity:hover .credits-entity-image {
    border-color: var(--website-text);
}
.credits-entity-image svg, .credits-entity-image img {
    user-select: none;
}

.credits-entity-body {
    height: calc(100% - 160px);
    width: calc(100% - 20px);
    padding: 10px 10px 0px;
    text-align: left;
    font-family: 'Lexend', sans-serif;
}
.credits-entity-header {
    font-size: 35px;
    color: inherit;
    margin-bottom: 12px;
}
.credits-entity-desc {
    font-size: 16px;
    color: inherit;
}

@media (min-width: 1625px) {
    .credits-section {
        grid-template-columns: repeat(4, 1fr);
        width: 1600px;
        padding: 0px calc(50% - 800px);
    }
    .credits-main-header, .credits-main-desc {
        grid-column: span 4;
    }
}

@media (max-width: 1200px) {
    .credits-section {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 0px calc(50% - 400px);
    }
    .credits-main-header, .credits-main-desc {
        grid-column: span 2;
    }
}

@media (max-width: 825px) {
    .credits-section {
        grid-template-columns: repeat(1, 1fr);
        width: 400px;
        padding: 0px calc(50% - 200px);
    }
    .credits-main-header, .credits-main-desc {
        grid-column: span 1;
    }
}

@media (max-width: 430px) {
    .credits-section {
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
        padding: 0px;
    }

    .credits-entity-container {
        min-width: 0px;
        height: 500px;
    }
    .credits-entity {
        height: 425px;
        width: 320px;
    }
}
</style>