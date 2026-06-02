<script setup>
import c_programming_icon from "~/assets/C_Programming_Icon.svg";

const SCRIPTS_TABS = [
    {
        id: "deploy-script-tab",
        link: "/aws-deploy-script/",
        header: { faIcon: true, img: "fa-upload", size: 0, title: "Deploy Script" },
        desc: "I made a custom script for deploying my website and other projects of mine to Amazon Web Services. " +
            "It's made with Node.js and uses a few dependencies, but it is highly customizable."
    },
    {
        id: "upgrade-script-tab",
        link: "/upgrade-script/",
        header: { faIcon: true, img: "fa-wrench", size: 0, title: "Upgrade Script" },
        desc: "I made a custom script for deploying my website and other projects of mine to Amazon Web Services. " +
            "It's made with Node.js and uses a few dependencies, but it is highly customizable."
    },
    {
        id: "unix-shell-tab",
        link: "/unix-shell/",
        header: { faIcon: false, img: c_programming_icon, size: 35, title: "My Unix Shell" },
        desc: "I created a simple Unix Shell using the C programming language. " +
            "It will run on any Unix-based Operating System (or WSL for Windows). " +
            "You can view it by clicking here."
    },
    {
        id: "threadpool-tab",
        link: "/threadpool/",
        header: { faIcon: false, img: c_programming_icon, size: 35, title: "Thread Pool" },
        desc: "I implemented a functioning Thread Pool the C programming language. " +
            "It will run on any Unix-based Operating System (or WSL for Windows). " +
            "You can view it by clicking here."
    },
    {
        id: "gamepad-tab",
        link: "/gamepad/#scripts",
        header: { faIcon: true, img: "fa-gamepad", size: 0, title: "Web Gamepad Code" },
        desc: "This website uses the Web Gamepad API to allow visitors to navigate through its pages " +
            "using any standard gaming controller. You can view the code for this controller by clicking here."
    }
]

const NUM_SCRIPTS_TABS = SCRIPTS_TABS.length;
const tabRefs = ref([]);
const scriptsText = ref(null);

useIntersectionObserver(scriptsText, ([{ isIntersecting }]) => {
    if(getMohitInnerWidth() < 450) { return; }
    setHomeTabAnimation(document.getElementById('scripts-section-title'), true, isIntersecting);
    setHomeTabAnimation(document.getElementById('scripts-section-desc'), true, isIntersecting);
});
useIntersectionObserver(tabRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        const observedChild = observed.target.firstElementChild;
        const observedIdIndex = SCRIPTS_TABS.findIndex((item) => { return (observedChild.id === item.id); });
        setHomeTabAnimation(observedChild, (observedIdIndex % 2 == 1), observed.isIntersecting);
    }
});
</script>

<template>
<div id="scripts" class="scripts-section">
    <div class="scripts-section-mainText" ref="scriptsText">
        <div id="scripts-section-title"> My Code </div>
        <p id="scripts-section-desc">
            These are a few files of code I have put together that help showcase my professional expertise. 
            Whether you are here to take a quick look or want to keep a copy for yourself, feel free to grab whatever helps you out!
        </p>
    </div>
    <div class="scripts-section-tabs-container">
        <div v-for="(docTab, index) in SCRIPTS_TABS" class="scripts-section-tab-parent" :ref="(el) => {tabRefs[index] = el}">
            <RouterLink :to="docTab.link" :id="docTab.id" class="scripts-section-tab" pulse-loop>
                <div v-if="(docTab.header.title !== '')" class="scripts-section-tab-header">
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
.scripts-section {
    background: transparent;
    height: fit-content;
    min-height: var(--true-100vh, 100vh);
    width: 100%;
    padding: 70px 0px;
}
.scripts-section-mainText {
    width: 100%;
    height: fit-content;
}

#scripts-section-desc {
    width: 90%;
    max-width: 1100px;
    height: fit-content;
    margin: 0px auto;
    margin-top: 15px;
    text-align: center;
    font-size: 16px;
    font-family: 'Lexend', 'sans-serif';
    color: var(--script-page-main-color);
    text-shadow: 1px 0px 20px var(--script-page-main-color);
    --animate-duration: 1.2s;
}
#scripts-section-title {
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
    color: var(--script-page-main-color);
    text-shadow: var(--script-page-main-color) 1px 0 30px;
}

.scripts-section-tab-parent {
    width: 100%;
    height: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
}
.scripts-section-tabs-container {
    width: 100%;
    height: calc(v-bind(NUM_SCRIPTS_TABS) * 200px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
}

.scripts-section-tab {
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
.scripts-section-tab:hover {
    box-shadow: 0px 0px 12px 12px #005941bb;
}

.scripts-section-tab-header {
    padding-left: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: inherit;
    font-size: 28px;
    font-family: 'Montserrat', sans-serif;
    font-weight: bold;
}
.scripts-section-tab-header svg {
    position: relative;
    bottom: 1px;
    margin-right: 7px;
}

.scripts-section-tab img {
    padding-left: 15px;
    user-select: none;
}
.scripts-section-tab p {
    color: inherit;
    height: fit-content;
    width: calc(100% - 30px);
    padding: 0px 15px;
    font-family: 'Roboto', sans-serif;
    font-size: 22px;
    text-align: left;
}

.scripts-section-tab#deploy-script-tab {
    color: rgb(161, 100, 255);
    border-color: rgb(161, 100, 255);
}
.scripts-section-tab#deploy-script-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(161, 100, 255, 0.5);
}

.scripts-section-tab#upgrade-script-tab {
    color: #CB3837;
    border-color: #CB3837;
}
.scripts-section-tab#upgrade-script-tab:hover {
    box-shadow: 0px 0px 20px 5px #CB3837;
}

.scripts-section-tab#unix-shell-tab {
    color: #A9BACD;
    border-color: #A9BACD;
}
.scripts-section-tab#unix-shell-tab img {
    padding-left: 0px !important;
    margin-right: 10px;
}
.scripts-section-tab#unix-shell-tab:hover {
    box-shadow: 0px 0px 12px 12px #a9bacd79;
}

.scripts-section-tab#threadpool-tab {
    color: #A9BACD;
    border-color: #A9BACD;
}
.scripts-section-tab#threadpool-tab img {
    padding-left: 0px !important;
    margin-right: 10px;
}
.scripts-section-tab#threadpool-tab:hover {
    box-shadow: 0px 0px 12px 12px #a9bacd79;
}

.scripts-section-tab#gamepad-tab {
    color: var(--website-light-text);
    border-color: var(--website-light-text);
}
.scripts-section-tab#gamepad-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(126, 90, 0, 0.25);
}

@include dynamic-less-equal-width-rule(975) {
    .scripts-section-tab p { font-size: 17px; }
}
@include dynamic-less-equal-width-rule(825) {
    #scripts-section-desc { text-align: left; }
}
@include dynamic-less-equal-width-rule(600) {
    #scripts-section-title {
        height: 90px;
        font-size: 80px;
    }
    .scripts-section-tabs-container { height: calc(v-bind(NUM_SCRIPTS_TABS) * 200px); }
    .scripts-section-tab { height: 150px; }
}
@include dynamic-less-equal-width-rule(500) {
    #scripts-section-title { font-size: 70px; }
    #gamepad-tab .scripts-section-tab-header { font-size: 22px; }
    .scripts-section-tab { width: 87.5%; }

    .scripts-section-tab p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
    }
}
</style>