import vue_icon from "../assets/Vuejs_Icon.png";
import angular_icon from "../assets/Angular_Icon.webp";
import react_icon from "../assets/React_Icon.png";
import expo_icon from "../assets/sublo/Expo_Icon.svg";
import vite_icon from "../assets/Vite_Icon.svg";
import nuxt_icon from "../assets/Nuxt_Icon.png";
import pinia_icon from "../assets/Pinia_Icon.svg";
import awesome_vite_icon from "../assets/Awesome_Vite_Icon.svg";
import unjs_icon from "../assets/UnJS_Icon.png";

import cesium_icon from "../assets/Cesium_Globe_Icon.svg";
import mavlink_icon from "../assets/ivue/Mavlink_Icon.png";
import ivue_black_text from "../assets/ivue/iVue_Black_Text_Cropped.png";
import mnd_text from "/static-icons/MND_Icon_Transparent.png";

import aws_icons_logo from "../assets/aws/AWS_Icons_Logo.svg";
import cognito_icon from "../assets/aws/AWS_Cognito_Icon.svg";
import amplify_icon from "../assets/aws/AWS_Amplify_Icon.svg";
import cloudfront_icon from "../assets/aws/AWS_CloudFront_Icon.svg";
import ses_icon from "../assets/aws/AWS_SES_Icon.svg";
import api_gateway_icon from "../assets/aws/AWS_API_Gateway_Icon.svg";

export const PERSONAL_WEBSITE_LINK = "https://www.mohit-jain.com/";
export const PERSONAL_WEBSITE_REPOSITORY_LINK = "https://github.com/Mohitjain49/mohit-website";

export const MND_PROJECT_LINK = "https://mnd.mohit-jain.com/";
export const PERSONAL_GLOBE_LINK = "https://mohitjain49.github.io/globe/";
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
export const MAVLINK_WEBSITE_LINK = "https://mavlink.io/";

export const FCS_CERTIFICATE_LINK = "https://www.mohit-jain.com/Fulton_Internship_Program_Appreciation_Certificate_Spring_2025.pdf";

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
        desc: "I use python for testing the MAVLink Protocol for Worlds iVue and to create AWS Lambda Functions.",

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
        desc: "This is a simple Globe UI that I created with Cesium. " +
            "It uses the built-in Cesium Geocoder to search locations across the world.",

        icon: {
            id: cesium_icon,
            faIcon: false,
            size: "105"
        }
    },
];