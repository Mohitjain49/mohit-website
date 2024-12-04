import vue_icon from "../assets/Vuejs_Icon.png";
import wiv_icon from "../assets/ivue/Worlds_iVue_Icon.png";
import rc_icon from "../assets/ivue/iVue_Robotics_Cog_Icon.png";
import ivue_media_icon from "../assets/ivue/iVue_Media_Icon.png";
import sublo_icon from "../assets/sublo/Sublo_Blue_Transparent.png";
import cesium_icon from "../assets/Cesium_Globe_Icon.png";
import mavlink_icon from "../assets/ivue/Mavlink_Icon.png";
import ivue_black_text from "../assets/ivue/iVue_Black_Text.png";
import angular_icon from "../assets/Angular_Icon.webp";

import aws_icon from "../assets/modules/AWS_Icon.png";
import amplify_icon from "../assets/modules/AWS_Amplify_Icon.svg";
import cognito_icon from "../assets/modules/AWS_Cognito_Icon.svg";
import dynamo_db_icon from "../assets/modules/AWS_Dynamo_DB_Icon.svg";

import wiv_banner from "../assets/ivue/Worlds_iVue_Banner.png";
import cesium_picture from "../assets/Cesium_Globe_Banner.jpg";
import wiv_app from "../assets/ivue/Worlds_iVue_Main_App.png";
import ivue_website from "../assets/ivue/iVue_Main_Website_Home.png";
import ivue_media_website from "../assets/ivue/iVue_Media_Website_Home.png";
import globe_page from "../assets/Personal_Globe_Page.png";
import pizza_page from "../assets/Pizza_Project_Page.png";

import sublo_white_background_icon from "../assets/sublo/Sublo_Blue_Background.png";
import wiv_waypoints from "../assets/ivue/iVue_RC_Waypoints.png";
import mavlink_banner from "../assets/ivue/Mavlink_Banner.png";

export const PIZZA_WEBSITE_LINK = "https://mohitjain49.github.io/pizza/";

export const MAIN_SKILLS_SECTOR = {
    title: "Professional Skills",
    routePath: "/resume",
    routeBtn: "See My Resume",
    gridClasses: "main-sector-body",

    content: [
        {
            subtitle: "Frontend Development",
            points: [
                { title: "Vue.js", icon: vue_icon, color: "#41B883", link: "https://vuejs.org/", faIcon: false },
                { title: "React", icon: "fa-brands fa-react", color: "#087EA4", link: "https://react.dev/", faIcon: true },
                { title: "React Native", icon: "fa-brands fa-react", color: "#087EA4", link: "https://reactnative.dev/", faIcon: true },
                { title: "JavaScript", icon: "fa-brands fa-js", color: "#F7DF1E", link: "https://www.javascript.com/", faIcon: true },
                { title: "HTML", icon: "fa-brands fa-html5", color: "#E34E26", link: "", faIcon: true },
                { title: "CSS", icon: "fa-brands fa-css3-alt", color: "#264DE4", link: "", faIcon: true }
            ]
        },
        {
            subtitle: "Backend Development",
            points: [
                { title: "Amazon Web Services", icon: "fa-brands fa-aws", color: "rgb(84, 104, 255)", link: "https://aws.amazon.com/", faIcon: true },
                { title: "Node.js", icon: "fa-brands fa-node", color: "#70A561", link: "https://nodejs.org/en", faIcon: true },
                { title: "PostgreSQL", icon: "fa-database", color: "#0072C6", link: "https://www.postgresql.org/", faIcon: true },
            ]
        },
        {
            subtitle: "Other Skills",
            points: [
                { title: "Github", icon: "fa-brands fa-github", color: "#842791", link: "https://github.com/", faIcon: true },
                { title: "Microsoft 365", icon: "fa-brands fa-windows", color: "#35B5FF", link: "https://www.office.com/", faIcon: true },
                { title: "Google", icon: "fa-brands fa-google", color: "#4285F4", link: "https://workspace.google.com/", faIcon: true },
            ]
        }
    ]
}

