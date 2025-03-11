import PersonalMain from "./pages/PersonalMain.vue";
import ContactPage from "./pages/ContactPage.vue";
import Resume from "./pages/Resume.vue";
import MyIcon from "./pages/MyIcon.vue";
import QRCodePage from "./pages/QRCodePage.vue";

import InvalidRoute from "./pages/InvalidRoute.vue";
import GlobeRedirect from "./pages/redirects/GlobeRedirect.vue";
import GithubRedirect from "./pages/redirects/GithubRedirect.vue";
import LinkedinRedirect from "./pages/redirects/LinkedinRedirect.vue";
import DiscordRedirect from "./pages/redirects/DiscordRedirect.vue";

import SkillsNav from "./pages/skills/SkillsNav.vue";
import ExperienceMain from "./pages/experience/ExperienceMain.vue";
import VuejsPage from "./pages/skills/VuejsPage.vue";
import AmazonPage from "./pages/skills/AmazonPage.vue";

import IvueRedirect from "./pages/redirects/IvueRedirect.vue";
import SubloRedirect from "./pages/redirects/SubloRedirect.vue";
import WIVRedirect from "./pages/redirects/WIVRedirect.vue";

import AmazonMain from "./pages/skills/amazon/AmazonMain.vue";
import AmazonAmplify from "./pages/skills/amazon/AmazonAmplify.vue";
import AmazonCognito from "./pages/skills/amazon/AmazonCognito.vue";
import AmazonS3 from "./pages/skills/amazon/AmazonS3.vue";
import AmazonWorkmail from "./pages/skills/amazon/AmazonWorkmail.vue";
import AmazonCloudfront from "./pages/skills/amazon/AmazonCloudfront.vue";
import AmazonRoute53 from "./pages/skills/amazon/AmazonRoute53.vue";

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

    { path: "/vuejs", name:  "Vue.js Skills Page", component: VuejsPage },
    { path: "/aws", name: "AWS Skills Page", component: AmazonPage },

    { path: "/copyright", name: "Copyright Section", redirect: { path: "/", hash: "#copyright" } },
    { path: "/credits", name: "Credits Section", redirect: { path: "/", hash: "#skills" } },
    { path: "/updates", alias: ['/update'], redirect: { path: "/", hash: "#skills" } },
    { path: "/ksu-edu", alias: ["/ksu", "/kennesaw-state"], redirect: { path: "/", hash: "#ksu" } },

    { path: "/globe", name: "My Globe", component: GlobeRedirect },
    { path: "/ivue", main: "Main iVue Redirect Page", component: IvueRedirect },
    { path: "/worldsivue", alias: ['/wiv', '/worlds-ivue'], main: "Main WIV Redirect Page", component: WIVRedirect },
    { path: "/github",  main: "Main GitHub Redirect Page", component: GithubRedirect },
    { path: "/linkedin",  main: "Main LinkedIn Redirect Page", component: LinkedinRedirect },
    { path: "/discord",  main: "Main Discord Redirect Page", component: DiscordRedirect },

    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },
    { path: "/qrcodes", alias: ["/qr"], redirect: "/qrcode" },

    { path: "/vue", redirect: "/vuejs" },
    { path: "/sublo", redirect: "/experience/sublo" },
    { path: "/frontend", redirect: "/skills/frontend" },
    { path: "/amazon", redirect: "/aws" },

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
            { path: "aws", alias: ["amazon"], children: [
                { path: "", alias: ["main"], name: "Skills AWS Page", component: AmazonMain },
                { path: "amplify", name: "AWS Amplify Page", component: AmazonAmplify },
                { path: "cognito", name: "Amazon Cognito Page", component: AmazonCognito },
                { path: "s3", name: "Amazon S3 Page", component: AmazonS3 },
                { path: "cloudfront", name: "Amazon Cloudfront Page", component: AmazonCloudfront },
                { path: "route53", name: "Amazon Route 53 Page", component: AmazonRoute53 },
                { path: "workmail", name: "Amazon Workmail Page", component: AmazonWorkmail },
            ]},
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