<template>
<NavigationMain />
<div id="credits" class="personal-web-body" @click="() => {webData.setNavBarDropdown(-1)}">
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
import { VUEJS_WEBSITE_LINK, MAIN_IVUE_WEBSITE_LINK } from "../stores/Objects.js";
import aws_icons_logo from "../assets/aws/AWS_Icons_Logo.svg";
import vuejs_icon from "../assets/Vuejs_Icon.png";
import cesium_icon from "../assets/Cesium_Globe_Icon.svg";
import ivue_text from "../assets/ivue/iVue_Black_Text.png";

import NavigationMain from '../components/NavigationMain.vue';
import { useWebsiteDataStore } from '../stores/WebsiteData.js';
import { onMounted } from 'vue';

const webData = useWebsiteDataStore();
onMounted(() => {
    document.title = "Mohit Jain | Credits";
    webData.mountWebData();
});

/**
 * This function returns a style object for an Font Awesome icon on here.
 * @param entity The object for the credits entity.
 */
function getFAIconStyle(entity) {
    return { color: entity.color, fontSize: entity.icon.size }
}

const CREDIT_ENTITIES = [
    {
        name: "Font Awesome",
        link: "https://fontawesome.com/",
        color: "rgb(83, 141, 215)",
        desc: "I have used free font awesome icons across this website. " +
            "There's a paper plane next to \"Contact Me\", file icons for my resume and the website's updates, " +
            "brand icons on the contact page, and many more icons across the website.",

        icon: {
            id: "fa-brands fa-font-awesome",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "AWS Icons",
        link: "https://aws-icons.com/",
        color: "#F59D0A",
        desc: "Amazon Web Services (AWS) has an entire website dedicated to their icons. " +
            "Nearly every AWS service and more has a specialized icon, " +
            "and I use these icons on the aws page and other places on my website.",

        icon: {
            id: aws_icons_logo,
            faIcon: false,
            width: "125"
        }
    },
    {
        name: "Vue.js",
        link: VUEJS_WEBSITE_LINK,
        color: "#41B883",
        desc: "I used Vue.js to develop this website, making it the main topic on one of this website's pages. " +
            "It's extremely lightweight compared to angular and react and simple for beginners. " +
            "My team and I at iVue have even developed iVue's company websites and Worlds iVue with this framework.",

        icon: {
            id: vuejs_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "AWS",
        link: "https://aws.amazon.com/",
        color: "#5468ff",
        desc: "With Amazon Web Services (AWS), I am able to deploy and enhance my website with a combination of services. " +
            "I use Amazon S3 to host this static website, Amazon CloudFront to deliver the website online, " +
            "and Amazon Route 53 to put this website under a custom domain.",

        icon: {
            id: "fa-brands fa-aws",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "Cesium",
        link: "https://cesium.com/",
        color: "#6DABE4",
        desc: "I used Cesium as the main geospatial service for my personal globe. " +
            "It's also used with Worlds iVue. Due to its extensive documentation on all its features, " +
            "Cesium isn't that complicated to learn and can perform a variety of tasks related to geospatial platforms.",

        icon: {
            id: cesium_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "GitHub",
        link: "https://github.com/",
        color: "black",
        desc: "I use GitHub as this website's version control. It's very reliable due to " +
            "its intuitive user interfaces on its website and desktop app and helpful CI/CD pipelines with GitHub Actions.",

        icon: {
            id: "fa-brands fa-github",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "iVue",
        link: MAIN_IVUE_WEBSITE_LINK,
        color: "black",
        desc: "Throughout my website, I use many of iVue's logos, icons, and screenshots of the company's websites " +
            "to outline my contributions to iVue and my experience with the company as a software developer.",

        icon: {
            id: ivue_text,
            faIcon: false,
            width: "155"
        }
    },
    {
        name: "Cloudflare",
        link: "https://www.cloudflare.com/",
        color: "#F58A27",
        desc: "Cloudflare has a free platform called Cloudflare Pages that simplifies deploying full-stack applications to the web. " +
            "It has a free version that I use to ensure that my web development projects run smoothly online.",

        icon: {
            id: "fa-brands fa-cloudflare",
            faIcon: true,
            size: "110px"
        }
    },
];
</script>

<style scoped>
.personal-web-body#credits {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    background: var(--webpage-static-background);
    width: 1200px;
    padding: 0px calc(50% - 600px);
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
    .personal-web-body#credits {
        grid-template-columns: repeat(4, 1fr);
        width: 1600px;
        padding: 0px calc(50% - 800px);
    }
}
@media (max-width: 1200px) {
    .personal-web-body#credits {
        grid-template-columns: repeat(2, 1fr);
        width: 800px;
        padding: 0px calc(50% - 400px);
    }
}
@media (max-width: 825px) {
    .personal-web-body#credits {
        grid-template-columns: repeat(1, 1fr);
        width: 400px;
        padding: 0px calc(50% - 200px);
    }
}

@media (max-width: 430px) {
    .personal-web-body#credits {
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