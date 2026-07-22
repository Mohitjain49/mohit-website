import og_img from "/static-icons/Personal_Icon_Expanded_Rounded.png";
export const WEBSITE_TITLE = "Mohit Jain | My Portfolio";
export const WEBSITE_DESC = "My personal website showcases all of my professional skills and experience as a software engineer. " +
    "I work on this website constantly, whether it be for personal satisfaction or to see how exactly I can improve my designs. " +
    "I also use my website to test out numerous Node Package Manager (NPM) packages and other works of mine " +
    "like my Amazon Web Service Deployment Script before I use them in production-level web applications. " +
    "Feel free to explore my website!";

/**
 * This function returns the meta tags for the website for Search Engine Optimization.
 * @param {String} pageTitle The document page title.
 * @param {String} pageRoute The link to the route.
 * @param {String} pageDesc The document meta description.
 * @param {String} bgColor This is the default background color for the webpage.
 * @param { "default" | "resume-extra" | "gamepad-extra" } type The type of webpage. Used if a page needs custom head tags compared to the default ones.
 */
export function getMeta(pageTitle = WEBSITE_TITLE, pageRoute = "", pageDesc = WEBSITE_DESC, bgColor = "#000000", type = "default") {
    const WEBSITE_PATH = (PERSONAL_WEBSITE_LINK + pageRoute);
    const itemListElement = [
        { "@type": "ListItem", "position": 1, "name": "Mohit Jain", "item": PERSONAL_WEBSITE_LINK },
        { "@type": "ListItem", "position": ((type === "default") ? 2 : 3), "name": pageTitle, "item": WEBSITE_PATH }
    ];

    if(type === "resume-extra") {
        itemListElement.splice(1, 0, { "@type": "ListItem", "position": 2, "name": "Mohit Jain | My Resume", "item": (PERSONAL_WEBSITE_LINK + "resume") });
    } else if(type === "gamepad-extra") {
        itemListElement.splice(1, 0, { "@type": "ListItem", "position": 2, "name": "Mohit Jain | Gamepad Controls", "item": (PERSONAL_WEBSITE_LINK + "gamepad") });
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
        htmlAttrs: { style: ("background-color: " + bgColor + "; --webpage-html-bg-color: " + bgColor) },

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
 * This function returns a utility that can be used to make a reactive version of the "getMeta" object.
 * @param {String} initialPageTitle The document page title.
 * @param {String} pageRoute The link to the route.
 * @param {String} pageDesc The document meta description.
 * @param {String} initialBgColor This is the default background color for the webpage.
 * @param { "default" | "resume-extra" | "gamepad-extra" } type The type of webpage. Used if a page needs custom head tags compared to the default ones.
 */
export function useReactiveMeta(initialPageTitle = WEBSITE_TITLE, pageRoute = "", pageDesc = WEBSITE_DESC, bgColor = "#000000", type = "default") {
    const pageTitleRef = shallowRef(initialPageTitle);
    const metaObjectRef = computed(() => { return getMeta(pageTitleRef.value, pageRoute, pageDesc, bgColor, type); });

    /**
     * This function lets the webpage change its title at will.
     * @param {String} title The new title. MUST be a string.
     */
    function changeTitle(title = "") {
        if(typeof title !== "string") { return; }
        pageTitleRef.value = title;
    }

    // Returns the Meta object and functions to change it.
    return { metaObjectRef, changeTitle }
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
        htmlAttrs: { style: "background-color: rgb(248, 206, 171); --webpage-html-bg-color: rgb(248, 206, 171)" },

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