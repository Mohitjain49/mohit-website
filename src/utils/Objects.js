import vue_icon from "../assets/Vuejs_Icon.png";
import angular_icon from "../assets/Angular_Icon.webp";
import react_icon from "../assets/React_Icon.png";
import expo_icon from "../assets/sublo/Expo_Icon.svg";
import vite_icon from "../assets/Vite_Icon.svg";
import vitest_icon from "../assets/Vitest_Icon.svg";
import nuxt_icon from "../assets/Nuxt_Icon.png";
import pinia_icon from "../assets/Pinia_Icon.svg";
import awesome_vite_icon from "../assets/Awesome_Vite_Icon.svg";
import unjs_icon from "../assets/UnJS_Icon.png";
import fontsource_icon from "../assets/FontSource_Icon.png";
import tauri_icon from "../assets/Tauri_Icon.png";
import vite_pwa_icon from "../assets/Vite_PWA_Icon.png";
import arduino_icon from "../assets/Arduino_Icon.svg";
import r_icon from "../assets/R_Project_Icon.png";
import google_colab_icon from "../assets/Google_Colab_Icon.png";

import cesium_icon from "../assets/Cesium_Globe_Icon.svg";
import mavlink_icon from "../assets/ivue/Mavlink_Icon.png";
import ivue_black_text from "../assets/ivue/iVue_Black_Text_Cropped.png";
import worlds_ivue_icon from "../assets/ivue/Worlds_iVue_Icon.png";
import mnd_text from "/static-icons/MND_Icon_Transparent.png";
import tsparticles from "../assets/TS_Particles_Banner.png";

import aws_icons_logo from "../assets/aws/AWS_Icons_Logo.svg";
import aws_icon from "@/assets/aws/AWS_Icon.png";
import cognito_icon from "../assets/aws/AWS_Cognito_Icon.svg";
import amplify_icon from "../assets/aws/AWS_Amplify_Icon.svg";
import cloudfront_icon from "../assets/aws/AWS_CloudFront_Icon.svg";
import ses_icon from "../assets/aws/AWS_SES_Icon.svg";
import api_gateway_icon from "../assets/aws/AWS_API_Gateway_Icon.svg";

export const PERSONAL_WEBSITE_LINK = "https://www.mohit-jain.com/";
export const PERSONAL_WEBSITE_REPOSITORY_LINK = "https://github.com/Mohitjain49/mohit-website";
export const PERSONAL_WEBSITE_CODE_SANDBOX = "https://codesandbox.io/p/sandbox/github/Mohitjain49/mohit-website";
export const PERSONAL_WEBSITE_COMMITS_LINK = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/commits");
export const PERSONAL_RESUME_LINK = "https://www.mohit-jain.com/Mohit_Jain_Resume.pdf";
export const PERSONAL_SITEMAP_LINK = "https://www.mohit-jain.com/sitemap.xml";
export const PERSONAL_DEPLOY_SCRIPT_LINK = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/scripts/deploy.mjs");
export const CREATE_GITHUB_REPO_DOC_LINK = "https://www.mohit-jain.com/Create_Github_Repo.pdf";

export const GAMEPAD_ICON_SOURCE = "https://kenney.nl/assets/input-prompts";
export const GAMEPAD_EVENTS_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/gamepad-events.js");
export const GAMEPAD_STORE_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/stores/GamepadStore.js");
export const GAMEPAD_COMPONENT_FILE = (PERSONAL_WEBSITE_REPOSITORY_LINK + "/blob/main/src/components/GamepadComponent.client.vue");

export const MND_PROJECT_LINK = "https://mnd.mohit-jain.com/";
export const PERSONAL_GLOBE_LINK = "https://mohitjain49.github.io/globe/";
export const PIZZA_WEBSITE_LINK = "https://mohitjain49.github.io/pizza/";

export const KSU_LINK = "https://kennesaw.edu/"
export const SUBLO_WEBSITE_LINK = "https://www.sublo.app/";

