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

import Resume from "./pages/documents/Resume.vue";
import ResumeMarkdown from "./pages/documents/ResumeMarkdown.vue";
import InternAppreciation from "./pages/documents/InternAppreciation.vue";

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

    { path: "/globe", link: PERSONAL_GLOBE_LINK, title: "Mohit Jain - My Globe", desc: "This link will direct you to my personal globe." },
    { path: "/ivue", link: MAIN_IVUE_WEBSITE_LINK, title: "iVue - iVue The World", desc: "This link will redirect you to the Main iVue Website." },
    { path: "/worldsivue", link: WORLDS_IVUE_LINK, title: "Mohit Jain | Worlds iVue", desc: "This link will redirect you to Worlds iVue." },
];

/**
 * This function returns the route record for any redirect route give its path.
 * @param {String} path The path of the redirect route.
 * @returns {import('vue-router').RouteRecordRaw} The route record for the router.
 */
function getRedirectRouteRecord(path = "") {
    const index = REDIRECT_PAGES.findIndex(item => item.path === path);
    const page = REDIRECT_PAGES[index];
    const name = ("Redirect Page - " + page.title);

    if(page.alias) {
        return { path, name, alias: page.alias, component: Redirect, props: { link: page.link, title: page.title, desc: page.desc } }
    } else {
        return { path, name, component: Redirect, props: { link: page.link, title: page.title, desc: page.desc } }
    }
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
    { path: "/code-scanner", alias: ["/code-reader"], name: "Code Reader Page", component: CodeScanner },
    { path: "/gamepad", name: "Gamepad Controls", component: GamepadControls },
    { path: "/install", name: "Install Website", component: InstallPage },
    { path: "/google-mockup", name: "Google Mockup Page", component: GoogleMockup },
    { path: FCS_CERTIFICATE_ROUTE, name: "Intern Appreciation Certificate", component: InternAppreciation },

    {
        path: "/resume",
        children: [
            { path: "", name: "My Resume", component: Resume },
            { path: "qrcode", alias: ["qr"], name: "My Resume (Qrcode)", component: Resume },
            { path: "markdown", alias: ['md'], name: "My Resume (Markdown)", component: ResumeMarkdown }
        ]
    },

    { path: "/email",  main: "Main Email Redirect Page", component: EmailRedirect },
    { path: '/:catchAll(.*)', name: 'NotFound', component: InvalidRoute },

    getRedirectRouteRecord("/repository"),
    getRedirectRouteRecord("/commits"),
    getRedirectRouteRecord("/sitemap"),

    getRedirectRouteRecord("/globe"),
    getRedirectRouteRecord("/worldsivue"),
    getRedirectRouteRecord("/ivue"),

    getRedirectRouteRecord("/github"),
    getRedirectRouteRecord("/gitlab"),
    getRedirectRouteRecord("/linkedin"),
    getRedirectRouteRecord("/steam")
];