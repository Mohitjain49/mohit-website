import resume from "../assets/documents/Mohit_Jain_Resume.pdf";
import { PIZZA_WEBSITE_LINK, IVUE_ROBOTICS_WEBSITE_LINK, PERSONAL_GLOBE_LINK } from "./Objects.js";

const OLD_WEBSITE_LINK = "/";

export const Updates = [
    {
        version: "1.1.0",
        versionPath: "1-1-0",
        releaseDate: "November 1st, 2024",
        mainDescription: "Update 1.1.0 was the first update that I made to my website. " +
            "Beforehand, many of the website's pages were extremely linear, simply showing components stacked one atop another. " +
            "This update changed that, showing each of my skills as an environment of its own.",

        topics: [
            {
                name: "Improved Skills/Experience Page Layout",
                elementId: "Skills_Page",
                description: "Over my three years of coding, I have learned many skills, most notably frontend development through my role at iVue. " +
                    "I organized these skills into different paths, showcasing how my experience and skills are linked together. " +
                    "An example with my experience with iVue is down below, where I show how I contribute to the company and develop its software." +
                    "<br><br>Link To Example: <span><a href=\"/experience/ivue\" style=\"text-decoration: underline;\">Mohit Jain | iVue</a></span>",
                example: {
                    type: "iframe",
                    src: (OLD_WEBSITE_LINK + 'experience/ivue/'),
                }
            },
            {
                name: "New Company Page Sectors",
                elementId: "Page_Sectors",
                description: "As a compliment to the new Experience Pages, These page sectors serve as brief displays of my experience at different companies. " +
                    "You can observe them at the bottom of the <span><a href=\"/\" style=\"text-decoration: underline;\">Home Page</a></span>. " +
                    "One example is with iVue down below, containing links to my experience, the company's main website, and Worlds iVue, " +
                    "the company's 3D Globe App. <br><br>Note: As of Version 2.0.0, This component has been removed." ,
                example: {
                    type: "none"
                }
            }
        ]
    },
    {
        version: "1.2.0",
        versionPath: "1-2-0",
        releaseDate: "November 28th, 2024",
        mainDescription: "Over Update 1.2.0, I made a lot of extra pages to this website and even completed another project. " +
            "These pages are one giant leap to making this website scale for more skills and experiences I get over these years.",

        topics: [
            {
                name: "Resume Page",
                elementId: "Resume",
                description: "There used to be a button at the top-left of the site that let visitors download my resume. " +
                    "Considering that many visitors are on my site would like to see my resume without having to download a document, " +
                    "I made a new path that just contains my resume. Use the link down below to see a clearer version." +
                    "<br><br>Link To Resume: <span><a href=\"/resume\" style=\"text-decoration: underline;\">Mohit Jain | Resume</a></span>",
                example: {
                    type: "iframe",
                    src: resume,
                }
            },
            {
                name: "Pizza Angular Project",
                elementId: "Pizza_Project",
                description: "In my \"Intro to Software Engineering\" college class, " +
                    "I worked with a group for a documentation project on making a pizza order and delivery system. " +
                    "I mainly handled making the prototype for the project, which you can use with the link down below. " +
                    "<br><br>Link To Project: <span><a href=\"" + PIZZA_WEBSITE_LINK + "\" style=\"text-decoration: underline;\">Group Five's Pizza Shop</a></span>" +
                    "<br><br>Note that this project is simply a mockup on how the final result might work. " +
                    "It is not connected to any database or authentication system that stores user accounts. " +
                    "You can use the phone number and password down below to access the main page: " +
                    "<br><br><span style=\"text-decoration: underline;\">Phone Number:</span> 8888880000 " +
                    "<br><span style=\"text-decoration: underline;\">Password:</span> 679drThree#",
                example: {
                    type: "iframe",
                    src: PIZZA_WEBSITE_LINK,
                }
            },
            {
                name: "Update Logs",
                elementId: "Updates",
                description: "I made these update logs with this update for visitors to see what I learn over my software development journey. " +
                    "Each update will show new projects I work on and new skills I learn. " +
                    "Though I did make this website with scalability in mind, updates could also show new UI developments to the website. " +
                    "Use some of the links below to navigate to different update pages:" +
                    "<br><br>Main Updates Page: <span><a href=\"/updates/main\" style=\"text-decoration: underline;\">Mohit Jain | Updates</a></span>" +
                    "<br>Update 1.1.0: <span><a href=\"/updates/1-1-0\" style=\"text-decoration: underline;\">Mohit Jain | Update 1.1.0</a></span>",
                example: { type: "none" }
            }
        ]
    },
    {
        version: "1.2.1",
        versionPath: "1-2-1",
        releaseDate: "December 4th, 2024",
        mainDescription: "The creator of Vue.js, <span><a href=\"https://evanyou.me/\" style=\"text-decoration: underline;\">Evan You</a></span>, " +
            "is also the creator of Vite as well. Therefore, Vue.js uses Vite to handle app configuration, simplifying web development and deployment. " +
            "I properly configured my website so it takes full advantage of Vite.",

        topics: [
            {
                name: "Improved Website Configuration",
                elementId: "Website_Configuration",
                description: "Before this update, my website used to use to use \"Web Hash History\", which made the website itself handle routing between the website's many paths. " +
                    "This could be seen with the \"/#/\" before any path on the website, as opposed to a simple \"/\" which often isn't even visible. " +
                    "Using the guide down below, I managed to configure routing to be handled my Github Pages itself so that this wouldn't be a problem." +
                    "<br><br>Link To Guide: <span><a href=\"https://vite.dev/guide/static-deploy.html\" style=\"text-decoration: underline;\">Deploying a Static Site | Vite</a></span>" +
                    "<br>Link To Vite's Website: <span><a href=\"https://vite.dev/\" style=\"text-decoration: underline;\">Vite | Next Generation Frontend Tooling</a></span>",
                example: { type: "none" }
            }
        ]
    },
    {
        version: "1.3.0",
        versionPath: "1-3-0",
        releaseDate: "January 14th, 2025",
        mainDescription: "Over these last few months, I have gained a lot more experience with Amazon Web Services (AWS), " +
            "the JavaScript Framework React Native, and coding in general. Now that my internship at Sublo has ended " +
            "and new updates were released for Worlds iVue and iVue's company websites, I thought it only fitting to update my website as well.",

        topics: [
            {
                name: "My Additional AWS Experience",
                elementId: "AWS_Experience",
                description: "Through my role as iVue's lead software developer, I have learned quite a bit on hosting websites through AWS. " +
                    "This includes learning how to use Amazon S3, Amazon CloudFront, and Amazon Route 53 to configure AWS to host iVue's websites. " +
                    "I've even constructed a CI/CD pipeline between the repositories of each website's code and their respective S3 buckets and CloudFront Distributions. " +
                    "The AWS page is updated now to reflect my growing experience." +
                    "<br><br>Link To Example: <span><a href=\"/skills/aws\" style=\"text-decoration: underline;\">Mohit Jain | AWS</a></span>",
                example: {
                    type: "iframe",
                    src: (OLD_WEBSITE_LINK + 'skills/aws/s3'),
                }
            },
            {
                name: "My React Native Experience",
                elementId: "React_Native_Experience",
                description: "Through my internship at Sublo, I got hands-on experience with react native. The website has been updated appropriately to accomodate this. " +
                    "I am certain that I'll be using this framework in the future for projects at iVue and other possible companies.<br><br>Link To Example: " +
                    "<span><a href=\"/skills/frontend/reactnative\" style=\"text-decoration: underline;\">Mohit Jain | Frontend Development | React Native</a></span>",
                example: {
                    type: "iframe",
                    src: (OLD_WEBSITE_LINK + 'skills/frontend/reactnative'),
                }
            },
            {
                name: "My Sublo Experience",
                elementId: "Sublo_Experience",
                description: "During my brief internship at Sublo, I learned a lot about mobile app development with React Native. " +
                    "Though the company is still in its infancy, I wanted to include it as it is a core piece of my software development skills." +
                    "<br><br>Link To Example: <span><a href=\"/experience/sublo\" style=\"text-decoration: underline;\">Mohit Jain | Sublo</a></span>",
                example: {
                    type: "iframe",
                    src: (OLD_WEBSITE_LINK + 'experience/sublo'),
                }
            },
            {
                name: "iVue Robotics Website",
                elementId: "iVue_Robotics_Website",
                description: "iVue's Website Development Team, including me and a few trusted colleagues, just released a new version of the iVue Robotics Website a few days ago. " +
                    "I made a brief section for this under my experience with iVue like the other two websites." +
                    "<br><br>Link To Example: <span><a href=\"/experience/ivue/ivuerobotics\" style=\"text-decoration: underline;\">Mohit Jain | iVue Robotics</a></span>" +
                    "<br>Link To Website: <span><a href=\"" + IVUE_ROBOTICS_WEBSITE_LINK + "\" style=\"text-decoration: underline;\">iVue Robotics</a></span>",
                example: {
                    type: "iframe",
                    src: (OLD_WEBSITE_LINK + 'experience/ivue/ivuerobotics'),
                }
            }
        ]
    },
    {
        version: "2.0.0",
        versionPath: "2-0-0",
        releaseDate: "January 31st, 2025",
        mainDescription: "Since releasing this website back in September last year, I have dramatically improved my UI/UX design skills " +
            "by developing iVue's company websites and releasing a new update to Worlds iVue. So, I redesigned most of my website. " +
            "This includes a redesigned home page, a new domain, multiple new pages, and more.",

        topics: [
            {
                name: "New Domain",
                elementId: "Domain",
                description: "This was the update that first introduced my new domain \"mohit-jain.com\". " +
                    "This allows me to host many more of my projects like my globe and the pizza angular website I created Fall 2024.",
                example: {
                    type: "none"
                }
            },
            {
                name: "New Home Page",
                elementId: "Home_Page",
                description: "The new homepage's design was reworked completely to ensure that each of my skills and experiences " +
                    "took up more than one line of text. It also introduces a blend of orange and blue to my website." +
                    "<br><br>Link To Example: <span><a href=\"/\" style=\"text-decoration: underline;\">Mohit Jain</a></span>",
                example: {
                    type: "iframe",
                    src: (OLD_WEBSITE_LINK),
                }
            },
            {
                name: "New Credits Page",
                elementId: "Credits_Page",
                description: "The Credits Page is simple: It shows what code libraries, framework, assets, and web services I used for this website. " +
                    "Though It's not required, I'm truly grateful that I can use all these (mostly) free services." +
                    "<br><br>Link To Webpage: <span><a href=\"/credits\" style=\"text-decoration: underline;\">Mohit Jain | Credits</a></span>",
                example: {
                    type: "none",
                }
            },
            {
                name: "New Contact Page",
                elementId: "Contact_Page",
                description: "The Contact Page, similar to other contact pages, contains a list of platforms for visitors to contact me and " +
                    "a section to type in a message for me. It uses Amazon Simple Email Service to facilitate this." +
                    "<br><br>Link To Webpage: <span><a href=\"/contact\" style=\"text-decoration: underline;\">Mohit Jain | Contact Me</a></span>",
                example: {
                    type: "none"
                }
            }
        ]
    },
    {
        version: "2.0.1",
        versionPath: "2-0-1",
        releaseDate: "February 3rd, 2025",
        mainDescription: "While working my 2.0.0 update, I was also working on a new Globe Page. " +
            "This was primarily to reduce the size of my main website. Cesium is more than any npm module; its assets must be stored in a separate assets folder.",

        topics: [
            {
                name: "New Globe Website",
                elementId: "Globe",
                description: "This new page is currently not fully complete, but it introduces a new design that the old globe page on my .github.io subdomain. " +
                    "There's a link to that page and a link on how I configure cesium down below for anyone that'll need help." +
                    "<br><br>Link To Webpage: <span><a href=\"" + PERSONAL_GLOBE_LINK + "\" style=\"text-decoration: underline;\">Mohit Jain | Globe</a></span>" +
                    "<br><span><a href=\"https://cesium.com/blog/2024/02/13/configuring-vite-or-webpack-for-cesiumjs/\" " +
                    "style=\"text-decoration: underline;\">How To Configure Cesium For A Project</a></span>",
                example: {
                    type: "none"
                }
            }
        ]
    }
]