export const MAIN_IVUE_WEBSITE_LINK = "https://www.ivueworld.com/";
export const IVUE_NEWS_WEBSITE_LINK = "https://news.ivueworld.com/";
export const IVUE_MEDIA_WEBSITE_LINK = "https://www.ivuemedia.com/";
export const IVUE_ROBOTICS_WEBSITE_LINK = "https://www.ivuerobotics.com/";
export const WORLDS_IVUE_LINK = "https://www.worldsivue.com/";
export const FLORIDA_MAN_LINK = "https://www.floridamanonline.com/";

export const VUEJS_WEBSITE_LINK = "https://vuejs.org/";
export const REACT_NATIVE_WEBSITE_LINK = "https://reactnative.dev/";
export const NUXT_WEBSITE_LINK = "https://nuxt.com/";
export const MAVLINK_WEBSITE_LINK = "https://mavlink.io/";

export const FCS_CERTIFICATE_ROUTE = "/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025/";
export const FCS_CERTIFICATE_LINK = "https://www.mohit-jain.com/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";
export const FCS_CERTIFICATE_LINKEDIN_POST = "https://www.linkedin.com/posts/mohitjain49_sharing-my-certificate-of-appreciation-from-activity-7331780981911080960-W_aN?utm_source=share&utm_medium=member_desktop&rcm=ACoAAD-tIy0BLb0spd_jNR2x-8zVBRSshOre_lI";
export const FCS_CAREER_INTERNSHIP_LINK = "https://www.fultonschools.org/all-departments/academics/learning-teaching/academic-programs/accelerated-extended-programming/advanced-studies/talented-and-gifted-tag/career-internship-program";

export const SOCIALS = [
    {
        name: "My Email",
        id: "work_email",
        displayLink: "mohitkjain49@gmail.com",
        link: "mailto:mohitkjain49@gmail.com",
        username: "mohitkjain49",
        copyBtn: "Copy Email",
        linkBtn: "Send Email",
        shareBtn: "Share Email",
        showCopyUsername: false,
        linkIcon: "fa-envelope",
        color: "var(--website-text)",
        altColor: "var(--website-text)"
    },
    {
        name: "LinkedIn",
        id: "linkedin",
        displayLink: "https://www.linkedin.com/in/mohitjain49",
        link: "https://www.linkedin.com/in/mohitjain49",
        username: "mohitjain49",
        copyBtn: "Copy Link",
        linkBtn: "Go To LinkedIn",
        shareBtn: "Share My LinkedIn Profile",
        showCopyUsername: false,
        linkIcon: "fa-brands fa-linkedin",
        color: "#0072B1",
        altColor: "#0072B1"
    },
    {
        name: "Discord",
        id: "discord",
        displayLink: "Username: mohitjainn",
        link: "https://discord.com/channels/@me/",
        username: "mohitjainn",
        copyBtn: "Copy Username",
        linkBtn: "Go To Discord",
        shareBtn: "Share My Discord Username",
        showCopyUsername: true,
        linkIcon: "fa-brands fa-discord",
        color: "#5865F2",
        altColor: "#5865F2"
    },
    {
        name: "GitHub",
        id: "github",
        displayLink: "https://github.com/Mohitjain49",
        link: "https://github.com/Mohitjain49",
        username: "Mohitjain49",
        copyBtn: "Copy Link",
        linkBtn: "Go To Github",
        shareBtn: "Share My GitHub Profile",
        showCopyUsername: true,
        linkIcon: "fa-brands fa-github",
        color: "white",
        altColor: "black"
    },
    {
        name: "GitLab",
        id: "gitlab",
        displayLink: "https://gitlab.com/mohitkjain49",
        link: "https://gitlab.com/mohitkjain49",
        username: "mohitkjain49",
        copyBtn: "Copy Link",
        linkBtn: "Go To GitLab",
        shareBtn: "Share My GitLab Profile",
        showCopyUsername: true,
        linkIcon: "fa-brands fa-gitlab",
        color: "#E24329",
        altColor: "#E24329"
    },
    {
        name: "Steam",
        id: "steam",
        link: "https://steamcommunity.com/id/mohit-jain/",
        displayLink: "https://steamcommunity.com/id/mohit-jain/",
        username: "MomoBlast92",
        copyBtn: "Copy Link",
        linkBtn: "Go To Steam",
        shareBtn: "Share My Steam Profile",
        showCopyUsername: true,
        linkIcon: "fa-brands fa-steam",
        color: "#167EB1",
        altColor: "#167EB1"
    }
];

