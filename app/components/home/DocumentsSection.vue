<script setup>
const DOCUMENT_TABS = [
    {
        id: "resume-tab",
        link: "/resume/",
        header: { faIcon: true, img: "fa-file-lines", size: 0, title: "My Resume" },
        desc: "I regularly update my resume as I learn more skills and gain more experience in software development. " +
            "Feel Free to take a look at it!"
    },
    {
        id: "research-paper-tab",
        link: GEN_AI_APPLICATIONS_PAPER_ROUTE,
        header: { faIcon: true, img: "fa-brain", size: 0, title: "AI Research Paper" },
        desc: "I regularly update my resume as I learn more skills and gain more experience in software development. " +
            "Feel Free to take a look at it!"
    },
    {
        id: "github-tab",
        link: "/create-github-repo/",
        header: { faIcon: true, img: "fa-brands fa-github", size: 0, title: "Create A Github Repo" },
        desc: "This is an instructions guide to how to create and clone a Repository with GitHub. " +
            "It'll walk anyone through creating an account with GitHub as well."
    }
]

const NUM_DOCUMENT_TABS = DOCUMENT_TABS.length;
const tabRefs = ref([]);
const documentsText = ref(null);

useIntersectionObserver(documentsText, ([{ isIntersecting }]) => {
    if(getMohitInnerWidth() < 450) { return; }
    setHomeTabAnimation(document.getElementById('documents-section-title'), true, isIntersecting);
    setHomeTabAnimation(document.getElementById('documents-section-desc'), true, isIntersecting);
});
useIntersectionObserver(tabRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        const observedChild = observed.target.firstElementChild;
        const observedIdIndex = DOCUMENT_TABS.findIndex((item) => { return (observedChild.id === item.id); });
        setHomeTabAnimation(observedChild, (observedIdIndex % 2 == 1), observed.isIntersecting);
    }
});
</script>

<template>
<div id="documents" class="documents-section">
    <div class="documents-section-mainText" ref="documentsText">
        <div id="documents-section-title"> My Docs </div>
        <p id="documents-section-desc">
            These are a few documents I have put together that help showcase my professional expertise. 
            Whether you are here to take a quick look or want to keep a copy for yourself, feel free to grab whatever helps you out!
        </p>
    </div>
    <div class="documents-section-tabs-container">
        <div v-for="(docTab, index) in DOCUMENT_TABS" class="documents-section-tab-parent" :ref="(el) => {tabRefs[index] = el}">
            <RouterLink :to="docTab.link" :id="docTab.id" class="documents-section-tab" pulse-loop>
                <div v-if="(docTab.header.title !== '')" class="documents-section-tab-header">
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
.documents-section {
    background: transparent;
    height: fit-content;
    min-height: var(--true-100vh, 100vh);
    width: 100%;
    scroll-margin-top: apply-zoom-factor(70);
    padding-bottom: 70px;
}
.documents-section-mainText {
    width: 100%;
    height: fit-content;
}

#documents-section-desc {
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
#documents-section-title {
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

.documents-section-tab-parent {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
}
.documents-section-tabs-container {
    width: 100%;
    height: calc(v-bind(NUM_DOCUMENT_TABS) * 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.documents-section-tab {
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
.documents-section-tab:hover {
    box-shadow: 0px 0px 12px 12px #005941bb;
}

.documents-section-tab-header {
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
.documents-section-tab-header svg {
    position: relative;
    bottom: 1px;
    margin-right: 7px;
}

.documents-section-tab img {
    padding-left: 15px;
    user-select: none;
}
.documents-section-tab p {
    color: inherit;
    height: fit-content;
    width: calc(100% - 30px);
    padding: 0px 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    text-align: left;
}

.documents-section-tab#resume-tab {
    color: var(--website-text);
    border-color: var(--website-text);
}
.documents-section-tab#resume-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(126, 90, 0, 0.25);
}

.documents-section-tab#research-paper-tab {
    color: #FEC52E;
    border-color: #FEC52E;
}
.documents-section-tab#research-paper-tab:hover {
    box-shadow: 0px 0px 20px 5px #FEC52E;
}

.documents-section-tab#github-tab {
    color: white;
    border-color: white;
}
.documents-section-tab#github-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(211, 211, 211, 0.25);
}

@include dynamic-less-equal-width-rule(975) {
    .documents-section-tab p {
        font-size: 17px;
    }
}
@include dynamic-less-equal-width-rule(825) {
    #documents-section-desc { text-align: left; }
}
@include dynamic-less-equal-width-rule(600) {
    #documents-section-title {
        height: 90px;
        font-size: 80px;
    }
    .documents-section-tabs-container { height: calc(v-bind(NUM_DOCUMENT_TABS) * 200px); }
    .documents-section-tab { height: 150px; }
}
@include dynamic-less-equal-width-rule(500) {
    #documents-section-title { font-size: 70px; }
    #github-tab .documents-section-tab-header { font-size: 22px; }
    #research-paper-tab .documents-section-tab-header { font-size: 22px; }
    .documents-section-tab { width: 87.5%; }

    .documents-section-tab p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
    }
}
</style>