import doc_img from "/static-icons/Personal_Icon_Expanded_Transparent.png";
import og_img from "/static-icons/Personal_Icon_Expanded.png";

const WEBSITE_TITLE = "Mohit Jain | My Portfolio";
const WEBSITE_DESC = "My personal website extensively displays my skills as a software developer " +
    "and the experience I have gathered through working with multiple companies. Made With Vue.js.";

/**
 * This function returns the meta tags for the website for Search Engine Optimization.
 * @param {String} pageTitle The document page title.
 * @param {String} pageRoute The link to the route.
 * @param {String} pageDesc The document meta description.
 */
export function getMeta(pageTitle = WEBSITE_TITLE, pageRoute = "", pageDesc = WEBSITE_DESC) {
    const WEBSITE_PATH = (PERSONAL_WEBSITE_LINK + pageRoute);
    
    return {
        title: pageTitle,
        link: [
            { rel: 'icon', href: doc_img },
            { rel: 'canonical', href: WEBSITE_PATH }
        ],

        meta: [
            { name: 'description', content: pageDesc },
            { name: 'author', content: "Mohit Jain" },
            { name: 'robots', content: 'index, follow' },

            { property: 'og:site:name', content: "Mohit Jain" },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: WEBSITE_PATH },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDesc },
            { property: 'og:image', content: og_img },

            { property: 'twitter:card', content: "summary" },
            { property: 'twitter:url', content: WEBSITE_PATH },
            { property: 'twitter:title', content: pageTitle },
            { property: 'twitter:description', content: pageDesc },
            { property: 'twitter:image', content: og_img },
        ],
    };
}

/**
 * This function returns the meta tags for the website for Search Engine Optimization.
 * This function is diferrent as the link is not predefined.
 * @param {String} pageTitle The document page title.
 * @param {String} pageLink The link to the website page.
 * @param {String} pageDesc The document meta description.
 */
export function getMetaWithLink(pageTitle = WEBSITE_TITLE, pageLink = PERSONAL_WEBSITE_LINK, pageDesc = WEBSITE_DESC) {
    return {
        title: pageTitle,
        link: [{ rel: 'icon', href: doc_img }],

        meta: [
            { name: 'description', content: pageDesc },
            { name: 'author', content: "Mohit Jain" },

            { "http-equiv": 'refresh', content: ("0; url=" + pageLink) },
            { name: 'robots', content: 'noindex, nofollow' },

            { property: 'og:site:name', content: "Mohit Jain" },
            { property: 'og:type', content: 'website' },
            { property: 'og:url', content: pageLink },
            { property: 'og:title', content: pageTitle },
            { property: 'og:description', content: pageDesc },
            { property: 'og:image', content: og_img },

            { property: 'twitter:card', content: "summary" },
            { property: 'twitter:url', content: pageLink },
            { property: 'twitter:title', content: pageTitle },
            { property: 'twitter:description', content: pageDesc },
            { property: 'twitter:image', content: og_img },
        ],
    };
}