export const MAIN_CONTACTS_SECTOR = {
    title: "",
    routePath: "/experience",
    routeBtn: "See More of My Experience",
    gridClasses: "main-sector-body main-contacts-sector",

    content: [
        {
            subtitle: "Experience",
            points: [
                { title: "iVue", icon: rc_icon, color: "rgb(171, 15, 20)", link: "https://ivueworld.com/", faIcon: false },
                { title: "Worlds iVue", icon: wiv_icon, color: "#0872BA", link: "https://www.worldsivue.com/", faIcon: false },
                { title: "Sublo", icon: sublo_icon, color: "#36A1D9", link: "", faIcon: false }
            ]
        },
        {
            subtitle: "Contact Me",
            points: [
                { title: "mohitkjain49@gmail.com", icon: "fa-envelope", color: "grey", link: "mailto:mohitkjain49@gmail.com", faIcon: true },
                { title: "LinkedIn", icon: "fa-brands fa-linkedin", color: "#0A66C2", link: "https://www.linkedin.com/in/mohitjain49/", faIcon: true },
                { title: "Github", icon: "fa-brands fa-github", color: "#842791", link: "https://github.com/Mohitjain49", faIcon: true }
            ]
        }
    ]
}

export const PAGE_SECTORS = [
    {
        buttons: [
            {
                route: "/globe",
                nativeRoute: true,
                title: "Go To My Globe"
            },
            {
                route: "https://cesium.com/",
                nativeRoute: false,
                title: "Go To cesium.com"
            }
        ],
    
        text: {
            leftSide: true,
            title: "My Globe",
            desc: "Experience 3D globe apps I have developed with the Cesium Geospatial Platform."
        },
        images: [
            {
                asset: globe_page,
                style: { maxWidth: "calc(1918px / 3)", marginBottom: "30px" }
            },
            {
                asset: cesium_picture,
                style: { maxWidth: "calc(1200px / 2)" }
            }
        ],
        style: {
            background: "rgba(135, 206, 235, 0.95)",
            fontColor: "#709B49"
        }
    },
    {
        buttons: [
            {
                route: "/experience/ivue",
                nativeRoute: true,
                title: "My Experience"
            },
            {
                route: "/experience/ivue/worldsivue",
                nativeRoute: true,
                title: "My WIV Experience"
            },
            {
                route: "https://ivueworld.com/",
                nativeRoute: false,
                title: "Go To ivueworld.com"
            },
            {
                route: "https://www.worldsivue.com/",
                nativeRoute: false,
                title: "Go To Worlds iVue"
            },
        ],
    
        text: {
            leftSide: true,
            title: "iVue",
            desc: "Observe how iVue produces media content, drone hardware, and 3D world map software " +
                "to make drones a part of everyone's daily life."
        },
        images: [
            {
                asset: wiv_app,
                style: { maxWidth: 'calc(1918px / 4)', marginBottom: "30px" }
            },
            {
                asset: ivue_website,
                style: { maxWidth: 'calc(1980px / 4)', marginBottom: "30px" }
            },
            {
                asset: ivue_media_website,
                style: { maxWidth: 'calc(1918px / 4)' }
            }
        ],
        style: {
            background: "white",
            fontColor: "black"
        }
    },
    {
        buttons: [
            {
                route: "/experience/sublo",
                nativeRoute: true,
                title: "My Experience"
            },
        ],
    
        text: {
            leftSide: false,
            title: "Sublo",
            desc: "Scroll through how I am making an app to make finding or listing subleases easy for college students."
        },
        images: [
            {
                asset: sublo_icon,
                style: { maxWidth: "calc(1488px / 2.5)" }
            }
        ],

        style: {
            background: "#031427",
            fontColor: "#d1efff"
        }
    }
]

