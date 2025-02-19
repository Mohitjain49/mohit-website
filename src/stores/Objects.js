import vue_icon from "../assets/Vuejs_Icon.png";
import wiv_icon from "../assets/ivue/Worlds_iVue_Icon.png";
import rc_icon from "../assets/ivue/iVue_Robotics_Cog_Icon.png";
import ivue_media_icon from "../assets/ivue/iVue_Media_Icon.png";
import sublo_icon from "../assets/sublo/Sublo_Blue_Transparent.png";
import cesium_icon from "../assets/Cesium_Globe_Icon.svg";
import mavlink_icon from "../assets/ivue/Mavlink_Icon.png";
import ivue_black_text from "../assets/ivue/iVue_Black_Text.png";
import angular_icon from "../assets/Angular_Icon.webp";
import react_icon from "../assets/React_Icon.png";
import expo_icon from "../assets/sublo/Expo_Icon.svg";
import vite_icon from "../assets/Vite_Icon.svg";
import nuxt_icon from "../assets/Nuxt_Icon.png";

import aws_icon from "../assets/aws/AWS_Icon.png";
import amplify_icon from "../assets/aws/AWS_Amplify_Icon.svg";
import cognito_icon from "../assets/aws/AWS_Cognito_Icon.svg";
import s3_icon from "../assets/aws/AWS_S3_Icon.svg";
import cloudfront_icon from "../assets/aws/AWS_CloudFront_Icon.svg";
import route53_icon from "../assets/aws/AWS_Route_53_Icon.svg";
import workmail_icon from "../assets/aws/AWS_WorkMail_Icon.svg";
import aws_icons_logo from "../assets/aws/AWS_Icons_Logo.svg";

import wiv_banner from "../assets/ivue/Worlds_iVue_Banner.png";
import cesium_picture from "../assets/Cesium_Globe_Banner.jpg";
import wiv_app from "../assets/ivue/Worlds_iVue_Main_App.png";
import ivue_website from "../assets/ivue/iVue_Main_Website_Home.png";
import ivue_media_website from "../assets/ivue/iVue_Media_Website_Home.png";
import ivue_robotics_website from "../assets/ivue/iVue_Robotics_Website_Home.png";
import globe_page from "../assets/Personal_Globe_Page.png";
import pizza_page from "../assets/Pizza_Project_Page.png";

import sublo_white_background_icon from "../assets/sublo/Sublo_Blue_Background.png";
import wiv_waypoints from "../assets/ivue/iVue_RC_Waypoints.png";
import mavlink_banner from "../assets/ivue/Mavlink_Banner.png";

export const PERSONAL_GLOBE_LINK = "https://globe.mohit-jain.com/";
export const PIZZA_WEBSITE_LINK = "https://mohitjain49.github.io/pizza/";
export const SUBLO_WEBSITE_LINK = "https://www.sublo.app/";

export const MAIN_IVUE_WEBSITE_LINK = "https://ivueworld.com/";
export const IVUE_MEDIA_WEBSITE_LINK = "https://ivuemedia.com/";
export const IVUE_ROBOTICS_WEBSITE_LINK = "https://ivuerobotics.com/";
export const WORLDS_IVUE_LINK = "https://www.worldsivue.com/";

export const VUEJS_WEBSITE_LINK = "https://vuejs.org/";
export const REACT_NATIVE_WEBSITE_LINK = "https://reactnative.dev/";
export const MAVLINK_WEBSITE_LINK = "https://mavlink.io/en/";

