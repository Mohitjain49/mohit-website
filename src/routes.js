import PersonalMain from "./pages/PersonalMain.vue";
import ContactPage from "./pages/ContactPage.vue";
import SkillsPage from "./pages/SkillsPage.vue";
import ExperienceMain from "./pages/ExperienceMain.vue";
import Projects from "./pages/Projects.vue";
import CopyrightPage from "./pages/CopyrightPage.vue";
import MyIcon from "./pages/MyIcon.vue";

import Features from "./pages/features/FeaturesMain.vue";
import WakeLockPage from "./pages/features/WakeLockPage.vue";
import GamepadControls from "./pages/features/GamepadControls.vue";
import InstallPage from "./pages/features/InstallPage.vue";
import CodeScanner from "./pages/features/CodeReader.vue";
import GoogleMockup from "./pages/GoogleMockup.vue";

import HostedDocumentPage from "./pages/hosted-files/HostedDocumentPage.vue";
import HostedScriptPage from "./pages/hosted-files/HostedScriptPage.vue";
import ResumeMarkdown from "./pages/hosted-files/ResumeMarkdown.vue";

import Redirect from "./pages/redirects/Redirect.vue";
import EmailRedirect from "./pages/redirects/EmailRedirect.vue";
import InvalidRoute from "./pages/InvalidRoute.vue";

/** This is a list of redirect pages for the website. */
const REDIRECT_PAGES = [
    { path: "/linkedin", link: SOCIALS[1].link, title: "Mohit Jain | LinkedIn", desc: "This link will redirect you to my LinkedIn Profile." },
    { path: "/github", link: SOCIALS[3].link, title: "Mohit Jain | GitHub", desc: "This link will redirect you to my GitHub Profile." },
    { path: "/gitlab", link: SOCIALS[4].link, title: "Mohit Jain | Gitlab", desc: "This link will redirect you to my Gitlab Profile." },
    { path: "/steam", link: SOCIALS[5].link, title: "Mohit Jain | Steam", desc: "This link will redirect you to my Steam Profile." },

    { path: "/repository", link: PERSONAL_WEBSITE_REPOSITORY_LINK, title: "Mohit Jain | Website Repository", desc: "This link will redirect you to this website's github repository." },
    { path: "/commits", link: PERSONAL_WEBSITE_COMMITS_LINK, title: "Mohit Jain | Commits", desc: "This link will direct you to my website's commit history." },
    { path: "/sitemap", link: PERSONAL_SITEMAP_LINK, title: "Mohit Jain | Sitemap", desc: "This link will direct you to my website's sitemap." },

    { path: "/ivue", link: MAIN_IVUE_WEBSITE_LINK, title: "iVue - iVue The World", desc: "This link will redirect you to the Main iVue Website." },
    { path: "/worldsivue", link: WORLDS_IVUE_LINK, title: "Mohit Jain | Worlds iVue", desc: "This link will redirect you to Worlds iVue." },
];

/**
 * This function returns the route record for any redirect route give its path.
 * @param {String} path The path of the redirect route.
 * @returns {import('vue-router').RouteRecordRaw} The route record for the router.
 */
function getRedirectRouteRecord(path = "") {
    const page = REDIRECT_PAGES[REDIRECT_PAGES.findIndex(item => item.path === path)];
    return { path, name: ("Redirect Page - " + page.title), component: Redirect, props: { link: page.link, title: page.title, desc: page.desc } }
}

/**
 * @type {import('vue-router').RouteRecordRaw[]} The raw route records for the website.
 */
export const personalRoutes = [
    { path: "/", name: "Main Page", component: PersonalMain },
    { path: "/contact", name: "Contact Mohit", component: ContactPage },
    { path: "/skills", name: "Main Skills Page", component: SkillsPage },
    { path: "/experience", name: "Main Experience Page", component: ExperienceMain },
    { path: "/projects", name: "Main Projects Page", component: Projects },
    { path: "/copyright", name: "Copyright Page", component: CopyrightPage },
    { path: "/icons", name: "Icon Page", component: MyIcon },

    { path: "/features", name: "Main Features Page", component: Features },
    { path: "/wakelock", name: "Set Wake Lock", component: WakeLockPage },
    { path: "/code-scanner", name: "Code Reader Page", component: CodeScanner },
    { path: "/install", name: "Install Website", component: InstallPage },
    { path: "/google-mockup", name: "Google Mockup Page", component: GoogleMockup },

    { path: "/aws-deploy-script", name: "Deploy Script", component: HostedScriptPage, props: { index: 0 } },
    { path: "/create-github-repo", name: "Create GitHub Repository Instructions", component: HostedDocumentPage, props: { index: 2 } },
    { path: FCS_CERTIFICATE_ROUTE, name: "Intern Appreciation Certificate", component: HostedDocumentPage, props: { index: 3 } },

    {
        path: "/resume",
        children: [
            { path: "", name: "My Resume", component: HostedDocumentPage, props: { index: 0 } },
            { path: "qrcode", name: "My Resume (Qrcode)", component: HostedDocumentPage, props: { index: 1 } },
            { path: "markdown", name: "My Resume (Markdown)", component: ResumeMarkdown }
        ]
    },
    {
        path: "/gamepad",
        children: [
            { path: "", name: "Gamepad Controls", component: GamepadControls },
            { path: "store-and-utility", name: "Gamepad Store And Utility Code", component: HostedScriptPage, props: { index: 1 } },
            { path: "vuejs-component", name: "Gamepad Component Code", component: HostedScriptPage, props: { index: 2 } },
            { path: "custom-events", name: "Gamepad Events Code", component: HostedScriptPage, props: { index: 3 } }
        ]
    },

    { path: "/email",  main: "Main Email Redirect Page", component: EmailRedirect },
    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },

    getRedirectRouteRecord("/repository"),
    getRedirectRouteRecord("/commits"),
    getRedirectRouteRecord("/sitemap"),

    getRedirectRouteRecord("/worldsivue"),
    getRedirectRouteRecord("/ivue"),

    getRedirectRouteRecord("/github"),
    getRedirectRouteRecord("/gitlab"),
    getRedirectRouteRecord("/linkedin"),
    getRedirectRouteRecord("/steam")
];