export const NEW_SKILL_ENTITIES = [
    {
        name: "Vue.js",
        link: "/skills/#vuejs",
        color: "#41B883",
        desc: "As a frontend developer, Vue.js is my go-to web development framework, " +
            "offering simplicity, quick performance, and a vast ecosystem to all developers.",

        icon: {
            id: vue_icon,
            faIcon: false,
            size: "105"
        }
    },
    {
        name: "Frontend",
        link: "/skills/#frontend",
        color: "#D3B62A",
        desc: "Apart from Vue.js, I've utilized numerous other Frontend Development Tools for my projects, " +
            "including React Native, Angular, and Expo.",

        icon: {
            id: "fa-brands fa-js",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "AWS",
        link: "/skills/#aws",
        color: "#5468ff",
        desc: "I use Amazon Web Services (AWS) for almost all of my cloud computing needs. " +
            "Every big project I have worked on used AWS in some way, whether I needed to deploy an website, " +
            "manage user authentication, setup business emails, or make an API for a Lambda function.",

        icon: {
            id: "fa-brands fa-aws",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Google",
        link: "/skills/#google",
        color: "#4c8bf5",
        desc: "While I use Amazon Web Services to fill a majority of my cloud computing needs, " +
            "I also utilize a few of Google's tools for coding such as Google Cloud and Google Colab.",

        icon: {
            id: "fa-brands fa-google",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Modules",
        link: "/skills/#modules",
        color: "#5C9E57",
        desc: "I've used many unique modules AND tools for my websites and applications to either " +
            "create more appealing and intuitive user interfaces or for version control and app deployment.",

        icon: {
            id: "fa-brands fa-node-js",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Languages",
        link: "/skills/#languages",
        color: "#E34E26",
        desc: "Throughout all my work with application development, I have learned multiple programming languages " +
            "as a way of broadening my skillset.",

        icon: {
            id: "fa-laptop-code",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Icons",
        link: "/skills/#icons",
        color: "rgb(83, 141, 215)",
        desc: "I use icon sets to make websites and apps more appealing. " +
            "This section is my way of saying thanks to them.",

        icon: {
            id: "fa-brands fa-font-awesome",
            faIcon: true,
            size: "110"
        }
    },
];

export const VUEJS_SKILL_NOTES = [
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
        name: "Pinia",
        link: "https://pinia.vuejs.org/",
        color: "#dec96e",
        desc: "Pinia is Vue.js's official module for global state management. " +
            "It's extremely simple to use and works even better than modules like Redux or RxJS.",

        icon: {
            id: pinia_icon,
            faIcon: false,
            size: "90"
        }
    },
    {
        name: "Vue Router",
        link: "https://router.vuejs.org/",
        color: "#34495E",
        desc: "Vue Router is a routing module that integrates seamlessly with Vue.js Apps. " +
            "It's similar to any other framework's routing module.",

        icon: {
            id: vue_icon,
            faIcon: false,
            size: "105"
        }
    },
    {
        name: "Vite SSG",
        link: "https://github.com/antfu-collective/vite-ssg",
        color: "#9863FE",
        desc: "Vite-SSG can build any Vue.js application with Static Site Generation, allowing for better Search Engine Optimization. " +
            "This was created and is currently maintained by Anthony Fu, a core developer of Vue.js, Vite, and Nuxt.",

        icon: {
            id: awesome_vite_icon,
            faIcon: false,
            size: "115"
        }
    }
];

export const FRONTEND_SKILL_NOTES = [
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
        name: "Tauri",
        link: "https://tauri.app/",
        color: "#24C8DB",
        desc: "Tauri is a framework that can build tiny and fast binaries for desktop and mobile applications. " +
            "In other words, It allows any web developer to bundle their application to become a native application.",

        icon: {
            id: tauri_icon,
            faIcon: false,
            size: "105"
        }
    },
    {
        name: "Vitest",
        link: "https://vitest.dev/",
        color: "#749b24",
        desc: "Vitest is Vite's main testing module. This module is designed for Vite as it has support for glob imports, " +
            "its Server Side Rendering primitives, and more.",

        icon: {
            id: vitest_icon,
            faIcon: false,
            size: "115"
        }
    },
];

export const AWS_SKILL_NOTES = [
    {
        name: "Amazon Cognito",
        link: "https://aws.amazon.com/cognito/",
        color: "#C81520",
        desc: "Amazon Cognito is Amazon's primary service for user authentication. " +
            "I have configured this service to develop user authentiaction systems for both Worlds iVue and Sublo.",

        icon: {
            id: cognito_icon,
            faIcon: false,
            size: "110"
        }
    },
    {
        name: "AWS Amplify",
        link: "https://aws.amazon.com/amplify/",
        color: "#C81520",
        desc: "AWS Amplify serves as an effective module for full-stack development. " +
            "It can easily pair web and mobile apps with other services such as Amazon Cognito. " +
            "Therefore, both Worlds iVue and Sublo utilizes AWS Amplify.",

        icon: {
            id: amplify_icon,
            faIcon: false,
            size: "110"
        }
    },
    {
        name: "Web Hosting",
        link: "https://aws.amazon.com/websites/",
        color: "#5468ff",
        desc: "I use AWS to host websites for myself and iVue with Amazon S3 to store a website's files, " +
            "Amazon CloudFront to deliver the websites, and Amazon Route 53 to tie these websites to the preferred domain names.",

        icon: {
            id: cloudfront_icon,
            faIcon: false,
            size: "110"
        }
    },
    {
        name: "Email Services",
        link: "https://aws.amazon.com/ses/",
        color: "#C81520",
        desc: "I've utilized multiple email services made by AWS including Amazon Simple Email Service (SES) " +
            "for making my contact form and Amazon WorkMail for iVue's Company Emails.",

        icon: {
            id: ses_icon,
            faIcon: false,
            size: "110"
        }
    },
    {
        name: "Serverless APIs",
        link: "https://aws.amazon.com/api-gateway/",
        color: "#D5296A",
        desc: "With all these services, I utilize AWS Lambda and Amazon API Gateway to implement some backend functionality " +
            "into my projects, such as for the contact forms I have made.",

        icon: {
            id: api_gateway_icon,
            faIcon: false,
            size: "110"
        }
    }
];

export const GOOGLE_SKILL_NOTES = [
    {
        name: "Google Drive API",
        link: "https://developers.google.com/workspace/drive/api/guides/about-sdk",
        color: "#34A853",
        desc: "Google Cloud offers an API that lets developers integrate Google Drive Services " +
            "such as creating, editing, deleting, or managing files into their website or app. " +
            "For instance, you can save a copy one of my documents directly to your google drive with the provided document option.",

        icon: {
            id: "fa-brands fa-google-drive",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Google Colab",
        link: "https://colab.google/",
        color: "#E8710A",
        desc: "Google Colab is a free-to-use hosted Jupyter Notebook service that provides access to a variety of computing resources. " +
            "I use it to complete assignments for my college classes and for personal projects when necessary.",

        icon: {
            id: google_colab_icon,
            faIcon: false,
            size: "150"
        }
    }
];

export const MODULES_SKILL_NOTES = [
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
        name: "UnJS",
        link: "https://unjs.io/",
        color: "#D3B62A",
        desc: "UnJS is an ecosystem of JavaScript Modules that help with developing websites and apps. " +
            "I use some of its modules within my own projects like this portfolio website and iVue's websites.",

        icon: {
            id: unjs_icon,
            faIcon: false,
            size: "105"
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
];

export const LANGUAGES_SKILL_NOTES = [
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
        name: "Python",
        link: "https://www.python.org/",
        color: "#346E9E",
        desc: "I use Python for testing the MAVLink Protocol for Worlds iVue and to create AWS Lambda Functions. " +
            "I also use Python for creating Artifical Intelligence Models and for my college classes.",

        icon: {
            id: "fa-brands fa-python",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Java",
        link: "https://www.java.com/en/",
        color: "#EC2025",
        desc: "Java is the first major programming language that I learned about. " +
            "I primarily used it in college to complete assignments for my Data Structures class.",

        icon: {
            id: "fa-brands fa-java",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "Arduino",
        link: "https://www.arduino.cc/",
        color: "#25c2c7",
        desc: "At iVue, we use arduino boards to create advanced modkits for our drones. " +
            "This vastly improves the quality of the drones, making it less complicated for us " +
            "to develop and for consumers to operate.",

        icon: {
            id: arduino_icon,
            faIcon: false,
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
        name: "R",
        link: "https://www.r-project.org/",
        color: "#2468BC",
        desc: "The programming language \"R\" is specifically designed for statistical computing and graphics. " +
            "I learned and used this coding language in my Probability and Data Analysis class at KSU.",

        icon: {
            id: r_icon,
            faIcon: false,
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
];

export const ICONS_SKILL_NOTES = [
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
            size: "100"
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
            size: "125"
        }
    },
    {
        name: "iVue",
        link: MAIN_IVUE_WEBSITE_LINK,
        color: "#000000",
        desc: "I use iVue's icons and logos to make my own website, " +
            "particularly on the home page and the experience page.",

        icon: {
            id: ivue_black_text,
            faIcon: false,
            size: "160"
        }
    },
    {
        name: "FontSource",
        link: "https://fontsource.org/",
        color: "#625BF8",
        desc: "FontSource is a collection of open-source fonts that are packaged into NPM Packages. " +
            "I use them in my own website and other projects, and I just want to give credit to them here.",

        icon: {
            id: fontsource_icon,
            faIcon: false,
            size: "105"
        }
    }
];

export const PROJECT_ENTITIES = [
    {
        name: "MND",
        link: MND_PROJECT_LINK,
        color: "#008080",
        desc: "This project utiltizes Vue.js, Cesium, and numerous Amazon Web Services to help connect people in-person. " +
            "It was for the Spring 2025 KSU Hackathon.",

        icon: {
            id: mnd_text,
            faIcon: false,
            size: "210"
        }
    },
    {
        name: "My Pizza App",
        link: PIZZA_WEBSITE_LINK,
        color: "#8B0000",
        desc: "I created a Mock UI for a pizza ordering and delivery system using Angular. " +
            "It is hosted onlive via GitHub Pages.",

        icon: {
            id: "fa-pizza-slice",
            faIcon: true,
            size: "110"
        }
    },
    {
        name: "My Globe UI",
        link: PERSONAL_GLOBE_LINK,
        color: "var(--blue-one)",
        desc: "I created a User Interface using CesiumJS as a \"Feature Lab\" for Worlds iVue. " +
            "It uses the built-in Cesium Geocoder to search locations across the world. " +
            "It can also be downloaded as a destop app via Tauri.",

        icon: {
            id: cesium_icon,
            faIcon: false,
            size: "105"
        }
    }
];

export const FEATURE_ENTITIES = [
    {
        name: "Gamepads",
        link: "/gamepad/",
        color: "var(--website-light-text)",
        desc: "I integrated the Web Gamepad API into my website with joypad.js so that visitors can freely use a " +
            "PS5, Xbox, Nintendo Switch, and other controllers with my website.",

        icon: {
            id: "fa-gamepad",
            faIcon: true,
            size: "100"
        }
    },
    {
        name: "Barcode Reader",
        link: "/code-scanner/",
        color: "var(--blue-cobalt)",
        desc: "This page is capable of reading values from Barcodes and Qr Codes. " +
            "It uses the \"vue-qrocde-reader\" dependency to do so.",

        icon: {
            id: "fa-barcode",
            faIcon: true,
            size: "100"
        }
    },
    {
        name: "QR Codes",
        link: "mohit-qrcode-button",
        color: "var(--website-light-text)",
        desc: "This page uses the \"qr-code-styling\" dependency to create QR Codes for this website. " +
            "There is a Share tool that pops up with (ALT + Q) and a button on the bottom left of the Footer.",

        icon: {
            id: "fa-qrcode",
            faIcon: true,
            size: "100"
        }
    },
    {
        name: "Install Website",
        link: "/install/",
        color: "var(--website-text)",
        desc: "I used the \"Vite PWA\" dependency to build a service worker " +
            "for my website so that I can install and fully utilize my website offline.",

        icon: {
            id: vite_pwa_icon,
            faIcon: false,
            size: "150"
        }
    },
    {
        name: "Wake Lock",
        link: "/wakelock/",
        color: "var(--vibrant-flame)",
        desc: "This website can effectively use the Screen Wake Lock Web API so that " +
            "the laptop does not go to sleep naturally when enabled.",

        icon: {
            id: "fa-lock",
            faIcon: true,
            size: "100"
        }
    },
    {
        name: "Documents",
        link: "/documents/",
        color: "var(--website-text)",
        desc: "I used multiple modules to display my resume and other documents on this website. " +
            "This includes using PDF.js to natively display the PDF as a whole and the \"unplugin-vue-markdown\" " +
            "plugin to display my resume in a markdown format.",

        icon: {
            id: "fa-folder-open",
            faIcon: true,
            size: "100"
        }
    },
    {
        name: "tsParticles",
        link: "https://particles.js.org/",
        color: "black",
        desc: "The background that you see behind many of the pages was generated with this module. " +
            "It can make all sorts of backgrounds for a website with MANY customization options.",

        icon: {
            id: tsparticles,
            faIcon: false,
            size: "200"
        }
    },
    {
        name: "Google Mockup",
        link: "/google-mockup/",
        color: "#4286F5",
        desc: "This is a simple project I give to new frontend developers to introduce them to Vue.js development. " +
            "This page helps me out a lot.",

        icon: {
            id: "fa-brands fa-google",
            faIcon: true,
            size: "100"
        }
    }
];

export const HOME_COMPASS = [
    { title: "Start", id: "start", color: "var(--website-text)", faIcon: true, icon: "fa-house" },
    { title: "My Skills", id: "skills", color: "var(--blue-zero)", faIcon: true, icon: "fa-code" },
    { title: "iVue", id: "ivue", color: "white", faIcon: false, icon: worlds_ivue_icon },
    { title: "My Projects", id: "projects", color: "var(--globe-green-light)", faIcon: true, icon: "fa-cubes" },
    { title: "My Documents", id: "documents", color: "var(--website-light-text)", faIcon: true, icon: "fa-folder-open" }
];

export const SKILLS_COMPASS = [
    { title: "Vue.js", id: "vuejs", color: "#41B883", faIcon: false, icon: vue_icon },
    { title: "Frontend", id: "frontend", color: "#D3B62A", faIcon: true, icon: "fa-brands fa-js" },
    { title: "AWS", id: "aws", color: "#5468ff", faIcon: false, icon: aws_icon },
    { title: "Google", id: "google", color: "#4c8bf5", faIcon: true, icon: "fa-brands fa-google" },
    { title: "Modules", id: "modules", color: "#5C9E57", faIcon: true, icon: "fa-brands fa-node-js" },
    { title: "Languages", id: "languages", color: "#E34E26", faIcon: true, icon: "fa-laptop-code" },
    { title: "Icons", id: "icons", color: "rgb(83, 141, 215)", faIcon: true, icon: "fa-brands fa-font-awesome" }
];