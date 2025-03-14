import PersonalMain from "./pages/PersonalMain.vue";
import ContactPage from "./pages/ContactPage.vue";
import Resume from "./pages/Resume.vue";
import MyIcon from "./pages/MyIcon.vue";
import QRCodePage from "./pages/QRCodePage.vue";
import CopyrightPage from "./pages/CopyrightPage.vue";

import InvalidRoute from "./pages/InvalidRoute.vue";
import GlobeRedirect from "./pages/redirects/GlobeRedirect.vue";
import GithubRedirect from "./pages/redirects/GithubRedirect.vue";
import GitlabRedirect from "./pages/redirects/GitlabRedirect.vue";
import LinkedinRedirect from "./pages/redirects/LinkedinRedirect.vue";
import DiscordRedirect from "./pages/redirects/DiscordRedirect.vue";

import SkillsNav from "./pages/skills/SkillsNav.vue";
import ExperienceMain from "./pages/experience/ExperienceMain.vue";
import VuejsPage from "./pages/skills/VuejsPage.vue";
import AmazonPage from "./pages/skills/AmazonPage.vue";

import IvueRedirect from "./pages/redirects/IvueRedirect.vue";
import SubloRedirect from "./pages/redirects/SubloRedirect.vue";
import WIVRedirect from "./pages/redirects/WIVRedirect.vue";

import ReactNativeFrontend from "./pages/skills/frontend/ReactNativeFrontend.vue";
import AngularFrontend from "./pages/skills/frontend/AngularFrontend.vue";

import CesiumModule from "./pages/skills/modules/CesiumModule.vue";
import MAVLinkModule from "./pages/skills/modules/MAVLinkModule.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]} The raw route records for the website.
 */
export const personalRoutes = [
    { path: "/", name: "Main Page", component: PersonalMain },
    { path: "/resume", name: "My Resume", component: Resume },
    { path: "/contact", alias: ['/contact-me'], name: "Contact Mohit", component: ContactPage },
    { path: "/icons", alias: ["/icon"], name: "Icon Page", component: MyIcon },
    { path: "/qrcode", name: "QR Code Page", component: QRCodePage },
    { path: "/copyright", name: "Copyright Page", component: CopyrightPage },

    { path: "/vuejs", name:  "Vue.js Skills Page", component: VuejsPage },
    { path: "/aws", name: "AWS Skills Page", component: AmazonPage },

    { path: "/credits", name: "Credits Section", redirect: { path: "/", hash: "#skills" } },
    { path: "/updates", alias: ['/update'], redirect: { path: "/", hash: "#skills" } },
    { path: "/ksu-edu", alias: ["/ksu", "/kennesaw-state"], redirect: { path: "/", hash: "#ksu" } },

    { path: "/globe", name: "My Globe", component: GlobeRedirect },
    { path: "/ivue", main: "Main iVue Redirect Page", component: IvueRedirect },
    { path: "/worldsivue", alias: ['/wiv', '/worlds-ivue'], main: "Main WIV Redirect Page", component: WIVRedirect },
    { path: "/github",  main: "Main GitHub Redirect Page", component: GithubRedirect },
    { path: "/gitlab",  main: "Main GitLab Redirect Page", component: GitlabRedirect },
    { path: "/linkedin",  main: "Main LinkedIn Redirect Page", component: LinkedinRedirect },
    { path: "/discord",  main: "Main Discord Redirect Page", component: DiscordRedirect },

    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },
    { path: "/qrcodes", alias: ["/qr"], redirect: "/qrcode" },

    { path: "/vue", redirect: "/vuejs" },
    { path: "/sublo", redirect: "/experience/sublo" },
    { path: "/frontend", redirect: "/skills/frontend" },
    { path: "/amazon", redirect: "/aws/" },

    {
        path: "/skills",
        children: [
            { path: "", name: "Main Skills Page", component: SkillsNav },
            { path: "frontend", children: [
                { path: "", redirect: "/skills/frontend/reactnative" },
                { path: "vuejs", alias: ['vue'], redirect: "/vuejs" },
                { path: "reactnative", alias: ['react'], name: "React Native Frontend", component: ReactNativeFrontend },
                { path: "angular", alias: ['angularjs'], name: "Angular Frontend", component: AngularFrontend },
            ]},
            { path: "modules", children: [
                { path: "", redirect: "/skills/modules/cesium" },
                { path: "cesium", alias: ["cesiumjs"], name: "Cesium Module", component: CesiumModule },
                { path: "mavlink", alias: ["mavlink-protocol"], name: "MAVLink Module", component: MAVLinkModule }
            ]},
            { path: "aws", alias: ["amazon"], redirect: "/aws" }
        ]
    },
    {
        path: "/experience",
        children: [
            { path: "", name: "Main Experience Page", component: ExperienceMain },
            { path: "sublo", name: "Sublo Redirect Page", component: SubloRedirect },
            { path: "ivue", main: "iVue Redirect Page", component: IvueRedirect },
            { path: "worldsivue", alias: ['wiv', 'worlds-ivue'], main: "WIV Redirect Page", component: WIVRedirect },
        ]
    },
];