import type { NuxtPage } from '@nuxt/schema';
const REPOSITORY = "https://github.com/Mohitjain49/mohit-website";

/**
 * This function is run by the "pages:extend" hook. It adds pages to the website by using "templates" in the app folder.
 * @param pages The pages array given by the hook.
 */
export default function usePageTemplates(pages: Array<NuxtPage>) {
    const DOC_TEMPLATE = "~/templates/DocumentViewerTemplate.vue";
    const SCRIPT_TEMPLATE = "~/templates/ScriptViewerTemplate.vue";
    const REDIRECT_TEMPLATE = "~/templates/RedirectTemplate.vue";

    const routesToDocumentTemplate = [
        // { path: '/resume', file: DOC_TEMPLATE, props: { index: 0 }},
        { path: '/create-github-repo', file: DOC_TEMPLATE, props: { index: 1 }},
        { path: '/Generative_Artificial_Intelligence_Transforming_Industries_Research_Paper', file: DOC_TEMPLATE, props: { index: 2 }},
    ];
    const routesToScriptTemplate = [
        { path: '/aws-deploy-script', file: SCRIPT_TEMPLATE, props: { index: 0 } },
        { path: '/gamepad/store-and-utility', file: SCRIPT_TEMPLATE, props: { index: 1 } },
        { path: '/gamepad/vuejs-component', file: SCRIPT_TEMPLATE, props: { index: 2 } },
        { path: '/gamepad/custom-events', file: SCRIPT_TEMPLATE, props: { index: 3 } },
        { path: '/unix-shell', file: SCRIPT_TEMPLATE, props: { index: 4 } },
        { path: '/upgrade-script', file: SCRIPT_TEMPLATE, props: { index: 5 } },
        { path: '/threadpool', file: SCRIPT_TEMPLATE, props: { index: 6 } },
        { path: '/use-docker-script', file: SCRIPT_TEMPLATE, props: { index: 7 } },
    ];

    const REDIRECT_PAGES = [
        { path: "/linkedin", link: "https://www.linkedin.com/in/mohitjain49", title: "Mohit Jain | LinkedIn", desc: "This link will redirect you to my LinkedIn Profile." },
        { path: "/github", link: "https://github.com/Mohitjain49", title: "Mohit Jain | GitHub", desc: "This link will redirect you to my GitHub Profile." },
        { path: "/gitlab", link: "https://gitlab.com/mohitkjain49", title: "Mohit Jain | Gitlab", desc: "This link will redirect you to my Gitlab Profile." },
        { path: "/steam", link: "https://steamcommunity.com/id/mohit-jain/", title: "Mohit Jain | Steam", desc: "This link will redirect you to my Steam Profile." },

        { path: "/repository", link: REPOSITORY, title: "Mohit Jain | Website Repository", desc: "This link will redirect you to this website's github repository." },
        { path: "/ivue", link: "https://www.ivueworld.com/", title: "iVue - iVue The World", desc: "This link will redirect you to the Main iVue Website." },
        { path: "/worldsivue", link: "https://www.worldsivue.com/", title: "Mohit Jain | Worlds iVue", desc: "This link will redirect you to Worlds iVue." },
    ];
    const redirectPages = [];

    for(let i = 0; i < REDIRECT_PAGES.length; i++) {
        if(i < 0 || i >= REDIRECT_PAGES.length) { continue; }
        const redirectPageObj = (REDIRECT_PAGES[i] ?? { path: "", link: "", title: "", desc: "" });
        redirectPages.push({ path: redirectPageObj.path, file: REDIRECT_TEMPLATE,
            props: { link: redirectPageObj.link, title: redirectPageObj.title, desc: redirectPageObj.desc }
        });
    }

    pages.push(...routesToDocumentTemplate);
    pages.push(...routesToScriptTemplate);
    pages.push(...redirectPages);
}