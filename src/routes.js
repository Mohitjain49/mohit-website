import PersonalMain from "./pages/PersonalMain.vue";
import ContactPage from "./pages/ContactPage.vue";
import Resume from "./pages/Resume.vue";
import MyIcon from "./pages/MyIcon.vue";

import InvalidRoute from "./pages/InvalidRoute.vue";
import GlobeRedirect from "./pages/redirects/GlobeRedirect.vue";

import SkillsNav from "./pages/skills/SkillsNav.vue";
import ExperienceMain from "./pages/experience/ExperienceMain.vue";
import SubloMain from "./pages/experience/SubloMain.vue";

import AmazonMain from "./pages/skills/amazon/AmazonMain.vue";
import AmazonAmplify from "./pages/skills/amazon/AmazonAmplify.vue";
import AmazonCognito from "./pages/skills/amazon/AmazonCognito.vue";
import AmazonS3 from "./pages/skills/amazon/AmazonS3.vue";
import AmazonWorkmail from "./pages/skills/amazon/AmazonWorkmail.vue";
import AmazonCloudfront from "./pages/skills/amazon/AmazonCloudfront.vue";
import AmazonRoute53 from "./pages/skills/amazon/AmazonRoute53.vue";

import VuejsFrontend from "./pages/skills/frontend/VuejsFrontend.vue";
import ReactNativeFrontend from "./pages/skills/frontend/ReactNativeFrontend.vue";
import AngularFrontend from "./pages/skills/frontend/AngularFrontend.vue";

import CesiumModule from "./pages/skills/modules/CesiumModule.vue";
import MAVLinkModule from "./pages/skills/modules/MAVLinkModule.vue";

import IvueStart from "./pages/experience/ivue/IvueStart.vue";
import IvueWebsite from "./pages/experience/ivue/IvueWebsite.vue";
import IvueMediaWebsite from "./pages/experience/ivue/IvueMediaWebsite.vue";
import IvueRoboticsWebsite from "./pages/experience/ivue/IvueRoboticsWebsite.vue";
import WorldsIvue from "./pages/experience/ivue/WorldsIvue.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]} The raw route records for the website.
 */
export const personalRoutes = [
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
                { path: "", redirect: "/skills/frontend/vuejs" },
                { path: "vuejs", alias: ['vue'], name: "Vuejs Frontend", component: VuejsFrontend },
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