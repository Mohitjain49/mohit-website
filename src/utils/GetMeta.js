import og_img from "/static-icons/Personal_Icon_Expanded_Rounded.png";
export const WEBSITE_TITLE = "Mohit Jain | My Portfolio";
export const WEBSITE_DESC = "Hello! My name is Mohit Jain, and I use my portfolio to showcase " +
    "my skills and as a \"Feature Lab\" for other projects of mine. Made With Vue.js.";

/**
 * This function returns the meta tags for the website for Search Engine Optimization.
 * @param {String} pageTitle The document page title.
 * @param {String} pageRoute The link to the route.
 * @param {String} pageDesc The document meta description.
 * @param { "default" | "resume-markdown" } type The type of webpage. Used if a page needs custom head tags compared to the default ones.
 */
export function getMeta(pageTitle = WEBSITE_TITLE, pageRoute = "", pageDesc = WEBSITE_DESC, type = "default") {
    const WEBSITE_PATH = (PERSONAL_WEBSITE_LINK + pageRoute);

    const itemListElement = [
        { "@type": "ListItem", "position": 1, "name": "Mohit Jain", "item": PERSONAL_WEBSITE_LINK },
        { "@type": "ListItem", "position": ((type === "default") ? 2 : 3), "name": pageTitle, "item": WEBSITE_PATH }
    ];
    if(type === "resume-markdown") {
        itemListElement.splice(1, 0, { "@type": "ListItem", "position": 2, "name": "Mohit Jain | My Resume", "item": (PERSONAL_WEBSITE_LINK + "resume") });
    }
    
    /** @type {import("@unhead/vue").UseHeadInput} The resulting meta tags for the heading. */
    const output = {
        title: pageTitle,
        link: [
            { rel: 'icon', href: og_img },
            { rel: 'canonical', href: WEBSITE_PATH }
        ],
        script: [{ type: "application/ld+json", key: "breadcrumb-jsonld",
            innerHTML: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "BreadcrumbList",
                itemListElement
            })
        }],

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
    }
    return output;
}

/**
 * This function returns the meta tags for the homepage.
 */
export function getHomeMeta(pageTitle = WEBSITE_TITLE) {
    const originObject = getMeta(pageTitle);
    originObject.script[0] = {
        type: "application/ld+json",
        innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
                {
                    "@type": "WebSite",
                    "@id": (PERSONAL_WEBSITE_LINK + "#skills"),
                    "url": PERSONAL_WEBSITE_LINK,
                    "name": "Mohit Jain",
                    "publisher": { "@id": (PERSONAL_WEBSITE_LINK + "#start") }
                },
                {
                    "@type": "Organization",
                    "@id": (PERSONAL_WEBSITE_LINK + "#start"),
                    "url": PERSONAL_WEBSITE_LINK,
                    "name": "Mohit Jain",
                    "logo": (PERSONAL_WEBSITE_LINK + "static-icons/Personal_Icon_Expanded_Rounded.png"),
                    "sameAs": [SOCIALS[1].link, SOCIALS[3].link]
                }
            ]
        })
    }
    return originObject;
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
        link: [{ rel: 'icon', href: og_img }],

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