export const SOCIALS = [
    {
        name: "Work Email",
        displayLink: "mohitkjain49@gmail.com",
        link: "mailto:mohitkjain49@gmail.com",
        copyBtn: "Copy Email",
        linkBtn: "Send Email",
        linkIcon: "fa-envelope",
        color: "var(--website-text)",
        altColor: "var(--website-text)"
    },
    {
        name: "LinkedIn",
        displayLink: "https://www.linkedin.com/in/mohitjain49",
        link: "https://www.linkedin.com/in/mohitjain49",
        copyBtn: "Copy LinkedIn Link",
        linkBtn: "Go To LinkedIn",
        linkIcon: "fa-brands fa-linkedin",
        color: "#0072B1",
        altColor: "#0072B1"
    },
    {
        name: "Discord",
        displayLink: "https://discord.com/users/mohitjainn",
        link: "https://discord.com/users/mohitjainn",
        copyBtn: "Copy Discord Link",
        linkBtn: "Go To Discord",
        linkIcon: "fa-brands fa-discord",
        color: "#5865F2",
        altColor: "#5865F2"
    },
    {
        name: "GitHub",
        displayLink: "https://github.com/Mohitjain49",
        link: "https://github.com/Mohitjain49",
        copyBtn: "Copy GitHub Link",
        linkBtn: "Go To Github",
        linkIcon: "fa-brands fa-github",
        color: "white",
        altColor: "black"
    },
];

