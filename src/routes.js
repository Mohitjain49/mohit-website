import PersonalMain from "./pages/PersonalMain.vue";
import SkillsPage from "./pages/SkillsPage.vue";
import ExperienceMain from "./pages/ExperienceMain.vue";
import Projects from "./pages/Projects.vue";
import ContactPage from "./pages/ContactPage.vue";

import InstallPage from "./pages/InstallPage.vue";
import MyIcon from "./pages/MyIcon.vue";
import QRCodePage from "./pages/QRCodePage.vue";
import CopyrightPage from "./pages/CopyrightPage.vue";

import Resume from "./pages/resume/Resume.vue";
import ResumeDownload from "./pages/resume/ResumeDownload.vue";
import InternAppreciation from "./pages/certifications/InternAppreciation.vue";

import InvalidRoute from "./pages/InvalidRoute.vue";
import RepoRedirect from "./pages/redirects/RepoRedirect.vue";
import GlobeRedirect from "./pages/redirects/GlobeRedirect.vue";
import MNDRedirect from "./pages/redirects/MNDRedirect.vue";
import PizzaRedirect from "./pages/redirects/PizzaRedirect.vue";

import EmailRedirect from "./pages/redirects/EmailRedirect.vue";
import GithubRedirect from "./pages/redirects/GithubRedirect.vue";
import GitlabRedirect from "./pages/redirects/GitlabRedirect.vue";
import LinkedinRedirect from "./pages/redirects/LinkedinRedirect.vue";
import DiscordRedirect from "./pages/redirects/DiscordRedirect.vue";

import IvueRedirect from "./pages/redirects/IvueRedirect.vue";
import SubloRedirect from "./pages/redirects/SubloRedirect.vue";
import WIVRedirect from "./pages/redirects/WIVRedirect.vue";

/**
 * @type {import('vue-router').RouteRecordRaw[]} The raw route records for the website.
 */
export const personalRoutes = [
    { path: "/", name: "Main Page", component: PersonalMain },
    { path: "/skills", name: "Main Skills Page", component: SkillsPage },
    { path: "/experience", name: "Main Experience Page", component: ExperienceMain },
    { path: "/projects", name: "Main Projects Page", component: Projects },
    { path: "/contact", name: "Contact Mohit", component: ContactPage },

    {
        path: "/resume",
        children: [
            { path: "", name: "My Resume", component: Resume },
            { path: "pdf", name: "My Resume (Native)", component: Resume },
            { path: "download", name: "My Resume (Download)", component: ResumeDownload },
            { path: "google", alias: ["googledoc", "google-doc"], redirect: "/resume" },
        ]
    },

    {
        path: FCS_CERTIFICATE_ROUTE,
        children: [
            { path: "", component: InternAppreciation },
            { path: "pdf", component: InternAppreciation },
            { path: "google", alias: ["googledoc", "google-doc"], redirect: "" },
        ]
    },

    { path: "/install", name: "Install Website", component: InstallPage },
    { path: "/qrcode", name: "QR Code Page", component: QRCodePage },
    { path: "/icons", name: "Icon Page", component: MyIcon },
    { path: "/copyright", name: "Copyright Page", component: CopyrightPage },

    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },
    { path: "/documents", redirect: { path: "/", hash: "#documents" } },
    { path: "/footer", redirect: { path: "/", hash: "#footer" } },

    { path: "/repo", alias: ['/repository'], name: "Website Repository", component: RepoRedirect },
    { path: "/globe", name: "My Globe", component: GlobeRedirect },
    { path: "/mnd", name: "Mapping Neurodivergence", component: MNDRedirect },
    { path: "/pizza", name: "Pizza Project", component: PizzaRedirect },

    { path: "/ivue", main: "Main iVue Redirect Page", component: IvueRedirect },
    { path: "/sublo", name: "Sublo Main Redirect Page", component: SubloRedirect },
    { path: "/worldsivue", alias: ['/wiv', '/worlds-ivue'], main: "Main WIV Redirect Page", component: WIVRedirect },

    { path: "/email",  main: "Main Email Redirect Page", component: EmailRedirect },
    { path: "/github",  main: "Main GitHub Redirect Page", component: GithubRedirect },
    { path: "/gitlab",  main: "Main GitLab Redirect Page", component: GitlabRedirect },
    { path: "/linkedin",  main: "Main LinkedIn Redirect Page", component: LinkedinRedirect },
    { path: "/discord",  main: "Main Discord Redirect Page", component: DiscordRedirect },
];