export const NAV_CARDS = [
    {
        id: "vue-nav-card",
        titleId: "vue-nav-card-title",
        route: "/skills/frontend/vuejs",
    
        title: {
            text: "Vue.js",
            icon: vue_icon,
            faIcon: false,
            extraClass: "gradient-text",
            colorType: "background-image",
            color: "linear-gradient(to left, #359D5E 0%, #41CF83 50%, #359D5E 100%)",
            size: "42px"
        },
    
        color: "#41B883",
        desc: "Read about my continuing journey with Vue.js, " +
            "a web development platform that's the base of my earliest projects!",

        pointsTitle: "Related Projects:",
        bulletPoints: [ "Worlds iVue", "iVue Websites", "Even This Website!" ],

        pictureBarClass: "vue-nav-picture-bar",
        pictures: [
            { image: wiv_app, width: "90%" },
            { image: ivue_website, width: "90%" },
            { image: ivue_media_website, width: "90%" }
        ]
    },
    {
        id: "react-nav-card",
        titleId: "react-nav-card-title",
        route: "/skills/react",
    
        title: {
            text: "React",
            icon: "fa-brands fa-react",
            faIcon: true,
            extraClass: "",
            colorType: "color",
            color: "#087EA4",
            size: "42px"
        },
    
        color: "#087EA4",
        desc: "Explore my ongoing adventure with React and React Native, " +
            "frameworks that make it simple to develop an app for any platform.",
    
        pointsTitle: "Related Projects:",
        bulletPoints: [ "Sublo", "This Website" ],

        pictureBarClass: "react-nav-picture-bar",
        pictures: [
            { image: sublo_white_background_icon, width: "50%" }
        ]
    },
    {
        id: "modules-nav-card",
        titleId: "modules-nav-card-title",
        route: "/skills/modules",
    
        title: {
            text: "Modules",
            icon: "fa-brands fa-node-js",
            faIcon: true,
            extraClass: "",
            colorType: "color",
            color: "#5C9E57",
            size: "42px"
        },
    
        color: "#5C9E57",
        desc: "Learn about some of the unique modules I use to develop Worlds iVue and Sublo.",
    
        pointsTitle: "Modules Include:",
        bulletPoints: [ "Cesium", "Mavlink Protocol" ],

        pictureBarClass: "backend-nav-picture-bar",
        pictures: [
            { image: wiv_app, width: "90%" },
            { image: sublo_white_background_icon, width: "50%" },
            { image: mavlink_banner, width: "80%" },
            { image: cesium_picture, width: "80%" }
        ]
    },
    {
        id: "wiv-nav-card",
        titleId: "wiv-card-title",
        route: "/experience/ivue/worldsivue",
    
        title: {
            text: "Worlds iVue",
            icon: wiv_icon,
            faIcon: false,
            extraClass: "gradient-text",
            colorType: "background-image",
            color: "linear-gradient(to left, #0872BA 0%, #48A548 50%, #0872BA 100%)",
            size: "35px"
        },
    
        color: "#0872BA",
        desc: "Explore my ongoing development with Worlds iVue, a geospatial app " +
            "that serves as a drone control operator and will serve as a media sharing app in the future.",
        
        pointsTitle: "Frameworks/Modules Used:",
        bulletPoints: [ "Vue.js", "Cesium", "Amazon Web Services" ],

        pictureBarClass: "wiv-nav-picture-bar",
        pictures: [
            { image: wiv_app, width: "90%" },
            { image: wiv_waypoints, width: "90%" }
        ]
    },
    {
        id: "ivue-web-nav-card",
        titleId: "ivue-web-card-title",
        route: "/experience/ivue/web",
    
        title: {
            text: "iVue Websites",
            icon: rc_icon,
            faIcon: false,
            extraClass: "",
            colorType: "color",
            color: "#AB0F14",
            size: "30px"
        },

        color: "#AB0F14",
        desc: "Navigate through my work with developing the latest versions of the iVue Websites, " +
            "serving as a way for potential customers to see our mission of making drones an everyday product.",
    
        pointsTitle: "Frameworks I Used:",
        bulletPoints: [ "Vue.js" ],

        pictureBarClass: "ivue-web-nav-picture-bar",
        pictures: [
            { image: ivue_website, width: "90%" },
            { image: ivue_media_website, width: "90%" }
        ]
    },
    {
        id: "sublo-nav-card",
        titleId: "sublo-card-title",
        route: "/experience/sublo",
    
        title: {
            text: "Sublo",
            icon: sublo_icon,
            faIcon: false,
            extraClass: "",
            colorType: "color",
            color: "#36A1D9",
            size: "35px"
        },

        color: "#36A1D9",
        desc: "See my work with developing Sublo, a subleasing mobile app that will make subleasing easier " +
            "for college students to find and list subleases for their dormitories or apartments.",
    
        pointsTitle: "Frameworks I Used:",
        bulletPoints: [ "React Native" ],

        pictureBarClass: "sublo-nav-picture-bar",
        pictures: [
            { image: sublo_white_background_icon, width: "50%" },
        ]
    },
    {
        id: "aws-nav-card",
        titleId: "aws-nav-title",
        route: "/skills/aws",

        title: {
            text: "Amazon",
            icon: "fa-brands fa-aws",
            faIcon: true,
            extraClass: "",
            colorType: "color",
            color: "#5468ff",
            size: "35px"
        },

        color: "#5468ff",
        desc: "Check out some of the Amazon Web Sevrives that I configure to amplify Worlds iVue and Sublo.",

        pointsTitle: "Services Include:",
        bulletPoints: [ "AWS Amplify", "Amazon Cognito", /* "Amazon DynamoDB " */ ],

        pictureBarClass: "aws-nav-picture-bar",
        pictures: [
            { image: aws_icon, width: "51%" },
            { image: amplify_icon, width: "50%" },
            { image: cognito_icon, width: "50%" },
            // DYNAMODB WILL BE INCLUDED ON A LATER DATE.
            // { image: dynamo_db_icon, width: "50%" },
        ]
    },
    {
        id: "angular-nav-card",
        titleId: "angular-nav-card-title",
        route: "/skills/frontend/angular",
    
        title: {
            text: "Angular",
            icon: angular_icon,
            faIcon: false,
            extraClass: "gradient-text",
            colorType: "background-image",
            color: "linear-gradient(to right, #F3227F 0%, #933BFF 100%)",
            size: "40px"
        },
    
        color: "#933BFF",
        desc: "See my work with Angular, a web development framework maintained primarly by Google " +
            "to inspire unique and focused designs.",
    
        pointsTitle: "Related Projects:",
        bulletPoints: [ "Pizza Software Engineering Project" ],

        pictureBarClass: "angular-nav-picture-bar",
        pictures: [
            { image: angular_icon, width: "51%" },
            { image: pizza_page, width: "90%" }
        ]
    }
]

