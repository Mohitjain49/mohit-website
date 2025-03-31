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

import SkillsNav from "./pages/SkillsNav.vue";
import ExperienceMain from "./pages/ExperienceMain.vue";

import IvueRedirect from "./pages/redirects/IvueRedirect.vue";
import SubloRedirect from "./pages/redirects/SubloRedirect.vue";
import WIVRedirect from "./pages/redirects/WIVRedirect.vue";

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

    { path: "/skills", name: "Main Skills Page", component: SkillsNav },
    { path: "/credits", name: "Credits Section", redirect: { path: "/", hash: "#skills" } },
    { path: "/updates", alias: ['/update'], redirect: { path: "/", hash: "#skills" } },
    { path: "/ksu-edu", alias: ["/ksu", "/kennesaw-state"], redirect: { path: "/", hash: "#ksu" } },

    { path: "/globe", name: "My Globe", component: GlobeRedirect },
    { path: "/ivue", main: "Main iVue Redirect Page", component: IvueRedirect },
    { path: "/sublo", name: "Sublo Main Redirect Page", component: SubloRedirect },
    { path: "/worldsivue", alias: ['/wiv', '/worlds-ivue'], main: "Main WIV Redirect Page", component: WIVRedirect },

    { path: "/github",  main: "Main GitHub Redirect Page", component: GithubRedirect },
    { path: "/gitlab",  main: "Main GitLab Redirect Page", component: GitlabRedirect },
    { path: "/linkedin",  main: "Main LinkedIn Redirect Page", component: LinkedinRedirect },
    { path: "/discord",  main: "Main Discord Redirect Page", component: DiscordRedirect },

    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },
    { path: "/qrcodes", alias: ["/qr"], redirect: "/qrcode" },

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