import { createRouter, createWebHistory } from "vue-router";

import PersonalMain from "./pages/PersonalMain.vue";
import ContactPage from "./pages/ContactPage.vue";
import Resume from "./pages/Resume.vue";
import MyIcon from "./pages/MyIcon.vue";

import InvalidRoute from "./pages/InvalidRoute.vue";
import GlobeRedirect from "./pages/redirects/GlobeRedirect.vue";

import SkillsNav from "./pages/skills/SkillsNav.vue";
import FrontendSkills from "./pages/skills/FrontendSkills.vue";
import AWSSkills from "./pages/skills/AWSSkills.vue";

import ExperienceMain from "./pages/experience/ExperienceMain.vue";
import SubloMain from "./pages/experience/SubloMain.vue";

import CesiumModule from "./pages/skills/modules/CesiumModule.vue";
import MAVLinkModule from "./pages/skills/modules/MAVLinkModule.vue";

import IvueStart from "./pages/experience/ivue/IvueStart.vue";
import IvueWebsite from "./pages/experience/ivue/IvueWebsite.vue";
import IvueMediaWebsite from "./pages/experience/ivue/IvueMediaWebsite.vue";
import IvueRoboticsWebsite from "./pages/experience/ivue/IvueRoboticsWebsite.vue";
import WorldsIvue from "./pages/experience/ivue/WorldsIvue.vue";

const personalRoutes = [
    { path: "/", name: "Main Page", component: PersonalMain },
    { path: "/resume", name: "My Resume", component: Resume },
    { path: "/contact", alias: ['/contact-me'], name: "Contact Mohit", component: ContactPage },
    { path: "/icons", alias: ["/icon"], name: "Icon Page", component: MyIcon },

    { path: "/copyright", name: "Copyright Section", redirect: { path: "/", hash: "#copyright" } },
    { path: "/credits", name: "Credits Section", redirect: { path: "/", hash: "#skills" } },
    { path: "/updates", alias: ['/update'], redirect: { path: "/", hash: "#skills" } },

    { path: "/ivue", redirect: "/experience/ivue" },
    { path: "/sublo", redirect: "/experience/sublo" },
    { path: "/frontend", redirect: "/skills/frontend" },
    { path: "/aws", redirect: "/skills/aws" },

    { path: "/globe", name: "My Globe", component: GlobeRedirect },
    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },

    {
        path: "/skills",
        children: [
            { path: "", name: "Main Skills Page", component: SkillsNav },
            { path: "frontend", children: [
                { path: "", name: "Skills Frontend Page", component: FrontendSkills },
                // { path: ":id", name: "Skills Frontend Dynamic Page", component: FrontendSkills },
            ]},
            { path: "modules", children: [
                { path: "", redirect: "/skills/modules/cesium" },
                { path: "cesium", alias: ["cesiumjs"], name: "Cesium Module", component: CesiumModule },
                { path: "mavlink", alias: ["mavlink-protocol"], name: "MAVLink Module", component: MAVLinkModule }
            ]},
            { path: "aws", alias: ['amazon'], children: [
                { path: "", name: "Skills AWS Page", component: AWSSkills },
                // { path: ":id", name: "Skills AWS Dynamic Page", component: AWSSkills },
            ]},
        ]
    },
    {
        path: "/experience",
        children: [
            { path: "", name: "Main Experience Page", component: ExperienceMain },
            { path: "sublo", name: "Main Sublo Page", component: SubloMain },
            { path: "ivue", children: [
                { path: "", alias: ["main", "me", ""], name: "iVue Main Page", component: IvueStart },
                { path: "main-website", alias: ["website", "ivue-website", "web"], name: "Main iVue Website", component: IvueWebsite },
                { path: "ivuemedia", alias: ["media", "ivue-media"], name: "iVue Media Website", component: IvueMediaWebsite },
                { path: "ivuerobotics", alias: ["robotics", "ivue-robotics"], name: "iVue Robotics Website", component: IvueRoboticsWebsite },
                { path: "worldsivue", alias: ["wiv", "worlds-ivue"], name: "Worlds iVue Page", component: WorldsIvue },
            ]},
            { path: "worldsivue", redirect: "/experience/ivue/worldsivue" },
        ]
    },
];

const personalRouter = createRouter({
    history: createWebHistory(),
    routes: personalRoutes
});

export default personalRouter;