export const VUE_INFO_SECTOR = {
    title: "Vue.js",
    image: vue_icon,
    style: {
        background: "linear-gradient(to bottom, #41B883 0%, #35495E 100%)",
        color: "white",
        minHeight: "100vh"
    },

    buttons: [
        { title: "Go To Vue.js Website", link: "https://vuejs.org/" }
    ],
    descriptions: [
        "Vue.js is a versatile web development framework that enhances traditional HTML, CSS, and JavaScript, offering a familiar yet more intuitive learning curve for developers. " +
            "It allows you to structure your HTML based on a dynamic JavaScript state, automatically updating the Document Object Model (DOM) whenever changes occur. " +
            "This reactive nature makes Vue.js suitable for a wide range of use cases—from enhancing static HTML websites to building fully-fledged single-page applications (SPAs) like Worlds iVue.",
        "Like many modern UI frameworks, Vue.js follows a component-based architecture, making it straightforward to build even complex user interfaces. " +
            "It leverages Single-File Components (SFCs), stored in .vue files, which bundle the template, logic, and styling for each component into one cohesive file. " +
            "Each Vue component can include custom CSS, import external resources (e.g., JavaScript, CSS, JSON), and support various media types like .png, .jpg, and .ico.",
        "Vue.js, similar to other web development frameworks, also contains an ecosystem of helpful libraries. " +
            "Vue Router provides seamless navigation for single-page applications (SPAs), allowing developers to easily manage routes and handle dynamic page transitions without refreshing the entire page. " +
            "Pinia serves as Vue’s state management library, offering a lightweight yet robust solution for managing application-wide state. " +
            "Other notable libraries many Vue.js applications use are Vuetify and Nuxt.",
        "I began my frontend development journey using Vue.js to create <u>Worlds iVue</u> and <u>iVue's Company Websites.</u> " +
            "Known as \"The Progressive Framework\", Vue.js is designed to scale with your experience level, making it accessible for both beginners and seasoned developers. " +
            "Whether you're just starting with coding or are an expert in frontend development, Vue.js provides a flexible and powerful toolkit. " +
            "I highly recommend this framework to anyone looking to showcase their software development skills, just as I did with Worlds iVue."
    ],

    addBottomSpace: false,
    pictures: [
        {
            header: "Worlds iVue",
            file: wiv_app,
            fileLink: "https://www.worldsivue.com/",
            links: [
                { text: "See My Contributions", path: "/experience/ivue/worldsivue", nativeRoute: true },
                { text: "Open App", path: "https://www.worldsivue.com/", nativeRoute: false }
            ]
        },
        {
            header: "iVue Websites",
            file: ivue_website,
            fileLink: "https://ivueworld.com/",
            links: [
                { text: "See My Contributions", path: "/experience/ivue", nativeRoute: true },
                { text: "Go To Website", path: "https://ivueworld.com/", nativeRoute: false }
            ]
        }
    ]
}

