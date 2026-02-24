<script setup>
import fcs_logo from "@/assets/Fulton_County_Schools_Logo.png";
const TAB_IDS = ["resume-tab", "deploy-script-tab", "github-tab", "fcs-certificate-tab"];

const tabRefs = ref([]);
const documentsText = ref(null);

useIntersectionObserver(documentsText, ([{ isIntersecting }]) => {
    setHomeTabAnimation(document.getElementById('documents-section-title'), true, isIntersecting);
    setHomeTabAnimation(document.getElementById('documents-section-desc'), true, isIntersecting);
});
useIntersectionObserver(tabRefs, (entry) => {
    for(let i = 0; i < entry.length; i++) {
        const observed = entry[i];
        const observedChild = observed.target.firstElementChild;
        const observedIdIndex = TAB_IDS.findIndex((item) => { return (observedChild.id === item); });
        setHomeTabAnimation(observedChild, (observedIdIndex % 2 == 1), observed.isIntersecting);
    }
});
</script>

<template>
<div id="documents" class="documents-section">
    <div class="documents-section-mainText" ref="documentsText">
        <div id="documents-section-title"> My Docs </div>
        <p id="documents-section-desc">
            These are a few documents and scripts I have put together that help showcase my professional expertise. 
            Whether you are here to take a quick look or want to keep a copy for yourself, feel free to grab whatever helps you out!
        </p>
    </div>
    <div class="documents-section-tabs-container">
        <div class="documents-section-tab-parent" :ref="(el) => {tabRefs[0] = el}">
            <RouterLink to="/resume" id="resume-tab" class="documents-section-tab">
                <div class="documents-section-tab-header">
                    <font-awesome-icon icon="fa-file-lines" />
                    <span> My Resume </span>
                </div>
                <p>
                    I regularly update my resume as I learn more skills and gain more experience in software development. 
                    Feel Free to take a look at it!
                </p>
            </RouterLink>
        </div>
        <div class="documents-section-tab-parent" :ref="(el) => {tabRefs[1] = el}">
            <RouterLink to="/aws-deploy-script" id="deploy-script-tab" class="documents-section-tab">
                <div class="documents-section-tab-header">
                    <font-awesome-icon icon="fa-upload" />
                    <span> Deploy Script </span>
                </div>
                <p>
                    I made a custom script for deploying my website and other projects of mine to Amazon Web Services. 
                    It's made with Node.js and uses a few dependencies, but it is highly customizable.
                </p>
            </RouterLink>
        </div>
        <div class="documents-section-tab-parent" :ref="(el) => {tabRefs[2] = el}">
            <RouterLink to="/create-github-repo/" id="github-tab" class="documents-section-tab">
                <div class="documents-section-tab-header">
                    <font-awesome-icon icon="fa-brands fa-github" />
                    <span> Create A GitHub Repo </span>
                </div>
                <p>
                    This is an instructions guide to how to create and clone a Repository with GitHub. 
                    It'll walk anyone through creating an account with GitHub as well.
                </p>
            </RouterLink>
        </div>
        <div class="documents-section-tab-parent" :ref="(el) => {tabRefs[3] = el}">
            <RouterLink :to="FCS_CERTIFICATE_ROUTE" id="fcs-certificate-tab" class="documents-section-tab">
                <img :src="fcs_logo" width="110" draggable="false" />
                <p>
                    iVue takes in a few interns through the Fulton County Schools Internship Program. 
                    We teach website design and development skills to these interns via interactive learning. 
                </p>
            </RouterLink>
        </div>
    </div>
</div>
</template>

<style scoped>
.documents-section {
    background: transparent;
    height: fit-content;
    min-height: 400px;
    width: 100%;
    padding: 100px 0px;
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
    padding-top: 20px;
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
    height: 800px;
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

.documents-section-tab#deploy-script-tab {
    color: rgb(161, 100, 255);
    border-color: rgb(161, 100, 255);
}
.documents-section-tab#deploy-script-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(161, 100, 255, 0.5);
}

.documents-section-tab#sitemap-tab {
    color: lightgrey;
    border-color: lightgray;
}
.documents-section-tab#sitemap-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(211, 211, 211, 0.25);
}

.documents-section-tab#github-tab {
    color: white;
    border-color: white;
}
.documents-section-tab#github-tab:hover {
    box-shadow: 0px 0px 12px 12px rgba(211, 211, 211, 0.25);
}

@media (max-width: 975px) {
    .documents-section-tab p {
        font-size: 17px;
    }
}
@media (max-width: 600px) {
    #documents-section-title {
        font-size: 80px;
    }
    .documents-section-tabs-container {
        height: 800px;
    }
    .documents-section-tab {
        height: 150px;
    }
}
@media (max-width: 500px) {
    #documents-section-title {
        font-size: 70px;
    }
    #github-tab .documents-section-tab-header {
        font-size: 22px;
    }

    .documents-section-tab {
        width: 87.5%;
    }
    .documents-section-tab p {
        width: calc(100% - 20px);
        padding: 0px 10px;
        font-size: 14px;
    }
}
</style>