export const SKILL_ENTITIES = [
    {
        name: "Vue.js",
        link: VUEJS_WEBSITE_LINK,
        color: "#41B883",
        desc: "Vue.js is an extremely lightweight and simple web development framework that is mainly developed by a team of independent, professional developers. " +
            "I used this for a majority of my projects, including Worlds iVue, iVue's company websites, and the website you are on right now.",

        icon: {
            id: vue_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "React Native",
        link: REACT_NATIVE_WEBSITE_LINK,
        color: "#61DBFB",
        desc: "React Native, created by Meta, is a popular library that can be used to make apps for all platforms. " +
            "It shines in mobile app development, however, and I used it to help develop a mobile application with other college students.",

        icon: {
            id: react_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "Angular",
        link: "https://angular.dev/",
        color: "#F3227F",
        desc: "Angular is another popular web development framework that is supported by Google. " +
            "With TypeScript at its base, an Angular project can scale to any size. " +
            "I used it to make a mock pizza order and delivery system for my software engineering class.",

        icon: {
            id: angular_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "Vite",
        link: "https://vite.dev/",
        color: "#9863FE",
        desc: "Vite is a frontend building tool that simplifies developing, building, and deploying frontend applications. " +
            "It is used by most major JS Frameworks today, including Vue.js, React Router, Angular, etc.",

        icon: {
            id: vite_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "Expo",
        link: "https://expo.dev/",
        color: "black",
        desc: "Expo is a framework that utilizes React Native to help developers create, build, and deploy apps " +
            "that work on Android, iOS, and the web all at once. I used it to develop a mobile app at Sublo.",

        icon: {
            id: expo_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "Nuxt",
        link: "https://nuxt.com/",
        color: "#00DC82",
        desc: "Nuxt is a web framework that's built with Vue.js and comes with a whole host of features. " +
            "It's particularly useful when use Vue Components to generate a static site " +
            "or a server-side rendered site for quality search engine optimization.",

        icon: {
            id: nuxt_icon,
            faIcon: false,
            width: "125"
        }
    },
    {
        name: "AWS",
        link: "https://aws.amazon.com/",
        color: "#5468ff",
        desc: "I use Amazon Web Services (AWS) for almost any web service I need. " +
            "Every big project I have worked on used AWS in some way, whether I needed to deploy an website, " +
            "manage user authentication, setup business emails, or make an API for a Lambda function.",

        icon: {
            id: "fa-brands fa-aws",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "Cesium",
        link: "https://cesium.com/",
        color: "#6DABE4",
        desc: "Cesium is a 3D geospatial platform that I used to develop Worlds iVue and the Globe Webpage for my website. " +
            "Due to its extensive documentation on all its features, Cesium isn't that complicated to learn and " +
            "can perform a seemingly boundless variety of tasks related to geospatial platforms.",

        icon: {
            id: cesium_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "MAVLink",
        link: MAVLINK_WEBSITE_LINK,
        color: "#FF6600",
        desc: "MAVLink is a lightweight messaging protocol that can communicate with drones. " +
            "Worlds iVue extensively uses the protocol to have drones perform extensive actions, including running waypoint missions. " +
            "The protocol can also control other servos connected to a drone in a wide variety of ways.",

        icon: {
            id: mavlink_icon,
            faIcon: false,
            width: "105"
        }
    },
    {
        name: "GitHub",
        link: "https://github.com/",
        color: "black",
        desc: "I use GitHub as my go to version control app for all my projects. " +
            "It's extremely reliable for me and my team at iVue to use this for all projects, and it helps store archived code. " +
            "With GitHub Actions, I can even set up CI/CD pipelines for my websites to autonomously deploy updates online.",

        icon: {
            id: "fa-brands fa-github",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "Cloudflare",
        link: "https://www.cloudflare.com/",
        color: "#F58A27",
        desc: "Cloudflare has a free platform called Cloudflare Pages that simplifies deploying full-stack applications to the web. " +
            "It has a free version that I use to ensure that my web development projects run smoothly online.",

        icon: {
            id: "fa-brands fa-cloudflare",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "Font Awesome",
        link: "https://fontawesome.com/",
        color: "rgb(83, 141, 215)",
        desc: "I have used free font awesome icons across all my frontend development projects. " +
            "By representing brands, webpages, and simple features with a wide catalog of icons, " +
            "I add on to the visual appeal of my projects.",

        icon: {
            id: "fa-brands fa-font-awesome",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "AWS Icons",
        link: "https://aws-icons.com/",
        color: "#F59D0A",
        desc: "Amazon Web Services (AWS) has an entire website dedicated to their icons. " +
            "Nearly every AWS service and more has a specialized icon, " +
            "and I use these icons on the AWS page and other places on my website.",

        icon: {
            id: aws_icons_logo,
            faIcon: false,
            width: "125"
        }
    },
    {
        name: "JavaScript",
        link: "#",
        color: "#D3B62A",
        desc: "I've learned how to code with JavaScript, TypeScript, and Node.js to make various functions. " +
            "These sit at the core of all the frameworks and modules I have used for my projects.",

        icon: {
            id: "fa-brands fa-js",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "Java",
        link: "https://www.java.com/en/",
        color: "#EC2025",
        desc: "While I haven't developed any major projects with Java, this is the first language that I learned. " +
            "I'll most likely use Kotlin to develop an Android App in the future if I have the time.",

        icon: {
            id: "fa-brands fa-java",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "GoLang",
        link: "https://go.dev/",
        color: "#00ABD7",
        desc: "GoLang, supported by Google, is great for developing backend systems for applications. " +
            "I learned it when I started at iVue, and its used in the current order application for iVue Media's services.",

        icon: {
            id: "fa-brands fa-golang",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "HTML",
        link: "#",
        color: "#E34E26",
        desc: "Through my experience with frontend frameworks, I have learned how to develop intuitive UIs with HTML.",

        icon: {
            id: "fa-brands fa-html5",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "CSS",
        link: "#",
        color: "#264DE4",
        desc: "Through my experience with frontend frameworks, I have learned how to develop visually appealing styles with CSS.",

        icon: {
            id: "fa-brands fa-css3-alt",
            faIcon: true,
            size: "110px"
        }
    },
    {
        name: "More Info",
        link: "/skills",
        color: "var(--website-light-text)",
        desc: "I have made many pages describing the software development skills I accumalated since the start of my journey. " +
            "Click on this card or the \"Skills\" link at the top for more info.",

        icon: {
            id: "fa-circle-info",
            faIcon: true,
            size: "110px"
        }
    },
];

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
        desc: "Learn about some of the unique modules I use to develop Worlds iVue and other websites.",
    
        pointsTitle: "Modules Include:",
        bulletPoints: [ "Cesium", "Mavlink Protocol" ],

        pictureBarClass: "backend-nav-picture-bar",
        pictures: [
            { image: wiv_banner, width: "76%" },
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
        
        pointsTitle: "Dev Stack:",
        bulletPoints: [ "Vue.js", "Cesium", "MAVLink", "Amazon Web Services" ],

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
    
        pointsTitle: "Dev Stack:",
        bulletPoints: [ "Vue.js" ],

        pictureBarClass: "ivue-web-nav-picture-bar",
        pictures: [
            { image: ivue_website, width: "90%" },
            { image: ivue_media_website, width: "90%" },
            { image: ivue_robotics_website, width: "90%" }
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
    
        pointsTitle: "Dev Stack:",
        bulletPoints: [ "React Native", "Expo" ],

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
        desc: "Check out some of the Amazon Web Services that I configure to amplify Worlds iVue and Sublo.",

        pointsTitle: "Services Include:",
        bulletPoints: [ "AWS Amplify",
            "Amazon Cognito",
            "Data Storage",
            "Web Hosting",
            "Business Email Services"
        ],

        pictureBarClass: "aws-nav-picture-bar",
        pictures: [
            { image: aws_icon, width: "40%" },
            { image: amplify_icon, width: "40%" },
            { image: cognito_icon, width: "40%" },
            { image: s3_icon, width: "40%" },
            { image: route53_icon, width: "40%" },
            { image: workmail_icon, width: "40%" },
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
    },
    {
        id: "frontend-nav-card",
        titleId: "frontend-nav-card-title",
        route: "/skills/frontend",
    
        title: {
            text: "Frontend",
            icon: "fa-brands fa-js",
            faIcon: true,
            extraClass: "",
            colorType: "color",
            color: "#FFF03C",
            size: "42px"
        },
    
        color: "#FFF03C",
        desc: "Read about my experience on how I used numerous Frontend JavaScript Frameworks, " +
            "especially Vue.js, to create professional websites and applications.",

        pointsTitle: "Frameworks:",
        bulletPoints: [ "Vue.js", "React Native", "Angular" ],

        pictureBarClass: "vue-nav-picture-bar",
        pictures: [
            { image: vue_icon, width: "40%" },
            { image: react_icon, width: "39%" },
            { image: angular_icon, width: "41%" }
        ]
    },
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
        { title: "Go To Vue.js Website", link: VUEJS_WEBSITE_LINK }
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
            fileLink: WORLDS_IVUE_LINK,
            links: [
                { text: "See My Contributions", path: "/experience/ivue/worldsivue", nativeRoute: true },
                { text: "Open App", path: WORLDS_IVUE_LINK, nativeRoute: false }
            ]
        },
        {
            header: "iVue Websites",
            file: ivue_website,
            fileLink: MAIN_IVUE_WEBSITE_LINK,
            links: [
                { text: "See My Contributions", path: "/experience/ivue", nativeRoute: true },
                { text: "Go To Website", path: MAIN_IVUE_WEBSITE_LINK, nativeRoute: false }
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

export const REACT_NATIVE_INFO_SECTOR = {
    title: "React Native",
    image: react_icon,
    style: {
        background: "rgb(25, 25, 25)",
        color: "#087EA4",
        minHeight: "100vh"
    },

    buttons: [
        { title: "Go To React Native's Website", link: REACT_NATIVE_WEBSITE_LINK }
    ],
    descriptions: [
        "React Native is an JavaScript framework capable of developing apps for any mainstream platform. " +
            "As its namesake would suggest, this framework contains many aspects seen in React, including the familiar markup syntax JSX. " +
            "Together, developers could use this framework to create all their projects without the need to use different frameworks if the operating system is different. " +
            "While this strategy doesn't work well for web development, it benefits shine with mobile app development instead.",
        "React Native is the only mobile app framework that primarily uses JavaScript/TypeScript. " +
            "There are plenty of web frameworks like Vue.js, Angular, React (Not Native), and plenty more that exceeds at web development already. " +
            "There are also plenty of desktop app frameworks and wrappers like <span><a href=\"https://electronjs.org\" style=\"text-decoration: underline;\">Electron</a></span> " +
            "that make web development and desktop app development practically identical to each other. " +
            "On the flipside, however, React Native is the only framework for Android and iOS apps that can use widespread npm modules. " +
            "Its mainstream alternatives either use a different programming language which doesn't have access to npm modules, " +
            "support only one of the major two mobile operating systems, or both. " +
            "It should go without saying that this gives React Native a huge competitive edge and a less steep learning curve than other frameworks.",
        "I've used the framework primarily to help Sublo develop a mobile subleasing app. " +
            "The app seeks to make subleasing more efficient, as platforms like facebook marketplace can sometimes be rather inefficient for finding homes or tenants. " +
            "While I have left Sublo for more pursuits at iVue and My University, I am certain I'll be using React Native for other projects in the future."
    ],

    addBottomSpace: false,
    pictures: [
        {
            header: "Sublo",
            file: sublo_white_background_icon,
            fileLink: SUBLO_WEBSITE_LINK,
            links: [
                { text: "See my experience with Sublo", path: "/experience/sublo", nativeRoute: true }
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
            { title: "Go To iVue's Main Website", link: MAIN_IVUE_WEBSITE_LINK }
        ],
        descriptions: [
            "Serving as the lead software developer and shareholder at iVue, a company that specializes in drone hardware, photography and videography services, " +
                "and 3D globe software, has been the root of my software development journey. By personally developing most of its code, " +
                "I co-created " + getLinkElement("Worlds iVue", WORLDS_IVUE_LINK) + ", iVue's 3D globe application. " +
                "Furthermore, I lead iVue's Website Development Team, ensuring that iVue's websites promote our leading products and services. " +
                "These projects have provided me the opportunity to master " + getLinkElement("Vue.js", VUEJS_WEBSITE_LINK) + ", " +
                getLinkElement("Cesium", "https://cesium.com/") + ", " + getLinkElement("MAVLink", MAVLINK_WEBSITE_LINK) + ", " +
                getLinkElement("AWS", "https://aws.amazon.com/") + ", and a wide variety of other software skills.",
            "I began my journey at iVue in January 2023 as a high school intern and have grown with the company ever since. " +
                "Over the years, iVue has expanded its team with skilled software developers and introduced a diverse range of new products and services. " + 
                "My goal is to help establish iVue as a household name, recognized for all its exceptional offerings."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: ivue_website,
                fileLink: MAIN_IVUE_WEBSITE_LINK,
                links: []
            },
            {
                header: "",
                file: ivue_media_website,
                fileLink: IVUE_MEDIA_WEBSITE_LINK,
                links: []
            },
            {
                header: "",
                file: ivue_robotics_website,
                fileLink: IVUE_ROBOTICS_WEBSITE_LINK,
                links: []
            },
            {
                header: "",
                file: wiv_banner,
                fileLink: WORLDS_IVUE_LINK,
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
            { title: "Go To iVue's Main Website", link: MAIN_IVUE_WEBSITE_LINK }
        ],
        descriptions: [
            "Before the iVue Website Development Team was established, iVue's former websites weren't the best, to say the least. " +
                "These old websites were developed with WordPress, which not only increases latency, " +
                "but also doesn't accurately reflect iVue's affinity for software. " +
                "So, I made a team that would develop the new iVue Websites, including the Main iVue Website and the iVue Media Website, " +
                "with " + getLinkElement("Vue.js", VUEJS_WEBSITE_LINK) + ", which not just serves as a good intro for new web developers, " +
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
                fileLink: MAIN_IVUE_WEBSITE_LINK,
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
            { title: "Go To iVue Media's Website", link: IVUE_MEDIA_WEBSITE_LINK }
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
                fileLink: IVUE_MEDIA_WEBSITE_LINK,
                links: []
            }
        ]
    },
    {
        title: "iVue Robotics",
        image: rc_icon,
        style: {
            background: "red",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },
    
        buttons: [
            { title: "Go To iVue Robotics Website", link: IVUE_ROBOTICS_WEBSITE_LINK },
            { title: "Order A Drone!", link: (IVUE_ROBOTICS_WEBSITE_LINK + "order") }
        ],
        descriptions: [
            "iVue Robotics focuses on creating drone hardware for its consumers. " +
                "While drones are often perceived as either military tools or \"flying cameras\" for photography and videography, " +
                "our mission is to break these boundaries by creating \"Flying Computers\", or drones that surpass their current capabilities. " +
                "Our product line includes \"Develop Air\" drone models and a variety of ModKits designed to enhance and customize drone functionality. " +
                "For more details, explore our website linked below.",
            "The iVue Robotics Website enables visitors to design their perfect drone. " +
                "Customers can customize orders by selecting ModKits, extra parts, and warranty plans tailored to their needs. " +
                "While this website has just been released, visitors will be able to set up accounts with iVue to enhance their experience with drones."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: ivue_robotics_website,
                fileLink: IVUE_ROBOTICS_WEBSITE_LINK,
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
            { title: "Open Worlds iVue", link: WORLDS_IVUE_LINK }
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
                "It has also been key to developing my leadership skills, as I've mentored numerous intern developers in Vue.js and JavaScript, " +
                "guiding them as they contribute to the app's development. " +
                "I will continue developing Worlds iVue to integrate user pools, enhance its user-friendliness, and introduce new features unique to geospatial applications."
        ],
    
        addBottomSpace: true,
        pictures: [
            {
                header: "",
                file: wiv_banner,
                fileLink: WORLDS_IVUE_LINK,
                links: []
            },
            {
                header: "",
                file: wiv_app,
                fileLink: WORLDS_IVUE_LINK,
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
        { title: "Go To MAVLink Protocol Website", link: MAVLINK_WEBSITE_LINK }
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
            fileLink: MAVLINK_WEBSITE_LINK,
            links: []
        }
    ]
}

export const SUBLO_INFO_SECTOR = {
    title: "Sublo",
    image: sublo_icon,
    style: {
        background: "#031427",
        color: "#d1efff",
        minHeight: "calc(100vh - 75px)"
    },

    buttons: [
        { title: "Sublo's Website", link: SUBLO_WEBSITE_LINK },
    ],
    descriptions: [
        "Sublo is a work-in-progress mobile subleasing app that will allow students to sublease to others safely and quickly. " +
            "Today, college students typically use platforms like Facebook Marketplace. " +
            "While these platforms are good, they lack many important filters for specific traits that college students are looking for, " +
            "from specifying the number of bedrooms and bathrooms to whether pets are allowed or not. " +
            "Sublo intends to fix this, focusing on creating proper filters to make searching for subleases efficient.",
        "During my time at Sublo, I learned a lot about <span><a href=\"https://reactnative.dev\" style=\"text-decoration: underline;\">React Native</a></span>. " +
            "Being one of the only mobile development frameworks that supports JavaScript packages and a platform that works for both Android and iOS, " +
            "I have truly learned a lot with mobile app development. Though I have parted ways with Sublo due to College starting back up, " +
            "I'm sure I'll be at the front of making mobile apps for iVue and maybe other organizations I'll join in the future."
    ],

    addBottomSpace: true,
    pictures: []
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
    {
        title: "Amazon S3",
        image: s3_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "Amazon S3's Website", link: "https://aws.amazon.com/s3/" }
        ],
        descriptions: [
            "Amazon Simple Storage Service (S3) is an easy way to store data. " +
                "This can be used for pretty much any use case, but I've been mainly using it for websites. " +
                "A single bucket can store all sorts of files and assets for a website. On top of that, they have a \"Static Website Hosting\" mode, " +
                "automatically creating a link to view the stored website. Furthermore, it's straightforward to make special rules for a website, " +
                "not just for accessing it, but also for having said bucket redirect to other websites and domains.",
            "One cool thing that's possible with AWS in general is to setup a CI/CD pipeline, or continuous integration and continuous deployment. " +
                "GitHub Actions makes updating the actual website as simple as pushing a commit onto the production branch. " +
                "This helps junior developers on my team efficiently push updates to the website without involving me as much, " +
                "a feat not available on other hosting platforms.",
            "I use Amazon S3 to host my website. On top of that, I configured iVue's buckets so that they are used to host the company's websites and " +
                getLinkElement("Worlds iVue", WORLDS_IVUE_LINK) + ". " + "Each of these projects also have their own CI/CD pipeline " +
                "connecting them to their respective Amazon S3 bucket. In the future, I'm sure that iVue will use S3 for more complex purposes."
        ],

        addBottomSpace: true,
        pictures: []
    },
    {
        title: "Amazon CloudFront",
        image: cloudfront_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "Amazon CloudFront's Website", link: "https://aws.amazon.com/cloudfront/" }
        ],
        descriptions: [
            "Amazon CloudFront is an effective and secure delivery tool for content like websites, videos, mobile apps, etc. " +
                "For websites in particular, This primarily serves as a middleman between Amazon S3 and a domain's name servers (DNS). " +
                "A Cloudfront Distribution takes an S3 bucket, configures domains that will use it, and then creates a secure link for its content. " +
                "like an S3 bucket and many other Amazon services, any distribution is customizable. For instance, " +
                "many behaviors can be set for different errors, such as adding a custom 404 error page, amongst many other actions. ",
            "I configured this service so iVue can deliver its company websites and " + getLinkElement("Worlds iVue", WORLDS_IVUE_LINK) + ". " +
                "iVue might use this for more complex purposes in the future like delivering potential mobile apps. " +
                "I've also configured this service to deliver this website as well."
        ],

        addBottomSpace: true,
        pictures: []
    },
    {
        title: "Amazon Route 53",
        image: route53_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "Amazon Route 53's Website", link: "https://aws.amazon.com/route53/" }
        ],
        descriptions: [
            "Amazon Route 53 is Amazon's primary routing service. " +
                "Like any other domain registrar, it can hold domains on an account." +
                "However, A hosted zone can be created for any domain, regardless of who the registrar is, as it provides its own nameserver addresses. " +
                "This allows domain managers to configure DNS records freely, whether it be for linked emails, websites, or other purposes." +
                "For instance, a CNAME record can be set up for a subdomain like " + getLinkElement("www.ivueworld.com", "www.ivueworld.com") +
                " to host a cloudfront distribution.",
            "I configured this service so iVue can host its company websites and " + getLinkElement("Worlds iVue", WORLDS_IVUE_LINK) + ". " +
                "iVue will probably use this to host more websites in the future and to register more domains that it might need. " +
                "I've also configured this service to host this website as well."
        ],

        addBottomSpace: true,
        pictures: []
    },
    {
        title: "Amazon WorkMail",
        image: workmail_icon,
        style: {
            background: "linear-gradient(to bottom, #5468ff 0%, black 100%)",
            color: "white",
            minHeight: "calc(100vh - 25px)"
        },

        buttons: [
            { title: "Amazon WorkMail's Website", link: "https://aws.amazon.com/workmail/" }
        ],
        descriptions: [
            "Amazon WorkMail is Amazon's Business Email and Calendar Service. " +
                "It allows customers to make emails with registered domains (e.g. example@example.com) and works well with " +
                "other AWS services like Amazon Simple Email Service (SES) and has its own Software Development Kit. " +
                "All these features are paired with a monthly cost of $4.00 for 50GB of storage per user, " +
                "which, compared to other providers, is suprisingly low.",
            "I configured Amazon WorkMail for iVue's business needs. This includes emails for websites like \"info@ivueworld.com\" to " +
                "emails for iVue's leadership like \"mohit.jain@worldsivue.com\". In the future, I'll probably be configuring user accounts for " +
                "iVue's other employees and programmatically work with other AWS services."
        ],

        addBottomSpace: true,
        pictures: []
    }
]

/**
 * This returns an "a" element that has text link to a string.
 * @param {String} text The text that represents the link.
 * @param {String} link The link to the website.
 */
function getLinkElement(text, link) {
    return ("<span><a href=\"" + link + "\"" + "style=\"text-decoration: underline;\">" + text + "</a></span>");
}