export const ANGULAR_INFO_SECTOR = {
    title: "Angular",
    image: angular_icon,
    style: {
        background: "whitesmoke",
        color: "#F3227F",
        minHeight: "100vh"
    },

    buttons: [
        { title: "Go To Angular's Website", link: "https://angular.dev/" }
    ],
    descriptions: [
        "Angular, like Vue.js and React, is a component-based web development framework made primarily by Google. " +
            "It is great for creating single page applications, has a reactive data flow, and provides efficient performance speeds. " +
            "It also has a wide ecosystem of tools, including its own routing module, an animations module, and muce more. " +
            "This ecosystem, along with its extensive use of Typescript, sets Angular out from other frameworks.",
        "Unlike other frameworks, Angular is made to be a rigid \"all-for-one\" solution for many problems faced by enterprise-level projects. " +
            "Rather than consolidating everything into a single file or object, each component is generated as a folder of files which organizes its logic, template, and styles. " +
            "Essential tools, like the routing module and HTTP client, are built directly within a project for robust functionality. " +
            "For more specialized needs, developers can easily add and integrate advanced Angular Modules like Angular Material as well. " +
            "These factors work together to ensure efficient scalability, maintainability, and productivity.",
        "While I haven't used Angular for any company project, I have used Angular to create a mock Pizza Order and Payment System for a college project. " +
            "Since Google developed Angular, many of its web applications, such as <u>Google Messages for Web</u> and <u>Google Gemini</u>, are built using this framework. " +
            "Papa John's also uses Angular for their website, which inspired me to adopt it for my pizza website mockup. " +
            "I believe it's an excellent platform for experienced frontend developers seeking a cost-effective, long-term solution for building applications. "
    ],

    addBottomSpace: false,
    pictures: [
        {
            header: "Mock Pizza Website",
            file: pizza_page,
            fileLink: PIZZA_WEBSITE_LINK,
            links: [
                { text: "Go To Website", path: PIZZA_WEBSITE_LINK, nativeRoute: false }
            ]
        }
    ]
}

