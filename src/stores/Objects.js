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
import pinia_icon from "../assets/Pinia_Icon.svg";

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

export const PERSONAL_WEBSITE_LINK = "https://www.mohit-jain.com/"
export const PERSONAL_GLOBE_LINK = "https://globe.mohit-jain.com/";
export const PIZZA_WEBSITE_LINK = "https://mohitjain49.github.io/pizza/";

export const KSU_LINK = "https://kennesaw.edu/"
export const SUBLO_WEBSITE_LINK = "https://www.sublo.app/";

export const MAIN_IVUE_WEBSITE_LINK = "https://ivueworld.com/";
export const IVUE_NEWS_WEBSITE_LINK = "https://news.ivueworld.com/";
export const IVUE_MEDIA_WEBSITE_LINK = "https://ivuemedia.com/";
export const IVUE_ROBOTICS_WEBSITE_LINK = "https://ivuerobotics.com/";
export const WORLDS_IVUE_LINK = "https://www.worldsivue.com/";

export const VUEJS_WEBSITE_LINK = "https://vuejs.org/";
export const REACT_NATIVE_WEBSITE_LINK = "https://reactnative.dev/";
export const NUXT_WEBSITE_LINK = "https://nuxt.com/";
export const MAVLINK_WEBSITE_LINK = "https://mavlink.io/en/";

export const SOCIALS = [
    {
        name: "Work Email",
        id: "work_email",
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
        id: "linkedin",
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
        id: "discord",
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
        id: "github",
        displayLink: "https://github.com/Mohitjain49",
        link: "https://github.com/Mohitjain49",
        copyBtn: "Copy GitHub Link",
        linkBtn: "Go To Github",
        linkIcon: "fa-brands fa-github",
        color: "white",
        altColor: "black"
    },
    {
        name: "GitLab",
        id: "gitlab",
        displayLink: "https://gitlab.com/mohitkjain49",
        link: "https://gitlab.com/mohitkjain49",
        copyBtn: "Copy GitLab Link",
        linkBtn: "Go To GitLab",
        linkIcon: "fa-brands fa-gitlab",
        color: "#E24329",
        altColor: "#E24329"
    }
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
            size: "105"
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
            size: "105"
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
            size: "105"
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
            size: "105"
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
            size: "105"
        }
    },
    {
        name: "Nuxt",
        link: NUXT_WEBSITE_LINK,
        color: "#00DC82",
        desc: "Nuxt is a web framework that's built with Vue.js and comes with a whole host of features. " +
            "It's particularly useful when use Vue Components to generate a static site " +
            "or a server-side rendered site for quality search engine optimization.",

        icon: {
            id: nuxt_icon,
            faIcon: false,
            size: "125"
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
            size: "110"
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
            size: "105"
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
            size: "105"
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
            size: "110"
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
            size: "110"
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
            size: "110"
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
            size: "110"
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
            size: "110"
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
            size: "110"
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
            size: "110"
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
            size: "110"
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
            size: "110"
        }
    },
];

export const NAV_CARDS = [
    {
        id: "vue-nav-card",
        titleId: "vue-nav-card-title",
        route: "/vuejs/",
    
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
        desc: "Vue.js is my go-to web development framework, offering simplicity, " +
            "quick performance, and a vast ecosystem for all developers.",

        pointsTitle: "Projects:",
        bulletPoints: [ "Worlds iVue", "My Portfolio", "iVue's Company Websites", "My Personal Globe" ],

        pictureBarClass: "vue-nav-picture-bar",
        pictures: [
            { image: vue_icon, width: "40%" },
            { image: nuxt_icon, width: "50%" },
            { image: pinia_icon, width: "32%" },
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
        route: "/experience/worldsivue",
    
        title: {
            text: "Worlds iVue",
            icon: wiv_icon,
            faIcon: false,
            extraClass: "gradient-text",
            colorType: "background-image",
            color: "linear-gradient(to left, #0872BA 0%, #48A548 50%, #0872BA 100%)",
            size: "35px"
        },
    
        color: "#48A548",
        desc: "Explore Worlds iVue, a geospatial app that serves as a " +
            "drone control operator and will serve as a media sharing app in the future.",
        
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
        route: "/experience/ivue",
    
        title: {
            text: "iVue",
            icon: rc_icon,
            faIcon: false,
            extraClass: "",
            colorType: "color",
            color: "white",
            size: "35px"
        },

        color: "black",
        desc: "Read about my work as iVue's Lead Software Developer, " +
            "where I lead a website development team and our use of Amazon Web Services.",
    
        pointsTitle: "Dev Stack:",
        bulletPoints: [ "Vue.js", "Nuxt", "Amazon Web Services" ],

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
        desc: "During my time at Sublo, I helped develop a mobile app that will make subleasing easier for college students.",
    
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
        route: "/aws/",

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

        pictureBarClass: "frontend-nav-picture-bar",
        pictures: [
            { image: vue_icon, width: "40%" },
            { image: react_icon, width: "39%" },
            { image: angular_icon, width: "41%" }
        ]
    },
];

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
        "Angular, like Vue.js and React, is an opiniated, component-based web development framework made primarily by Google. " +
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
        "React Native is an JavaScript library capable of developing apps for any mainstream platform. " +
            "As its namesake would suggest, this library contains many aspects seen in React, including the familiar markup syntax JSX. " +
            "Together, developers could use this library to create all their projects without the need to use different frameworks if the operating system is different. " +
            "In fact, it benefits shine with mobile app development.",
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