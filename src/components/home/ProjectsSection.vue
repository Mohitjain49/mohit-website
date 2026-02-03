<template>
<div id="projects" class="projects-section">
    <div class="projects-main-textContainer" ref="projectsText">
        <div class="projects-main-header">
            <RouterLink to="/projects/" title="Explore My Projects"> My Projects </RouterLink>
        </div>
        <div class="projects-main-desc">
            While my best work is with iVue's websites and applications, 
            I made a few personal projects over the years for various events and classes at College.
        </div>
    </div>

    <RouterLink class="projects-features-btn" to="/features" ref="featuresButton"
        title="Explore this Website's Unique Capabilities">

        <FontAwesomeIcon icon="fa-bolt-lightning" />
        <span> Website Features </span>
    </RouterLink>
    <div v-for="entity in PROJECT_ENTITIES" class="projects-note-container" ref="cardRefs">
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
const projectsText = ref(null);
const featuresButton = ref(null);
const cardRefs = ref([]);

useIntersectionObserver(projectsText, ([{ isIntersecting }]) => {
    setProjectsTransitions(isIntersecting);
});
useIntersectionObserver(featuresButton, ([observed])=> {
    addNoteCardAnimation(observed.target, observed.isIntersecting);
});
useIntersectionObserver(cardRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        addNoteCardAnimation(observed.target, observed.isIntersecting);
    }
})

/**
 * This removes all transitions from all cards and widgets should visitors scroll away from the projects section.
 * It adds transitions to the description text upon entry.
 */
function setProjectsTransitions(isVisible) {
    if(isVisible && window.innerWidth > 450) {
        document.getElementsByClassName('projects-main-header').item(0)?.classList.add("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('projects-main-desc').item(0)?.classList.add("animate__animated", "animate__lightSpeedInRight");
    } else if(!isVisible) {
        document.getElementsByClassName('projects-main-header').item(0)?.classList.remove("animate__animated", "animate__lightSpeedInLeft");
        document.getElementsByClassName('projects-main-desc').item(0)?.classList.remove("animate__animated", "animate__lightSpeedInRight");
    }
}
</script>

<style scoped>
.projects-section {
    background: transparent;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    height: fit-content;
    width: 1200px;
    padding: 80px calc(50% - 600px);
}
.projects-main-textContainer {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
}

.projects-main-header {
    height: fit-content;
    width: 100%;
    padding-top: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.projects-main-header a {
    height: fit-content;
    width: fit-content;
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

.projects-features-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 3px;
    grid-column: span 3;
    width: fit-content;
    margin: 10px auto 0px;
    padding: 10px 15px;
    font-size: 25px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    border: 2px solid var(--lightning-yellow);
    border-radius: 15px;
    background-color: var(--dark-background);
    color: var(--lightning-yellow);
    transition: var(--default-transition);
}
.projects-features-btn:hover {
    box-shadow: 0px 0px 20px var(--lightning-yellow);
}

@media (max-width: 1200px) {
    .projects-section {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 0px calc(50% - 400px);
        padding-bottom: 50px;
    }
    .projects-main-textContainer, .projects-features-btn {
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
    .projects-main-textContainer, .projects-features-btn {
        grid-column: span 1;
    }

    .projects-main-header a {
        font-size: 75px;
    }
    .projects-main-desc {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 0px;
        text-align: left;
    }
    .projects-features-btn {
        font-size: 17px;
    }
}

@media (max-width: 500px) {
    .projects-main-header a {
        font-size: 52px;
    }
}
</style>