export const IVUE_WEBSITE_INFO_SECTORS = [
    {
        title: "My Role",
        image: ivue_black_text,
        style: {
            background: "white",
            color: "black",
            minHeight: "calc(100vh - 25px)"
        },
    
        buttons: [
            { title: "Go To iVue's Main Website", link: "https://ivueworld.com/" }
        ],
        descriptions: [
            "I am the lead software developer at iVue, a company specializing in drone hardware, photography and videography services, and 3D globe software. " +
                "Primarily a frontend developer, I lead the development of Worlds iVue, " +
                "oversee a team building iVue's new websites, and also contribute to backend development " +
                "Working at iVue has been central to honing my software skills that I have listed on my website, including web development with " +
                "<span><a href=\"https://vuejs.org\" style=\"text-decoration: underline;\">Vue.js</a></span>, " +
                "<span><a href=\"https://mavlink.io/en/\" style=\"text-decoration: underline;\">The MAVLink Protocol</a></span>, " +
                "<span><a href=\"https://cesium.com/\" style=\"text-decoration: underline;\">Cesium</a></span>, and " +
                "<span><a href=\"https://aws.amazon.com/\" style=\"text-decoration: underline;\">AWS</a></span>, among others. " +
                "I plan to continue developing software for iVue to make it a successful industry leader for drones and media content."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: ivue_website,
                fileLink: "https://ivueworld.com/",
                links: []
            },
            {
                header: "",
                file: ivue_media_website,
                fileLink: "https://ivuemedia.com/",
                links: []
            },
            {
                header: "",
                file: wiv_banner,
                fileLink: "https://www.worldsivue.com/",
                links: []
            }
        ]
    },
    {
        title: "Websites",
        image: ivue_black_text,
        style: {
            background: "white",
            color: "black",
            minHeight: "calc(100vh - 25px)"
        },
    
        buttons: [
            { title: "Go To iVue's Main Website", link: "https://ivueworld.com/" }
        ],
        descriptions: [
            "As the lead software developer of iVue, I not only play a major role in developing Worlds iVue, " +
                "but also take a significant role in leading the iVue Website Development Team. " +
                "Before this team was established, iVue's former websites weren't the best, to say the least. " +
                "These old websites were developed with WordPress, which not only increases latency, " +
                "but also doesn't accurately reflect iVue's Software Development skills. " +
                "So, I made a team that would develop the new iVue Websites, including the Main iVue Website and the iVue Media Website, " +
                "with Vue.js, which not just serves as a good intro for new web developers, " +
                "but also solved the websites' latency issues as Vue.js is far more lightweight than a WordPress Website.",
            "The purpose of the Main iVue Website is to display iVue's major departments. " +
                "iVue offers quite a few services, as it provides location based photography and videography services through iVue Media, " +
                "Modular \"Flying Computer\" Drone Hardware such as the Develop Air through iVue Robotics, " +
                "and Worlds iVue, a 3D Globe application that connects and enhances all of iVue's branches together. " +
                "It also contains a teams section, which lists all the major people behind iVue's success, " +
                "and a News section, which will be updated to contain the latest news stories that take place with iVue. " +
                "In short, It shows iVue as a large image while encouraging vistors to navigate to the iVue Media Website, the iVue Robotics Website, and Worlds iVue."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: ivue_website,
                fileLink: "https://ivueworld.com/",
                links: []
            }
        ]
    },
    {
        title: "iVue Media",
        image: ivue_media_icon,
        style: {
            background: "#D7BD84",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },
    
        buttons: [
            { title: "Go To iVue Media's Website", link: "https://ivuemedia.com/" }
        ],
        descriptions: [
            "iVue Media is an iVue subsidiary that manages its photography and videography services. " +
                "The service functions as \"Uber for Media Content\". " +
                "Customers across the United States can place an order for photography and/or videography services for a property, construction, or an event. " +
                "Then, a photographer close to the site will produce media content for the customer. " +
                "Finally, the team at iVue Media edits the media content and sends them to the customer. " +
                "The iVue Media website displays what content we can produce for customers and the industries we work in.",
            "This website shows a degree of interconnectivity within its contents and industries pages. " +
                "Similar to a fast food menu, each webpage shows off all relevant contents to its topic. " +
                "For example, the real estate page will show off example photos and a video that we produced in this industry. " +
                "For the photos page, it will show off example photos of real estate, construction, and event shootings. " +
                "This results in many pairs of photos and videos being shown at multiple locations within the website. " +
                "In fact, I have taken a similar approach with my website too, as I've made many webpages link " +
                "to other webpages to emphasize the connections between iVue and my skills and experience."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: ivue_media_website,
                fileLink: "https://ivuemedia.com/",
                links: []
            }
        ]
    },
    {
        title: "Worlds iVue",
        image: wiv_icon,
        style: {
            background: "linear-gradient(to bottom, #48A548 0%, #0872BA 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },
    
        buttons: [
            { title: "Open Worlds iVue", link: "https://www.worldsivue.com/" }
        ],
        descriptions: [
            "Worlds iVue is a proprietary web application that was released by iVue in May 2024. " +
                "Acting as an operating system, this app currently functions as a drone operating system. " +
                "In the future, Worlds iVue will be capable of managing and sharing media content across the world, " +
                "navigating people around the world, and even telling the weather!",
            "This makes Worlds iVue a \"Super App\", or an app that has the features of multiple apps combined. " +
                "It has movable windows like how an operating system can let users adjust the position of a window. " +
                "Furthermore, while Worlds iVue is hosted on the web, it can be installed as an app with Google Chrome, Microsoft Edge, or Opera, " +
                "which allows it to function as a desktop app as well.",
            "As the lead software developer at iVue, Worlds iVue is both my first and most important project. " +
                "I've gained much of my software development expertise, including working with numerous code libraries, through developing this app. " +
                "It has also been key to developing my leadership skills, as I’ve mentored numerous intern developers in Vue.js and JavaScript, " +
                "guiding them as they contribute to the app's development. " +
                "I will continue developing Worlds iVue to integrate user pools, enhance its user-friendliness, and introduce new features unique to geospatial applications."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: wiv_banner,
                fileLink: "https://www.worldsivue.com/",
                links: []
            },
            {
                header: "",
                file: wiv_app,
                fileLink: "https://www.worldsivue.com/",
                links: []
            },
            {
                header: "",
                file: wiv_waypoints,
                fileLink: "https://www.worldsivue.com/ivuerc",
                links: []
            }
        ]
    }
]

