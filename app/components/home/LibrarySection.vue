<script setup>
const LIBRARY_TABS = [
    {
        id: "resume-tab",
        link: "/resume/",
        header: { faIcon: true, img: "fa-file-lines", size: 0, title: "My Resume" },
        desc: "I regularly update my resume as I learn more skills and gain more experience in software development. " +
            "Feel Free to take a look at it!"
    },
    {
        id: "documents-section-tab",
        link: "/library/#documents",
        header: { faIcon: true, img: "fa-folder-open", size: 0, title: "My Documents" },
        desc: "I have earned certificates, made an instruction guide, and even worked on a research paper through my University and iVue."
    },
    {
        id: "scripts-section-tab",
        link: "/library/#scripts",
        header: { faIcon: true, img: "fa-file-code", size: 0, title: "My Code" },
        desc: "I have developed special code for this website and many other projects and applications " +
            "that I have worked on for my college classes and iVue."
    },
]

const NUM_LIBRARY_TABS = LIBRARY_TABS.length;
const tabRefs = ref([]);
const libraryText = ref(null);

useIntersectionObserver(libraryText, ([{ isIntersecting }]) => {
    if(getMohitInnerWidth() < 450) { return; }
    setHomeTabAnimation(document.getElementById('library-section-title'), true, isIntersecting);
    setHomeTabAnimation(document.getElementById('library-section-desc'), true, isIntersecting);
});
useIntersectionObserver(tabRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        const observedChild = observed.target.firstElementChild;
        const observedIdIndex = LIBRARY_TABS.findIndex((item) => { return (observedChild.id === item.id); });
        setHomeTabAnimation(observedChild, (observedIdIndex % 2 == 1), observed.isIntersecting);
    }
});
</script>

<template>
<div id="library" class="library-section">
    <div class="library-section-mainText" ref="libraryText">
        <div id="library-section-title">
            <RouterLink to="/library/" title="See My Library" v-pulse-loop> My Library </RouterLink>
        </div>
        <p id="library-section-desc">
            I host a few documents and scripts on my website to showcase my expertise in software development and engineering. 
            Whether you are here to take a quick look or want to keep a copy for yourself, feel free to grab whatever helps you out!
        </p>
    </div>
    <div class="library-section-tabs-container">
        <div v-for="(docTab, index) in LIBRARY_TABS" class="library-section-tab-parent" :ref="(el) => {tabRefs[index] = el}">
            <RouterLink :to="docTab.link" :id="docTab.id" class="library-section-tab" v-pulse-loop>
                <div v-if="(docTab.header.title !== '')" class="library-section-tab-header">
                    <FontAwesomeIcon v-if="docTab.header.faIcon" :icon="docTab.header.img" />
                    <img v-else :src="docTab.header.img" :width="docTab.header.size" draggable="false" />
                    <span> {{ docTab.header.title }} </span>
                </div>

                <img v-else :src="docTab.header.img" :width="docTab.header.size" draggable="false" />
                <p> {{ docTab.desc }} </p>
            </RouterLink>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.library-section {
    background: transparent;
    height: fit-content;
    width: 100%;
    padding: 70px 0px;
}
.library-section-mainText {
    width: 100%;
    height: fit-content;
}

#library-section-desc {
    width: 90%;
    max-width: 1100px;
    height: fit-content;
    margin: 0px auto;
    margin-top: 15px;
    text-align: center;
    font-size: 16px;
    font-family: 'Lexend', 'sans-serif';
    color: var(--website-light-text);
    text-shadow: 1px 0px 20px var(--website-light-text);
    --animate-duration: 1.2s;
}
#library-section-title {
    width: 100%;
    height: 125px;
    padding-top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    --animate-duration: 1.2s;
    font-size: 95px;
    font-family: 'Lexend', sans-serif;
    font-weight: bold;
    color: var(--website-light-text);
    text-shadow: var(--website-light-text) 1px 0 30px;
}

.library-section-tab-parent {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
}
.library-section-tabs-container {
    width: 100%;
    height: calc(v-bind(NUM_LIBRARY_TABS) * 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.library-section-tab {
    cursor: pointer;
    width: 90%;
    max-width: 1100px;
    height: 145px;
    background-color: rgba(0, 0, 0, 0.9);
    border: 3px solid #005941;
    border-radius: 20px;
    transition: box-shadow 0.35s;
    color: #005941;
    display: flex;
    justify-content: space-evenly;
    align-items: flex-start;
    flex-direction: column;
    --animate-duration: 1.2s;
}
.library-section-tab:hover {
    box-shadow: 0px 0px 12px 12px #005941bb;
}

.library-section-tab-header {
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
.library-section-tab-header svg {
    position: relative;
    bottom: 1px;
    margin-right: 7px;
}

.library-section-tab img {
    padding-left: 15px;
    user-select: none;
}
.library-section-tab p {
    color: inherit;
    height: fit-content;
    width: calc(100% - 30px);
    padding: 0px 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    text-align: left;
}

.library-section-tab#resume-tab {
    color: var(--website-text);
    border-color: var(--website-text);
}
.library-section-tab#resume-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(126, 90, 0, 0.25);
}

.library-section-tab#documents-section-tab {
    color: var(--website-light-text);
    border-color: var(--website-light-text);
}
.library-section-tab#documents-section-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(126, 90, 0, 0.25);
}

.library-section-tab#scripts-section-tab {
    color: var(--script-page-main-color);
    border-color: var(--script-page-main-color);
}
.library-section-tab#scripts-section-tab:hover {
    box-shadow: 0px 0px 20px 5px var(--script-page-main-color);
}

@include dynamic-less-equal-width-rule(975) {
    .library-section-tab p { font-size: 17px; }
}
@include dynamic-less-equal-width-rule(825) {
    #library-section-desc { text-align: left; }
}
@include dynamic-less-equal-width-rule(600) {
    #library-section-title {
        height: 90px;
        font-size: 70px;
    }
    .library-section-tabs-container { height: calc(v-bind(NUM_LIBRARY_TABS) * 200px); }
    .library-section-tab { height: 150px; }
}
@include dynamic-less-equal-width-rule(500) {
    #library-section-title { font-size: 55px; }
    .library-section-tab { width: 87.5%; }

    .library-section-tab p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
    }
}
</style>