<template>
<ParticlesBackground :particlesOptions="FEATURES_BACKGROUND" />

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
            <div v-for="entity in FEATURE_ENTITIES" class="features-note-container" ref="cardRefs">
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

<script setup>
const cardRefs = ref([]);
useIntersectionObserver(cardRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        addNoteCardAnimation(observed.target, observed.isIntersecting);
    }
});

onMountedAdvanced(async() => {
    initWebData();
    await nextTick();

    if(getMohitInnerWidth() <= 450) { return; }
    const elements = [
        document.getElementsByClassName('features-main-header').item(0),
        document.getElementsByClassName('features-main-desc').item(0)
    ];

    for(let i = 0; i < elements.length; i++) {
        const item = elements[i];
        if(item && (typeof item.classList !== "undefined") && (item.classList instanceof DOMTokenList)) {
            item.classList.add("animate__animated", ("animate__lightSpeedIn" + ((i % 2 == 0) ? "Left" : "Right")))
        }
    }
})

useHead(getMeta("Mohit Jain | Features", "features",
    "My website utilizes multiple code libraries and Web APIs to make unique features " +
        "such as gamepad support and compatibility, a barcode and qrcode reader, and a screen wake lock."
));
</script>

<style scoped lang="scss">
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

@include dynamic-less-equal-width-rule(1200) {
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

@include dynamic-less-equal-width-rule(825) {
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

@include dynamic-less-equal-width-rule(500) {
    .features-main-header h1 {
        font-size: 52px;
    }
}
</style>