export const CESIUM_INFO_SECTOR = {
    title: "Cesium",
    image: cesium_icon,
    style: {
        background: "linear-gradient(to bottom, #709C49 0%, #6DABE4 100%)",
        color: "white",
        minHeight: "100vh"
    },

    buttons: [
        { title: "Go To Cesium Website", link: "https://cesium.com/" }
    ],
    descriptions: [
        "Cesium is a geospatial platform that can enhance applications and video games alike. " +
            "Similar to Google Earth, users can search locations and observe many different places around the world virtually. " +
            "And since Cesium is open-source, unlike Google Earth and Google Maps, " +
            "many developers have added very useful tools to their application that push the boundaries of the platform. " +
            "Therefore, Worlds iVue and My Personal Globe has uses Cesium for its geospatial needs.",
        "Worlds iVue utilizes Cesium in many ways, most notably with making waypoint missions within iVue RoboControl. " +
            "By simply clicking on the map, users can add waypoints by clicking on the map and clicking on where tehy want their drone to navigate to. " +
            "Furthermore, users can simply drag and drop these waypoints after they are added in. " +
            "There are some more Cesium-Unique features as well, including a locator, geofences, and a representation of user's position on the map."
    ],

    addBottomSpace: false,
    pictures: [
        {
            header: "",
            file: cesium_picture,
            fileLink: "https://cesium.com/",
            links: []
        },
        {
            header: "My Globe",
            file: globe_page,
            fileLink: "#",
            links: [
                { text: "Go To My Globe", path: "/globe", nativeRoute: true },
                { text: "Go To Cesium's Website", path: "https://cesium.com/", nativeRoute: false },
            ]
        }
    ]
}

export const MAVLINK_INFO_SECTOR = {
    title: "MAVLink Protocol",
    image: mavlink_icon,
    style: {
        background: "linear-gradient(to bottom, #FF6600 0%, black 100%)",
        color: "white",
        minHeight: "100vh"
    },

    buttons: [
        { title: "Go To MAVLink Protocol Website", link: "https://mavlink.io/en/" }
    ],
    descriptions: [
        "The MAVLink Protocol, short for Micro Air Vehicle Communication Protocol, " +
            "is a lightweight communication messaging system used for communication with drones. " +
            "Hosted under the Dronecode project and the Linux foundation, this protocol is adaptable " +
            "with many different programming languages and microcontrollers/operating systems. " +
            "Furthermore, the MAVLink Protocol is open-source, making it accessible to all sorts of organizations. " +
            "Therefore, this protocol is used within iVue RoboControl, and app within Worlds iVue, to operate drones made by iVue Robotics.",
        "iVue RoboControl (iVue RC) uses the protocol extensively to support its many features. " +
            "There are many basic commands, such as arming the drone, setting its mode, etc. " +
            "A more advanced command that I personally contributed to is creating waypoint missions for drones with iVue RC. " +
            "The app also supports gamepad compatibility as well, " +
            "where users can plug in a typical gaming controller into their PC to operate the drone directly."
    ],

    addBottomSpace: true,
    pictures: [
        {
            header: "",
            file: mavlink_banner,
            fileLink: "https://mavlink.io/en/",
            links: []
        }
    ]
}

