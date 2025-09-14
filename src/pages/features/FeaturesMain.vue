<template>
<client-only>
    <vue-particles id="particlests" :options="FEATURES_BACKGROUND"></vue-particles>
</client-only>

<main id="features-page" class="personal-web-body">
    <div class="features-section">
        <div class="features-main-header">
            <h1> <FontAwesomeIcon icon="fa-bolt-lightning" /> Features </h1>
        </div>
        <div class="features-main-desc">
            I use this website as a way to test out a few code libraries and Web APIs. 
            Afterwards, I incorporate some these features into Worlds iVue and other websites I develop.
        </div>

        <div class="feature-notes">
            <motion.div v-for="entity in FEATURE_ENTITIES"
                class="features-note-container"
                @viewportEnter="setCardTransition">

                <SkillNote :link="entity.link"
                    :color="entity.color"
                    :desc="entity.desc"
                    :faIcon="entity.icon.faIcon"
                    :id="entity.icon.id"
                    :name="entity.name"
                    :size="entity.icon.size"
                />
            </motion.div>
        </div>
    </div>
    <WebFooter />
</main>
</template>

<script setup>
import { motion } from 'motion-v';

onMounted(() => {
    initWebData();
    nextTick(() => {
        if(window.innerWidth > 450) {
            document.getElementsByClassName('features-main-header').item(0).classList.add("animate__animated", "animate__lightSpeedInLeft");
            document.getElementsByClassName('features-main-desc').item(0).classList.add("animate__animated", "animate__lightSpeedInRight");
        }
    })
})

useHead(getMeta("Mohit Jain | Features", "features",
    "My website utilizes multiple code libraries and Web APIs to make unique features " +
        "such as gamepad support and compatibility, a barcode and qrcode reader, and a screen wake lock."
));

/**
 * This adds a transition to a card/widget as visitors scroll to it.
 */
function setCardTransition(entry) {
    entry.target.classList.add("animate__animated", ((window.innerWidth > 825) ? "animate__zoomIn" : "animate__fadeIn"));
    setTimeout(() => { entry.target.classList.remove("animate__animated", "animate__zoomIn", "animate__fadeIn"); }, 1000);
}
</script>

<style scoped>
.personal-web-body#features-page {
    background-color: rgba(0, 0, 0, 0.4);
}
.features-section {
    background: transparent;
    height: fit-content;
    min-height: var(--body-height);
    width: 1200px;
    padding: 0px calc(50% - 600px) 120px;
}
.feature-notes {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
}

.features-main-header {
    grid-column: span 3;
    height: fit-content;
    width: 100%;
    padding-top: 50px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
}
.features-main-header h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    height: fit-content;
    width: fit-content;
    font-size: 100px;
    font-family: 'Lexend', 'sans-serif';
    font-weight: bold;
    color: var(--lightning-yellow);
    text-shadow: 0px 0px 15px var(--lightning-yellow);
}

.features-main-desc {
    font-size: 27px;
    font-family: 'Lexend', 'sans-serif';
    width: calc(100% - 30px);
    height: fit-content;
    padding: 20px 15px;
    grid-column: span 3;
    color: var(--lightning-yellow);
    text-align: center;
    line-height: 35px;
}
.features-note-container {
    height: 500px;
    width: 100%;
    min-width: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
}

@media (max-width: 1200px) {
    .features-section {
        width: 800px;
        padding: 0px calc(50% - 400px);
        padding-bottom: 60px;
    }
    .features-main-header, .features-main-desc {
        grid-column: span 2;
    }
    .feature-notes {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (max-width: 825px) {
    .features-section {
        width: calc(100% - 20px);
        padding: 0px 10px;
        padding-bottom: 60px;
    }
    .features-note-container {
        min-width: 0px;
        height: 500px;
    }

    .feature-notes {
        grid-template-columns: 1fr;
    }
    .features-main-header, .features-main-desc {
        grid-column: span 1;
    }

    .features-main-header h1 {
        font-size: 75px;
    }
    .features-main-desc {
        font-size: 20px;
        line-height: 28px;
        margin-bottom: 0px;
        text-align: left;
    }
}

@media (max-width: 500px) {
    .features-main-header h1 {
        font-size: 52px;
    }
}
</style>