export const AWS_INFO_SECTORS = [
    {
        title: "Amazon Web Services",
        image: aws_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "AWS Website", link: "https://aws.amazon.com/" },
            { title: "AWS Products", link: "https://aws.amazon.com/products/" }
        ],
        descriptions: [
            "Amazon Web Services (AWS) is a leading cloud platform powering millions of websites and applications worldwide. " +
                "With over 200 fully-featured services, AWS is capable of performing virtually any online service to fit the needs of their customers. " +
                "Developers and other professionals can easily adapt and transition to using AWS as well, " +
                "letting them build, deploy, and manage applications efficiently without having to manage physcal infrastructure.",
            "Having started my AWS journey with AWS Amplify and Amazon Cognito, I am just beginning to explore the platform's vast capabilities. " +
                "However, the global scale of AWS will necessitate learning many additional services in the future, " +
                "particularly those for hosting and managing databases, web and mobile applications, and handling notifications and email services. " +
                "I plan to delve much deeper into AWS's vast ecosystem to fully leverage its potential across all my projects.",
        ],

        addBottomSpace: true,
        pictures: []
    },
    {
        title: "AWS Amplify",
        image: amplify_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "AWS Amplify's Website", link: "https://aws.amazon.com/amplify/" },
            { title: "AWS Amplify Docs", link: "https://docs.amplify.aws/vue/" }
        ],
        descriptions: [
            "Amplify is Amazon's frontend module that seamlessly connects AWS's core services to web and mobile applications. " +
                "By managing website hosting and deployment, Amplify makes it easy for frontend developers " +
                "to collaborate with AWS professionals and backend developers for key features for large-scale apps. " +
                "Since I originated as a frontend developer, Amplify was my first real dive into AWS. " +
                "With a library of UI components and scalability at its core, Amplify showcases the AWS ecosystem in a way that's both powerful and approachable.",
            "Currently, I used Amplify primarily to integrate authentication services powered by Amazon Cognito into <u>Worlds iVue</u> and <u>Sublo</u>. " +
                "In the future, both apps will also leverage Amplify to run AWS Lambda functions, connecting to databases that store user and geospatial data. " +
                "Furthermore, iVue's company websites will also integrate AWS services such as Amazon Simple Email Service (SES) with Amplify as well."
        ],

        addBottomSpace: true,
        pictures: []
    },
    {
        title: "Amazon Cognito",
        image: cognito_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "Amazon Cognito's Website", link: "https://aws.amazon.com/cognito/" }
        ],
        descriptions: [
            "Amazon Cognito provides user management, authentication, and authorization services to web and mobile applications. " +
                "With AWS Amplify, developers can simplify the sign-up, sign-in, and user controls while upholding proper security measures and user confidence. " +
                "Cognito also supports federated sign-in with third party identity providers like Google and Facebook and " +
                "provides support for multi-factor authentication and email and phone number verification.",
            "I helped set up and integrate Amazon Cognito into both Worlds iVue and Sublo. " +
                "While Sublo is still under development, Worlds iVue already features an " +
                "<span><a href=\"https://www.worldsivue.com/login\" style=\"text-decoration: underline;\">Authentication System</a></span> for users. " +
                "Eventually, this system will allow users to register iVue Robotics products, such as Drones and ModKits, to their accounts. " +
                "Furthermore, each application will be integrated with an Amazon database service, enabling users to access additional features linked to their accounts."
        ],

        addBottomSpace: true,
        pictures: []
    },
    /*
    {
        title: "Amazon DynamoDB",
        image: dynamo_db_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "Go To Amazon DynamoDB", link: "https://aws.amazon.com/dynamodb/" }
        ],
        descriptions: [
            "Amazon Web Services (AWS) is a cloud provider for millions of websites and web apps across the world. " +
                "Many companies, including iVue, use their network to lower costs and increase agility and innvoation. " +
                "They have many products, ranging from Simple Storage Service (S3) that lets customers store data for their apps to " +
                "Amazon Cognito that provides user management services for applications. " +
                "iVue uses AWS to host Worlds iVue online, manage users, and store large amounts of geospatial data.",
            "That being said, \"Amplify\" is a frontend module that connects an application's frontend to the AWS Services powering its backend. " +
                "With some help, I have integrated Amplify into Worlds iVue to connect it to an Amazon Cognito User Pool to enable users to log onto " +
                "Worlds iVue with an account. This enables my team to develop far more features for the app, " +
                "including registering drones and modkits with user accounts. " +
                "Amplify will also connect Worlds iVue with many more AWS Services, further enhancing the boundaries of the 3D app."
        ],

        addBottomSpace: true,
        pictures: []
    }
    */
]